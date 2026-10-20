import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SectionEyebrow } from '../primitives'
import { Updates } from '../sections/Updates'
import { Insights } from '../sections/Insights'
import { useLang, type Lang, type Localized } from '../i18n'

const COPY = {
  ja: {
    pageTag: '考察・調査',
    title: '考察・調査',
    intro:
      '最新のUpdate、Insights、マーケットの見立て、そして note 記事ライブラリ——x402 Inc. のリサーチをここに集約しています。',
    latest: 'Education',
    read: 'note で読む',
    thesisTag: 'x402 成長性分析',
    thesisTitle: 'Human → AI から AI ↔ AI へ——3つのフェーズ',
    libraryTag: 'note 記事',
  },
  en: {
    pageTag: 'Research',
    title: 'Research & Analysis',
    intro:
      'Latest updates, insights, our market thesis, and the full note library — all of x402 Inc.’s research, consolidated here.',
    latest: 'Education',
    read: 'Read on note',
    thesisTag: 'Growth analysis',
    thesisTitle: 'From Human → AI to AI ↔ AI — three phases',
    libraryTag: 'note articles',
  },
} satisfies Record<Lang, Record<string, string>>

type TimelineItem = { phase: string; period: Localized; desc: Localized; current?: boolean }

const TIMELINE: TimelineItem[] = [
  {
    phase: 'Phase 1',
    period: { ja: 'Human → AI（現在〜2027年）', en: 'Human → AI (now–2027)' },
    desc: {
      ja: '「人間が権限を委任し、エージェントが執行する」。限度額付きカード委任・プリロードウォレット・x402のAPIゲーティング。エージェントは人間の延長として動きます。x402はすでにここで機能しています。',
      en: '“Humans delegate authority; agents execute.” Limit-capped card delegation, preloaded wallets, x402 API gating. Agents act as an extension of humans. x402 already works here.',
    },
    current: true,
  },
  {
    phase: 'Phase 2',
    period: { ja: 'AI ↔ AI 企業間（2027〜2029年）', en: 'AI ↔ AI, enterprise (2027–2029)' },
    desc: {
      ja: '「エージェントが他のエージェントと条件交渉し、決済まで完結する（B2B）」。Google A2A・Stripe MPPがエージェント間の取引フレームワークを整備中。B2B意思決定者の53%が AI ↔ AI を許可すると回答済み。x402が決済レールとして採用されるシナリオが最も現実的です。',
      en: '“Agents negotiate terms with other agents and settle end-to-end (B2B).” Google A2A and Stripe MPP are building agent-to-agent transaction frameworks. 53% of B2B decision-makers say they’d allow AI ↔ AI. x402 being adopted as the settlement rail is the most realistic scenario.',
    },
  },
  {
    phase: 'Phase 3',
    period: { ja: 'AI ↔ AI 成熟（2029年以降）', en: 'AI ↔ AI, mature (2029+)' },
    desc: {
      ja: '「エージェントが独立した経済主体として市場に参加する」。信頼スコアリング・規制フレームワーク・エージェントIDの整備が条件。技術基盤はすでに今のx402の上に立っています。',
      en: '“Agents participate in the market as independent economic actors.” Conditional on trust scoring, regulatory frameworks and agent identity. The technical foundation already stands on today’s x402.',
    },
  },
]

type Note = { title: Localized; href: string }
type NoteColumn = { title: string; notes: Note[] }

