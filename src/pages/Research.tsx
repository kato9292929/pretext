import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SectionEyebrow } from '../primitives'
import { FEATURED_ARTICLES } from '../articles'

const TIMELINE = [
  {
    phase: 'Phase 1',
    period: 'Human → AI（現在〜2027年）',
    desc: '「人間が権限を委任し、エージェントが執行する」。限度額付きカード委任・プリロードウォレット・x402のAPIゲーティング。エージェントは人間の延長として動きます。x402はすでにここで機能しています。',
    current: true,
  },
  {
    phase: 'Phase 2',
    period: 'AI ↔ AI 企業間（2027〜2029年）',
    desc: '「エージェントが他のエージェントと条件交渉・決済まで自律完結（B2B）」。Google A2A・Stripe MPPがエージェント間の取引フレームワークを整備中。B2B意思決定者の53%が AI ↔ AI を許可すると回答済み。x402が決済レールとして採用されるシナリオが最も現実的です。',
  },
  {
    phase: 'Phase 3',
    period: 'AI ↔ AI 完全自律（2029年以降）',
    desc: '「エージェントが独立した経済主体として市場に参加する」。信頼スコアリング・規制フレームワーク・エージェントIDの整備が条件。技術基盤はすでに今のx402の上に立っています。',
  },
]

type Note = { title: string; href: string }
type NoteColumn = { title: string; notes: Note[] }

const COLUMNS: NoteColumn[] = [
  {
    title: 'Vision',
    notes: [
      {
        title: 'AIエージェントがアクセスできないデータを、公共財にする',
        href: 'https://note.com/x402inc/n/n9f72e49f7d6e',
      },
      {
        title:
          'エージェンティックコマース元年の「現在地」：Human → AI 段階から AI ↔ AI への移行はいつ起きるか',
        href: 'https://note.com/x402inc/n/n3dc6f62c363d',
      },
      {
        title:
          'ステーブルコイン決済の62.9%はB2B——Stripeが企業間の決済インフラを再設計する2026年',
        href: 'https://note.com/x402inc/n/nb266051df2bc',
      },
    ],
  },
  {
    title: 'Research',
    notes: [
      {
        title:
          'Claude for Financial Services時代の「エージェント決済」——クレカで十分か、それともステーブルコインが必要か',
        href: 'https://note.com/x402inc/n/n0e30d662d0f0',
      },
      {
        title:
          'Amex ACEの「インテントコントラクト」と「シングルユーストークン」——決済レイヤーに残る最後の空白',
        href: 'https://note.com/x402inc/n/n3defba4a1a28',
      },
      {
        title:
          'AIエージェント × クレジットカード：MoonAgents Card・Oobit Agent Cards・Stripe Issuing for agentsを整理する',
        href: 'https://note.com/x402inc/n/na798062b2b1a',
      },
      {
        title:
          'AIエージェントがSubstackの有料記事を自律決済で読む時代——DripStackが示すx402の本命ユースケース',
        href: 'https://note.com/x402inc/n/n9c179c890113',
      },
      {
        title:
          'a16zが22億ドルを投じる理由：クリプトが「革命」を捨て「実用主義」を選んだ5つの決定的理由',
        href: 'https://note.com/x402inc/n/n117082cc82b5',
      },
      {
        title:
          'Stripeが「AIの経済インフラ」を本気で作り始めた——Stripe Sessions 2026、288の発表を読み解く',
        href: 'https://note.com/x402inc/n/nd945306fb457',
      },
    ],
  },
  {
    title: 'Research to B',
    notes: [
      {
        title:
          'ヘッドレスマーチャント普及後の未来図——エージェント決済はクレカで足りるのかx402 が要るのか',
        href: 'https://note.com/x402inc/n/nf7b60bdf0a56',
      },
      {
        title:
          'エージェント決済スタックの MCP / Wallet / CLI を比較する——Solana / Circle / MoonPay / OKX / Coinbase / Base',
        href: 'https://note.com/x402inc/n/n823acd3be97e',
      },
      {
        title: '企業 AI 決済とは何か——承認付きの「サブスク払いのオンチェーン化」として実装する',
        href: 'https://note.com/x402inc/n/na3d3b01dbd1c',
      },
      {
        title: 'エージェント決済の未来予想図——2026 年から 2029 年への 4 つの移行',
        href: 'https://note.com/x402inc/n/n57ac88867b5d',
      },
      {
        title: '需要は H→A、供給は A↔A——エージェント経済への先行投資をどう読むか',
        href: 'https://note.com/x402inc/n/n86211ffa3ff9',
      },
      {
        title:
          '企業 AI が「自律決済」に到達するのはいつか——プラグイン経由クレカという現実と、x402 自律決済までの距離',
        href: 'https://note.com/x402inc/n/n89d4f38377cd',
      },
      {
        title: 'AI エージェントが稼いで使うバックエンド——5 月の業界進捗を踏まえて',
        href: 'https://note.com/x402inc/n/nb02c810843f6',
      },
      {
        title: 'AI エージェントに商品を売らせるためのバックエンド——決済 4 層構造とエコシステム接続',
        href: 'https://note.com/x402inc/n/n72418e4adbac',
      },
      {
        title:
          'エージェンティックコマースのフェーズ論を更新する——Dan Shipper の 6 つの予測と、5 月の業界進捗',
        href: 'https://note.com/x402inc/n/nb6f4cac169e8',
      },
    ],
  },
]

