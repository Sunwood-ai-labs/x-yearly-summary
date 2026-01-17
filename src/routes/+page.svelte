<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { yearsData } from '$lib/data/yearsData';
	import { onMount } from 'svelte';
	import type { YearData } from '$lib/data/yearsData';
	import { base } from '$app/paths';

	let sortedYears = $state<YearData[]>([]);
	let visible = $state(false);

	onMount(() => {
		// 年を降順でソート（新しい年が上に来るように）
		sortedYears = [...yearsData].sort((a, b) => b.year - a.year);

		// フェードインアニメーション
		setTimeout(() => {
			visible = true;
		}, 100);
	});

	function getYearLink(link: string) {
		return `${base}${link}`;
	}
</script>

<Header type="main" />

<p class="intro">
	和風とサイバーパンクが融合した、プロジェクトアーカイブコレクション。<br />
	年別に整理された創作活動の軌跡をご覧ください。
</p>

<section class="years-section">
	<h2 class="section-title">年別アーカイブ</h2>
	<div class="year-grid" class:visible={visible}>
		{#each sortedYears as yearData (yearData.year)}
			<a class="year-card" href={getYearLink(yearData.link)}>
				<h3>{yearData.year}</h3>
				<p>{yearData.description}</p>
				<div class="stats">
					<div class="stat-item">
						<span class="stat-label">投稿数</span>
						<span class="stat-value">{yearData.stats.posts}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">いいね数</span>
						<span class="stat-value">{yearData.stats.likes}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">リポスト数</span>
						<span class="stat-value">{yearData.stats.retweets}</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.intro {
		text-align: center;
		font-size: 1.1rem;
		color: #aaa;
		max-width: 800px;
		margin: 0 auto 60px;
		line-height: 1.8;
	}

	.years-section {
		margin-bottom: 100px;
	}

	.section-title {
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 60px;
		color: #d4af37;
		position: relative;
		padding-bottom: 20px;
	}

	.section-title::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 3px;
		background: linear-gradient(90deg, transparent, #d4af37, transparent);
	}

	.year-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 40px;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	.year-grid.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.year-card {
		background: rgba(20, 20, 25, 0.6);
		border: 2px solid rgba(212, 175, 55, 0.3);
		backdrop-filter: blur(10px);
		padding: 40px;
		text-decoration: none;
		color: inherit;
		display: block;
		transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
		position: relative;
		overflow: hidden;
	}

	.year-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, transparent, #d4af37, transparent);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.year-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
		border-color: #00f0ff;
	}

	.year-card:hover::before {
		transform: translateX(100%);
	}

	.year-card h3 {
		font-size: 3rem;
		color: #d4af37;
		margin-bottom: 15px;
		font-family: 'Orbitron', sans-serif;
	}

	.year-card p {
		font-size: 1rem;
		color: #aaa;
		margin-bottom: 30px;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.stat-item {
		text-align: center;
		padding: 15px;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid #2b2b2b;
	}

	.stat-label {
		display: block;
		font-size: 0.8rem;
		color: #666;
		margin-bottom: 5px;
		font-family: 'Orbitron', sans-serif;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		color: #00f0ff;
		font-weight: 700;
	}

	@media (max-width: 768px) {
		.year-grid {
			grid-template-columns: 1fr;
		}

		.stats {
			grid-template-columns: 1fr;
		}
	}
</style>
