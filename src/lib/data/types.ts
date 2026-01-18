/**
 * Twitter Archiveから抽出したツイートデータ構造
 */

export interface Tweet {
	/** ツイートID */
	id_str: string;
	/** ツイート本文 */
	full_text: string;
	/** 作成日時 (Twitter形式: "Fri Jan 02 13:35:03 +0000 2025") */
	created_at: string;
	/** パースされた日時オブジェクト */
	dt: Date;
	/** フォーマット済み日付文字列 (例: "January 02, 2025") */
	date_str: string;
	/** フォーマット済み時刻文字列 (例: "13:35") */
	time_str: string;
	/** URLエンティティ等 */
	entities?: {
		urls?: Array<{
			url: string;
			display_url: string;
			expanded_url: string;
		}>;
		media?: Array<{
			type: 'photo' | 'video' | 'animated_gif';
			media_url_https: string;
			url: string;
			display_url: string;
			expanded_url: string;
			ext?: string;
			sizes?: {
				thumb?: { w: number; h: number; resize: string };
				small?: { w: number; h: number; resize: string };
				medium?: { w: number; h: number; resize: string };
				large?: { w: number; h: number; resize: string };
			};
			video_info?: {
				variants?: Array<{
					bitrate?: number;
					content_type: string;
					url: string;
				}>;
			};
		}>;
	};
	/** いいね数 */
	favorite_count?: number;
	/** リツイート数 */
	retweet_count?: number;
	/** リプライ数 */
	reply_count?: number;
}

/**
 * シリーズデータ構造
 */
export interface Series {
	/** シリーズタイトル */
	title: string;
	/** URLスラグ */
	slug: string;
	/** ナンバリングスタイル */
	style: 'circle' | 'solid_circle' | 'keycap' | 'standard' | 'vol';
	/** シリーズに含まれるツイート */
	tweets: Tweet[];
	/** ツイート数 */
	tweetCount: number;
	/** 最初のツイート日付 */
	firstTweetDate: string;
	/** 最後のツイート日付 */
	lastTweetDate: string;
}

/**
 * 月別ログデータ構造
 */
export interface MonthlyLog {
	/** 月キー (例: "2025-01") */
	monthKey: string;
	/** 月名 (例: "January 2025") */
	monthName: string;
	/** その月のツイート */
	tweets: Tweet[];
	/** ツイート数 */
	tweetCount: number;
}

/**
 * ツイートデータインデックス構造
 */
export interface TweetDataIndex {
	/** 月別ログ配列 */
	tweetsByMonth: MonthlyLog[];
	/** シリーズ配列 */
	series: Series[];
	/** 総ツイート数 */
	totalTweets: number;
	/** 総シリーズ数 */
	totalSeries: number;
}

/**
 * Twitter Archive tweets.js の生データ構造
 */
export interface TwitterArchiveData {
	tweet: {
		id: string;
		id_str: string;
		full_text: string;
		created_at: string;
		lang?: string;
		entities?: {
			urls?: Array<{
				url: string;
				display_url: string;
				expanded_url: string;
			}>;
			hashtags?: Array<{
				text: string;
			}>;
			user_mentions?: Array<{
				screen_name: string;
			}>;
		};
		favorite_count?: number;
		retweet_count?: number;
		source?: string;
	};
}

/**
 * シリーズ検出パターン
 */
export interface SeriesPattern {
	/** 正規表現パターン */
	regex: RegExp;
	/** スタイル識別子 */
	style: 'circle' | 'solid_circle' | 'keycap' | 'standard' | 'vol';
}

/**
 * シリーズ候補データ（検出途中）
 */
export interface SeriesCandidate {
	/** タイトル */
	title: string;
	/** ツイート */
	tweets: Tweet[];
	/** スタイル */
	style: 'circle' | 'solid_circle' | 'keycap' | 'standard' | 'vol';
}
