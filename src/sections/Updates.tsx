import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '../primitives'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    intro:
      'note で公開している最新のリサーチと観測記録。カードをクリックすると記事に移動します。',
    hint: '横にスクロール',
    read: '記事を読む',
  },
  en: {
    intro:
      'The latest research and observation notes we publish on note. Click a card to open the article.',
    hint: 'Scroll',
    read: 'Read',
  },
}

type Update = {
  id: string // note article id (https://note.com/x402inc/n/<id>)
  tag: Localized
  title: Localized
}

// Newest first. `tag` is a short topical label; `title` mirrors the note headline.
const UPDATES: Update[] = [
  {
    id: 'n7beb8aba2e6a',
    tag: { ja: 'Agent Economy Classes', en: 'Agent Economy Classes' },
    title: {
      ja: 'Agent Economy Classes 再設計：局面と経済形の二軸分解、複合ケースの収容、実装の横断評価',
      en: 'Agent Economy Classes, redesigned: a two-axis split of context and economy, composite cases, and cross-cutting implementation review',
    },
  },
  {
    id: 'n5142c1686d71',
    tag: { ja: '戦略指針', en: 'Strategy' },
    title: {
      ja: 'AIエージェント決済導入戦略指針：プロトコル選定と信頼構築の要諦',
      en: 'A strategy guide for adopting agent payments: protocol selection and building trust',
    },
  },
  {
    id: 'n5ce42fabd415',
    tag: { ja: 'エンドポイント', en: 'Endpoints' },
    title: {
      ja: 'x402 上位エンドポイント プロファイル（2026-08時点）：決済層・データ層・トレード層の内訳',
      en: 'Top x402 endpoints, profiled (as of 2026-08): the payment, data and trade layers',
    },
  },
  {
    id: 'n097adac30ebc',
    tag: { ja: '市場動向', en: 'Market' },
    title: {
      ja: 'x402 Endpoint市場動向（2026-08-07→08-24）：1日15万〜122万call、BlockRunに最大96%が集中',
      en: 'x402 endpoint market trend (2026-08-07→08-24): 150k–1.22M calls/day, up to 96% concentrated on BlockRun',
    },
  },
  {
    id: 'nc28fdc36b3dc',
    tag: { ja: '会計台帳', en: 'Ledger' },
    title: {
      ja: 'x402 × Ramp 会計台帳｜自律型エージェントの支出統制PoCについて',
      en: 'x402 × Ramp accounting ledger: a PoC for spend controls on autonomous agents',
    },
  },
  {
    id: 'n7a6ae178fba2',
    tag: { ja: '買い手ハーネス', en: 'Buyer harness' },
    title: {
      ja: 'AWS AgentCore Payments で買い手ハーネスを組む——動いた8シナリオと、次に回す実払い一周',
      en: 'Building a buyer harness on AWS AgentCore Payments — 8 scenarios that worked, and the next live settlement loop',
    },
  },
  {
    id: 'na4b6acb98907',
    tag: { ja: '社内エージェント', en: 'Internal agents' },
    title: {
      ja: '社内エージェントへのMPP決済の実装：mpp-agentでmpp.devにtestnet実払い（Class 1 + 4）',
      en: 'Implementing MPP payments for internal agents: testnet settlement to mpp.dev with mpp-agent (Class 1 + 4)',
    },
  },
  {
    id: 'nd78e3bcc229f',
    tag: { ja: '承認分離', en: 'Approvals' },
    title: {
      ja: 'Stripe Approvalsのactor condition：agent-tagged keyによる起案と人間の承認の分離',
      en: 'Stripe Approvals actor conditions: separating agent-tagged proposal from human approval',
    },
  },
  {
    id: 'n1e8046342f2a',
    tag: { ja: 'デジタルID', en: 'Digital ID' },
    title: {
      ja: 'エージェント経済のデジタルIDとは？ERC-8004 reputation・validation検証と World ID/外部評価制度に向けて',
      en: 'Digital identity for the agent economy: verifying ERC-8004 reputation & validation, toward World ID and external reputation',
    },
  },
  {
    id: 'nc4a1b2152072',
    tag: { ja: 'Nowcast', en: 'Nowcast' },
    title: {
      ja: 'Japan Inflation Nowcast 2026-08-18：観測再開と盛夏の野菜高による指数の上振れ',
      en: 'Japan Inflation Nowcast 2026-08-18: observation resumes and a midsummer vegetable spike lifts the index',
    },
  },
  {
    id: 'n1bed42fdb779',
    tag: { ja: 'Trust Layer', en: 'Trust Layer' },
    title: {
      ja: 'エージェンティックコマースの普及経路：カード網・承認制決済と決済オプションとしてのx402（サマリー2）',
      en: 'Adoption paths for agentic commerce: card networks, approval-based payment, and x402 as an option (summary 2)',
    },
  },
  {
    id: 'n472538977c86',
    tag: { ja: 'Trust Layer', en: 'Trust Layer' },
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionEyebrow label="Update" tag="最新情報" heading />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-fg/40">
            {t.hint}
            <ArrowUpRight className="w-3 h-3 rotate-45" />
          </span>
        </div>
        <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-3xl">{t.intro}</p>
      </motion.div>

      {/* Horizontal scroll rail of clickable article cards */}
      <div className="mt-8 -mx-6 px-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 pb-2 w-max">
          {UPDATES.map((u, i) => (
            <motion.a
              key={u.id}
              href={`https://note.com/x402inc/n/${u.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.05 }}
              className="group liquid-glass rounded-2xl p-5 w-[260px] sm:w-[300px] shrink-0 flex flex-col hover:border-gold/40 transition-colors"
            >
              <span
                className="self-start text-[11px] font-mono px-2 py-0.5 rounded-full border"
                style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.4)' }}
              >
                {u.tag[lang]}
              </span>
              <p className="mt-4 text-sm font-semibold text-fg leading-[1.6] flex-1 line-clamp-5">
                {u.title[lang]}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-gold group-hover:brightness-110 transition">
                {t.read}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
