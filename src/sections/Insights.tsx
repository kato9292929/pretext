import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { FEATURED_ARTICLES } from '../articles'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    subtext:
      'エージェント決済の「現在地」を、一次情報から読み解く。用途別の細分化から market の拡大まで、直近のトピックを深掘りしています。',
    seeAll: '考察・調査をすべて見る',
  },
  en: {
    subtext:
      'Reading the current state of agent payments from primary sources — from use-case segmentation to market expansion, we dig into the latest topics.',
    seeAll: 'See all research',
  },
  zh: {
    subtext:
      '基于一手资料，解读 AI 智能体支付的“现状”。从按用途细分到市场扩大，深入剖析近期议题。',
    seeAll: '查看全部研究与调研',
  },
}

type Item = { title: Localized; href: string; tag: Localized }

const RANKED: Item[] = [
  {
    title: {
      ja: '社内AIエージェントの3つの提供形態：実行費用の出どころと統制の置き場所（Class 1〜3）',
      en: 'Three deployment models for in-house AI agents: where run costs come from and where control sits (Class 1–3)',
      zh: '企业内部 AI 智能体的三种提供形态：运行费用的来源与管控的归属（Class 1–3）',
    },
    href: 'https://note.com/x402inc/n/n8b1822d72ed2',
    tag: { ja: 'Agent Ops / Class', en: 'Agent Ops / Class', zh: 'Agent Ops / Class' },
  },
  {
    title: {
      ja: 'バックオフィス × AIエージェント：Y CombinatorのqmとStripe Approvalsで起案と承認を分ける実装記録',
      en: 'Back office × AI agents: separating drafting from approval with Y Combinator’s qm and Stripe Approvals — an implementation log',
      zh: '后台办公 × AI 智能体：用 Y Combinator 的 qm 和 Stripe Approvals 将起草与审批分离的实施记录',
    },
    href: 'https://note.com/x402inc/n/n15fbfb8b90a6',
    tag: { ja: 'Back Office / Approvals', en: 'Back Office / Approvals', zh: 'Back Office / Approvals' },
  },
  {
    title: {
      ja: 'Agent Economy Classes｜サマリー：決済が発生するのは5つのうち2つだけという結論と、各Classに残る未確認',
      en: 'Agent Economy Classes | Summary: payment occurs in only 2 of the 5, and what stays unverified in each Class',
      zh: 'Agent Economy Classes｜摘要：五类中只有两类会产生支付的结论，以及各 Class 尚待确认的事项',
    },
    href: 'https://note.com/x402inc/n/n7114e5139b4c',
    tag: { ja: 'Agent Economy / Classes', en: 'Agent Economy / Classes', zh: 'Agent Economy / Classes' },
  },
  {
    title: {
      ja: 'Agentic Commerce 6事例の決済経路整理：選択肢としてのx402によるH to A市場の拡大',
      en: 'Mapping the payment paths of six Agentic Commerce cases: expanding the H-to-A market with x402 as an option',
      zh: 'Agentic Commerce 六个案例的支付路径梳理：以 x402 作为选项扩大 H to A 市场',
    },
    href: 'https://note.com/x402inc/n/n75db170cdf58',
    tag: { ja: 'Agentic Commerce / H to A', en: 'Agentic Commerce / H to A', zh: 'Agentic Commerce / H to A' },
  },
  {
    title: {
      ja: 'x402 × The Agentic Economy（第8回）agent-to-agent laborの現在地',
      en: 'x402 × The Agentic Economy (Part 8): the current state of agent-to-agent labor',
      zh: 'x402 × The Agentic Economy（第8期）agent-to-agent labor 的现状',
    },
    href: 'https://note.com/x402inc/n/n3832d071a4ee',
    tag: { ja: 'A to A / Labor', en: 'A to A / Labor', zh: 'A to A / Labor' },
  },
  {
    title: {
      ja: 'エージェント経済とオンチェーン経済の同一性——x402 Inc.のMAP・CONSUME・PRODUCE',
      en: 'The sameness of the agent economy and the on-chain economy — x402 Inc.’s MAP / CONSUME / PRODUCE',
      zh: '智能体经济与链上经济的同一性——x402 Inc. 的 MAP・CONSUME・PRODUCE',
    },
    href: 'https://note.com/x402inc/n/n2c3c515b750a',
    tag: { ja: 'Agent × Onchain', en: 'Agent × Onchain', zh: 'Agent × Onchain' },
  },
]

