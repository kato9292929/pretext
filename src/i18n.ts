export type Lang = 'ja' | 'en'

type T = Record<string, string>

const JA: T = {
  // Hero
  'hero.subtitle': 'AIエージェント決済のバックエンド。x402とMPPが、インターネットに支払いを組み込む。',

  // Nav
  'nav.protocol': 'プロトコル',
  'nav.how':      '仕組み',
  'nav.usecases': 'ユースケース',

  // Foundation
  'foundation.p1': '2025年4月2日、x402 Foundationが<strong>Linux Foundation</strong>傘下のオープンガバナンス組織として正式に発足しました。単一の企業がx402標準を所有・支配することはありません。すべての人が読み、構築し、貢献できます。',
  'foundation.p2': 'インターネットのインフラ層（HTTP・SMTP・TCP/IP）がオープン標準として世界を変えたように、AIエージェント時代の決済レイヤーもオープンであることが期待されます。',
  'pillar.1.title': '中立ガバナンス',
  'pillar.1.body':  'Linux Foundationが中立・非営利のホームを提供。単一企業がx402標準を所有しません。',
  'pillar.2.title': 'オープンソース',
  'pillar.2.body':  'Apache 2.0ライセンス。フォーク、貢献、構築—許可不要。',
  'pillar.3.title': 'マルチレール対応',
  'pillar.3.body':  '法定通貨・暗号通貨両対応。複数のブロックチェーンと決済ネットワークで動作。',
  'pillar.4.title': 'パーミッションレス',
  'pillar.4.body':  'サインアップ不要。ミドルウェアをインポートして決済メソッドを紐付けるだけで利用開始。',
  'why.title':       'なぜオープン標準が勝つのか',
  'why.http.body':   'AOLは3000万人のインターネットでしたが、クローズドなガーデンでした。HTTPはオープンなプロトコルで、誰でも構築できました。AOLは今や歴史の注釈に過ぎませんが、HTTPはウェブそのものです。',
  'why.tcpip.body':  '「公式」ネットワーク標準（OSI）は、完璧さよりも広く採用されたオープン版に敗れました。標準への合意は完璧な標準よりも多くの価値を生みます。',
  'why.conclusion':  '1つの企業がエージェントのトランザクション層を支配する代わりに—x402はその代替を提供します。誰でも参加でき、誰も締め出されない。',
  'members.title':   '創設メンバー',

  // x402 vs MPP
  'x402mpp.title':      'x402 と MPP の関係',
  'x402mpp.x402body':   'HTTP 402 × Web3の文脈で生まれ、ブロックチェーン上のUSDC決済にフォーカス。Linux Foundation傘下のオープンスタンダード。',
  'x402mpp.mppbody':    'x402の思想を継承しつつ、Stripe（カード）・Tempo（ステーブルコイン）・Lightning（BTC）を1つのインターフェースで統合。IETFにドラフト提出済み。後発なだけあってより広範な決済レールをカバーする。',
  'x402mpp.conclusion': '→ StripeはMPPとx402の両方をサポートしている。レイヤーが違うだけで、どちらも公共財だ。',

  // Protocol
  'protocol.title': 'x402とは',
  'protocol.p1':    'HTTP 402 "Payment Required" ステータスコードは、1997年から予約されていましたが、30年近く未使用のままでした。',
  'protocol.p2':    'Coinbase、Cloudflare、Stripeが主導し、Linux Foundation傘下のx402 Foundationとして設立されたこのオープンスタンダードは、ウェブリクエストに支払いを直接組み込む普遍的な方法を定義します。製品ではなく、プラットフォームでもなく—<strong>公共財</strong>です。',
  'protocol.p3':    'サーバーが402を返したとき、クライアント（人間でもAIエージェントでも）は自動的に支払いを完了し、リクエストを再試行します。人間が毎回フォームを入力する必要はありません。',
  'protocol.cta':   '仕様を読む →',

  // How it works
  'how.title':    '仕組み',
  'step.1.title': 'リクエスト',
  'step.1.body':  'クライアント（人間またはAIエージェント）がHTTPリクエストを送信します。',
  'step.2.title': '402レスポンス',
  'step.2.body':  'サーバーが支払い条件（金額・通貨・アドレス）を含む402を返します。',
  'step.3.title': '支払い実行',
  'step.3.body':  'ブロックチェーン上でオンチェーン決済が自動的に完了します。',
  'step.4.title': 'アクセス付与',
  'step.4.body':  'サーバーが支払いを確認し、200 OKでリソースを返します。',
  'how.note':     'すべてのやり取りはHTTPの標準的な仕組みの上に構築されています。<br>既存のインフラを変更することなく、支払い機能を追加できます。',

  // upto scheme
  'upto.title':   'exactスキームの限界 → uptoによる解決',
  'upto.p1':      '当初のexactスキームは、リクエスト前に金額を確定させる必要があった。しかしLLM推論・帯域幅課金・GPU使用時間など、AIインフラのコストは実行完了後にしか確定しない。',
  'upto.p2':      '2026年4月に導入されたuptoスキームはこの制約を解消する。クライアントが事前に「上限額」にオフチェーン署名（ガスコストゼロ）し、サービス完了後にサーバーが実使用量ベースの金額のみを決済する。Permit2コントラクトが上限超過を技術的に不可能にする。',
  'upto.example': '例: エージェントが最大$5.00を承認 → サーバーが$0.42のみ決済（21,000トークン消費ベース）',
  'upto.p3':      'エスクロー方式と異なり、決済まで資金はウォレットに留まり流動性が維持される。並列APIコールが多いほど、この優位性が大きくなる。',
  'upto.link':    'uptoスキームの詳細 →',

  // MPP Session
  'mpp.session.title': 'MPPのSessionモード：LLMトークン課金に対応',
  'mpp.session.body':  'MPPはChargeモード（1リクエスト1決済）に加え、Sessionモードを持つ。事前デポジット後はオフチェーンの署名済みバウチャーを提示するだけで決済が完結し、レイテンシはほぼゼロになる。LLMのトークン単位課金や、AIが複数APIを連続して叩くワークフローに特に有効だ。',

  // Use cases
  'features.title':   'ユースケース',
  'feature.1.title':  'AIエージェント間決済',
  'feature.1.body':   '自律型AIエージェントが人間の介在なしにリアルタイムで決済。API呼び出しごとに自動的に課金・支払いが完結します。',
  'feature.2.title':  'マイクロペイメント',
  'feature.2.body':   '0.001円単位の超小額決済が可能。記事1本、楽曲1曲、データ1件ごとの柔軟な課金モデルを実現します。',
  'feature.3.title':  'コンテンツ収益化',
  'feature.3.body':   'サブスクリプション不要。読んだ記事、視聴したコンテンツに対してのみ支払う、公正な収益化モデル。',
  'feature.4.title':  'API マネタイズ',
  'feature.4.body':   'APIアクセスに対してリクエスト単位で課金。従量制の柔軟なビジネスモデルを簡単に構築できます。',
  'feature.5.title':  'クロスボーダー決済',
  'feature.5.body':   '国境を越えた即時送金。従来の国際送金の複雑さと高コストを排除し、シームレスなグローバル取引を実現。',
  'feature.6.title':  'IoT・機械間取引',
  'feature.6.body':   'スマートデバイスが自律的に電力・データ・サービスを売買。M2M経済の新しい基盤を提供します。',
  'feature.7.title':  'マシン経済のインフラ',
  'feature.7.body':   'AIが検索・要約・画像生成を一連でこなす際、背後で複数のAPIにx402/MPPで数セントずつ自律的に支払う。ユーザーはプロトコルを意識しない——TCP/IPと同じように。',

  // Specs
  'spec.1.label': '累計トランザクション（x402）',
  'spec.2.label': '利用エンティティ数',
  'spec.3.label': '創設メンバー企業',
  'spec.4.label': '決済完了時間',
  'spec.5.label': 'MPPローンチ時の統合サービス数',

  // Footer
  'footer.tagline':             'HTTP 402 Payment Protocol<br>for Japan',
  'footer.nav.protocol':        'プロトコル',
  'footer.nav.how':             '仕組み',
  'footer.nav.usecases':        'ユースケース',
  'footer.company.label':       'COMPANY',
  'footer.company.name.dt':     '社名',
  'footer.company.name.dd':     'x402株式会社（x402 Inc.）',
  'footer.company.ceo.dt':      '代表取締役',
  'footer.company.ceo.dd':      '加藤 雅人（Masato Kato）',
  'footer.company.address.dt':  '所在地',
  'footer.company.address.dd':  '〒108-0071 東京都港区白金台5-10-16',
  'footer.company.founded.dt':  '設立',
  'footer.company.founded.dd':  '2025年',
  'footer.copyright':           '© 2025 x402株式会社 (x402 Inc.). All rights reserved.',
}

