<script lang="ts">
	export type HeaderType = 'main' | 'year';
	export type YearType = 2024 | 2025;

	interface Props {
		type: HeaderType;
		year?: YearType;
	}

	let { type, year }: Props = $props();
</script>

<header>
	<div class="hero-title-group">
		<div class="author-info">
			<div class="author-name">Maki</div>
			<div class="author-lab">SUNWOOD AI LABS</div>
		</div>
		<h1 class="main-title">
			{#if type === 'main'}
				Project Archives
			{:else}
				{year}
			{/if}
		</h1>
	</div>
	{#if type === 'year'}
		<div class="subtitle">{year}</div>
	{/if}
</header>

<style>
	header {
		padding: 40px 0;
		text-align: center;
		border-bottom: 1px solid rgba(212, 175, 55, 0.3);
		margin-bottom: 60px;
		position: relative;
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-title-group {
		display: flex;
		align-items: center;
		gap: 40px;
		margin-bottom: 30px;
	}

	.author-info {
		text-align: left;
		border-right: 2px solid rgba(212, 175, 55, 0.3);
		padding-right: 40px;
	}

	.author-name {
		font-family: 'Noto Serif JP', serif;
		font-size: 1.8rem;
		color: #d4af37;
		margin-bottom: 10px;
		letter-spacing: 0.2rem;
	}

	.author-lab {
		font-family: 'Orbitron', sans-serif;
		font-size: 0.9rem;
		color: #00f0ff;
		letter-spacing: 0.15rem;
	}

	.main-title {
		font-size: 5.5rem;
		color: rgba(212, 175, 55, 0.3);
		text-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
		writing-mode: vertical-rl;
		text-orientation: upright;
		height: 380px;
		letter-spacing: 0.6rem;
		border-left: 1px solid rgba(212, 175, 55, 0.3);
		padding-left: 20px;
		font-family: 'Noto Serif JP', serif;
		font-weight: 700;
		margin: 0;
	}

	.subtitle {
		font-family: 'Orbitron', sans-serif;
		color: #00f0ff;
		font-size: 1.2rem;
		letter-spacing: 0.2rem;
		text-transform: uppercase;
		position: absolute;
		bottom: 20px;
		right: 20px;
	}

	@media (max-width: 768px) {
		header {
			min-height: auto;
		}

		.hero-title-group {
			flex-direction: column;
			gap: 20px;
		}

		.author-info {
			border-right: none;
			border-bottom: 2px solid rgba(212, 175, 55, 0.3);
			padding-right: 0;
			padding-bottom: 20px;
			text-align: center;
		}

		.main-title {
			font-size: 3.5rem;
			height: auto;
			writing-mode: horizontal-tb;
			border-left: none;
			border-bottom: 1px solid rgba(212, 175, 55, 0.3);
			padding-left: 0;
			padding-bottom: 10px;
		}

		.subtitle {
			position: static;
			margin-top: 20px;
		}
	}
</style>
