import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'

const COPY = {
  ja: {
    pageTag: 'x402とは',
    title: 'x402とは',
    intro:
      'HTTP 402 “Payment Required” ステータスコードは、1997年から予約されていましたが、30年近く未使用のままでした。',
    body: 'x402はこの未使用のHTTPステータスコードを再活性化し、AIエージェントや自律システムがHTTPネイティブに支払いを行えるようにするプロトコルです。サーバーが402を返すと、クライアントは支払いを完了してリクエストを再試行します。',
    readSpec: '仕様を読む',
    oldBadge: '現在の主流',
    oldTitle: '「人間の代わりに注文」',
    oldDesc: ['クレカ × AIエージェント', 'EC・小売・代行購入'],
    oldExample: 'GAP × Gemini × Google Pay など',
    newBadge: '新しいレイヤー',
    newTitle: '「自律的な購入」',
    newDesc: ['x402 × MCP × Agent Wallet', 'APIリソースの自律調達'],
    newExample: 'AIが仕事に必要なリソースを自ら買う',
    thesisBody:
      'AIエージェントが営業担当者の代わりに毎朝「優先順位付きフィード」を生成する時代が到来した場合、そのフィードには外部データが必要です——業界ニュース・競合動向・規制情報・リアルタイムデータ。月額制では粒度が粗すぎます。System of Intelligenceは固有のデータをAPIレイヤーで消費します——エージェントが自律的に選び、その場で決済するAPIが求められます。',
    condTitle: '「エージェントが毎回自律的に選ぶAPI」の条件',
    conditions: [
      '固有のデータを持つ（汎用データはAIが再現できる）',
      'エージェント向けスキーマで提供される',
      '使われるほど蓄積されるトランザクションデータがある',
      '実行フローに接続されている（データ提供→アクション→フィードバック）',
    ],
    useTag: 'AIエージェントがx402で買えるもの',
    note: '月額契約もAPIキーも不要。ウォレット残高があれば即アクセス。',
  },
  en: {
    pageTag: 'About',
    title: 'What is x402?',
    intro:
      'The HTTP 402 “Payment Required” status code has been reserved since 1997, yet sat unused for nearly 30 years.',
    body: 'x402 revives this unused HTTP status code so AI agents and autonomous systems can pay HTTP-natively. When a server returns 402, the client completes payment and retries the request.',
    readSpec: 'Read the spec',
    oldBadge: 'Today’s mainstream',
    oldTitle: '“Ordering on behalf of humans”',
    oldDesc: ['Credit card × AI agent', 'E-commerce, retail, proxy purchasing'],
    oldExample: 'e.g. GAP × Gemini × Google Pay',
    newBadge: 'A new layer',
    newTitle: '“Autonomous purchasing”',
    newDesc: ['x402 × MCP × Agent Wallet', 'Autonomous procurement of API resources'],
    newExample: 'AI buys the resources it needs for the job',
    thesisBody:
      'When AI agents generate a “prioritized feed” every morning in place of a sales rep, that feed needs external data — industry news, competitor moves, regulatory information, real-time data. Monthly subscriptions are too coarse-grained. A System of Intelligence consumes proprietary data at the API layer — it needs APIs that agents choose autonomously and settle on the spot.',
    condTitle: 'What it takes to be an API agents choose autonomously every time',
    conditions: [
      'Has proprietary data (generic data can be reproduced by AI)',
      'Provided with an agent-friendly schema',
      'Accumulates transaction data the more it is used',
      'Connected to an execution flow (data → action → feedback)',
    ],
    useTag: 'What agents can buy with x402',
    note: 'No monthly contract or API key required. With a wallet balance, access is instant.',
  },
} satisfies Record<Lang, Record<string, string | string[]>>

