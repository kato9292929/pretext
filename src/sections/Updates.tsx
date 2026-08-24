import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: { read: '記事を読む' },
  en: { read: 'Read' },
}

type Update = {
  id: string // note article id (https://note.com/x402inc/n/<id>)
  tag: string // English label, shown in both languages
  title: Localized
}

// Newest first. `tag` is a short topical label; `title` mirrors the note headline.
const UPDATES: Update[] = [
  {
    id: 'n7beb8aba2e6a',
    tag: 'Agent Economy Classes',
    title: {
      ja: 'Agent Economy Classes 再設計：局面と経済形の二軸分解、複合ケースの収容、実装の横断評価',
      en: 'Agent Economy Classes, redesigned: a two-axis split of context and economy, composite cases, and cross-cutting implementation review',
    },
  },
  {
    id: 'n5142c1686d71',
    tag: 'Strategy',
    title: {
      ja: 'AIエージェント決済導入戦略指針：プロトコル選定と信頼構築の要諦',
      en: 'A strategy guide for adopting agent payments: protocol selection and building trust',
    },
  },
  {
    id: 'n5ce42fabd415',
    tag: 'Endpoints',
    title: {
      ja: 'x402 上位エンドポイント プロファイル（2026-08時点）：決済層・データ層・トレード層の内訳',
      en: 'Top x402 endpoints, profiled (as of 2026-08): the payment, data and trade layers',
    },
  },
  {
    id: 'n097adac30ebc',
    tag: 'Market',
    title: {
      ja: 'x402 Endpoint市場動向（2026-08-07→08-24）：1日15万〜122万call、BlockRunに最大96%が集中',
      en: 'x402 endpoint market trend (2026-08-07→08-24): 150k–1.22M calls/day, up to 96% concentrated on BlockRun',
    },
  },
  {
    id: 'nc28fdc36b3dc',
    tag: 'Ledger',
    title: {
      ja: 'x402 × Ramp 会計台帳｜自律型エージェントの支出統制PoCについて',
      en: 'x402 × Ramp accounting ledger: a PoC for spend controls on autonomous agents',
    },
  },
  {
    id: 'n7a6ae178fba2',
    tag: 'Buyer harness',
    title: {
      ja: 'AWS AgentCore Payments で買い手ハーネスを組む——動いた8シナリオと、次に回す実払い一周',
      en: 'Building a buyer harness on AWS AgentCore Payments — 8 scenarios that worked, and the next live settlement loop',
    },
  },
  {
    id: 'na4b6acb98907',
    tag: 'Internal agents',
    title: {
      ja: '社内エージェントへのMPP決済の実装：mpp-agentでmpp.devにtestnet実払い（Class 1 + 4）',
      en: 'Implementing MPP payments for internal agents: testnet settlement to mpp.dev with mpp-agent (Class 1 + 4)',
    },
  },
  {
    id: 'nd78e3bcc229f',
    tag: 'Approvals',
    title: {
      ja: 'Stripe Approvalsのactor condition：agent-tagged keyによる起案と人間の承認の分離',
      en: 'Stripe Approvals actor conditions: separating agent-tagged proposal from human approval',
    },
  },
  {
    id: 'n1e8046342f2a',
    tag: 'Digital ID',
    title: {
      ja: 'エージェント経済のデジタルIDとは？ERC-8004 reputation・validation検証と World ID/外部評価制度に向けて',
      en: 'Digital identity for the agent economy: verifying ERC-8004 reputation & validation, toward World ID and external reputation',
    },
  },
  {
    id: 'nc4a1b2152072',
    tag: 'Nowcast',
    title: {
      ja: 'Japan Inflation Nowcast 2026-08-18：観測再開と盛夏の野菜高による指数の上振れ',
      en: 'Japan Inflation Nowcast 2026-08-18: observation resumes and a midsummer vegetable spike lifts the index',
    },
  },
  {
    id: 'n1bed42fdb779',
    tag: 'Trust Layer',
    title: {
      ja: 'エージェンティックコマースの普及経路：カード網・承認制決済と決済オプションとしてのx402（サマリー2）',
      en: 'Adoption paths for agentic commerce: card networks, approval-based payment, and x402 as an option (summary 2)',
    },
  },
  {
    id: 'n472538977c86',
    tag: 'Trust Layer',
    title: {
      ja: 'エージェント決済の信頼層：カード網が担保する範囲とx402のA to A領域（サマリー1）',
      en: 'The trust layer of agent payments: what card networks guarantee and x402’s A-to-A domain (summary 1)',
    },
  },
]

export function Updates() {
  const { lang } = useLang()
  const t = COPY[lang]
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

      {/* Two-row horizontal-scroll rail of clickable article cards (no vertical motion) */}
      <div className="mt-8 -mx-6 px-6 overflow-x-auto no-scrollbar">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[260px] sm:auto-cols-[300px] gap-4 pb-2">
          {UPDATES.map((u) => (
            <a
              key={u.id}
              href={`https://note.com/x402inc/n/${u.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group liquid-glass rounded-2xl p-5 h-full flex flex-col hover:border-gold/40 transition-colors"
            >
              <span
                className="self-start text-[11px] font-mono px-2 py-0.5 rounded-full border"
                style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
              >
                {u.tag}
              </span>
              <p className="mt-4 text-sm font-semibold text-fg leading-[1.6] flex-1 line-clamp-4">
                {u.title[lang]}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-gold group-hover:brightness-110 transition">
                {t.read}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
