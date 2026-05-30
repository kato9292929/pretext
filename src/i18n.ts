export type Lang = 'ja' | 'en'
type T = Record<string, string>

const JA: T = {
  // Nav
  'nav.usecases':  'ユースケース',
  'nav.market':    '市場論拠',
  'nav.vision':    '考察・調査',
  'nav.products':  'プロダクト',
  'nav.endpoints': 'エンドポイント',

  // Hero
  'hero.eyebrow': 'AIエージェントが自律的に選ぶAPIエコシステムと決済インフラの構築',

  // FEATURED
  'feat.title':         '注目エンドポイント',
  'feat.intro':         '最新のエンドポイントと、エージェントのウォレット連携を実現するCLIツール群です。',
  'feat.cli.title':     '▸ CLI / エージェントウォレット連携',
  'feat.x402ep.desc':   '6つのエンドポイントディレクトリ（x402scan・Agentic.Market・Pay.sh ほか）を横断集約する統合カタログ。Base・Solana・Polygon、x402・MPP・L402を1つの検索画面でまとめて探索できる。',
  'feat.x402ep.verify': '検証：分散したx402エンドポイント情報の統合カタログ化',
  'feat.osd.desc':      'Solanaの株式トークン（xStocks）とBackpack IPOのオンチェーンデータを提供。人間はHTML無料・エージェントはx402で有料JSON（$0.01/コール）。Jupiter・Raydium・Orca・Heliusを統合。',
  'feat.osd.verify':    '検証：株式トークンのオンチェーンデータ配信とAI投資メモのx402従量課金',
  'feat.visa.title':    'Visa CLI の使い方——カードを agent の wallet にして x402 / MPP endpoint を叩く',
  'feat.moonpay.title': 'MoonPay CLI の使い方——エージェントに wallet を持たせて MCP で叩く',
  'feat.circle.title':  'Circle Agent Stack の使い方——API を AI エージェント向けの有料 endpoint にする',

  // USE CASES
  'uc.title': 'ユースケース',
  'paradigm.old.badge':   '現在の主流',
  'paradigm.old.title':   '「人間の代わりに注文」',
  'paradigm.old.desc':    'クレカ × AIエージェント<br>EC・小売・代行購入',
  'paradigm.old.example': 'GAP × Gemini × Google Pay など',
  'paradigm.new.badge':   '新しいレイヤー',
  'paradigm.new.title':   '「自律的な購入」',
  'paradigm.new.desc':    'x402 × MCP × Agent Wallet<br>APIリソースの自律調達',
  'paradigm.new.example': 'AIが仕事に必要なリソースを自ら買う',
  'ab.title': 'AIエージェントがx402で買えるもの',
  'ab.cat1':    'データ・情報',
  'ab.cat1.l1': 'リアルタイム気象・地震・津波情報',
  'ab.cat1.l2': '不動産地価・取引データ（APAC5カ国）',
  'ab.cat1.l3': '法人KYC・AMLスクリーニング',
  'ab.cat1.l4': '為替・暗号資産価格・マクロ経済統計',
  'ab.cat1.l5': 'ニュース・マーケットブリーフィング',
  'ab.cat2':    'デジタルサービス',
  'ab.cat2.l1': 'ドメイン登録・空き確認',
  'ab.cat2.l2': 'SMS送信・メール検証',
  'ab.cat2.l3': 'IP情報・位置情報',
  'ab.cat2.l4': 'テキスト翻訳（日英中韓）',
  'ab.cat2.l5': 'Webスクリーンショット',
  'ab.cat3':    'コンピュート・推論',
  'ab.cat3.l1': 'LLM推論（トークン単位課金）',
  'ab.cat3.l2': 'GPUジョブ・ヘッドレスブラウザ',
  'ab.cat3.l3': '音声認識・画像処理',
  'ab.cat4':    'コンテンツ・レポート',
  'ab.cat4.l1': '有料記事・調査レポート',
  'ab.cat4.l2': '不動産リサーチレポート（AI生成）',
  'ab.cat4.l3': 'マーケットアナリシス',
  'ab.cat5':    'オンチェーンデータ',
  'ab.cat5.l1': 'DeFiイールドスコア・プロトコルリスク',
  'ab.cat5.l2': 'トレーディングシグナル・価格予測',
  'ab.cat5.l3': 'ウォレットレピュテーションスコア',
  'ab.note': '月額契約もAPIキーも不要。ウォレット残高があれば即アクセス。',

  // MARKET THESIS
  'mt.title':        'x402 成長性分析',
  'mt.phase.title':  'Human → AI から AI ↔ AI へ——3つのフェーズ',
  'tl.phase1':  'Phase 1',
  'tl.period1': 'Human → AI（現在〜2027年）',
  'tl.desc1':   '「人間が権限を委任し、エージェントが執行する」<br>限度額付きカード委任・プリロードウォレット・x402のAPIゲーティング。エージェントは人間の延長として動きます。<strong>x402はすでにここで機能しています。</strong>',
  'tl.phase2':  'Phase 2',
  'tl.period2': 'AI ↔ AI 企業間（2027〜2029年）',
  'tl.desc2':   '「エージェントが他のエージェントと条件交渉・決済まで自律完結（B2B）」<br>Google A2A・Stripe MPPがエージェント間の取引フレームワークを整備中。B2B意思決定者の53%が AI ↔ AI を許可すると回答済み。x402が決済レールとして採用されるシナリオが最も現実的です。',
  'tl.phase3':  'Phase 3',
  'tl.period3': 'AI ↔ AI 完全自律（2029年以降）',
  'tl.desc3':   '「エージェントが独立した経済主体として市場に参加する」<br>信頼スコアリング・規制フレームワーク・エージェントIDの整備が条件。技術基盤はすでに今のx402の上に立っています。',
  'soi.title':       'System of Intelligenceが消費するAPI',
  'soi.body':        'AIエージェントが営業担当者の代わりに毎朝「優先順位付きフィード」を生成する時代が来ます。そのフィードには外部データが必要です——業界ニュース・競合動向・規制情報・リアルタイムデータ。月額制では粒度が粗すぎます。System of Intelligenceは固有のデータをAPIレイヤーで消費します——エージェントが自律的に選び、その場で決済するAPIが求められます。',
  'soi.cond.label':  '「エージェントが毎回自律的に選ぶAPI」の条件',
  'soi.cond.1':      '固有のデータを持つ（汎用データはAIが再現できる）',
  'soi.cond.2':      'エージェント向けスキーマで提供される',
  'soi.cond.3':      '使われるほど蓄積されるトランザクションデータがある',
  'soi.cond.4':      '実行フローに接続されている（データ提供→アクション→フィードバック）',

  // VISION & RESEARCH
  'vr.title':    '考察・調査',
  'vr.v1.title': 'AIエージェントがアクセスできないデータを、公共財にする',
  'vr.v2.title': 'エージェンティックコマース元年の「現在地」：Human → AI 段階から AI ↔ AI への移行はいつ起きるか',
  'vr.v3.title': 'ステーブルコイン決済の62.9%はB2B——Stripeが企業間の決済インフラを再設計する2026年',
  'vr.r1.title': 'Claude for Financial Services時代の「エージェント決済」——クレカで十分か、それともステーブルコインが必要か',
  'vr.r2.title': 'Amex ACEの「インテントコントラクト」と「シングルユーストークン」——決済レイヤーに残る最後の空白',
  'vr.r3.title': 'AIエージェント × クレジットカード：MoonAgents Card・Oobit Agent Cards・Stripe Issuing for agentsを整理する',
  'vr.r4.title': 'AIエージェントがSubstackの有料記事を自律決済で読む時代——DripStackが示すx402の本命ユースケース',
  'vr.r5.title': 'a16zが22億ドルを投じる理由：クリプトが「革命」を捨て「実用主義」を選んだ5つの決定的理由',
  'vr.r6.title': 'Stripeが「AIの経済インフラ」を本気で作り始めた——Stripe Sessions 2026、288の発表を読み解く',
  'vr.r7.title': 'ヘッドレスマーチャント普及後の未来図——エージェント決済はクレカで足りるのかx402 が要るのか',
  'vr.r8.title': 'エージェント決済スタックの MCP / Wallet / CLI を比較する——Solana / Circle / MoonPay / OKX / Coinbase / Base',
  'vr.r9.title': '企業 AI 決済とは何か——承認付きの「サブスク払いのオンチェーン化」として実装する',
  'vr.r10.title': 'エージェント決済の未来予想図——2026 年から 2029 年への 4 つの移行',
  'vr.r11.title': '需要は H→A、供給は A↔A——エージェント経済への先行投資をどう読むか',
  'vr.r12.title': '企業 AI が「自律決済」に到達するのはいつか——プラグイン経由クレカという現実と、x402 自律決済までの距離',
  'vr.r13.title': 'AI エージェントが稼いで使うバックエンド——5 月の業界進捗を踏まえて',
  'vr.r14.title': 'AI エージェントに商品を売らせるためのバックエンド——決済 4 層構造とエコシステム接続',
  'vr.r15.title': 'エージェンティックコマースのフェーズ論を更新する——Dan Shipper の 6 つの予測と、5 月の業界進捗',

  // PRODUCTS
  'prod.title':  'x402 Inc. が作ったもの',
  'prod.intro1': 'x402 Inc.のプロダクトはすべて、実装しながら市場を検証するためにあります。今 Human → AI で動くインフラが、やがて AI ↔ AI の決済層に転用される——その連続性を証明するために、プロダクトを動かし続けています。',
  'prod.intro2': 'Phase 1（データインフラ）→ Phase 2（エコシステム）→ Phase 3（プライバシー・決済出口）の3フェーズで設計されています。',
  'phase1.title': 'データインフラ層',
  'phase2.title': 'エコシステム層',
  'phase3.title': 'プライバシー・決済出口',

  'prod.japan-apis.desc':      '日本のデータAPIにAIエージェント向け自律決済を実装。18本のエンドポイント（気象・地震・不動産・法人・人口統計等）をx402対応で提供。',
  'prod.japan-apis.verify':    '検証：公共データAPIのx402ゲート化と従量課金モデルの成立',
  'prod.oracle.desc':          'APACの不動産地価データをChainlink・Pyth互換のprice feed形式でオンチェーンに提供。日本・シンガポール・香港・オーストラリア・韓国の5カ国対応。',
  'prod.oracle.verify':        '検証：オフチェーンデータのオンチェーン価格フィード化とx402課金の両立',
  'prod.kyc.desc':             'APAC5カ国の公的法人データベースを横断するx402対応KYC API。AMLスクリーニング・制裁リスト照合付き。$1〜$3/call。',
  'prod.kyc.verify':           '検証：高単価・低頻度APIにおけるx402の経済合理性',
  'prod.jmbot.desc':           'エージェントがエージェントに情報を売る—— AI ↔ AI 経済の最初のデモ。Japan Data APIを毎時自動取得してブリーフを生成・x402で販売。',
  'prod.jmbot.verify':         '検証：AI ↔ AI 取引の最小プロトタイプ（エージェントがエージェントに売る）',
  'prod.jrea.desc':            '複数APIを束ねてリサーチレポートを生成・販売するエージェント。x402エコシステムの「統合層」として機能。',
  'prod.jrea.verify':          '検証：複数APIを束ねた高付加価値レポートの自律生成・販売フロー',
  'prod.directory.desc':       'AIには課金されるx402エコシステム日本語解説サイト。人間は無料・AIエージェントはBase上のUSDCで自動課金。',
  'prod.directory.verify':     '検証：人間→無料・AIエージェント→自動課金という二層モデル',
  'prod.loop.desc':            '自分のプロダクト群を互いに叩き合わせるCronジョブ。x402エコシステム内でtxを循環させる設計。',
  'prod.loop.verify':          '検証：自エコシステム内でのtx循環と実装正当性の継続証明',
  'prod.apac-digital.desc':    '月額SaaSをリクエスト単位に分解するx402の実験。ドメイン確認・SMS・翻訳・メール検証を従量課金で提供。',
  'prod.apac-digital.verify':  '検証：月額SaaSをリクエスト単位に分解するunbundlingモデル',
  'prod.gateway.desc':         'Arcium MPCを使ったx402の決済検証プライバシーレイヤー。ウォレット・金額・エンドポイントを秘匿化。Colosseum Frontier提出済み。',
  'prod.gateway.verify':       '検証：決済プライバシーレイヤーの技術的実現可能性',
  'prod.cryptocard.desc':      'AIエージェントがUSDCを稼いでVisaカードで使うデモ。Solana → Nevermined Agent Card → Visa（150M+加盟店）のループ。',
  'prod.cryptocard.verify':    '検証：x402で稼いだUSDCの法定通貨決済への出口経路',

  // WHY WE BUILD
  'why.title':      'なぜ今、これを作るのか',
  'why.p1':         '2026年現在、エージェンティックコマースの実態は「Human → AI」の段階にあります。エージェントは人間の代理として動きますが、権限・予算・承認の出発点はまだ人間です。限度額付きクレカをエージェントに渡す——これが現在地です。',
  'why.p2':         'しかしインフラは次の段階を準備しています。MCP（Anthropic）がCapability Discoveryを担い、A2A（Google）がエージェント間コミュニケーションを担い、x402が決済を担います。これらは競合ではなく役割分担です——異なるレイヤーが、エージェント同士が自律取引する AI ↔ AI（Agent-to-Agent）の世界を組み上げています。',
  'why.p3':         'AI ↔ AI が実現するとき、決済媒体はプログラマブルでなければなりません。カードネットワークには「人間のカードホルダー」という前提が刻み込まれています。銀行振込には営業時間があります。x402プロトコルが解決しようとしているのは、まさに「1回のAPIコールに0.001ドル」という粒度の課金です。',
  'why.conclusion': '今 Human → AI で動くインフラが、やがて AI ↔ AI の支払い層に転用される——x402 Inc.は、AIエージェントが自律的に選ぶAPIエコシステムと決済インフラの構築を推進していきます。',

  // ENDPOINTS
  'ep.title':         'エンドポイント一覧',
  'ep.intro':         'カテゴリ別に整理された x402 Inc. のプロダクト群です。NansenデータをClaudeで解析するデータレイヤー、Trading系、Asset Management系の3カテゴリで提供しています。',
  'ep.cat.nansen':    '▸ Nansen × Claude',
  'ep.cat.trading':   '▸ Trading',
  'ep.cat.assetmgmt': '▸ Asset Management',
  // Nansen × Claude
  'ep.smss.desc':   'Nansenのスマートマネーデータをx402でゲート。STRONG BUYシグナルを検知してエージェントに返す。Base・Polygon・Solana対応。',
  'ep.smss.verify': '検証：スマートマネーシグナルのx402従量課金モデル',
  'ep.oif.desc':    'NansenのオンチェーンデータをClaudeが日本語で解析。APACの取引所フロー・クジラ動向・週次レポートを従量課金で配信。',
  'ep.oif.verify':  '検証：AIによるオンチェーンデータ解析と日本語インテリジェンス配信',
  'ep.wid.desc':    '$100K以上の大口移動を検知し、ウォレットの過去90日の行動履歴からClaudeが意図を5分類。「移動の事実」ではなく「移動の意図」を返す。',
  'ep.wid.verify':  '検証：大口ウォレット行動のAI推論とx402課金モデル',
  'ep.amp.desc':    'Nansen×Claudeが生成したオンチェーンリサーチレポートを購入・転売できる市場。転売時に80%が転売者の収益に、20%がプロトコルへ還元。',
  'ep.amp.verify':  '検証：AIが生成したレポートの転売市場とx402収益分配',
  'ep.smct.desc':   'スマートマネーのシグナル検知からCoinbase AgentKitによる自動執行まで一体化。Screenerが「見る」ツールなら、これは「動く」ツール。',
  'ep.smct.verify': '検証：シグナル検知から執行までの自律トレーディングフロー',
  'ep.aca.desc':    'World AgentKit × x402でAPAC5カ国のKYB・AMLスクリーニングを実装。執行前のコンプライアンス確認をエージェントが自律実行。',
  'ep.aca.verify':  '検証：エージェントによる自律KYB・AMLスクリーニング',
  // Trading
  'ep.npda.desc':   'Nansenのスマートマネーデータ×Polymarketの予測市場データを統合分析。「オンチェーンとオフチェーンの予測が乖離しているトークン」を検出。',
  'ep.npda.verify': '検証：オンチェーン×予測市場の乖離検出とAI統合分析',
  'ep.hl.desc':     'HyperliquidのPerpDEXスマートマネーポジション×Polymarket予測市場の乖離を検出。Base・Solana対応。',
  'ep.hl.verify':   '検証：PerpDEX×予測市場の乖離検出',
  'ep.pmi.desc':    '未上場企業のバリュエーション予測市場をリアルタイムで追跡。Base・Solana対応。',
  'ep.pmi.verify':  '検証：未上場企業バリュエーションのリアルタイム追跡',
  'ep.tvb.desc':    'TradingViewのPine Scriptアラートをx402スタックに流すブリッジ。Base・Solana対応。',
  'ep.tvb.verify':  '検証：TradingViewシグナルのx402スタック統合',
  // Asset Management
  'ep.pi.desc':     'ウォレットのポートフォリオをHelius・Alchemy・Nansenデータで自動分析・リバランス提案。Base・Solana・Polygon・BNB対応。',
  'ep.pi.verify':   '検証：マルチチェーンポートフォリオ分析とリバランス提案',
  'ep.yi.desc':     'Solana DeFi（Kamino・Drift・Jupiter Lend）×Nansenスマートマネーのプール分析。Base・Solana・Polygon・BNB対応。',
  'ep.yi.verify':   '検証：DeFiプール×スマートマネー分析',
  'ep.amd.desc':    'Japan Data・e-Stat・Polymarket・Nansen・x402 Oracleを統合したAPACマクロ環境ダッシュボード。日銀政策金利・USD/JPY・APAC不動産・コアCPIを4パネルで構造化。',
  'ep.amd.verify':  '検証：APACマクロ指標のリアルタイム統合分析',
  'ep.jrey.desc':   '日本不動産の利回り・空室・将来予測を国土交通省・e-Stat統合で提供。Base・Solana・Polygon・BNB対応。',
  'ep.jrey.verify': '検証：日本不動産利回りデータのx402従量課金配信',
  // Autonomous Agent
  'ep.aa.desc':     '19本のAPIを横断して毎朝6時JSTに自動起動する自律エージェント。x402で自律決済しながらシグナル検知・分析・執行を実行。AI ↔ AI ループの実証。',
  'ep.aa.verify':   '検証：供給側（API）と需要側（エージェント）を自前で持つ AI ↔ AI ループ',

  // TOP SELLERS
  'ts.title':       'Top Sellers 分析',
  'ts.sub':         '過去30日間の収益・コール数ランキング（x402scanデータ）',
  'ts.th.product':  'プロダクト',
  'ts.th.category': 'カテゴリ',
  'ts.th.revenue':  '30日収益',
  'ts.th.calls':    '30日コール数',
  'ts.th.price':    '平均単価',
  'ts.cta':         'エコシステム全体を見る → x402 Directory',

  // CONTACT
  'ct.title': 'Human → AI から AI ↔ AI へ——<br>この移行とともに、新しいビジネス機会を一緒に探求しませんか',

  // FOOTER
  'ft.nav.usecases':       'ユースケース',
  'ft.nav.market':         '市場論拠',
  'ft.nav.vision':         '考察・調査',
  'ft.nav.products':       'プロダクト',
  'ft.nav.endpoints':      'エンドポイント',
  'ft.company.name.dt':    '社名',
  'ft.company.ceo.dt':     '代表取締役',
  'ft.company.address.dt': '所在地',
  'ft.company.founded.dt': '設立',
  'ft.copyright':          '© 2025 x402株式会社 (x402 Inc.). All rights reserved.',
}

