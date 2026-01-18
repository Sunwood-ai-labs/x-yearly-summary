import type { PageServerLoad } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = () => {
	// index.jsonから軽量なシリーズデータのみ読み込み
	const jsonPath = join(process.cwd(), 'static/data/index.json');
	const jsonContent = readFileSync(jsonPath, 'utf-8');
	const indexData = JSON.parse(jsonContent);

	// シリーズ一覧用に軽量化（title, slug, tweetCount, styleのみ）
	const series = indexData.series.map((s: any) => ({
		title: s.title,
		slug: s.slug,
		tweetCount: s.tweetCount,
		style: s.style
	}));

	return {
		series
	};
};