const BUYABLE: { cat: Localized; items: Localized<string[]> }[] = [
  {
    cat: { ja: 'データ・情報', en: 'Data & information' },
    items: {
      ja: [
        'リアルタイム気象・地震・津波情報',
        '不動産地価・取引データ（APAC5カ国）',
        '法人KYC・AMLスクリーニング',
        '為替・暗号資産価格・マクロ経済統計',
        'ニュース・マーケットブリーフィング',
      ],
      en: [
        'Real-time weather / earthquake / tsunami data',
        'Real estate land prices & transactions (5 APAC countries)',
        'Corporate KYC / AML screening',
        'FX, crypto prices, macroeconomic statistics',
        'News & market briefings',
      ],
    },
  },
  {
    cat: { ja: 'デジタルサービス', en: 'Digital services' },
    items: {
      ja: [
        'ドメイン登録・空き確認',
        'SMS送信・メール検証',
        'IP情報・位置情報',
        'テキスト翻訳（日英中韓）',
        'Webスクリーンショット',
      ],
      en: [
        'Domain registration / availability',
        'SMS sending / email verification',
        'IP & geolocation data',
        'Text translation (JA/EN/ZH/KO)',
        'Web screenshots',
      ],
    },
  },
  {
    cat: { ja: 'コンピュート・推論', en: 'Compute & inference' },
    items: {
      ja: ['LLM推論（トークン単位課金）', 'GPUジョブ・ヘッドレスブラウザ', '音声認識・画像処理'],
      en: ['LLM inference (per-token billing)', 'GPU jobs / headless browsers', 'Speech recognition / image processing'],
    },
  },
  {
    cat: { ja: 'コンテンツ・レポート', en: 'Content & reports' },
    items: {
      ja: ['有料記事・調査レポート', '不動産リサーチレポート（AI生成）', 'マーケットアナリシス'],
      en: ['Paid articles & research reports', 'Real estate research reports (AI-generated)', 'Market analysis'],
    },
  },
  {
    cat: { ja: 'オンチェーンデータ', en: 'On-chain data' },
    items: {
      ja: [
        'DeFiイールドスコア・プロトコルリスク',
        'トレーディングシグナル・価格予測',
        'ウォレットレピュテーションスコア',
      ],
      en: [
        'DeFi yield scores / protocol risk',
        'Trading signals / price forecasts',
        'Wallet reputation scores',
      ],
    },
  },
]

export function About() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <>
      <PageHero eyebrow="Protocol" tag={t.pageTag as string} title={t.title as string} intro={t.intro as string} />

      {/* Intro + HTTP flow */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-white/70 text-base leading-[1.8]">{t.body as string}</p>
            <a
              href="https://www.x402.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/70 px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 transition-colors"
            >
              {t.readSpec as string}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="liquid-glass rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-white/50">HTTP Flow</span>
            </div>
            <pre className="p-4 text-[11px] md:text-xs leading-[1.7] overflow-x-auto font-mono text-white/70">
              <code>
                <span className="text-white/30">→</span> GET /api/data HTTP/1.1{'\n'}
                {'  '}Host: api.example.com{'\n\n'}
                <span className="text-[#E8C338]">← HTTP/1.1 402 Payment Required</span>
                {'\n'}
                {'  '}X-Payment-Required: version=1{'\n'}
                {'  '}X-Payment-Amount: 0.001{'\n'}
                {'  '}X-Payment-Token: USDC{'\n\n'}
                <span className="text-white/30">→</span> GET /api/data HTTP/1.1{'\n'}
                {'  '}X-Payment: &lt;signed_payload&gt;{'\n\n'}
                <span className="text-[#28c840]">← HTTP/1.1 200 OK</span>
                {'\n'}
                {'  '}Content-Type: application/json
              </code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Paradigm shift */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="liquid-glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-white/40">{t.oldBadge as string}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{t.oldTitle as string}</h3>
            <p className="mt-2 text-sm text-white/60 leading-[1.7]">
              {(t.oldDesc as string[])[0]}
              <br />
              {(t.oldDesc as string[])[1]}
            </p>
            <p className="mt-4 text-xs text-white/40">{t.oldExample as string}</p>
          </div>
          <div className="text-2xl text-[#E8C338] text-center rotate-90 md:rotate-0">→</div>
          <div className="liquid-glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-[#E8C338]">{t.newBadge as string}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{t.newTitle as string}</h3>
            <p className="mt-2 text-sm text-white/60 leading-[1.7]">
              {(t.newDesc as string[])[0]}
              <br />
              {(t.newDesc as string[])[1]}
            </p>
            <p className="mt-4 text-xs text-white/40">{t.newExample as string}</p>
          </div>
        </div>
      </section>

      {/* System of Intelligence × x402 */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="max-w-3xl">
          <SectionEyebrow label="Thesis" tag="System of Intelligence × x402" />
          <p className="mt-6 text-white/70 text-base leading-[1.8]">{t.thesisBody as string}</p>
        </div>
        <div className="mt-8 liquid-glass rounded-2xl p-6 max-w-3xl">
          <p className="text-sm font-semibold text-white">{t.condTitle as string}</p>
          <ul className="mt-4 space-y-3">
            {(t.conditions as string[]).map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-white/70">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E8C338] flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What agents can buy */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Use cases" tag={t.useTag as string} />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUYABLE.map((group, i) => (
            <motion.div
              key={group.cat.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.06 }}
              className="liquid-glass rounded-2xl p-5"
            >
              <p className="text-sm font-semibold text-[#E8C338]">{group.cat[lang]}</p>
              <ul className="mt-3 space-y-2">
                {group.items[lang].map((item) => (
                  <li key={item} className="text-sm text-white/60 leading-[1.6]">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/50">{t.note as string}</p>
      </section>
    </>
  )
}
