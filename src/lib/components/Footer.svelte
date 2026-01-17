<script lang="ts">
	const footerLinks = [
		{ name: 'X (Twitter)', url: 'https://x.com/hAru_mAki_ch' },
		{ name: 'note', url: 'https://note.com/sunwood_ai_labs' },
		{ name: 'GitHub', url: 'https://github.com/Sunwood-ai-labs' },
		{ name: 'Zenn', url: 'https://zenn.dev/' },
		{ name: 'Qiita', url: 'https://qiita.com/' },
		{ name: 'Blog', url: 'https://hamaruki.com/' }
	];
</script>

<footer>
	<div class="footer-links">
		{#each footerLinks as link}
			<a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
		{/each}
	</div>
	<div class="copyright">
		&copy; 2024-2025 Project Archives. All Rights Reserved.
	</div>
</footer>

<style>
	footer {
		margin-top: 100px;
		padding: 50px 0;
		border-top: 1px solid rgba(212, 175, 55, 0.3);
		text-align: center;
		background: #000;
	}

	.footer-links {
		display: flex;
		justify-content: center;
		gap: 30px;
		margin-bottom: 20px;
		flex-wrap: wrap;
	}

	.footer-links a {
		color: #e0e0e0;
		text-decoration: none;
		font-family: 'Noto Serif JP', serif;
		font-size: 1.1rem;
		transition: color 0.3s;
	}

	.footer-links a:hover {
		color: #d4af37;
	}

	.copyright {
		color: #555;
		font-size: 0.8rem;
	}
</style>
