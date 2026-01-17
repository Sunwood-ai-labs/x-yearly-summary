<script lang="ts">
	import TweetAccordion from './TweetAccordion.svelte';

	interface Link {
		url: string;
		label: string;
	}

	interface Tweet {
		url: string;
	}

	interface Props {
		icon: string;
		title: string;
		description: string;
		links?: Link[];
		tweets?: Tweet[];
		tweetCount?: number;
	}

	let { icon, title, description, links = [], tweets = [], tweetCount }: Props = $props();
</script>

<div class="card">
	<span class="card-icon">{icon}</span>
	<h3>{title}</h3>
	<p>{@html description}</p>

	{#if links.length > 0}
		<div class="links">
			{#each links as link}
				<a href={link.url} target="_blank" rel="noopener noreferrer" class="link-btn">
					{link.label}
				</a>
			{/each}
		</div>
	{/if}

	{#if tweets.length > 0}
		<TweetAccordion tweets={tweets} count={tweetCount} />
	{/if}
</div>

<style>
	.card {
		background: rgba(20, 20, 25, 0.6);
		border: 1px solid rgba(212, 175, 55, 0.3);
		backdrop-filter: blur(10px);
		padding: 25px;
		transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
		position: relative;
		overflow: hidden;
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #d4af37, transparent);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		border-color: #00f0ff;
	}

	.card:hover::before {
		transform: translateX(100%);
	}

	.card-icon {
		font-size: 1.5rem;
		margin-bottom: 15px;
		display: block;
	}

	.card h3 {
		font-size: 1.3rem;
		margin-bottom: 15px;
		color: #fff;
	}

	.card p {
		font-size: 0.95rem;
		color: #aaa;
		margin-bottom: 20px;
		line-height: 1.7;
	}

	.links {
		margin-bottom: 15px;
	}

	.link-btn {
		display: inline-flex;
		align-items: center;
		padding: 6px 12px;
		font-size: 0.8rem;
		background: rgba(255, 255, 255, 0.05);
		color: #00f0ff;
		text-decoration: none;
		border: 1px solid rgba(0, 240, 255, 0.3);
		margin-right: 5px;
		margin-bottom: 5px;
		transition: 0.3s;
	}

	.link-btn:hover {
		background: #00f0ff;
		color: #000;
	}
</style>