const COLUMNS: NoteColumn[] = [
  {
    title: 'Vision',
    notes: [
      {
        title: {
          ja: 'AIエージェントがアクセスできないデータを、公共財にする',
          en: "Making data AI agents can't access a public good",
        },
        href: 'https://note.com/x402inc/n/n9f72e49f7d6e',
      },
      {
        title: {
          ja: 'エージェンティックコマース元年の「現在地」：Human → AI 段階から AI ↔ AI への移行はいつ起きるか',
          en: 'The current state in year one of agentic commerce: when does the shift from Human → AI to AI ↔ AI happen?',
        },
        href: 'https://note.com/x402inc/n/n3dc6f62c363d',
      },
      {
        title: {
          ja: 'ステーブルコイン決済の62.9%はB2B——Stripeが企業間の決済インフラを再設計する2026年',
          en: '62.9% of stablecoin payments are B2B — 2026, the year Stripe redesigns B2B payment infrastructure',
        },
        href: 'https://note.com/x402inc/n/nb266051df2bc',
      },
    ],
  },
  {
    title: 'Research',
    notes: [
      {
        title: {
          ja: 'Claude for Financial Services時代の「エージェント決済」——クレカで十分か、それともステーブルコインが必要か',
          en: '“Agent payments” in the Claude for Financial Services era — are cards enough, or do we need stablecoins?',
        },
        href: 'https://note.com/x402inc/n/n0e30d662d0f0',
      },
      {
        title: {
          ja: 'Amex ACEの「インテントコントラクト」と「シングルユーストークン」——決済レイヤーに残る最後の空白',
          en: 'Amex ACE’s “intent contracts” and “single-use tokens” — the last gap in the payments layer',
        },
        href: 'https://note.com/x402inc/n/n3defba4a1a28',
      },
      {
        title: {
          ja: 'AIエージェント × クレジットカード：MoonAgents Card・Oobit Agent Cards・Stripe Issuing for agentsを整理する',
          en: 'AI agents × credit cards: sorting out MoonAgents Card, Oobit Agent Cards and Stripe Issuing for agents',
        },
        href: 'https://note.com/x402inc/n/na798062b2b1a',
      },
      {
        title: {
          ja: 'AIエージェントがSubstackの有料記事を自律決済で読む時代——DripStackが示すx402の本命ユースケース',
          en: 'When AI agents read paywalled Substack posts via autonomous payment — the killer x402 use case DripStack shows',
        },
        href: 'https://note.com/x402inc/n/n9c179c890113',
      },
      {
        title: {
          ja: 'a16zが22億ドルを投じる理由：クリプトが「革命」を捨て「実用主義」を選んだ5つの決定的理由',
          en: 'Why a16z is investing $2.2B: five decisive reasons crypto traded “revolution” for “pragmatism”',
        },
        href: 'https://note.com/x402inc/n/n117082cc82b5',
      },
      {
        title: {
          ja: 'Stripeが「AIの経済インフラ」を本気で作り始めた——Stripe Sessions 2026、288の発表を読み解く',
          en: 'Stripe is seriously building “the economic infrastructure for AI” — decoding 288 announcements from Stripe Sessions 2026',
        },
        href: 'https://note.com/x402inc/n/nd945306fb457',
      },
    ],
  },
  {
    title: 'Research to B',
    notes: [
      {
        title: {
          ja: 'ヘッドレスマーチャント普及後の未来図——エージェント決済はクレカで足りるのかx402 が要るのか',
          en: 'The future after headless merchants go mainstream — are cards enough for agent payments, or is x402 needed?',
        },
        href: 'https://note.com/x402inc/n/nf7b60bdf0a56',
      },
      {
        title: {
          ja: 'エージェント決済スタックの MCP / Wallet / CLI を比較する——Solana / Circle / MoonPay / OKX / Coinbase / Base',
          en: 'Comparing the MCP / Wallet / CLI of agent payment stacks — Solana / Circle / MoonPay / OKX / Coinbase / Base',
        },
        href: 'https://note.com/x402inc/n/n823acd3be97e',
      },
      {
        title: {
          ja: '企業 AI 決済とは何か——承認付きの「サブスク払いのオンチェーン化」として実装する',
          en: 'What is enterprise AI payment — implementing it as approval-gated “on-chain subscription billing”',
        },
        href: 'https://note.com/x402inc/n/na3d3b01dbd1c',
      },
      {
        title: {
          ja: 'エージェント決済の未来予想図——2026 年から 2029 年への 4 つの移行',
          en: 'A forecast for agent payments — four transitions from 2026 to 2029',
        },
        href: 'https://note.com/x402inc/n/n57ac88867b5d',
      },
      {
        title: {
          ja: '需要は H→A、供給は A↔A——エージェント経済への先行投資をどう読むか',
          en: 'Demand is H→A, supply is A↔A — how to read early investment in the agent economy',
        },
        href: 'https://note.com/x402inc/n/n86211ffa3ff9',
      },
      {
        title: {
          ja: '企業 AI が「自律決済」に到達するのはいつか——プラグイン経由クレカという現実と、x402 自律決済までの距離',
          en: 'When enterprise AI reaches “autonomous payment” — the reality of plugin-based cards and the distance to x402 autonomous payment',
        },
        href: 'https://note.com/x402inc/n/n89d4f38377cd',
      },
      {
        title: {
          ja: 'AI エージェントが稼いで使うバックエンド——5 月の業界進捗を踏まえて',
          en: 'The backend where AI agents earn and spend — in light of May’s industry progress',
        },
        href: 'https://note.com/x402inc/n/nb02c810843f6',
      },
      {
        title: {
          ja: 'AI エージェントに商品を売らせるためのバックエンド——決済 4 層構造とエコシステム接続',
          en: 'The backend for letting AI agents sell products — a four-layer payment structure and ecosystem connectivity',
        },
        href: 'https://note.com/x402inc/n/n72418e4adbac',
      },
      {
        title: {
          ja: 'エージェンティックコマースのフェーズ論を更新する——Dan Shipper の 6 つの予測と、5 月の業界進捗',
          en: 'Updating the phase theory of agentic commerce — Dan Shipper’s six predictions and May’s industry progress',
        },
        href: 'https://note.com/x402inc/n/nb6f4cac169e8',
      },
    ],
  },
]

export function Research() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <>
      <PageHero eyebrow="Vision & Research" tag={t.pageTag} title={t.title} intro={t.intro} />

      {/* Latest updates + insights, consolidated at the top of the Journal */}
      <Updates />
      <Insights />

      {/* Market thesis timeline */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Market Thesis" tag={t.thesisTag} />
        <h2 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight">{t.thesisTitle}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {TIMELINE.map((item) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`liquid-glass rounded-2xl p-6 ${
                item.current ? 'ring-1 ring-gold/40' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gold">{item.phase}</span>
                {item.current && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold text-black font-semibold">
                    NOW
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-fg">{item.period[lang]}</p>
              <p className="mt-3 text-sm text-fg/60 leading-[1.7]">{item.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full note library */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Library" tag={t.libraryTag} />
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-fg/70 uppercase tracking-wide">
                {col.title}
              </h3>
              <div className="mt-4 grid gap-3">
                {col.notes.map((note) => (
                  <a
                    key={note.href}
                    href={note.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-xl p-4 flex items-start justify-between gap-3 group"
                  >
                    <p className="text-sm text-fg/80 leading-[1.6]">{note.title[lang]}</p>
                    <ArrowUpRight className="w-3.5 h-3.5 flex-none text-fg/30 group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
