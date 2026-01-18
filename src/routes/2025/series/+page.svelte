<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();

	// ページネーション設定
	const INCREMENT = 20;
	let visibleCount = $state(INCREMENT);

	const allSeries = data.series;
	const totalSeries = allSeries.length;
	const visibleSeries = () => allSeries.slice(0, visibleCount);
	const hasMore = () => visibleCount < totalSeries;
	const showingCount = () => Math.min(visibleCount, totalSeries);

	function loadMore() {
		visibleCount += INCREMENT;
		setTimeout(() => {
			window.scrollBy({ top: 100, behavior: 'smooth' });
		}, 100);
	}
</script>

<svelte:head>
	<title>Series Collection | 2025 Archive</title>
</svelte:head>

<div class="container">
	<header>
		<nav class="breadcrumbs">
			<a href="{base}/">Home</a>
			<i class="fa-solid fa-chevron-right separator"></i>
			<a href="{base}/2025">2025</a>
			<i class="fa-solid fa-chevron-right separator"></i>
			<span class="current">Series</span>
		</nav>

		<div class="hero-title-group">
			<h1 class="main-title"><i class="fa-solid fa-layer-group"></i> Series Collection</h1>
			<div class="subtitle">{showingCount()} / {totalSeries} curated series</div>
		</div>
	</header>

	<main>
		<div class="series-list">
			{#each visibleSeries() as s (s.slug)}
				<a href="{base}/2025/series/{s.slug}" class="series-card">
					<div class="series-info">
						<div class="series-title">{s.title}</div>
						<div class="series-meta">
							<span class="series-style">{s.style}</span>
							<span class="series-count">{s.tweetCount} tweets</span>
						</div>
					</div>
					<div class="series-arrow"><i class="fa-solid fa-chevron-right"></i></div>
				</a>
			{/each}
		</div>

		{#if hasMore()}
			<div class="load-more-container">
				<button
					class="load-more-btn"
					onclick={loadMore}>
					<i class="fa-solid fa-chevron-down"></i>
					<span>Load More ({showingCount()} / {totalSeries})</span>
					<i class="fa-solid fa-chevron-down"></i>
				</button>
			</div>
		{/if}
	</main>

	<footer>
		<div class="footer-links">
			<a href="https://x.com/hAru_mAki_ch" target="_blank" rel="noopener">X</a>
			<a href="{base}/2025">Back to 2025</a>
		</div>
		<div class="copyright">&copy; 2025 Maki@Sunwood AI Labs.</div>
	</footer>
</div>

<style>
	.container {
		min-height: 100vh;
		padding: 40px 20px 80px;
		max-width: 1000px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	/* Breadcrumbs */
	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
		margin-bottom: 30px;
		font-size: 0.9rem;
		font-family: 'Orbitron', sans-serif;
		padding: 12px 20px;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(212, 175, 55, 0.15);
		border-radius: 8px;
		backdrop-filter: blur(10px);
	}

	.breadcrumbs a {
		color: #00f0ff;
		text-decoration: none;
		transition: all 0.2s;
		padding: 2px 6px;
		border-radius: 4px;
	}

	.breadcrumbs a:hover {
		background: rgba(0, 240, 255, 0.1);
		text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
	}

	.breadcrumbs span {
		color: #888;
	}

	.breadcrumbs .separator {
		color: #888;
		font-size: 0.7rem;
	}

	.breadcrumbs .current {
		color: #d4af37;
		font-weight: 500;
	}

	/* Hero */
	.hero-title-group {
		text-align: center;
		margin-bottom: 60px;
		position: relative;
	}

	.hero-title-group::before {
		content: '';
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 3px;
		background: linear-gradient(90deg, transparent, #d4af37, transparent);
	}

	.main-title {
		font-family: 'Orbitron', sans-serif;
		font-size: 3rem;
		color: #e0e0e0;
		margin-bottom: 10px;
	}

	.subtitle {
		font-size: 1.1rem;
		color: #888;
		padding: 8px 20px;
		background: rgba(0, 240, 255, 0.05);
		border: 1px solid rgba(0, 240, 255, 0.15);
		border-radius: 20px;
		display: inline-block;
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

	.series-info {
		flex: 1;
	}

	.series-title {
		font-size: 1rem;
		color: #e0e0e0;
		margin-bottom: 5px;
	}

	.series-meta {
		display: flex;
		gap: 15px;
		font-size: 0.8rem;
		color: #888;
	}

	.series-style {
		font-family: 'Orbitron', sans-serif;
		padding: 2px 8px;
		background: rgba(212, 175, 55, 0.1);
		border-radius: 4px;
		text-transform: uppercase;
	}

	.series-count {
		color: #d4af37;
	}

	.series-arrow {
		font-size: 1.2rem;
		color: #d4af37;
	}

	/* Load More Button */
	.load-more-container {
		display: flex;
		justify-content: center;
		margin: 60px 0 40px;
	}

	.load-more-btn {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 32px;
		background: linear-gradient(145deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
		border: 2px solid rgba(212, 175, 55, 0.4);
		border-radius: 30px;
		color: #d4af37;
		font-family: 'Orbitron', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.1rem;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		backdrop-filter: blur(10px);
		box-shadow:
			0 4px 20px rgba(212, 175, 55, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
	}

	.load-more-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transition: left 0.5s ease;
	}

	.load-more-btn:hover {
		background: linear-gradient(145deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
		border-color: #d4af37;
		box-shadow:
			0 8px 30px rgba(212, 175, 55, 0.4),
			0 0 30px rgba(212, 175, 55, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	.load-more-btn:hover::before {
		left: 100%;
	}

	.load-more-btn:active {
		transform: translateY(0);
	}

	.load-more-btn i {
		font-size: 0.9rem;
		transition: transform 0.3s ease;
	}

	.load-more-btn:hover i:first-child {
		transform: translateY(-2px);
	}

	.load-more-btn:hover i:last-child {
		transform: translateY(2px);
	}

	/* Footer */
	.footer-links {
		display: flex;
		justify-content: center;
		gap: 30px;
		margin-bottom: 20px;
	}

	.footer-links a {
		color: #e0e0e0;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-links a:hover {
		color: #00f0ff;
	}

	.copyright {
		text-align: center;
		color: #888;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.main-title {
			font-size: 2rem;
		}
	}
</style>
