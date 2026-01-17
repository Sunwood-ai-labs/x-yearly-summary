export interface YearStats {
	posts: string;
	likes: string;
	retweets: string;
}

export interface YearData {
	year: number;
	description: string;
	stats: YearStats;
	link: string;
}

export const yearsData: YearData[] = [
	{
		year: 2024,
		description: '2024年のプロジェクトアーカイブ',
		stats: {
			posts: '準備中',
			likes: '準備中',
			retweets: '準備中'
		},
		link: '/2024'
	},
	{
		year: 2025,
		description: '2025年のプロジェクトアーカイブ',
		stats: {
			posts: '100+',
			likes: '準備中',
			retweets: '準備中'
		},
		link: '/2025'
	}
];
