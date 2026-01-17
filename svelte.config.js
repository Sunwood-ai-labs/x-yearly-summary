import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// GitHub Pagesのサブディレクトリ対応
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/x-yearly-summary' : ''
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
