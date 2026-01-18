<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let { data } = $props();

	let visibleSections = $state<Set<string>>(new Set());

	interface MonthlyLog {
		monthKey: string;
		monthName: string;
		tweetCount: number;
	}

	interface Series {
		title: string;
		slug: string;
		tweetCount: number;
		thumbnailUrl?: string;
		thumbnailType?: 'photo' | 'video';
		style?: string;
	}

	const tweetsByMonth: MonthlyLog[] = data.tweetsByMonth;
	const series: Series[] = data.series;
	const totalTweets = data.totalTweets;
	const totalSeries = data.totalSeries;

	// スタイルに応じた色
	const styleColors: Record<string, string> = {
		circle: '#00f0ff',
		solid_circle: '#d4af37',
		keycap: '#ff6b6b',
		standard: '#4ecdc4',
		vol: '#a8e6cf'
	};

	// ランダムな薄いグラデーションを生成（slugに基づいて決定論的）
	const gradients = [
		'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(78, 205, 196, 0.05))',
		'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(255, 107, 107, 0.05))',
		'linear-gradient(135deg, rgba(168, 230, 207, 0.08), rgba(0, 240, 255, 0.05))',
		'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(212, 175, 55, 0.05))',
		'linear-gradient(135deg, rgba(78, 205, 196, 0.08), rgba(168, 230, 207, 0.05))',
		'linear-gradient(135deg, rgba(147, 112, 219, 0.08), rgba(0, 240, 255, 0.05))',
		'linear-gradient(135deg, rgba(255, 154, 162, 0.08), rgba(250, 208, 196, 0.05))',
		'linear-gradient(135deg, rgba(116, 185, 255, 0.08), rgba(162, 155, 254, 0.05))'
	];

	function getGradient(slug: string): string {
		let hash = 0;
		for (let i = 0; i < slug.length; i++) {
			hash = ((hash << 5) - hash) + slug.charCodeAt(i);
			hash = hash & hash;
		}
		return gradients[Math.abs(hash) % gradients.length];
	}

	onMount(() => {
		// Intersection Observer for scroll animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;
						visibleSections = new Set([...visibleSections, sectionId]);
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('section').forEach((section) => {
			observer.observe(section);
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Project Archives 2025</title>
</svelte:head>

<Header type="year" year={2025} />

<nav>
	<a href="{base}/"><i class="fa-solid fa-arrow-left"></i> トップに戻る</a>
	<a href="#logs"><i class="fa-regular fa-calendar-days"></i> Monthly Logs</a>
	<a href="#series"><i class="fa-solid fa-layer-group"></i> Series</a>
</nav>

<section id="stats" class:visible={visibleSections.has('stats')}>
	<div class="stats-container">
		<div class="stat-card">
			<div class="stat-value">{totalTweets}</div>
			<div class="stat-label">Total Tweets</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{totalSeries}</div>
			<div class="stat-label">Series</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{tweetsByMonth.length}</div>
			<div class="stat-label">Months</div>
		</div>
	</div>
</section>

<section id="logs" class:visible={visibleSections.has('logs')}>
	<div class="section-header">
		<div class="section-title"><i class="fa-regular fa-calendar-days"></i> Monthly Logs</div>
		<div class="section-desc">Full chronological archive by month</div>
	</div>
	<div class="grid">
		{#each tweetsByMonth as log}
			<a href="{base}/2025/log/{log.monthKey}" class="log-card">
				<div class="log-card-header">
					<div class="log-month">{log.monthName}</div>
				</div>
				<div class="log-card-footer">
					<span class="log-count">{log.tweetCount}</span>
					<span class="log-label">tweets</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<section id="series" class:visible={visibleSections.has('series')}>
	<div class="section-header">
		<div class="section-title"><i class="fa-solid fa-layer-group"></i> Series Collection</div>
		<div class="section-desc">Curated threads and topic series</div>
	</div>
	<div class="insta-grid">
		{#each series as s}
			<a
				href="{base}/2025/series/{s.slug}"
				class="insta-tile"
				class:has-image={s.thumbnailUrl}
				style="--tile-gradient: {getGradient(s.slug)}">
				{#if s.thumbnailUrl}
					<img src={s.thumbnailUrl} alt={s.title} class="insta-image" loading="lazy" />
				{/if}
				<div class="insta-overlay">
					<div class="insta-title">{s.title}</div>
					<div class="insta-meta">
						<span class="insta-style" style:color={s.style ? styleColors[s.style] : undefined}>{s.style || ''}</span>
						<span class="insta-count">{s.tweetCount} tweets</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	nav {
		margin-top: 30px;
		margin-bottom: 60px;
		display: flex;
		justify-content: center;
		gap: 20px;
		flex-wrap: wrap;
	}

	nav a {
		color: #e0e0e0;
		text-decoration: none;
		font-family: 'Orbitron', sans-serif;
		font-size: 0.9rem;
		padding: 8px 16px;
		border: 1px solid rgba(0, 240, 255, 0.3);
		transition: all 0.3s ease;
	}

	nav a:hover {
		background: rgba(0, 240, 255, 0.1);
		color: #00f0ff;
		box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
	}

	section {
		margin-bottom: 100px;
	}

	/* Stats Section */
	.stats-container {
		display: flex;
		justify-content: center;
		gap: 40px;
		flex-wrap: wrap;
	}

	.stat-card {
		text-align: center;
		padding: 30px;
		background: rgba(0, 240, 255, 0.05);
		border: 1px solid rgba(0, 240, 255, 0.2);
		border-radius: 10px;
		min-width: 150px;
	}

	.stat-value {
		font-family: 'Orbitron', sans-serif;
		font-size: 3rem;
		color: #00f0ff;
		margin-bottom: 10px;
	}

	.stat-label {
		font-size: 0.9rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	/* Section Header */
	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 40px;
		border-bottom: 1px solid #2b2b2b;
		padding-bottom: 10px;
	}

	.section-title {
		font-family: 'Orbitron', sans-serif;
		font-size: 2.5rem;
		color: #e0e0e0;
		margin-right: 20px;
	}

	.section-desc {
		color: #888;
		font-size: 0.9rem;
	}

	/* Grid Layout */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
	}

	/* Log Card */
	.log-card {
		display: block;
		background: rgba(0, 240, 255, 0.05);
		border: 1px solid rgba(0, 240, 255, 0.2);
		border-radius: 10px;
		padding: 20px;
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
	}

	.log-card:hover {
		background: rgba(0, 240, 255, 0.1);
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 240, 255, 0.2);
	}

	.log-card-header {
		margin-bottom: 15px;
	}

	.log-month {
		font-family: 'Orbitron', sans-serif;
		font-size: 1.2rem;
		color: #e0e0e0;
	}

	.log-card-footer {
		display: flex;
		align-items: baseline;
		gap: 5px;
	}

	.log-count {
		font-family: 'Orbitron', sans-serif;
		font-size: 1.5rem;
		color: #00f0ff;
	}

	.log-label {
		font-size: 0.8rem;
		color: #888;
	}

	/* Instagram Grid */
	.insta-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 4px;
	}

	.insta-tile {
		position: relative;
		display: block;
		aspect-ratio: 1;
		text-decoration: none;
		color: inherit;
		background: #1a1a1a;
		overflow: hidden;
		transition: transform 0.3s ease;
	}

	.insta-tile:hover {
		transform: scale(1.02);
		z-index: 1;
	}

	.insta-tile:not(.has-image) {
		background: var(--tile-gradient);
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.insta-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.insta-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85));
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 16px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.insta-tile:not(.has-image) .insta-overlay {
		opacity: 1;
	}

	.insta-tile:hover .insta-overlay {
		opacity: 1;
	}

	.insta-title {
		font-family: 'Noto Serif JP', serif;
		font-size: 0.95rem;
		font-weight: 500;
		color: #fff;
		text-align: center;
		line-height: 1.4;
		margin-bottom: 10px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.insta-meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		font-size: 0.75rem;
	}

	.insta-style {
		font-family: 'Orbitron', sans-serif;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		background: rgba(255, 255, 255, 0.15);
		padding: 3px 8px;
		border-radius: 3px;
	}

	.insta-count {
		font-family: 'Orbitron', sans-serif;
		color: #888;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.stats-container {
			gap: 20px;
		}

		.stat-card {
			min-width: 100px;
		}

		.stat-value {
			font-size: 2rem;
		}
	}
</style>
