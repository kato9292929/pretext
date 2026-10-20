import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLang, type Localized } from '../i18n'

/* Products in four layers, the PoC list and the ecosystem map — shown under the
   Ecosystem section on the home page. Numbers come from the 2026-10-20 update
   instructions only; do not add estimated figures here. */

type Item = { name: string; href: string }
type Layer = { layer: string; label: Localized; items: Item[]; desc: Localized }

const LAYERS: Layer[] = [
  {
    layer: 'MAP',
    label: { ja: '発見', en: 'Discovery' },
    items: [{ name: 'x402 Endpoint', href: 'https://endpoint.x402jp.com' }],
    desc: {
      ja: 'x402 の公開カタログの日次スナップショット。2026年10月19日時点 161,826エンドポイント・13,701ホスト',
      en: 'Daily snapshots of the public x402 catalog. 161,826 endpoints and 13,701 hosts as of Oct 19, 2026',
    },
  },
  {
    layer: 'CONSUME',
    label: { ja: '消費', en: 'Consumption' },
    items: [{ name: 'x402 Autonomous Agent', href: 'https://aa.x402jp.com' }],
    desc: {
      ja: 'ERC-8004 の ID を持ち、毎朝06:00 JST に per-call で購入する買い手。週次で外部6先にも実払い',
      en: 'A buyer with an ERC-8004 ID that buys per-call every morning at 06:00 JST. Each week it also makes real payments to 6 external sellers',
    },
  },
  {
    layer: 'PRODUCE',
    label: { ja: 'データ生成', en: 'Data production' },
    items: [
      { name: 'Onchain Stock Data', href: 'https://osd.x402jp.com' },
      { name: 'Japan Inflation Nowcall', href: 'https://jin.x402jp.com' },
    ],
    desc: {
      ja: 'x402 で売る自社のデータ。カタリスト採点・食品物価指数',
      en: 'Our own data, sold over x402: catalyst scoring and a food price index',
    },
  },
  {
    layer: 'MARKET',
    label: { ja: '市場', en: 'Market' },
    items: [
      { name: 'x402 RFQ Market（E5）', href: 'https://rfq.x402jp.com' },
      { name: 'x402 Seller Probe（E4）', href: 'https://probe.x402jp.com' },
    ],
    desc: {
      ja: 'RFQ Market：買い手が条件を出し、売り手が競う市場。devnet 稼働中、Solana Agave 4.4 の rent 引き下げ後の2026年11月に mainnet 公開。Seller Probe：売り手の 402・決済・納品を外から測りスコアを公開',
      en: 'RFQ Market: buyers post conditions and sellers compete. Running on devnet; mainnet launch in November 2026, after the Solana Agave 4.4 rent reduction. Seller Probe: measures sellers’ 402, payment and delivery from outside and publishes a score',
    },
  },
]

// Status words are fixed to this set.
type Status = '完了' | '稼働中' | '準備完了' | '計測準備' | '計測設計' | '実証案' | '基準案' | '整理' | '導入中'
const STATUS_EN: Record<Status, string> = {
  完了: 'Done',
  稼働中: 'Running',
  準備完了: 'Ready',
  計測準備: 'Preparing measurement',
  計測設計: 'Designing measurement',
  実証案: 'Proposed',
  基準案: 'Draft criteria',
  整理: 'Mapped',
  導入中: 'Rolling out',
}

type Poc = { name: Localized; status: Status; note: Localized; href: string }
type PocGroup = { title: Localized; rows: Poc[] }

