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
	}

	const tweetsByMonth: MonthlyLog[] = data.tweetsByMonth;
	const series: Series[] = data.series;
	const totalTweets = data.totalTweets;
	const totalSeries = data.totalSeries;

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
	<div class="series-list">
		{#each series as s}
			<a href="{base}/2025/series/{s.slug}" class="series-card">
				<div class="series-title">{s.title}</div>
				<div class="series-count">{s.tweetCount} tweets</div>
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

	/* Series List */
	.series-list {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.series-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(212, 175, 55, 0.05);
		border: 1px solid rgba(212, 175, 55, 0.2);
		border-radius: 8px;
		padding: 15px 20px;
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
	}

	.series-card:hover {
		background: rgba(212, 175, 55, 0.1);
		transform: translateX(10px);
		box-shadow: 0 5px 20px rgba(212, 175, 55, 0.2);
	}

	.series-title {
		font-size: 1rem;
		color: #e0e0e0;
	}

	.series-count {
		font-family: 'Orbitron', sans-serif;
		font-size: 0.8rem;
		color: #d4af37;
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