function NoteCard({ note }: { note: Note }) {
  return (
    <a
      href={note.href}
      target="_blank"
      rel="noopener noreferrer"
      className="liquid-glass rounded-xl p-4 flex flex-col gap-3 group"
    >
      <p className="text-sm text-white/80 leading-[1.6] flex-1">{note.title}</p>
      <span className="inline-flex items-center gap-1 text-xs text-white/50 group-hover:text-[#E8C338] transition-colors">
        note で読む
        <ArrowUpRight className="w-3 h-3" />
      </span>
    </a>
  )
}

export function Research() {
  return (
    <>
      <PageHero
        eyebrow="Vision & Research"
        tag="考察・調査"
        title="考察・調査"
        intro="エージェント決済の「現在地」を、一次情報から読み解く。委任付き自律決済から market の拡大まで、x402 Inc. の視点で継続的に分析しています。"
      />

      {/* Featured latest articles */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <p className="text-xs uppercase tracking-widest text-white/40">最新の考察</p>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {FEATURED_ARTICLES.map((article, i) => (
            <motion.a
              key={article.href}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="liquid-glass rounded-2xl p-6 flex flex-col group"
            >
              <span className="text-xs font-medium tracking-wide text-[#E8C338]">
                {article.tag}
              </span>
              <h3 className="mt-4 text-base font-semibold text-white leading-[1.5] flex-1">
                {article.title}
              </h3>
              <p className="mt-3 text-sm text-white/55 leading-[1.7]">{article.blurb}</p>
              <span className="mt-5 pt-4 border-t border-white/10 inline-flex items-center gap-1 text-xs text-white/60 group-hover:text-[#E8C338] transition-colors">
                note で読む
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Market thesis timeline */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Market Thesis" tag="x402 成長性分析" />
        <h2 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight">
          Human → AI から AI ↔ AI へ——3つのフェーズ
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {TIMELINE.map((item) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`liquid-glass rounded-2xl p-6 ${
                item.current ? 'ring-1 ring-[#E8C338]/40' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#E8C338]">{item.phase}</span>
                {item.current && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8C338] text-black font-semibold">
                    NOW
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-white">{item.period}</p>
              <p className="mt-3 text-sm text-white/60 leading-[1.7]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full note library */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Library" tag="note 記事" />
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
                {col.title}
              </h3>
              <div className="mt-4 grid gap-3">
                {col.notes.map((note) => (
                  <NoteCard key={note.href} note={note} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
