import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SectionEyebrow } from '../primitives'

const CONDITIONS = [
  '固有のデータを持つ（汎用データはAIが再現できる）',
  'エージェント向けスキーマで提供される',
  '使われるほど蓄積されるトランザクションデータがある',
  '実行フローに接続されている（データ提供→アクション→フィードバック）',
]

const BUYABLE = [
  {
    cat: 'データ・情報',
    items: [
      'リアルタイム気象・地震・津波情報',
      '不動産地価・取引データ（APAC5カ国）',
      '法人KYC・AMLスクリーニング',
      '為替・暗号資産価格・マクロ経済統計',
      'ニュース・マーケットブリーフィング',
    ],
  },
  {
    cat: 'デジタルサービス',
    items: [
      'ドメイン登録・空き確認',
      'SMS送信・メール検証',
      'IP情報・位置情報',
      'テキスト翻訳（日英中韓）',
      'Webスクリーンショット',
    ],
  },
  {
    cat: 'コンピュート・推論',
    items: ['LLM推論（トークン単位課金）', 'GPUジョブ・ヘッドレスブラウザ', '音声認識・画像処理'],
  },
  {
    cat: 'コンテンツ・レポート',
    items: ['有料記事・調査レポート', '不動産リサーチレポート（AI生成）', 'マーケットアナリシス'],
  },
  {
    cat: 'オンチェーンデータ',
    items: [
      'DeFiイールドスコア・プロトコルリスク',
      'トレーディングシグナル・価格予測',
      'ウォレットレピュテーションスコア',
    ],
  },
]

export function About() {
  return (
    <>
      <PageHero
        eyebrow="Protocol"
        tag="x402とは"
        title="x402とは"
        intro="HTTP 402 “Payment Required” ステータスコードは、1997年から予約されていましたが、30年近く未使用のままでした。"
      />

      {/* Intro + HTTP flow */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-white/70 text-base leading-[1.8]">
              x402はこの未使用のHTTPステータスコードを再活性化し、AIエージェントや自律システムがHTTPネイティブに支払いを行えるようにするプロトコルです。サーバーが402を返すと、クライアントは支払いを完了してリクエストを再試行します。
            </p>
            <a
              href="https://www.x402.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/70 px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 transition-colors"
            >
              仕様を読む
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
            <p className="text-xs uppercase tracking-widest text-white/40">現在の主流</p>
            <h3 className="mt-3 text-xl font-semibold text-white">「人間の代わりに注文」</h3>
            <p className="mt-2 text-sm text-white/60 leading-[1.7]">
              クレカ × AIエージェント
              <br />
              EC・小売・代行購入
            </p>
            <p className="mt-4 text-xs text-white/40">GAP × Gemini × Google Pay など</p>
          </div>
          <div className="text-2xl text-[#E8C338] text-center rotate-90 md:rotate-0">→</div>
          <div className="liquid-glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-[#E8C338]">新しいレイヤー</p>
            <h3 className="mt-3 text-xl font-semibold text-white">「自律的な購入」</h3>
            <p className="mt-2 text-sm text-white/60 leading-[1.7]">
              x402 × MCP × Agent Wallet
              <br />
              APIリソースの自律調達
            </p>
            <p className="mt-4 text-xs text-white/40">AIが仕事に必要なリソースを自ら買う</p>
          </div>
        </div>
      </section>

      {/* System of Intelligence × x402 */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="max-w-3xl">
          <SectionEyebrow label="Thesis" tag="System of Intelligence × x402" />
          <p className="mt-6 text-white/70 text-base leading-[1.8]">
            AIエージェントが営業担当者の代わりに毎朝「優先順位付きフィード」を生成する時代が到来した場合、そのフィードには外部データが必要です——業界ニュース・競合動向・規制情報・リアルタイムデータ。月額制では粒度が粗すぎます。System
            of
            Intelligenceは固有のデータをAPIレイヤーで消費します——エージェントが自律的に選び、その場で決済するAPIが求められます。
          </p>
        </div>
        <div className="mt-8 liquid-glass rounded-2xl p-6 max-w-3xl">
          <p className="text-sm font-semibold text-white">
            「エージェントが毎回自律的に選ぶAPI」の条件
          </p>
          <ul className="mt-4 space-y-3">
            {CONDITIONS.map((c) => (
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
        <SectionEyebrow label="Use cases" tag="AIエージェントがx402で買えるもの" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUYABLE.map((group, i) => (
            <motion.div
              key={group.cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.06 }}
              className="liquid-glass rounded-2xl p-5"
            >
              <p className="text-sm font-semibold text-[#E8C338]">{group.cat}</p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-white/60 leading-[1.6]">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/50">
          月額契約もAPIキーも不要。ウォレット残高があれば即アクセス。
        </p>
      </section>
    </>
  )
}