// Previously featured in the Update rail — moved into Insights.
const tag = (s: string): Localized => ({ ja: s, en: s, zh: s })
const ARCHIVE: Item[] = [
  { href: 'https://note.com/x402inc/n/n7beb8aba2e6a', tag: tag('Agent Economy Classes'),
    title: { ja: 'Agent Economy Classes 再設計：局面と経済形の二軸分解、複合ケースの収容、実装の横断評価', en: 'Agent Economy Classes, redesigned: a two-axis split of context and economy, composite cases, and cross-cutting review', zh: 'Agent Economy Classes 重新设计：按场景与经济形态的双轴拆解、复合案例的归类及实现的横向评估' } },
  { href: 'https://note.com/x402inc/n/n5142c1686d71', tag: tag('Strategy'),
    title: { ja: 'AIエージェント決済導入戦略指針：プロトコル選定と信頼構築の要諦', en: 'A strategy guide for adopting agent payments: protocol selection and building trust', zh: 'AI 智能体支付导入战略指南：协议选择与建立信任的要点' } },
  { href: 'https://note.com/x402inc/n/n5ce42fabd415', tag: tag('Endpoints'),
    title: { ja: 'x402 上位エンドポイント プロファイル（2026-08時点）：決済層・データ層・トレード層の内訳', en: 'Top x402 endpoints, profiled (2026-08): the payment, data and trade layers', zh: 'x402 头部端点概况（截至2026-08）：支付层、数据层、交易层的构成' } },
  { href: 'https://note.com/x402inc/n/n097adac30ebc', tag: tag('Market'),
    title: { ja: 'x402 Endpoint市場動向（2026-08-07→08-24）：1日15万〜122万call、BlockRunに最大96%が集中', en: 'x402 endpoint market trend (08-07→08-24): 150k–1.22M calls/day, up to 96% on BlockRun', zh: 'x402 Endpoint 市场动态（2026-08-07→08-24）：每日15万至122万次调用，最高96%集中于 BlockRun' } },
  { href: 'https://note.com/x402inc/n/nc28fdc36b3dc', tag: tag('Ledger'),
    title: { ja: 'x402 × Ramp 会計台帳｜自律型エージェントの支出統制PoCについて', en: 'x402 × Ramp accounting ledger: a PoC for spend controls on autonomous agents', zh: 'x402 × Ramp 会计台账｜关于自主智能体支出管控的 PoC' } },
  { href: 'https://note.com/x402inc/n/n7a6ae178fba2', tag: tag('Buyer harness'),
    title: { ja: 'AWS AgentCore Payments で買い手ハーネスを組む——動いた8シナリオと、次に回す実払い一周', en: 'Building a buyer harness on AWS AgentCore Payments — 8 scenarios that worked, and the next live loop', zh: '在 AWS AgentCore Payments 上搭建买方 harness——跑通的8个场景，以及下一步的真实支付闭环' } },
  { href: 'https://note.com/x402inc/n/na4b6acb98907', tag: tag('Internal agents'),
    title: { ja: '社内エージェントへのMPP決済の実装：mpp-agentでmpp.devにtestnet実払い（Class 1 + 4）', en: 'MPP payments for internal agents: testnet settlement to mpp.dev with mpp-agent (Class 1 + 4)', zh: '为内部智能体实现 MPP 支付：通过 mpp-agent 向 mpp.dev 进行 testnet 真实支付（Class 1 + 4）' } },
  { href: 'https://note.com/x402inc/n/nd78e3bcc229f', tag: tag('Approvals'),
    title: { ja: 'Stripe Approvalsのactor condition：agent-tagged keyによる起案と人間の承認の分離', en: 'Stripe Approvals actor conditions: separating agent-tagged proposal from human approval', zh: 'Stripe Approvals 的 actor condition：通过 agent-tagged key 将起草与人工审批分离' } },
  { href: 'https://note.com/x402inc/n/n1e8046342f2a', tag: tag('Digital ID'),
    title: { ja: 'エージェント経済のデジタルIDとは？ERC-8004 reputation・validation検証と World ID/外部評価制度に向けて', en: 'Digital identity for the agent economy: ERC-8004 reputation & validation, toward World ID', zh: '什么是智能体经济的数字身份？ERC-8004 reputation・validation 验证，以及面向 World ID/外部评价机制' } },
  { href: 'https://note.com/x402inc/n/nc4a1b2152072', tag: tag('Nowcall'),
    title: { ja: 'Japan Inflation Nowcall 2026-08-18：観測再開と盛夏の野菜高による指数の上振れ', en: 'Japan Inflation Nowcall 2026-08-18: observation resumes and a midsummer vegetable spike lifts the index', zh: 'Japan Inflation Nowcall 2026-08-18：观测恢复与盛夏蔬菜涨价推动指数上行' } },
  { href: 'https://note.com/x402inc/n/n1bed42fdb779', tag: tag('Trust Layer'),
    title: { ja: 'エージェンティックコマースの普及経路：カード網・承認制決済と決済オプションとしてのx402（サマリー2）', en: 'Adoption paths for agentic commerce: card networks, approval-based payment, and x402 as an option (summary 2)', zh: '智能体商务的普及路径：卡组织网络、授权制支付与作为支付选项的 x402（摘要2）' } },
  { href: 'https://note.com/x402inc/n/n472538977c86', tag: tag('Trust Layer'),
    title: { ja: 'エージェント決済の信頼層：カード網が担保する範囲とx402のA to A領域（サマリー1）', en: 'The trust layer of agent payments: what card networks guarantee and x402’s A-to-A domain (summary 1)', zh: '智能体支付的信任层：卡组织网络所保障的范围与 x402 的 A to A 领域（摘要1）' } },
]

export const ITEMS: Item[] = [
  ...RANKED,
  ...ARCHIVE,
  ...FEATURED_ARTICLES.map((a) => ({ title: a.title, href: a.href, tag: a.tag })),
]

/* tag: optional label for the eyebrow (the Journal shows the period) */
export function Insights({ tag }: { tag?: string } = {}) {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <SectionEyebrow label="Insights" tag={tag ?? 'Research'} heading />
          <p className="mt-4 text-fg/60 text-base leading-[1.7] max-w-xl">{t.subtext}</p>
        </div>
        <a
          href="https://note.com/x402inc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors"
        >
          {t.seeAll}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Smaller boxes; the whole card is the link */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ITEMS.map((a, i) => (
          <motion.a
            key={a.href}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.05 }}
            className="group liquid-glass rounded-xl p-4 flex flex-col hover:border-gold/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-medium tracking-wide text-gold leading-tight">
                {a.tag[lang]}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 flex-none text-fg/30 group-hover:text-gold transition-colors" />
            </div>
            <h3 className="mt-2.5 text-[13px] font-medium text-fg/60 leading-[1.6] line-clamp-4">
              {a.title[lang]}
            </h3>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
