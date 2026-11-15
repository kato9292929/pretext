import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

type Update = {
  href: string // full article URL
  tag: string // English label, shown in all languages
  title: Localized
}

// Newest first. `tag` is a short topical label; `title` mirrors the headline.
export const UPDATES: Update[] = [
  {
    href: 'https://prtimes.jp/main/html/rd/p/000000002.000188987.html',
    tag: 'Press',
    title: {
      ja: 'x402株式会社、一般社団法人日本暗号資産ビジネス協会（JCBA）に準会員として入会',
      en: 'x402 Inc. joins the Japan Cryptoasset Business Association (JCBA) as an associate member',
      zh: 'x402株式会社 以准会员身份加入日本加密资产商业协会（JCBA）',
    },
  },
  {
    href: 'https://note.com/x402inc/n/na007bd544702',
    tag: 'Monthly',
    title: {
      ja: '【月次報告 2026年8月】エージェント決済市場：クレカ領域の実利用、A to A側のテーゼとユースケースの供給元',
      en: 'Monthly report (Aug 2026): agent payments — real card usage, and the A-to-A thesis and use-case suppliers',
      zh: '【月度报告 2026年8月】智能体支付市场：信用卡领域的实际使用、A to A 侧的论点与用例的供给方',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n726d00e29555',
    tag: 'OSD',
    title: {
      ja: 'Onchain Stock Data 開発進捗：約200社のx402対応、MCPからの無料read、決算データ自動生成への布石',
      en: 'Onchain Stock Data progress: ~200 firms x402-enabled, free MCP reads, groundwork for auto-generated earnings data',
      zh: 'Onchain Stock Data 开发进展：约200家公司支持 x402、通过 MCP 免费读取，为自动生成财报数据铺路',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nc9779d59bc9f',
    tag: 'Physical AI',
    title: {
      ja: '米国フィジカルAI 採点実績アップデート：半導体61%・ロボティクス70%と9/30に出る最初の答え',
      en: 'US Physical AI scoring update: semis 61%, robotics 70%, and the first answers due 9/30',
      zh: '美国 Physical AI 评分实绩更新：半导体61%、机器人70%，以及9/30揭晓的首批答案',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n5468ee860649',
    tag: 'Physical AI',
    title: {
      ja: '日本フィジカルAI 装置・材料層：IRフェア出展10社のdated catalystと採点実績77%',
      en: 'Japan Physical AI (equipment/materials): dated catalysts for 10 IR-fair exhibitors, 77% hit rate',
      zh: '日本 Physical AI 设备・材料层：IR 展会参展10家公司的 dated catalyst 与77%的评分实绩',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nc3cc50a8d048',
    tag: 'Card / Grok',
    title: {
      ja: 'Grok BotによるStripe Link決済：ブラウザ操作での購入と、単回利用カード・都度承認による人間の統制',
      en: 'Grok Bot paying via Stripe Link: browser-driven purchase, single-use cards and per-transaction human approval',
      zh: 'Grok Bot 通过 Stripe Link 支付：基于浏览器操作的购买，以及一次性卡与逐笔授权带来的人工管控',
    },
  },
  {
    href: 'https://note.com/x402inc/n/nfc13b5ee0655',
    tag: 'Harness / Class 1',
    title: {
      ja: 'エージェントハーネスの所有：Grok BotとHermes Botで分かれる機構と判断基準（Class 1）',
      en: 'Owning the agent harness: how Grok Bot and Hermes Bot diverge, and the criteria (Class 1)',
      zh: '智能体 harness 的所有权：Grok Bot 与 Hermes Bot 的机制分野与判断标准（Class 1）',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n0154d999c989',
    tag: 'Hermes / Class 1+4',
    title: {
      ja: 'Hermes エージェント決済の境界：内側のdelegate_taskと外側のmpp-agent、律速としての評価コスト（Class 1 + 4）',
      en: 'Boundaries of Hermes agent payments: internal delegate_task vs external mpp-agent, evaluation cost as the bottleneck (Class 1 + 4)',
      zh: 'Hermes 智能体支付的边界：内部的 delegate_task 与外部的 mpp-agent，以及作为瓶颈的评估成本（Class 1 + 4）',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n2624a2ee4e61',
    tag: 'Agentic Card',
    title: {
      ja: 'x402 Agentic Card：発行体オーソリと委任トークンの接続',
      en: 'x402 Agentic Card: connecting issuer authorization and delegation tokens',
      zh: 'x402 Agentic Card：发卡机构授权与委托令牌的对接',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n1e69fb831e16',
    tag: 'Anthropic',
    title: {
      ja: 'AnthropicのClaude Commerce Agents：買い物・店舗運営エージェントの雛形と、決済のホストへの受け渡し',
      en: 'Anthropic’s Claude Commerce Agents: templates for shopping / store-ops agents, and handing settlement to the host',
      zh: 'Anthropic 的 Claude Commerce Agents：购物・店铺运营智能体的模板，以及将支付移交给宿主',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n5d27d7344d40',
    tag: 'A to A / Class 4',
    title: {
      ja: 'Massiveの米国株式データのx402対応：リクエスト単位のUSDC課金と、既存API事業への追加経路（A to A Use Cases Class 4）',
      en: 'Massive brings US equity data to x402: per-request USDC billing and an add-on path for an existing API business (A-to-A, Class 4)',
      zh: 'Massive 的美国股票数据支持 x402：按请求计费的 USDC 收费，以及现有 API 业务的新增路径（A to A Use Cases Class 4）',
    },
  },
  {
    href: 'https://note.com/x402inc/n/n0b81556a919b',
    tag: 'OSD / IR Fair',
    title: {
      ja: '日経・東証IRフェア2026 出展企業 テーマ別カタリスト・マップ｜Onchain Stock Data',
      en: 'Nikkei / TSE IR Fair 2026 exhibitors: a themed catalyst map | Onchain Stock Data',
      zh: '日经・东证 IR 展会2026 参展企业 主题催化剂地图｜Onchain Stock Data',
    },
  },
]

/* tag: optional label for the eyebrow (the Journal shows the period) */
export function Updates({ tag }: { tag?: string } = {}) {
  const { lang } = useLang()
  return (
    <section id="updates" className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow label="Update" tag={tag ?? (lang === 'zh' ? '最新动态' : '最新情報')} heading />
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