const POCS: PocGroup[] = [
  {
    title: { ja: 'x402 Autonomous Agent に組み込む実証', en: 'Built into x402 Autonomous Agent' },
    rows: [
      {
        name: { ja: '外部売り手への週次 sweep', en: 'Weekly sweep of external sellers' },
        status: '稼働中',
        note: { ja: '外部6先・第43週 $0.014', en: '6 external sellers · week 43: $0.014' },
        href: 'https://note.com/x402inc/n/n35a9a3fd25de',
      },
      {
        name: { ja: 'Hermes mpp-agent × Exa（MPP）', en: 'Hermes mpp-agent × Exa (MPP)' },
        status: '準備完了',
        note: { ja: '$0.007 の支払いに4つの上限判定', en: 'Four limit checks on a $0.007 payment' },
        href: 'https://note.com/x402inc/n/n9bf4a3157b21',
      },
      {
        name: { ja: 'AWS AgentCore Payments ハーネス', en: 'AWS AgentCore Payments harness' },
        status: '実証案',
        note: { ja: 'AC-1〜AC-4', en: 'AC-1 to AC-4' },
        href: 'https://note.com/x402inc/n/n1593a2538d4a',
      },
      {
        name: { ja: 'Arcium MXE 秘匿取引', en: 'Arcium MXE confidential trades' },
        status: '計測設計',
        note: { ja: '5種類の秘匿取引', en: '5 kinds of confidential trades' },
        href: 'https://note.com/x402inc/n/na418a03844e9',
      },
    ],
  },
  {
    title: {
      ja: 'Onchain Stock Data・Japan Inflation Nowcall の販売経路の実証',
      en: 'Sales channels for Onchain Stock Data and Japan Inflation Nowcall',
    },
    rows: [
      {
        name: { ja: 'JPYC × x402（Polygon mainnet）', en: 'JPYC × x402 (Polygon mainnet)' },
        status: '完了',
        note: { ja: '円建て per-call 決済2件', en: '2 yen-denominated per-call payments' },
        href: 'https://note.com/x402inc/n/n6baddc090c6a',
      },
      {
        name: { ja: 'Nevermined カード払い 実証1・2', en: 'Nevermined card payments, PoC 1 & 2' },
        status: '計測準備',
        note: { ja: 'USDC・カードの併売', en: 'Selling with both USDC and card' },
        href: 'https://note.com/x402inc/n/n183c24390c12',
      },
      {
        name: { ja: 'Crossmint 2経路の購入', en: 'Crossmint purchases via 2 routes' },
        status: '実証案',
        note: { ja: 'ウォレットとカードの2経路', en: 'Wallet and card routes' },
        href: 'https://note.com/x402inc/n/n832fe623f599',
      },
    ],
  },
  {
    title: { ja: '横断', en: 'Cross-cutting' },
    rows: [
      {
        name: { ja: 'Stripe Approvals デモ', en: 'Stripe Approvals demo' },
        status: '整理',
        note: { ja: '支出統制9方式の中の位置', en: 'Where it sits among 9 spend-control methods' },
        href: 'https://note.com/x402inc/n/na18368ec5f8c',
      },
      {
        name: { ja: 'ウォレット間決済の確認基準案', en: 'Draft criteria for wallet-to-wallet payments' },
        status: '基準案',
        note: { ja: '7製品・8項目', en: '7 products · 8 items' },
        href: 'https://note.com/x402inc/n/n07bd1b08bccf',
      },
      {
        name: { ja: '開発セキュリティ体制', en: 'Development security setup' },
        status: '導入中',
        note: { ja: 'Claude Security〜段階リリース', en: 'From Claude Security to staged releases' },
        href: 'https://note.com/x402inc/n/nfd0e6d606ddf',
      },
    ],
  },
]

const COPY = {
  ja: { products: 'プロダクト', pocs: '実証', read: '記事', mapAlt: 'x402 Inc. のプロダクトと実証の関係（2026年10月20日時点）' },
  en: { products: 'Products', pocs: 'Proofs of concept', read: 'Article', mapAlt: 'How x402 Inc.’s products and proofs of concept relate (as of Oct 20, 2026)' },
}

const ease = [0.22, 1, 0.36, 1] as const

function EcosystemMap({ alt }: { alt: string }) {
  // Drop the file at public/ecosystem/x402-ecosystem-map.png (1600×980). Hidden until it exists.
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-fg/10 bg-black">
      <img
        src="/ecosystem/x402-ecosystem-map.png"
        alt={alt}
        width={1600}
        height={980}
        loading="lazy"
        onError={() => setOk(false)}
        className="block w-full h-auto"
      />
    </figure>
  )
}

export function EcosystemProducts() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <>
      {/* Products — four layers */}
      <div className="mt-12 pt-10 border-t border-fg/10">
        <h3 className="text-xs uppercase tracking-widest text-gold">{t.products}</h3>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.layer}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="liquid-glass rounded-2xl p-5 flex flex-col"
            >
              <p className="font-mono text-xs text-gold">
                {l.layer}
                <span className="ml-1.5 text-fg/45">（{l.label[lang]}）</span>
              </p>
              <ul className="mt-3 space-y-1.5">
                {l.items.map((it) => (
                  <li key={it.href}>
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-fg hover:text-gold transition-colors"
                    >
                      {it.name}
                      <ArrowUpRight className="w-3 h-3 text-fg/40" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-fg/60 leading-[1.7]">{l.desc[lang]}</p>
            </motion.div>
          ))}
        </div>

        <EcosystemMap alt={t.mapAlt} />
      </div>

      {/* Proofs of concept */}
      <div className="mt-12 pt-10 border-t border-fg/10">
        <h3 className="text-xs uppercase tracking-widest text-gold">{t.pocs}</h3>
        <div className="mt-6 space-y-8">
          {POCS.map((g) => (
            <div key={g.title.ja}>
              <h4 className="text-sm font-semibold text-fg">{g.title[lang]}</h4>
              <ul className="mt-3 border-t border-fg/10">
                {g.rows.map((r) => (
                  <li
                    key={r.href}
                    className="grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,2.2fr)_7.5rem_minmax(0,2fr)_auto] items-baseline gap-x-4 gap-y-1 py-3 border-b border-fg/10"
                  >
                    <span className="text-sm text-fg/85">{r.name[lang]}</span>
                    <span className="justify-self-end md:justify-self-start">
                      <span className="inline-flex rounded-full border border-gold/40 px-2 py-0.5 text-[11px] text-gold whitespace-nowrap">
                        {lang === 'ja' ? r.status : STATUS_EN[r.status]}
                      </span>
                    </span>
                    <span className="text-xs text-fg/55 leading-[1.6]">{r.note[lang]}</span>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="justify-self-end inline-flex items-center gap-1 text-xs text-fg/60 hover:text-gold transition-colors"
                    >
                      {t.read}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
