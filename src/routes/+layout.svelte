<script lang="ts">
	import BackgroundCanvas from '$lib/components/BackgroundCanvas.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Project Archives</title>

	<!-- Google Fonts: Noto Serif JP (和風/雅), Orbitron (近未来/クール) -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;500;700&family=Orbitron:wght@400;700&family=Zen+Kaku+Gothic+New:wght@300;500&display=swap"
		rel="stylesheet" />

	<!-- Font Awesome -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
		integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer" />
</svelte:head>

{#if mounted}
	<BackgroundCanvas />
{/if}

<div class="container">
	<slot />
</div>

<Footer />

<style>
	:global(:root) {
		--bg-color: #050505;
		--card-bg: rgba(20, 20, 25, 0.6);
		--text-main: #e0e0e0;
		--accent-gold: #d4af37;
		--accent-cyan: #00f0ff;
		--accent-ink: #2b2b2b;
		--border-gold: rgba(212, 175, 55, 0.3);
		--border-cyan: rgba(0, 240, 255, 0.3);
		--font-serif: 'Noto Serif JP', serif;
		--font-sans: 'Zen Kaku Gothic New', sans-serif;
		--font-tech: 'Orbitron', sans-serif;
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background-color: var(--bg-color);
		color: var(--text-main);
		font-family: var(--font-sans);
		line-height: 1.6;
		overflow-x: hidden;
	}

	:global(h1),
	:global(h2),
	:global(h3) {
		font-family: var(--font-serif);
		font-weight: 700;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		position: relative;
		z-index: 1;
	}

	/* Smooth scroll */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
