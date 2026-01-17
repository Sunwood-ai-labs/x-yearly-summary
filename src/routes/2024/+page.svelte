<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let visible = $state(false);

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});
</script>

<svelte:head>
	<title>Project Archives 2024</title>
</svelte:head>

<Header type="year" year={2024} />

<nav>
	<a href="{base}/">← トップに戻る</a>
	<a href="#placeholder">Coming Soon</a>
</nav>

<section id="placeholder" class:visible={visible}>
	<div class="section-header">
		<div class="section-month">2024</div>
		<div class="section-desc">Content Coming Soon</div>
	</div>
	<div class="grid">
		<ProjectCard
			icon="📝"
			title="準備中"
			description="2024年のプロジェクトアーカイブは現在準備中です。<br>コンテンツは順次追加予定です。" />
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
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 40px;
		border-bottom: 1px solid #2b2b2b;
		padding-bottom: 10px;
	}

	.section-month {
		font-family: 'Orbitron', sans-serif;
		font-size: 2.5rem;
		color: #e0e0e0;
		margin-right: 20px;
		position: relative;
	}

	.section-month::after {
		content: '';
		display: block;
		width: 40px;
		height: 2px;
		background: #d4af37;
		margin-top: 5px;
	}

	.section-desc {
		color: #888;
		font-size: 0.9rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 30px;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
