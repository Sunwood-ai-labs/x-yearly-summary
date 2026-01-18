/**
 * ビルド前処理スクリプト
 * Twitter Archiveのtweets.jsを読み込んでJSONデータを生成する
 *
 * 実行方法:
 *   pnpm run prebuild
 * または
 *   tsx scripts/preprocess.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createContext, runInContext } from 'vm';

// パス解決
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// TypeScriptユーティリティを直接インポート
// 注意: このスクリプトはTypeScriptとして実行する必要がある

/**
 * Twitterの日付文字列をパース
 */
function parseTwitterDate(dateStr) {
	const match = dateStr.match(/(\w{3}) (\w{3}) (\d{2}) (\d{2}):(\d{2}):(\d{2}) \+0000 (\d{4})/);
	if (!match) {
		throw new Error(`Invalid Twitter date format: ${dateStr}`);
	}

	const months = {
		Jan: 0,
		Feb: 1,
		Mar: 2,
		Apr: 3,
		May: 4,
		Jun: 5,
		Jul: 6,
		Aug: 7,
		Sep: 8,
		Oct: 9,
		Nov: 10,
		Dec: 11
	};

	const month = months[match[2]];
	return new Date(Date.UTC(parseInt(match[7], 10), month, parseInt(match[3], 10), parseInt(match[4], 10), parseInt(match[5], 10), parseInt(match[6], 10)));
}

/**
 * tweets.jsをパース
 * VMコンテキストを使って安全にJavaScriptとして評価
 */
function parseTweetsJs(jsContent) {
	// JavaScriptコードを構築
	// window.YTD.tweets.part0 = [...] の形式を解析
	const code = jsContent;

	// VMコンテキストを作成して安全に評価
	const sandbox = {
		window: {
			YTD: {
				tweets: {
					part0: null
				}
			}
		},
		console: console
	};

	const context = createContext(sandbox);

	try {
		// JavaScriptコードを実行
		runInContext(code, context, {
			filename: 'tweets.js',
			timeout: 30000 // 30秒タイムアウト
		});

		// 結果を取得
		const result = sandbox.window.YTD.tweets.part0;
		if (!Array.isArray(result)) {
			throw new Error('Result is not an array');
		}

		console.log(`✅ Successfully parsed ${result.length} tweets via VM`);
		return result;
	} catch (e) {
		console.error('VM evaluation error:', e.message);

		// フォールバック: 従来のJSON.parse()を試行
		console.log('⚠️  Falling back to JSON.parse()...');
		let jsonStr = jsContent;

		if (jsonStr.charCodeAt(0) === 0xfeff) {
			jsonStr = jsonStr.slice(1);
		}

		jsonStr = jsonStr.trim();

		if (jsonStr.startsWith('window.YTD.tweets.part0')) {
			jsonStr = jsonStr.split('=', 2)[1].trim();
		}

		if (jsonStr.endsWith(';')) {
			jsonStr = jsonStr.slice(0, -1).trim();
		}

		return JSON.parse(jsonStr);
	}
}

/**
 * ナンバリングパターン定義
 */
