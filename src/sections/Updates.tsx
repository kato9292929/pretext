import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

type Update = {
  href: string // full article URL
  tag: string // English label, shown in both languages
  title: Localized
}

// Newest first. `tag` is a short topical label; `title` mirrors the headline.
const UPDATES: Update[] = [
  {
    href: 'https://prtimes.jp/main/html/rd/p/000000002.000188987.html',
    tag: 'Press',
    title: {
      ja: 'x402株式会社、一般社団法人日本暗号資産ビジネス協会（JCBA）に準会員として入会',
      en: 'x402 Inc. joins the Japan Cryptoasset Business Association (JCBA) as an associate member',
    },
  },
  {
    href: 'https://note.com/x402inc/n/na007bd544702',
    tag: 'Monthly',
    title: {
      ja: '【月次報告 2026年8月】エージェント決済市場：クレカ領域の実利用、A to A側のテーゼとユースケースの供給元',
      en: 'Monthly report (Aug 2026): agent payments — real card usage, and the A-to-A thesis and use-case suppliers',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n726d00e29555',
    tag: 'OSD',
    title: {
      ja: 'Onchain Stock Data 開発進捗：約200社のx402対応、MCPからの無料read、決算データ自動生成への布石',
      en: 'Onchain Stock Data progress: ~200 firms x402-enabled, free MCP reads, groundwork for auto-generated earnings data',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nc9779d59bc9f',
    tag: 'Physical AI',
    title: {
      ja: '米国フィジカルAI 採点実績アップデート：半導体61%・ロボティクス70%と9/30に出る最初の答え',
      en: 'US Physical AI scoring update: semis 61%, robotics 70%, and the first answers due 9/30',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n5468ee860649',
    tag: 'Physical AI',
    title: {
      ja: '日本フィジカルAI 装置・材料層：IRフェア出展10社のdated catalystと採点実績77%',
      en: 'Japan Physical AI (equipment/materials): dated catalysts for 10 IR-fair exhibitors, 77% hit rate',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nc3cc50a8d048',
    tag: 'Card / Grok',
    title: {
      ja: 'Grok BotによるStripe Link決済：ブラウザ操作での購入と、単回利用カード・都度承認による人間の統制',
      en: 'Grok Bot paying via Stripe Link: browser-driven purchase, single-use cards and per-transaction human approval',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nfc13b5ee0655',
    tag: 'Harness / Class 1',
    title: {
      ja: 'エージェントハーネスの所有：Grok BotとHermes Botで分かれる機構と判断基準（Class 1）',
      en: 'Owning the agent harness: how Grok Bot and Hermes Bot diverge, and the criteria (Class 1)',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n0154d999c989',
    tag: 'Hermes / Class 1+4',
    title: {
      ja: 'Hermes エージェント決済の境界：内側のdelegate_taskと外側のmpp-agent、律速としての評価コスト（Class 1 + 4）',
      en: 'Boundaries of Hermes agent payments: internal delegate_task vs external mpp-agent, evaluation cost as the bottleneck (Class 1 + 4)',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n2624a2ee4e61',
    tag: 'Agentic Card',
    title: {
      ja: 'x402 Agentic Card：発行体オーソリと委任トークンの接続',
      en: 'x402 Agentic Card: connecting issuer authorization and delegation tokens',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n1e69fb831e16',
    tag: 'Anthropic',
    title: {
      ja: 'AnthropicのClaude Commerce Agents：買い物・店舗運営エージェントの雛形と、決済のホストへの受け渡し',
      en: 'Anthropic’s Claude Commerce Agents: templates for shopping / store-ops agents, and handing settlement to the host',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n5d27d7344d40',
    tag: 'A to A / Class 4',
    title: {
      ja: 'Massiveの米国株式データのx402対応：リクエスト単位のUSDC課金と、既存API事業への追加経路（A to A Use Cases Class 4）',
      en: 'Massive brings US equity data to x402: per-request USDC billing and an add-on path for an existing API business (A-to-A, Class 4)',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n0b81556a919b',
    tag: 'OSD / IR Fair',
    title: {
      ja: '日経・東証IRフェア2026 出展企業 テーマ別カタリスト・マップ｜Onchain Stock Data',
      en: 'Nikkei / TSE IR Fair 2026 exhibitors: a themed catalyst map | Onchain Stock Data',
    },
  },
]

export function Updates() {
  const { lang } = useLang()
  return (
    <section id="updates" className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Update" tag="最新情報" heading />
      </motion.div>

      {/* Two-row horizontal-scroll rail; the whole card is the link */}
      <div className="mt-8 -mx-6 px-6 overflow-x-auto no-scrollbar">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[260px] sm:auto-cols-[300px] gap-4 pb-2">
          {UPDATES.map((u) => (
            <a
              key={u.href}
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group liquid-glass rounded-2xl p-5 h-full flex flex-col hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
                >
                  {u.tag}
                </span>
                <ArrowUpRight className="w-4 h-4 text-fg/35 group-hover:text-gold transition-colors" />
              </div>
              <p className="mt-4 text-sm font-semibold text-fg leading-[1.6] line-clamp-4">
                {u.title[lang]}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
