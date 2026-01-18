import type { PageServerLoad } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = () => {
	// index.jsonからシリーズデータを読み込み
	const jsonPath = join(process.cwd(), 'static/data/index.json');
	const jsonContent = readFileSync(jsonPath, 'utf-8');
	const indexData = JSON.parse(jsonContent);

	// 各シリーズの代表画像を抽出
	const series = indexData.series.map((s: any) => {
		// 最初の画像付きツイートを探す
		let thumbnailUrl: string | undefined;
		let thumbnailType: 'photo' | 'video' | undefined;

		for (const tweet of s.tweets) {
			if (tweet.entities?.media && tweet.entities.media.length > 0) {
				const media = tweet.entities.media[0];
				if (media.type === 'photo') {
					thumbnailUrl = media.media_url_https;
					thumbnailType = 'photo';
					break;
				} else if (media.type === 'video' || media.type === 'animated_gif') {
					thumbnailUrl = media.media_url_https;
					thumbnailType = 'video';
					// 画像が見つかるまで続ける
				}
			}
		}

		return {
			title: s.title,
			slug: s.slug,
			tweetCount: s.tweetCount,
			style: s.style,
			thumbnailUrl,
			thumbnailType
		};
	});

	return {
		series
	};
};