const EN: T = {
  // Hero
  'hero.subtitle': 'The backend for AI agent payments. x402 and MPP embed payments into the internet.',

  // Nav
  'nav.protocol': 'Protocol',
  'nav.how':      'How it works',
  'nav.usecases': 'Use cases',

  // Foundation
  'foundation.p1': 'On April 2, 2025, the x402 Foundation launched as an open governance organization under the <strong>Linux Foundation</strong>. No single company owns or controls the x402 standard. Anyone can read it, build on it, contribute to it.',
  'foundation.p2': 'Just as the internet\'s infrastructure layer—HTTP, SMTP, TCP/IP—transformed the world as open standards, the payment layer for the agentic era demands the same openness.',
  'pillar.1.title': 'Neutral Governance',
  'pillar.1.body':  'Linux Foundation provides a neutral, non-profit home. No single company owns the x402 standard.',
  'pillar.2.title': 'Open Source',
  'pillar.2.body':  'Apache 2.0 licensed. Fork it, contribute to it, build on it—no permission required.',
  'pillar.3.title': 'Multi-Rail',
  'pillar.3.body':  'Works with both fiat and crypto. Runs across multiple blockchains and payment networks.',
  'pillar.4.title': 'Permissionless',
  'pillar.4.body':  'No signup. Import the middleware, wire up a payment method, ship.',
  'why.title':       'Why open standards win',
  'why.http.body':   'AOL had 30M users but ran a walled garden. HTTP was an open protocol anyone could build on. AOL is a historical footnote; HTTP is the web itself.',
  'why.tcpip.body':  'The "official" networking standard (OSI) lost to the open version that won adoption over perfection. Consensus on a standard creates more value than a perfect standard.',
  'why.conclusion':  'Instead of one company owning the agentic transaction layer—x402 offers the alternative. Anyone can participate. No one gets locked out.',
  'members.title':   'Founding members',

  // x402 vs MPP
  'x402mpp.title':      'x402 and MPP: Complementary, Not Competing',
  'x402mpp.x402body':   'Born from HTTP 402 × Web3, focused on USDC payments on blockchain. An open standard under the Linux Foundation.',
  'x402mpp.mppbody':    'Inherits x402\'s philosophy while integrating Stripe (card), Tempo (stablecoin), and Lightning (BTC) under one interface. IETF draft submitted. Broader payment rail coverage as the newer standard.',
  'x402mpp.conclusion': '→ Stripe supports both MPP and x402. Different layers, both public goods.',

  // Protocol
  'protocol.title': 'What is x402?',
  'protocol.p1':    'The HTTP 402 "Payment Required" status code has been reserved since 1997—unused for nearly 30 years.',
  'protocol.p2':    'Led by Coinbase, Cloudflare, and Stripe and established as the x402 Foundation under the Linux Foundation, this open standard defines a universal way to embed payments directly into web requests. Not a product, not a platform—<strong>a public good</strong>.',
  'protocol.p3':    'When a server returns 402, the client—human or AI agent—automatically settles the payment and retries the request. No forms, no friction.',
  'protocol.cta':   'Read the spec →',

  // How it works
  'how.title':    'How it works',
  'step.1.title': 'Request',
  'step.1.body':  'A client—human or AI agent—sends an HTTP request.',
  'step.2.title': '402 Response',
  'step.2.body':  'Server returns a 402 with payment terms: amount, currency, address.',
  'step.3.title': 'Settle',
  'step.3.body':  'Onchain settlement completes automatically, no human in the loop.',
  'step.4.title': 'Access',
  'step.4.body':  'Server verifies payment, returns 200 OK with the resource.',
  'how.note':     'Everything runs on top of standard HTTP.<br>Drop it into existing infrastructure—no rewrites required.',

  // upto scheme
  'upto.title':   'The Limits of exact → Solved by upto',
  'upto.p1':      'The original exact scheme required confirming the amount before the request. But for AI infrastructure—LLM inference, bandwidth billing, GPU compute—costs can only be determined after execution.',
  'upto.p2':      'The upto scheme introduced in April 2026 removes this constraint. The client signs an offchain approval for a maximum amount (zero gas cost), and after completion the server settles only the actual amount consumed. The Permit2 contract makes exceeding the cap technically impossible.',
  'upto.example': 'Example: Agent approves up to $5.00 → Server settles $0.42 only (21,000 tokens consumed)',
  'upto.p3':      'Unlike escrow, funds stay in the wallet until settlement, maintaining 100% liquidity. The more parallel API calls, the greater this advantage.',
  'upto.link':    'Learn more about upto →',

  // MPP Session
  'mpp.session.title': 'MPP Session Mode: Token-based LLM Billing',
  'mpp.session.body':  'In addition to Charge mode (one payment per request), MPP has Session mode. After an initial deposit, payments complete by presenting an offchain signed voucher—near-zero latency. Ideal for per-token LLM billing and AI workflows that hit multiple APIs sequentially.',

  // Use cases
  'features.title':   'Use cases',
  'feature.1.title':  'Agent-to-Agent Payments',
  'feature.1.body':   'Autonomous AI agents settle in real time—no human in the loop. Pay-per-call billing that just works.',
  'feature.2.title':  'Micropayments',
  'feature.2.body':   'Fractions of a cent, natively. Per-article, per-track, per-data-point—any granularity your model needs.',
  'feature.3.title':  'Content Monetization',
  'feature.3.body':   'No subscriptions required. Readers pay for what they read. Creators earn what they deserve.',
  'feature.4.title':  'API Monetization',
  'feature.4.body':   'Metered access, per-request billing. Build usage-based revenue without the overhead.',
  'feature.5.title':  'Cross-border Payments',
  'feature.5.body':   'Instant settlement across borders. Eliminate the complexity and cost of legacy international wires.',
  'feature.6.title':  'Machine Economy',
  'feature.6.body':   'Smart devices autonomously buy and sell power, data, and services. The M2M economy, natively programmed.',
  'feature.7.title':  'Machine Economy Infrastructure',
  'feature.7.body':   'When AI handles search, summarization, and image generation in one workflow, it autonomously pays cents to multiple APIs via x402/MPP behind the scenes. Users don\'t think about the protocol—just like TCP/IP.',

  // Specs
  'spec.1.label': 'Cumulative transactions (x402)',
  'spec.2.label': 'Active entities',
  'spec.3.label': 'Founding members',
  'spec.4.label': 'Settlement time',
  'spec.5.label': 'Integrations at MPP launch',

  // Footer
  'footer.tagline':             'HTTP 402 Payment Protocol<br>for Japan',
  'footer.nav.protocol':        'Protocol',
  'footer.nav.how':             'How it works',
  'footer.nav.usecases':        'Use cases',
  'footer.company.label':       'COMPANY',
  'footer.company.name.dt':     'Company',
  'footer.company.name.dd':     'x402 Inc. (x402株式会社)',
  'footer.company.ceo.dt':      'CEO',
  'footer.company.ceo.dd':      'Masato Kato (加藤 雅人)',
  'footer.company.address.dt':  'Address',
  'footer.company.address.dd':  '5-10-16 Shirokanedai, Minato-ku, Tokyo 108-0071',
  'footer.company.founded.dt':  'Founded',
  'footer.company.founded.dd':  '2025',
  'footer.copyright':           '© 2025 x402 Inc. (x402株式会社). All rights reserved.',
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
