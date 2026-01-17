<script lang="ts">
	interface Tweet {
		url: string;
	}

	interface Props {
		tweets: Tweet[];
		count?: number;
	}

	let { tweets, count }: Props = $props();
	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<button
	class="tweet-accordion"
	onclick={toggle}
	aria-expanded={isOpen}
	aria-controls="tweet-list">
	<span>SHOW TWEETS ({count ?? tweets.length})</span>
	<span>{isOpen ? '▲' : '▼'}</span>
</button>

<div class="tweet-list" class:open={isOpen} id="tweet-list">
	{#each tweets as tweet}
		<a href={tweet.url} target="_blank" rel="noopener noreferrer" class="tweet-item">
			{tweet.url.replace('https://x.com/hAru_mAki_ch/status/', 'Status ')}
		</a>
	{/each}
</div>

<style>
	.tweet-accordion {
		width: 100%;
		text-align: left;
		background: transparent;
		border: 1px solid #2b2b2b;
		color: #d4af37;
		padding: 10px;
		cursor: pointer;
		font-family: 'Orbitron', sans-serif;
		font-size: 0.8rem;
		transition: all 0.3s;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tweet-accordion:hover {
		border-color: #d4af37;
		background: rgba(212, 175, 55, 0.05);
	}

	.tweet-list {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.5s ease-out;
		background: rgba(0, 0, 0, 0.3);
		border-left: 2px solid rgba(0, 240, 255, 0.3);
	}

	.tweet-list.open {
		max-height: 300px;
		overflow-y: auto;
	}

	.tweet-list::-webkit-scrollbar {
		width: 6px;
	}

	.tweet-list::-webkit-scrollbar-track {
		background: #000;
	}

	.tweet-list::-webkit-scrollbar-thumb {
		background: rgba(212, 175, 55, 0.3);
	}

	.tweet-item {
		display: block;
		padding: 8px 10px;
		font-size: 0.75rem;
		color: #888;
		text-decoration: none;
		border-bottom: 1px solid #1a1a1a;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tweet-item:hover {
		background: rgba(0, 240, 255, 0.1);
		color: #00f0ff;
	}
</style>