const SERIES_PATTERNS = [
	{ regex: /(.*?)\s*([①-⑳])/, style: 'circle' },
	{ regex: /(.*?)\s*([❶-❿])/, style: 'solid_circle' },
	{ regex: /(.*?)\s*((?:\d\u20e3)+)/, style: 'keycap' },
	{ regex: /(.*?)\s+(?:Vol|Part|#)\.?\s*(\d+)/, style: 'standard' },
	{ regex: /(.*?)\s*[vV]ol\.?(\d+)/, style: 'vol' }
];

/**
 * スラグ生成
 */
function generateSlug(title) {
	let slug = title
		.trim()
		.replace(/[\/\\ \u00A0]+/g, '_')
		.replace(/[^\p{L}\p{N}_\-~.!*'()]/gu, '')
		.replace(/_+/g, '_')
		.replace(/^_+|_+$/g, '');

	if (slug.length > 50) {
		slug = slug.substring(0, 50).replace(/_+$/, '');
	}

	if (slug.length < 3) {
		const crypto = require('crypto');
		const hash = crypto.createHash('sha256').update(title, 'utf8').digest('hex').substring(0, 8);
		return `series_${hash}`;
	}

	return slug;
}

/**
 * シリーズ検出
 */
function detectSeries(tweets, minItems = 2) {
	const candidatesMap = new Map();

	for (const tweet of tweets) {
		const text = tweet.full_text;
		const firstLine = text.split('\n')[0];

		for (const pattern of SERIES_PATTERNS) {
			const match = firstLine.match(pattern.regex);
			if (match) {
				const title = match[1].trim();
				if (title.length <= 3) continue;

				if (!candidatesMap.has(title)) {
					candidatesMap.set(title, {
						title,
						tweets: [],
						style: pattern.style
					});
				}

				candidatesMap.get(title).tweets.push(tweet);
				break;
			}
		}
	}

	const series = [];
	for (const [title, candidate] of candidatesMap.entries()) {
		if (candidate.tweets.length >= minItems) {
			const sortedTweets = candidate.tweets.sort((a, b) => b.dt.getTime() - a.dt.getTime());
			series.push({
				title,
				slug: generateSlug(title),
				style: candidate.style,
				tweets: sortedTweets,
				tweetCount: sortedTweets.length,
				firstTweetDate: sortedTweets[sortedTweets.length - 1].date_str,
				lastTweetDate: sortedTweets[0].date_str
			});
		}
	}

	return series.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * ツイートを月別にグループ化
 */
function groupTweetsByMonth(tweets) {
	const monthMap = new Map();

	for (const tweet of tweets) {
		const monthKey = `${tweet.dt.getFullYear()}-${String(tweet.dt.getMonth() + 1).padStart(2, '0')}`;
		if (!monthMap.has(monthKey)) {
			monthMap.set(monthKey, []);
		}
		monthMap.get(monthKey).push(tweet);
	}

	const monthlyLogs = [];
	for (const [monthKey, monthTweets] of monthMap.entries()) {
		const dt = monthTweets[0].dt;
		const monthName = dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

		monthlyLogs.push({
			monthKey,
			monthName,
			tweets: monthTweets,
			tweetCount: monthTweets.length
		});
	}

	return monthlyLogs.sort((a, b) => b.monthKey.localeCompare(a.monthKey));
}

/**
 * メイン処理
 */
function main() {
	console.log('🔄 Starting tweet preprocessing...');

	// tweets.jsのパス
	const tweetsJsPath = join(projectRoot, 'twitter-archive/raw/twitter-2026-01-02-6b1dc95fdd94290f9647655262ead4d269c8bab92289bd687e0490c25bacce7c/data/tweets.js');

	if (!existsSync(tweetsJsPath)) {
		console.error(`❌ tweets.js not found at: ${tweetsJsPath}`);
		process.exit(1);
	}

	// 出力先ディレクトリ
	const outputDir = join(projectRoot, 'static/data');
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	// tweets.jsを読み込み
	console.log('📖 Reading tweets.js...');
	const jsContent = readFileSync(tweetsJsPath, 'utf8');
	const archiveData = parseTweetsJs(jsContent);

	// 2025年のツイートを抽出
	console.log('🔍 Extracting 2025 tweets...');
	const tweets2025 = [];
	for (const item of archiveData) {
		const tweet = item.tweet;
		const createdAt = tweet.created_at;
		if (!createdAt) continue;

		try {
			const dt = parseTwitterDate(createdAt);
			if (dt.getFullYear() === 2025) {
				const date_str = dt.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: '2-digit'
				});
				const time_str = dt.toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false
				});

				tweets2025.push({
					id_str: tweet.id_str,
					full_text: tweet.full_text,
					created_at: createdAt,
					dt,
					date_str,
					time_str,
					entities: tweet.entities,
					favorite_count: tweet.favorite_count,
					retweet_count: tweet.retweet_count
				});
			}
		} catch (e) {
			console.warn(`Failed to parse date for tweet ${tweet.id_str}:`, e.message);
		}
	}

	// ソート
	tweets2025.sort((a, b) => b.dt.getTime() - a.dt.getTime());
	console.log(`✅ Found ${tweets2025.length} tweets in 2025`);

	// 月別グループ化
	console.log('📅 Grouping by month...');
	const tweetsByMonth = groupTweetsByMonth(tweets2025);

	// シリーズ検出
	console.log('🔍 Detecting series...');
	const series = detectSeries(tweets2025);
	console.log(`✅ Detected ${series.length} series`);

	// JSON出力
	console.log('💾 Writing JSON files...');
	writeFileSync(join(outputDir, 'tweets.json'), JSON.stringify(tweets2025, null, 2));
	writeFileSync(join(outputDir, 'tweets-by-month.json'), JSON.stringify(tweetsByMonth, null, 2));
	writeFileSync(
		join(outputDir, 'series.json'),
		JSON.stringify(series, null, 2)
	);
	writeFileSync(
		join(outputDir, 'index.json'),
		JSON.stringify(
			{
				tweetsByMonth,
				series,
				totalTweets: tweets2025.length,
				totalSeries: series.length
			},
			null,
			2
		)
	);

	console.log('✅ Preprocessing complete!');
	console.log(`   📄 tweets.json: ${tweets2025.length} tweets`);
	console.log(`   📄 tweets-by-month.json: ${tweetsByMonth.length} months`);
	console.log(`   📄 series.json: ${series.length} series`);
}

main();
