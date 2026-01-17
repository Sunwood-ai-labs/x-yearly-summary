export interface ProjectLink {
	url: string;
	label: string;
}

export interface ProjectTweet {
	url: string;
}

export interface ProjectData {
	sectionId: string;
	sectionTitle: string;
	sectionSubtitle: string;
	projects: Project[];
}

export interface Project {
	icon: string;
	title: string;
	description: string;
	links?: ProjectLink[];
	tweets?: ProjectTweet[];
	tweetCount?: number;
}

export const projects2025: ProjectData[] = [
	{
		sectionId: 'dec-late',
		sectionTitle: 'DEC',
		sectionSubtitle: 'Late',
		projects: [
			{
				icon: '🔐',
				title: 'セキュリティ学習',
				description:
					'WSLにKali Linuxインストール、Google Antigravity連携。Hack The Box課題クリア(Flag Command、SpookyPass)。',
				links: [{ url: 'https://note.com/sunwood_ai_labs/n/n4d60f68adbf2', label: '📄 記事を読む' }],
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2006349248879788475' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005977969127481766' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005975636293345790' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005973624914874674' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005702893601730659' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005663411909300641' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005657344773177450' }
				],
				tweetCount: 7
			},
			{
				icon: '🎍',
				title: '年賀状プロンプト集',
				description:
					'ステンドグラス、少年マンガ表紙風、大正浪漫、水墨画×金箔、HD-2D等14種以上のオリキャラ年賀状プロンプト。',
				links: [{ url: 'https://note.com/sunwood_ai_labs/n/n2bc46e31ac2f', label: '📄 記事を読む' }],
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2006349145494438047' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006349143476945369' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006348327684902936' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006344273919365598' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006344267242115240' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006343975477891313' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006343971858198809' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006343422500880597' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006343419178963188' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006342435941896488' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006342432225718510' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006339599233372548' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006339595894731226' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006339153957630108' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006339150375735697' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006338057415594450' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006338054081159373' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006337703521194437' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006337700018942194' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006337420267225118' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006337416131498308' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006337178985783338' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006337175076434033' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006333449905623373' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006333446814400992' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006333194434703833' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006333189292454292' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006332825520484719' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006332821514711202' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006332547228381342' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006332543675539892' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006332190859411757' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006332188015591609' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006330681815884121' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006330678464700847' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006314582709846474' }
				],
				tweetCount: 36
			},
			{
				icon: '🎬',
				title: '潮のしおりシリーズ',
				description: '小豆島動画生成コンテスト向けMV作品。パートごとに動画生成。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2006314070908313663' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006308989357924692' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006303339018068034' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006303040522117362' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006279875645284466' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006278958955000226' }
				],
				tweetCount: 6
			},
			{
				icon: '🎨',
				title: 'trellis-2 3Dアセット作成',
				description:
					'2D→3Dモデル生成、ローポリゴン化、UVマップ作成、テクスチャ生成。Blenderスクリプトで自動化。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2005566295753015433' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005309428476813330' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005308371176681505' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005305382617629074' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005297295848513684' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005297292354687349' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005297289036968370' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005292948255293723' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005281473591755159' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005281470064287866' }
				],
				tweetCount: 10
			},
			{
				icon: '🌐',
				title: 'Google Antigravity ZERO_GRAVITY',
				description: 'ルールとワークフロー一式を生成するワークスペース。ViduQ2+SUNO用コンペ向けワークスペース作成。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2006405500011983120' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005971243120689482' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006329106162700481' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006327200866578550' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006323753752658201' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2005876158936838202' }
				],
				tweetCount: 6
			},
			{
				icon: '🖼️',
				title: 'qwen-image-2512 テスト',
				description: '最強クラスOSS画像生成モデル。リアル画像、プロダクトフォト、日本語テキスト対応。',
				links: [{ url: 'https://note.com/sunwood_ai_labs/n/na929f66b918e', label: '📄 記事を読む' }],
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2006372294365724681' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006365625254642125' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006365621332967733' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006334354021290015' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2006334440495337939' }
				],
				tweetCount: 5
			}
		]
	},
	{
		sectionId: 'dec-early',
		sectionTitle: 'DEC',
		sectionSubtitle: 'Early',
		projects: [
			{
				icon: '🚀',
				title: 'Nano Banana Pro 3大リポジトリ解析',
				description: '有名プロンプト共有リポジトリの解析実験。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2000631622014800039' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000631619754107245' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000631617514254743' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000631613919768727' }
				],
				tweetCount: 4
			},
			{
				icon: '🎭',
				title: 'Playwright codegen スクリプト化',
				description:
					'ブラウザ操作をスクリプト化。Node.js/Python版テスト、Antigravityでエラー修正。E2Eテスト自動化。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2000442068175552695' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000442064916635695' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000440520154468570' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000436720937161022' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000436484084470228' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000431815258251438' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000431812750012558' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000431201480483092' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000431199240769837' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000421564374982911' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000419773457596750' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000419195641852298' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000415692844093619' }
				],
				tweetCount: 13
			},
			{
				icon: '📰',
				title: 'Nano Banana Pro 記事マガジン作成',
				description: 'キャラ弁、クラス弁当等のプロンプト作成・テスト。noteマガジン無料公開。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/2000588723503714618' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000587839352803499' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000586248097005916' },
					{ url: 'https://x.com/hAru_mAki_ch/status/2000504884534395341' }
				],
				tweetCount: 4
			}
		]
	},
	{
		sectionId: 'nov',
		sectionTitle: 'NOV',
		sectionSubtitle: '',
		projects: [
			{
				icon: '🤖',
				title: 'ニコニコ弾幕マルチエージェント',
				description:
					'動画や記事を解析してニコニコ動画風弾幕コメントをJSON形式で生成。複数ペルソナをシミュレート。Gemini 3.0対応。',
				links: [
					{
						url: 'https://gemini.google.com/gem/1TBJOXZjj8oVcY_gVsYHTL-2eIfECQCf4?usp=sharing',
						label: '💎 Gemini'
					}
				],
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1995538630304264448' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995538446241464536' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983104214512611615' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1982002495766298767' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1982001506397401314' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1981999309051568336' }
				],
				tweetCount: 6
			},
			{
				icon: '📚',
				title: 'Bookshelf アプリ開発',
				description:
					'Nano Banana Proで生成した漫画やインフォグラフィックを管理するOSSアプリ。v0.1.0→v0.3.0連続リリース。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1995206394384089527' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995066492052963534' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995066495605547479' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995060014541934693' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1994851902119711206' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1994851907681358308' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1994850512764899453' }
				],
				tweetCount: 7
			},
			{
				icon: '🖼️',
				title: 'Z-Image Turbo テキストレンダリング実験',
				description:
					'Alibabaの新画像生成AI。日本語/英語/フォント/配置等10種類の実験で精度検証。Google Colab付き記事化。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201294148260095' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201298338386193' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201302528422325' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201306399748603' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201310149517395' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201313957888323' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201317841916292' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201321499312563' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201325257404844' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201328940019913' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201332471554500' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201336275824877' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201340293935447' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201344005959923' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201348212822377' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995201351694090425' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995208776467804372' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995209377918398503' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995163467251429602' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995168145720713410' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151673464107115' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151677234815254' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151680594403654' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151683832467583' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151687116578948' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151690492952830' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151693944938653' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151697640136766' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995151700911603741' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995146453392765163' }
				],
				tweetCount: 31
			},
			{
				icon: '🎨',
				title: 'Nano Banana Pro 画像/動画生成',
				description: 'LINEスタンプ風、部屋設定、ほんわか図解プロンプト、9つのカメラショット等。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1994858166727971214' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995034356210122802' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995053724528730384' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995140880685203588' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995122300635811928' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1995122307258335521' }
				],
				tweetCount: 6
			},
			{
				icon: '🎥',
				title: 'Vidi2 紹介',
				description: 'ByteDanceの動画理解AI。テキストでシーン特定、自動編集機能。',
				tweets: [{ url: 'https://x.com/hAru_mAki_ch/status/1995212989461622900' }],
				tweetCount: 1
			}
		]
	},
	{
		sectionId: 'oct',
		sectionTitle: 'OCT',
		sectionSubtitle: '',
		projects: [
			{
				icon: '🎬',
				title: 'Sora2 キャラカメオ実験',
				description:
					'RPG風キャラクター、ぬいぐるみ、複数キャラクターの組み合わせをテスト。麻雀/世界旅行/カフェシーン等を作成。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1984258605953290358' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983896351814644063' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983896349793013892' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983896348094235022' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983896345506181597' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983893561700676092' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983885301341941912' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983885299366482185' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983885297051181306' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983883942190362797' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983883940055392745' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983882441480925274' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983882439832551481' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983882437932503405' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983837792825438704' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983821131267371459' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983821129669341495' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983821127324705111' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983797955791614199' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983717558600798716' }
				],
				tweetCount: 20
			},
			{
				icon: '🔬',
				title: 'Agent Lightning フレームワークテスト',
				description:
					'MicrosoftのAgent LightningをGoogle Colabで実行。RL/プロンプト最適化、AgentOpsでトレース可視化。',
				links: [
					{
						url: 'https://hamaruki.com/run-agent-lightning-examples-apo-on-colab-20251029/',
						label: '📄 記事を読む'
					}
				],
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1983586565826998624' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983586563603972400' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983577952731460049' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983573657843855519' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983526999189836113' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983526996744573098' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983520643774836955' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983512748492251342' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983507316885393892' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983507314645889437' }
				],
				tweetCount: 10
			},
			{
				icon: '🖼️',
				title: '粒子ホログラムプロンプト',
				description: 'Dragon Knight素材を使ったスペクトル粒子ホログラム画像生成プロンプトを開発。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1983893567920861664' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983893565425250358' }
				],
				tweetCount: 2
			},
			{
				icon: '📹',
				title: 'sora2 storyboard機能テスト',
				description: '日本語エラー対応、フォトリアル調整等を検証。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1983474479994216650' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983473863758655568' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983473626688127345' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983473359695568943' }
				],
				tweetCount: 4
			},
			{
				icon: '🔧',
				title: 'その他ツールテスト',
				description:
					'Codex利用量確認、Grok画像編集、Manus AIクレジット確認、モフモフぬいぐるみライティング実験。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1983902765811417217' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983730129563218072' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983724447774470166' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983505941459869891' }
				],
				tweetCount: 4
			},
			{
				icon: '🎭',
				title: 'Higgsfield Face Swap テスト',
				description: 'Higgsfieldの新機能Face SwapをテストしKlingで動画化。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1983881095553937430' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1983780787393851524' }
				],
				tweetCount: 2
			}
		]
	},
	{
		sectionId: 'sept',
		sectionTitle: 'SEPT',
		sectionSubtitle: '',
		projects: [
			{
				icon: '🎮',
				title: 'KIROハッカソン HARINA V3',
				description: 'LLMを使ったレシート認識アプリ。バッチ処理実装、デモ動画/解説動画作成(英語版含む)。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1967241723333255473' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967238396327432629' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967237648042668105' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967235555928035404' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967232015885123809' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967157089215926673' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967147232110801100' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967146413302931870' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967134687895367960' }
				],
				tweetCount: 9
			},
			{
				icon: '🎬',
				title: 'Vidu MCPサーバー・動画生成ワークフロー',
				description: 'ViduのMCPサーバー(Streamable Http)とAPIをPythonでテスト。RooCode×Grok Code Fast1で動画生成。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1967203335767011455' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967190391092125983' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967116068985729430' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967112472491630820' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967112263938306413' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967104695278899613' }
				],
				tweetCount: 6
			},
			{
				icon: '🎬',
				title: 'AI動画生成ツールテスト',
				description: 'Kling, Seedance-1-pro, Seedream V4でファッション誌風画像、ドット絵風動画、ファンタジーシーン等を作成。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1967576102702068205' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967572896181821638' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967273576098406582' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967252015152771375' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1966879206073397315' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1966878662025945566' }
				],
				tweetCount: 6
			},
			{
				icon: '🖼️',
				title: 'SRPO画像生成実験',
				description: 'TencentのSRPOモデルで妖怪テーマの画像生成(蛇女、河童、天狗)。Google Colab A100 80GBで実行。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1967142190402203717' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967141058363719746' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967136810125193682' }
				],
				tweetCount: 3
			},
			{
				icon: '🎤',
				title: 'プロフィール画像の動化・音声生成',
				description: 'プロフィール画像から動画と音声を生成。Nano Banana Proとの組み合わせ。',
				tweets: [
					{ url: 'https://x.com/hAru_mAki_ch/status/1967174992464171238' },
					{ url: 'https://x.com/hAru_mAki_ch/status/1967183532532658445' }
				],
				tweetCount: 2
			}
		]
	}
];
