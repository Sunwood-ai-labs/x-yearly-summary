
import json
import re
from datetime import datetime
from collections import defaultdict
import os

# Configuration
TWEETS_JS_PATH = '/mnt/d/Prj/CC_WorkSpace/x-yearly-summary/twitter-archive/raw/twitter-2026-01-02-6b1dc95fdd94290f9647655262ead4d269c8bab92289bd687e0490c25bacce7c/data/tweets.js'
OUTPUT_BASE = '/mnt/d/Prj/CC_WorkSpace/x-yearly-summary/2025'
CSS_PATH = '../assets/css/style.css'

# Ensure directories exist
os.makedirs(f'{OUTPUT_BASE}/series', exist_ok=True)
os.makedirs(f'{OUTPUT_BASE}/log', exist_ok=True)

def load_tweets():
    try:
        with open(TWEETS_JS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
            if 'window.YTD.tweets.part0 =' in content:
                json_str = content.split('=', 1)[1].strip()
            else:
                json_str = content
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
        
        try:
            # Format: "Fri Jan 02 13:35:03 +0000 2026"
            dt = datetime.strptime(created_at, '%a %b %d %H:%M:%S +0000 %Y')
            if dt.year == 2025:
                tweet['dt'] = dt
                tweet['date_str'] = dt.strftime('%B %d, %Y')
                tweet['time_str'] = dt.strftime('%H:%M')
                tweets_2025.append(tweet)
        except ValueError:
            pass
            
    return sorted(tweets_2025, key=lambda x: x['dt'], reverse=True)

def analyze_series(tweets):
    patterns = [
        (r'(.*?)\s*([①-⑳])', 'circle'),
        (r'(.*?)\s*([❶-❿])', 'solid_circle'),
        (r'(.*?)\s*((?:\d\u20e3)+)', 'keycap'), 
        (r'(.*?)\s+(?:Vol|Part|#)\.?\s*(\d+)', 'standard'),
        (r'(.*?)\s*[vV]ol\.?(\d+)', 'vol'),
        # Add basic pattern for numbered items like 1., 1/, etc if specific keywords exist? 
        # But user specifically mentioned "numbered posts". The above covers the common unicode ones seen in the content.
    ]
    
    candidates = defaultdict(list)
    
    for tweet in tweets:
        text = tweet.get('full_text', '')
        first_line = text.split('\n')[0]
        
        matched = False
        for pat, style in patterns:
            m = re.search(pat, first_line)
            if m:
                title = m.group(1).strip()
                if len(title) > 3: # Ignore very short titles
                    candidates[title].append(tweet)
                    matched = True
                    break
    
    # Filter for > 1 items
    final_series = {}
    for title, items in candidates.items():
        if len(items) >= 2:
            # Sort items by date usually, or by number?
            # Twitter allows multiple tweets with same number if reposted or quoted, but let's just sort by date desc for now
            final_series[title] = sorted(items, key=lambda x: x['dt'], reverse=True)
            
    return final_series

def tweet_to_html_card(tweet):
    # User template:
    # <blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">...<a href="...">...</a></p>&mdash; User (@handle) <a href="...">Date</a></blockquote> <script ...></script>
    
    text = tweet.get('full_text', '')
    # Convert newlines to <br>
    text_html = text.replace('\n', '<br>')
    # Very basic URL linking if we wanted to be perfect, but Twitter widget handles a lot.
    # However, for the blockquote content, Twitter recommends static HTML representation.
    # We will just put the text as is (escaped).
    
    # Identify user info (from archive, or use generic if missing)
    # The archive structure might separate user info. 'tweet' object has 'user' usually?
    # In this specific archive format (tweets.js), user info might not be embedded in every tweet object fully
    # or it is stripped. Let's check a sample tweet structure in previous turn.
    # Sample did NOT show 'user' object inside 'tweet'. It showed 'retweeted', 'source', 'entities', 'full_text'.
    # It probably relies on global account info.
    # Use hardcoded "Maki@Sunwood AI Labs." and "@hAru_mAki_ch" as per user request snippet.
    
    user_name = "Maki@Sunwood AI Labs."
    screen_name = "hAru_mAki_ch"
    tweet_id = tweet.get('id_str')
    date_str = tweet.get('date_str', '')
    
    # We should attempt to make links in text clickable in the static version?
    # Actually, the twitter widget script will replace the blockquote with an iframe if it loads.
    # If it doesn't load, we see the blockquote.
    
    # Replace t.co links in text with actual links if possible?
    # The 'entities' object has url expansion.
    display_text = text
    if 'entities' in tweet and 'urls' in tweet['entities']:
        for url_obj in tweet['entities']['urls']:
            url = url_obj['url']
            display_url = url_obj['display_url']
            expanded_url = url_obj['expanded_url']
            # Simple replace mapping
            # display_text = display_text.replace(url, f'<a href="{expanded_url}">{display_url}</a>')
            pass
            
    # For safety in HTML, we should simple-escape < and >
    # But since we are injecting into <p>, let's just do basic replace
    # text_html is already doing regex replace for newlines.
    
    # Let's trust the twitter widget to do the heavy lifting for formatting if online.
    # For offline, we present raw text.
    
    html = f"""
<div class="tweet-card-wrapper">
    <blockquote class="twitter-tweet" data-theme="dark" data-media-max-width="560">
        <p lang="ja" dir="ltr">
            {text_html}
        </p>
        &mdash; {user_name} (@{screen_name}) 
        <a href="https://twitter.com/{screen_name}/status/{tweet_id}?ref_src=twsrc%5Etfw">{date_str}</a>
    </blockquote> 
</div>
"""
    return html

def generate_page(title, body_content, depth=1):
    css_rel = "../" * depth + "assets/css/style.css"
    # Basic Navigation
    nav_html = f"""
    <nav class="breadcrumbs">
        <a href="{'../' * depth}index.html">Home</a>
        {' > <a href="../index.html">2025</a>' if depth > 1 else ''}
        {' > <a href="index.html">Series</a>' if 'series' in title.lower() and title != 'Series List' else ''}
        {' > <a href="index.html">Logs</a>' if 'log' in title.lower() and title != 'Monthly Logs' else ''}
        > {title}
    </nav>
    """
    
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Project 2025</title>
    <link rel="stylesheet" href="{css_rel}">
    <!-- Widgets JS is loaded per card or globally? Better globally -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <style>
        /* CSS is handled in style.css */
    </style>
</head>
<body>
    <canvas id="bg-canvas"></canvas>
    <div class="container">
        <header>
            <div class="hero-title-group">
                <h1 class="main-title">{title}</h1>
            </div>
        </header>
        
        {nav_html}

        <main>
            {body_content}
        </main>

        <footer>
            <div class="footer-links">
                <a href="https://x.com/hAru_mAki_ch">X</a>
                <a href="../index.html">Archive Home</a>
            </div>
            <div class="copyright">&copy; 2025 Maki@Sunwood AI Labs.</div>
        </footer>
    </div>
    <script>
        // Copy canvas animation from main index (simplified reuse?)
        // For now just empty or copy content if needed.
        // Let's assume style.css handles styling, but canvas JS is needed for animation.
        // We will include the canvas script here inline for simplicity to match index.html
        
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        function resize() {{ width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }}
        class Particle {{
            constructor() {{ this.reset(); }}
            reset() {{
                this.x = Math.random() * width; this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2; this.alpha = Math.random() * 0.5 + 0.1;
                this.life = Math.random() * 100;
            }}
            update() {{
                this.x += this.vx; this.y += this.vy; this.life--;
                if(this.x<0)this.x=width; if(this.x>width)this.x=0;
                if(this.y<0)this.y=height; if(this.y>height)this.y=0;
                if(this.life<=0)this.reset();
            }}
            draw() {{
                ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
                ctx.fillStyle = `rgba(0, 240, 255, ${{this.alpha}})`; ctx.fill();
            }}
        }}
        function init() {{ particles = []; for(let i=0; i<Math.min(window.innerWidth/10,50); i++) particles.push(new Particle()); }}
        function animate() {{
            ctx.fillStyle = 'rgba(5,5,5,0.1)'; ctx.fillRect(0,0,width,height);
            particles.forEach(p => {{ p.update(); p.draw(); }});
            requestAnimationFrame(animate);
        }}
        window.addEventListener('resize', ()=>{{resize();init();}});
        resize(); init(); animate();
    </script>
</body>
</html>
"""

def main():
    all_data = load_tweets()
    tweets = get_2025_tweets(all_data)
    
    # 1. Group by Month
    tweets_by_month = defaultdict(list)
    for t in tweets:
        month_key = t['dt'].strftime('%Y-%m')
        tweets_by_month[month_key].append(t)
        
    # 2. Group by Series
    series_dict = analyze_series(tweets)
    
    # Generate Series Pages
    series_links_html = ""
    for title, items in series_dict.items():
        # Create safe filename
        safe_title = re.sub(r'[^\w\-_]', '_', title)
        # Handle Japanese characters? Filesystem usually supports it but web servers might prefer ascii.
        # Let's try to keep it as unicode if system allows, otherwise hash.
        # To be safe for web linking, let's hash or restrict.
        # But Japanese filenames are readable. Let's try raw but sanitized.
        safe_title = title.replace('/', '_').replace(' ', '_').replace('?', '').replace('!', '')
        if len(safe_title) > 50: safe_title = safe_title[:50]
        
        series_filename = f"{safe_title}.html"
        html_cards = "\n".join([tweet_to_html_card(t) for t in items])
        
        page_content = f"""
        <div class="intro">
            <p>Series: {title}</p>
            <p>Total Items: {len(items)}</p>
        </div>
        <div class="tweet-list">
            {html_cards}
        </div>
        """
        
        with open(f'{OUTPUT_BASE}/series/{series_filename}', 'w', encoding='utf-8') as f:
            f.write(generate_page(title, page_content, depth=2))
            
        series_links_html += f'<a href="series/{series_filename}" class="series-link">{title} <span class="count">({len(items)})</span></a>\n'

    # Generate Series Index
    with open(f'{OUTPUT_BASE}/series/index.html', 'w', encoding='utf-8') as f:
        content = f"""
        <div class="years-section">
            <h2 class="section-title">Series Collection</h2>
            <div class="series-nav" style="flex-direction:column; align-items:center; gap:20px;">
                {series_links_html}
            </div>
        </div>
        """
        f.write(generate_page("All Series", content, depth=2))

    # Generate Monthly Logs
    month_links_html = ""
    sorted_months = sorted(tweets_by_month.keys(), reverse=True)
    for month in sorted_months:
        items = tweets_by_month[month]
        month_name = datetime.strptime(month, '%Y-%m').strftime('%B %Y')
        filename = f"{month}.html"
        
        html_cards = "\n".join([tweet_to_html_card(t) for t in items])
        
        page_content = f"""
        <div class="intro">
            <p>Log: {month_name}</p>
            <p>Total Tweets: {len(items)}</p>
        </div>
        <div class="tweet-list">
            {html_cards}
        </div>
        """
        
        with open(f'{OUTPUT_BASE}/log/{filename}', 'w', encoding='utf-8') as f:
            f.write(generate_page(month_name, page_content, depth=2))
            
        month_links_html += f'<a href="log/{filename}" class="year-card" style="text-align:center; padding:20px;"><h3>{month}</h3><p>{len(items)} Tweets</p></a>'

    # Generate Monthly Index
    with open(f'{OUTPUT_BASE}/log/index.html', 'w', encoding='utf-8') as f:
        content = f"""
        <div class="years-section">
            <h2 class="section-title">Monthly Logs</h2>
            <div class="year-grid">
                {month_links_html}
            </div>
        </div>
        """
        f.write(generate_page("Monthly Logs", content, depth=2))

    # Generate Main 2025 Index
    content = f"""
    <div class="intro">
        <p>2025 Year in Review</p>
        <p>Total Tweets: {len(tweets)} | Series Identified: {len(series_dict)}</p>
    </div>
    
    <section class="years-section">
        <h2 class="section-title">Archives</h2>
        <div class="year-grid">
            <a href="series/index.html" class="year-card">
                <h3>Series</h3>
                <p>Curated threads and topic series.</p>
                <div class="stats">
                    <span class="stat-value">{len(series_dict)}</span> Series
                </div>
            </a>
            <a href="log/index.html" class="year-card">
                <h3>Monthly Log</h3>
                <p>Full cronological archive by month.</p>
                <div class="stats">
                    <span class="stat-value">{len(tweets_by_month)}</span> Months
                </div>
            </a>
        </div>
    </section>
    
    <section class="years-section">
        <h2 class="section-title">Recent Activity</h2>
        <div class="tweet-list">
            {"\n".join([tweet_to_html_card(t) for t in tweets[:5]])}
        </div>
        <div style="text-align:center; margin-top:20px;">
            <a href="log/index.html" style="color:var(--accent-cyan);">View All -></a>
        </div>
    </section>
    """
    
    with open(f'{OUTPUT_BASE}/index.html', 'w', encoding='utf-8') as f:
        f.write(generate_page("2025 Archive", content, depth=1))

if __name__ == "__main__":
    main()
