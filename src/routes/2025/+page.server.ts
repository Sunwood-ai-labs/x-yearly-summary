import type { PageServerLoad } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = () => {
	// JSONファイルを読み込み
	const jsonPath = join(process.cwd(), 'static/data/index.json');
	const jsonContent = readFileSync(jsonPath, 'utf-8');
	const indexData = JSON.parse(jsonContent);

	// シリーズ一覧用に軽量化（サムネイル付き）
	const lightSeries = indexData.series.map((s: any) => {
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
		tweetsByMonth: indexData.tweetsByMonth,
		series: lightSeries,
		totalTweets: indexData.totalTweets,
		totalSeries: indexData.totalSeries
	};
};
