
import json
import re
from datetime import datetime
from collections import defaultdict
import os

TWEETS_JS_PATH = '/mnt/d/Prj/CC_WorkSpace/x-yearly-summary/twitter-archive/raw/twitter-2026-01-02-6b1dc95fdd94290f9647655262ead4d269c8bab92289bd687e0490c25bacce7c/data/tweets.js'

def load_tweets():
    try:
        with open(TWEETS_JS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
            # Strip variable assignment
            if 'window.YTD.tweets.part0 =' in content:
                json_str = content.split('=', 1)[1].strip()
            else:
                json_str = content # Fallback
            
            # Remove trailing semi-colon/formatting
            # Sometimes it's just JSON, sometimes JS assignment.
            # Only remove last char if it is ;
            if json_str.strip().endswith(';'):
                json_str = json_str.strip()[:-1]
                
            return json.loads(json_str)
    except Exception as e:
        print(f"Error loading tweets: {e}")
        return []

def get_2025_tweets(all_tweets):
    tweets_2025 = []
    for t_obj in all_tweets:
        tweet = t_obj.get('tweet', {})
        created_at = tweet.get('created_at')
        if not created_at: continue
        
        # Format: "Fri Jan 02 13:35:03 +0000 2026"
        try:
            dt = datetime.strptime(created_at, '%a %b %d %H:%M:%S +0000 %Y')
            if dt.year == 2025:
                tweet['dt'] = dt
                tweets_2025.append(tweet)
        except ValueError:
            pass
            
    return sorted(tweets_2025, key=lambda x: x['dt'], reverse=True)

def analyze_series(tweets):
    # Regex patterns for different numbering styles
    
    # 1. Circle numbers ①-⑳ (\u2460-\u2473)
    # 2. Solid Circle Numbers ❶-❿ (\u2776-\u277f) (Only up to 10? need to check)
    # 3. Keycap 1⃣ (digit + \u20e3)
    # 4. "Vol.1", " Part 1", "#1"
    
    patterns = [
        (r'(.*?)\s*([①-⑳])', 'circle'),
        (r'(.*?)\s*([❶-❿])', 'solid_circle'),
        # Keycap style: find sequence of (digit + 20e3)
        (r'(.*?)\s*((?:\d\u20e3)+)', 'keycap'), 
        # Vol/Part/#
        (r'(.*?)\s+(?:Vol|Part|#)\.?\s*(\d+)', 'standard'),
        (r'(.*?)\s*[vV]ol\.?(\d+)', 'vol'),
    ]
    
    # Store candidates: title -> list of tweets
    candidates = defaultdict(list)
    
    # Map for specific char to int
    circle_map = {chr(0x2460 + i): i + 1 for i in range(20)}
    solid_map = {chr(0x2776 + i): i + 1 for i in range(10)}
    # Add ⓫-⓴ etc if needed, but 1-20 is 2460-2473
    
    for tweet in tweets:
        text = tweet.get('full_text', '')
        # Take first line or first sentence for series detection?
        # Usually series title is at the start.
        # But text might be "Title #1\nContent"
        
        # Analyze first line primarily
        first_line = text.split('\n')[0]
        
        matched = False
        for pat, style in patterns:
            m = re.search(pat, first_line)
            if m:
                # Check if the title part is substantial (not just empty string)
                title = m.group(1).strip()
                if len(title) > 3: # Ignore very short titles
                    candidates[title].append({
                        'text': first_line,
                        'full_text': text,
                        'id': tweet['id'],
                        'style': style,
                        'marker': m.group(2)
                    })
                    matched = True
                    break # Take first match
        
        if not matched:
            # Fallback: check if text ends with a number? (Risky)
            pass

    # Filter out candidates with only 1 tweet? Or keep them if user wants "Series" even if just one so far (unlikely)
    # User said "投稿でナンバーがついたシリーズはまとめて" (Group numbered series).
    # Likely implies multiple items.
    
    final_series = {}
    for title, items in candidates.items():
        if len(items) >= 2: # At least 2 items to form a series
            final_series[title] = items
            
    return final_series

def main():
    all_data = load_tweets()
    print(f"Loaded {len(all_data)} tweets total.")
    
    tweets_2025 = get_2025_tweets(all_data)
    print(f"Found {len(tweets_2025)} tweets in 2025.")
    
    series = analyze_series(tweets_2025)
    print(f"Identified {len(series)} potential series.")
    
    print("\nSample Series:")
    for title, items in list(series.items())[:10]:
        print(f"Title: {title} ({len(items)} items)")
        for item in items[:3]:
            print(f"  - {item['text'][:40]}... [{item['style']}]")
        print("-------")

if __name__ == "__main__":
    main()