const EN: T = {
  // Nav
  'nav.usecases':  'Use Cases',
  'nav.market':    'Market Thesis',
  'nav.vision':    'Vision & Research',
  'nav.products':  'Products',
  'nav.endpoints': 'Endpoints',

  // Hero
  'hero.eyebrow': 'Building the API Ecosystem and Payment Infrastructure Autonomously Selected by AI Agents',

  // FEATURED
  'feat.title':         'Featured Endpoints',
  'feat.intro':         'Our latest endpoints, plus the CLI tools that connect agents to wallets.',
  'feat.cli.title':     '▸ CLI / Agent Wallet Integration',
  'feat.x402ep.desc':   'A unified catalog aggregating six endpoint directories (x402scan, Agentic.Market, Pay.sh, and more). Browse endpoints across Base, Solana, and Polygon — and the x402, MPP, and L402 protocols — from a single search.',
  'feat.x402ep.verify': 'Proof of concept: a unified catalog for fragmented x402 endpoint listings',
  'feat.osd.desc':      'Onchain data for Solana stock tokens (xStocks) and Backpack IPOs. Free HTML for humans, paid JSON for agents via x402 ($0.01/call). Aggregates Jupiter, Raydium, Orca, and Helius.',
  'feat.osd.verify':    'Proof of concept: onchain stock token data delivery and x402 pay-per-use AI investment memos',
  'feat.visa.title':    'How to Use the Visa CLI — Turn a Card into an Agent\'s Wallet to Call x402 / MPP Endpoints',
  'feat.moonpay.title': 'How to Use the MoonPay CLI — Give an Agent a Wallet and Call It via MCP',
  'feat.circle.title':  'How to Use the Circle Agent Stack — Turn APIs into Paid Endpoints for AI Agents',

  // USE CASES
  'uc.title': 'Use Cases',
  'paradigm.old.badge':   'Current Mainstream',
  'paradigm.old.title':   '"Order on Behalf of Humans"',
  'paradigm.old.desc':    'Credit card × AI agent<br>E-commerce, retail, proxy purchasing',
  'paradigm.old.example': 'e.g. GAP × Gemini × Google Pay',
  'paradigm.new.badge':   'New Layer',
  'paradigm.new.title':   '"Autonomous Purchasing"',
  'paradigm.new.desc':    'x402 × MCP × Agent Wallet<br>Autonomous API resource procurement',
  'paradigm.new.example': 'AI buys what it needs to do its job',
  'ab.title': 'What AI Agents Can Buy with x402',
  'ab.cat1':    'Data & Information',
  'ab.cat1.l1': 'Real-time weather, earthquake & tsunami data',
  'ab.cat1.l2': 'Real estate & land price data (5 APAC countries)',
  'ab.cat1.l3': 'Corporate KYC & AML screening',
  'ab.cat1.l4': 'FX, crypto prices & macro economic data',
  'ab.cat1.l5': 'News & market briefings',
  'ab.cat2':    'Digital Services',
  'ab.cat2.l1': 'Domain registration & availability checks',
  'ab.cat2.l2': 'SMS delivery & email verification',
  'ab.cat2.l3': 'IP & geolocation data',
  'ab.cat2.l4': 'Text translation (JA/EN/ZH/KO)',
  'ab.cat2.l5': 'Web screenshots',
  'ab.cat3':    'Compute & Inference',
  'ab.cat3.l1': 'LLM inference (per-token billing)',
  'ab.cat3.l2': 'GPU jobs & headless browsers',
  'ab.cat3.l3': 'Speech recognition & image processing',
  'ab.cat4':    'Content & Reports',
  'ab.cat4.l1': 'Paywalled articles & research reports',
  'ab.cat4.l2': 'Real estate research reports (AI-generated)',
  'ab.cat4.l3': 'Market analysis',
  'ab.cat5':    'On-chain Data',
  'ab.cat5.l1': 'DeFi yield scores & protocol risk',
  'ab.cat5.l2': 'Trading signals & price forecasts',
  'ab.cat5.l3': 'Wallet reputation scores',
  'ab.note': 'No subscriptions. No API keys. Wallet balance = instant access.',

  // MARKET THESIS
  'mt.title':        'x402 Growth Analysis',
  'mt.phase.title':  'From Human → AI to AI ↔ AI — Three Phases',
  'tl.phase1':  'Phase 1',
  'tl.period1': 'Human → AI (Present–2027)',
  'tl.desc1':   '"Humans delegate authority; agents execute."<br>Capped card delegation, preloaded wallets, x402 API gating. Agents operate as an extension of humans. <strong>x402 already works here.</strong>',
  'tl.phase2':  'Phase 2',
  'tl.period2': 'AI ↔ AI Enterprise (2027–2029)',
  'tl.desc2':   '"Agents autonomously negotiate terms and settle with other agents (B2B)."<br>Google A2A and Stripe MPP are building agent-to-agent transaction frameworks. 53% of B2B decision-makers say they would authorize AI ↔ AI. x402 as the payment rail is the most realistic scenario.',
  'tl.phase3':  'Phase 3',
  'tl.period3': 'AI ↔ AI Full Autonomy (2029+)',
  'tl.desc3':   '"Agents participate in markets as independent economic actors."<br>Requires trust scoring, regulatory frameworks, and agent identity infrastructure. The technical foundation already rests on today\'s x402.',
  'soi.title':       'APIs Consumed by the System of Intelligence',
  'soi.body':        'A world is coming where AI agents generate a "prioritized feed" every morning in place of salespeople. That feed needs external data — industry news, competitive intelligence, regulatory updates, real-time signals. Monthly subscriptions are too coarse. Systems of Intelligence consume proprietary data at the API layer — APIs that agents autonomously select and pay for on the spot.',
  'soi.cond.label':  'Conditions for "APIs agents choose autonomously every time"',
  'soi.cond.1':      'Holds proprietary data (generic data can be reproduced by AI)',
  'soi.cond.2':      'Delivered with agent-ready schemas',
  'soi.cond.3':      'Accumulates transaction data the more it is used',
  'soi.cond.4':      'Connected to execution flows (data → action → feedback)',

  // VISION & RESEARCH
  'vr.title':    'Vision & Research',
  'vr.v1.title': 'Making Data Inaccessible to AI Agents a Public Good',
  'vr.v2.title': 'Where Agentic Commerce Stands Today: When Does the Shift from Human → AI to AI ↔ AI Happen?',
  'vr.v3.title': '62.9% of Stablecoin Payments Are B2B — Stripe\'s 2026 Redesign of Enterprise Payment Infrastructure',
  'vr.r1.title': 'Agent Payments in the Claude for Financial Services Era — Are Credit Cards Enough, or Do We Need Stablecoins?',
  'vr.r2.title': 'Amex ACE\'s "Intent Contracts" and "Single-Use Tokens" — The Final Gap in the Payment Layer',
  'vr.r3.title': 'AI Agents × Credit Cards: Mapping MoonAgents Card, Oobit Agent Cards, and Stripe Issuing for Agents',
  'vr.r4.title': 'When AI Agents Autonomously Pay to Read Substack Articles — The Killer x402 Use Case DripStack Reveals',
  'vr.r5.title': 'Why a16z Is Betting $2.2B: 5 Decisive Reasons Crypto Chose Pragmatism Over Revolution',
  'vr.r6.title': 'Stripe Is Seriously Building "AI\'s Economic Infrastructure" — Decoding 288 Announcements from Stripe Sessions 2026',
  'vr.r7.title': 'The Future After Headless Merchants Go Mainstream — Are Credit Cards Enough for Agent Payments, or Is x402 Needed?',
  'vr.r8.title': 'Comparing MCP / Wallet / CLI Across the Agent Payment Stack — Solana / Circle / MoonPay / OKX / Coinbase / Base',
  'vr.r9.title': 'What Is Enterprise AI Payment? — Implementing It as Approval-Gated "On-chain Subscription Billing"',
  'vr.r10.title': 'A Forecast for Agent Payments — Four Transitions from 2026 to 2029',
  'vr.r11.title': 'Demand Is H→A, Supply Is A↔A — How to Read Early Investment in the Agent Economy',
  'vr.r12.title': 'When Will Enterprise AI Reach "Autonomous Payment"? — Plugin-Routed Credit Cards Today and the Distance to x402 Autonomous Payment',
  'vr.r13.title': 'The Backend Where AI Agents Earn and Spend — In Light of May\'s Industry Progress',
  'vr.r14.title': 'The Backend for Letting AI Agents Sell Products — A Four-Layer Payment Structure and Ecosystem Connectivity',
  'vr.r15.title': 'Updating the Phase Theory of Agentic Commerce — Dan Shipper\'s Six Predictions and May\'s Industry Progress',

  // PRODUCTS
  'prod.title':  'What x402 Inc. Has Built',
  'prod.intro1': 'Every product at x402 Inc. exists to validate the market while building. We keep products running to prove that the infrastructure working for Human → AI today will eventually convert into the payment layer for AI ↔ AI.',
  'prod.intro2': 'Designed across three phases: Phase 1 (Data Infrastructure) → Phase 2 (Ecosystem) → Phase 3 (Privacy & Payment Exit).',
  'phase1.title': 'Data Infrastructure Layer',
  'phase2.title': 'Ecosystem Layer',
  'phase3.title': 'Privacy & Payment Exit',

  'prod.japan-apis.desc':      'Autonomous payment for AI agents across Japan\'s data APIs. 18 endpoints — weather, earthquake, real estate, corporate data, demographics — all x402-gated.',
  'prod.japan-apis.verify':    'Proof of concept: x402 gating of public data APIs and viability of pay-per-use model',
  'prod.oracle.desc':          'APAC real estate land price data delivered onchain in Chainlink/Pyth-compatible price feed format. Covers Japan, Singapore, Hong Kong, Australia, and South Korea.',
  'prod.oracle.verify':        'Proof of concept: combining offchain data → onchain price feeds with x402 billing',
  'prod.kyc.desc':             'x402-enabled KYC API spanning public corporate databases across 5 APAC countries. Includes AML screening and sanctions list matching. $1–$3/call.',
  'prod.kyc.verify':           'Proof of concept: economic viability of x402 for high-value, low-frequency API calls',
  'prod.jmbot.desc':           'An agent selling information to agents — the first AI ↔ AI economy demo. Hourly auto-pulls from Japan Data API, generates briefs, sells via x402.',
  'prod.jmbot.verify':         'Proof of concept: minimal AI ↔ AI transaction prototype (agent sells to agent)',
  'prod.jrea.desc':            'An agent that bundles multiple APIs to generate and sell research reports. Functions as the "integration layer" of the x402 ecosystem.',
  'prod.jrea.verify':          'Proof of concept: autonomous generation and sale of high-value reports from bundled APIs',
  'prod.directory.desc':       'Japanese-language guide to the x402 ecosystem — free for humans, auto-billed in USDC on Base for AI agents.',
  'prod.directory.verify':     'Proof of concept: two-tier model — free for humans, auto-billed for AI agents',
  'prod.loop.desc':            'A cron job that has all products call each other. Designed to circulate transactions within the x402 ecosystem.',
  'prod.loop.verify':          'Proof of concept: transaction circulation within the self-ecosystem and continuous proof of implementation',
  'prod.apac-digital.desc':    'An x402 experiment unbundling monthly SaaS into per-request units. Domain checks, SMS, translation, and email verification on pay-per-use.',
  'prod.apac-digital.verify':  'Proof of concept: unbundling monthly SaaS into per-request billing',
  'prod.gateway.desc':         'A payment verification privacy layer for x402 using Arcium MPC. Hides wallet address, amount, and endpoint. Submitted to Colosseum Frontier.',
  'prod.gateway.verify':       'Proof of concept: technical feasibility of a payment privacy layer',
  'prod.cryptocard.desc':      'A demo of AI agents earning USDC and spending it via a Visa card. Solana → Nevermined Agent Card → Visa (150M+ merchants).',
  'prod.cryptocard.verify':    'Proof of concept: exit route from x402-earned USDC to fiat currency payments',

  // WHY WE BUILD
  'why.title':      'Why We Build This Now',
  'why.p1':         'As of 2026, agentic commerce is still in the "Human → AI" phase. Agents act as human proxies, but the origin of authority, budget, and approval remains human. Handing a capped credit card to an agent — that is the current state.',
  'why.p2':         'But infrastructure is preparing for the next phase. MCP (Anthropic) handles Capability Discovery, A2A (Google) handles agent-to-agent communication, and x402 handles payments. These are not competing — they are a division of roles. Different layers assembling the AI ↔ AI (Agent-to-Agent) world where agents trade autonomously.',
  'why.p3':         'When AI ↔ AI arrives, the payment medium must be programmable. Card networks are hardwired with the assumption of a human cardholder. Bank transfers have business hours. The x402 protocol addresses exactly this: billing at the granularity of "$0.001 per API call."',
  'why.conclusion': 'The infrastructure running on Human → AI today will eventually convert into the AI ↔ AI payment layer — x402 Inc. is advancing the construction of the API ecosystem and payment infrastructure autonomously chosen by AI agents.',

  // ENDPOINTS
  'ep.title':         'Endpoints',
  'ep.intro':         'x402 Inc. products organized by category — a Nansen × Claude data layer, Trading, and Asset Management.',
  'ep.cat.nansen':    '▸ Nansen × Claude',
  'ep.cat.trading':   '▸ Trading',
  'ep.cat.assetmgmt': '▸ Asset Management',
  // Nansen × Claude
  'ep.smss.desc':   'Nansen smart money data gated by x402. Detects STRONG BUY signals and returns them to agents. Supports Base, Polygon, and Solana.',
  'ep.smss.verify': 'Proof of concept: x402 pay-per-query model for smart money signals',
  'ep.oif.desc':    'Claude analyzes Nansen onchain data and delivers it in Japanese. APAC exchange flows, whale activity, and weekly reports on a pay-per-use basis.',
  'ep.oif.verify':  'Proof of concept: AI-driven onchain data analysis and Japanese-language intelligence delivery',
  'ep.wid.desc':    'Detects transfers over $100K and uses Claude to classify wallet intent into 5 categories based on 90-day behavior history. Returns "why the move" not just "the move".',
  'ep.wid.verify':  'Proof of concept: AI reasoning for large wallet behavior and x402 billing model',
  'ep.amp.desc':    'A market for purchasing and reselling onchain research reports generated by Nansen × Claude. On resale, 80% goes to the reseller and 20% to the protocol.',
  'ep.amp.verify':  'Proof of concept: resale market for AI-generated reports with x402 revenue sharing',
  'ep.smct.desc':   'Integrates smart money signal detection through autonomous execution via Coinbase AgentKit. If the Screener "watches", this one "acts".',
  'ep.smct.verify': 'Proof of concept: autonomous trading flow from signal detection to execution',
  'ep.aca.desc':    'KYB & AML screening across 5 APAC countries implemented with World AgentKit × x402. Agents autonomously execute pre-trade compliance checks.',
  'ep.aca.verify':  'Proof of concept: autonomous KYB & AML screening by agents',
  // Trading
  'ep.npda.desc':   'Integrates Nansen smart money data with Polymarket prediction market data. Detects tokens where onchain and offchain predictions diverge.',
  'ep.npda.verify': 'Proof of concept: onchain × prediction market divergence detection with AI analysis',
  'ep.hl.desc':     'Detects divergence between Hyperliquid PerpDEX smart money positions and Polymarket prediction markets. Supports Base and Solana.',
  'ep.hl.verify':   'Proof of concept: PerpDEX × prediction market divergence detection',
  'ep.pmi.desc':    'Tracks pre-IPO company valuation prediction markets in real time. Supports Base and Solana.',
  'ep.pmi.verify':  'Proof of concept: real-time tracking of pre-IPO valuations',
  'ep.tvb.desc':    'A bridge that routes TradingView Pine Script alerts into the x402 stack. Supports Base and Solana.',
  'ep.tvb.verify':  'Proof of concept: TradingView signal integration with x402 stack',
  // Asset Management
  'ep.pi.desc':     'Auto-analyzes wallet portfolios using Helius, Alchemy, and Nansen data with rebalancing suggestions. Supports Base, Solana, Polygon, and BNB.',
  'ep.pi.verify':   'Proof of concept: multi-chain portfolio analysis with rebalancing recommendations',
  'ep.yi.desc':     'Pool analysis across Solana DeFi (Kamino, Drift, Jupiter Lend) × Nansen smart money. Supports Base, Solana, Polygon, and BNB.',
  'ep.yi.verify':   'Proof of concept: DeFi pool × smart money analysis',
  'ep.amd.desc':    'APAC macro dashboard integrating Japan Data, e-Stat, Polymarket, Nansen, and x402 Oracle. Structures BOJ rates, USD/JPY, APAC real estate, and core CPI into 4 panels.',
  'ep.amd.verify':  'Proof of concept: real-time integrated analysis of APAC macro indicators',
  'ep.jrey.desc':   'Provides Japanese real estate yield, vacancy rates, and forecasts via MLIT and e-Stat integration. Supports Base, Solana, Polygon, and BNB.',
  'ep.jrey.verify': 'Proof of concept: x402 pay-per-use delivery of Japan real estate yield data',
  // Autonomous Agent
  'ep.aa.desc':     'An autonomous agent that auto-starts daily at 6AM JST across 19 APIs. Executes signal detection, analysis, and execution while settling autonomously via x402. AI ↔ AI loop in practice.',
  'ep.aa.verify':   'Proof of concept: AI ↔ AI loop with both supply-side (APIs) and demand-side (agent) self-owned',

  // TOP SELLERS
  'ts.title':       'Top Sellers Analysis',
  'ts.sub':         'Revenue & Call Volume Ranking — Past 30 Days (x402scan data)',
  'ts.th.product':  'Product',
  'ts.th.category': 'Category',
  'ts.th.revenue':  '30d Revenue',
  'ts.th.calls':    '30d Calls',
  'ts.th.price':    'Avg. Price',
  'ts.cta':         'Explore the Full Ecosystem → x402 Directory',

  // CONTACT
  'ct.title': 'From Human → AI to AI ↔ AI ——<br>Let\'s explore new business opportunities together as this transition unfolds',

  // FOOTER
  'ft.nav.usecases':       'Use Cases',
  'ft.nav.market':         'Market Thesis',
  'ft.nav.vision':         'Vision & Research',
  'ft.nav.products':       'Products',
  'ft.nav.endpoints':      'Endpoints',
  'ft.company.name.dt':    'Company',
  'ft.company.ceo.dt':     'CEO',
  'ft.company.address.dt': 'Address',
  'ft.company.founded.dt': 'Founded',
  'ft.copyright':          '© 2025 x402 Inc. (x402株式会社). All rights reserved.',
}

export const translations: Record<Lang, T> = { ja: JA, en: EN }

export function applyLanguage(lang: Lang): void {
  const t = translations[lang]
  document.documentElement.lang = lang

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!
    if (key in t) el.textContent = t[key]!
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml!
    if (key in t) el.innerHTML = t[key]!
  })

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang
    btn.classList.toggle('active', active)
    btn.setAttribute('aria-pressed', String(active))
  })

  localStorage.setItem('lang', lang)
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }))
}

export function initI18n(): void {
  const saved = localStorage.getItem('lang') as Lang | null
  const browser: Lang = navigator.language.startsWith('ja') ? 'ja' : 'en'
  const lang: Lang = (saved === 'ja' || saved === 'en') ? saved : browser

  applyLanguage(lang)

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang as Lang))
  })
}
