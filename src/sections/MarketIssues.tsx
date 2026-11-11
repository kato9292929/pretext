import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useLang, type Lang, type Localized } from '../i18n'
import { DNode, DiagramProvider } from '../components/Diagram'

/* Home: "Market issues" — one x402 per-call payment (E4) split into 8 steps,
   with each reported issue placed at the step and layer where it happens.
   Rebuilt from our report (public/market-issues/x402-market-issues.pdf) as a
   diagram in the site's style: hover / tap an issue for its numbers.
   Figures are the report's; nothing here is new. */

const L = (ja: string, en: string): Localized => ({ ja, en })

type Layer = 'buyer' | 'seller' | 'facilitator' | 'chain' | 'sdk'
type Seg = 'E4' | 'E5' | 'P'
// red: a reported problem / number we observed; amber: decided by that layer
// outside the spec; green: what the spec defines
type Kind = 'issue' | 'layer' | 'spec'
type Issue = { code: string; layer: Layer; step: number; kind: Kind; title: Localized; body: Localized; segs: Seg[] }

const STEPS: { name: Localized; sub: Localized }[] = [
  { name: L('選ぶ', 'Choose'), sub: L('seller を探す', 'find a seller') },
  { name: L('402 を受け取る', 'Get the 402'), sub: L('価格・入力を読む', 'read price and input') },
  { name: L('署名して送る', 'Sign and send'), sub: L('上限・受取先を確かめる', 'check limits and payee') },
  { name: L('受け取って検証へ', 'Hand to verify'), sub: L('seller が facilitator に渡す', 'seller → facilitator') },
  { name: L('検証・送信', 'Verify, settle'), sub: L('/verify・/settle', '/verify · /settle') },
  { name: L('確定', 'Confirm'), sub: L('トークンのコントラクト', 'token contract') },
  { name: L('本文を返す', 'Return the body'), sub: L('seller → buyer', 'seller → buyer') },
  { name: L('確かめる', 'Check'), sub: L('中身と送金', 'content and transfer') },
]

const LAYERS: { key: Layer; name: string; what: Localized; who: Localized; color: string }[] = [
  { key: 'buyer', name: 'buyer', what: L('ウォレット・エージェント', 'Wallet, agent'), who: L('書く主体：運用者', 'Written by: the operator'), color: '#9B7BF2' },
  { key: 'seller', name: 'seller', what: L('API サーバー', 'API server'), who: L('書く主体：seller（HTTPハンドラ・CDN）', 'Written by: the seller (HTTP handler, CDN)'), color: '#F2A65A' },
  { key: 'facilitator', name: 'facilitator', what: L('検証・送信', 'Verify, settle'), who: L('書く主体：Coinbase・Circle 等', 'Written by: Coinbase, Circle, …'), color: '#F57C8E' },
  { key: 'chain', name: L('チェーン', 'Chain').ja, what: L('トークンのコントラクト', 'Token contract'), who: L('書く主体：Circle・JPYC 等', 'Written by: Circle, JPYC, …'), color: '#5EC9A0' },
  { key: 'sdk', name: 'SDK', what: L('④〜⑦の中で動く', 'Runs inside ④–⑦'), who: L('書く主体：x402 Foundation・各社', 'Written by: x402 Foundation, vendors'), color: '#7E8BF0' },
]

// Where the payment passes: layer → step → label
const FLOW: Partial<Record<Layer, Record<number, Localized>>> = {
  buyer: { 1: L('seller を選ぶ', 'Choose a seller'), 3: L('署名して送る', 'Sign and send'), 8: L('中身と送金を確かめる', 'Check content and transfer') },
  seller: { 2: L('402 を返す', 'Return 402'), 4: L('受け取って検証へ', 'Hand to verify'), 7: L('本文を返す', 'Return the body') },
  facilitator: { 5: L('検証・送信', 'Verify, settle') },
  chain: { 6: L('確定する', 'Confirm') },
}

const ISSUES: Issue[] = [
  { code: 'B3', layer: 'buyer', step: 1, kind: 'issue', title: L('取引数の順位が実需を表さない', 'Trade-count rank is not real demand'), body: L('tx 数1位の AX1 は24時間 180,578 tx。中身は報酬を得るためのタスク実行（quests）', 'AX1, #1 by tx count, did 180,578 tx in 24h — tasks run to earn rewards (quests)'), segs: ['E4'] },
  { code: 'B4', layer: 'buyer', step: 1, kind: 'issue', title: L('buyer 1人だけの取引', 'Trades with a single buyer'), body: L('候補2,703件中 793件（29%）は buyer が1人', '793 of 2,703 candidates (29%) have one buyer'), segs: ['E4'] },
  { code: 'B5', layer: 'buyer', step: 1, kind: 'issue', title: L('同じ運営・再販の見分けがつかない', 'Same operator or resale is hard to tell'), body: L('1つの payTo に 14ホスト・buyer 2', '14 hosts and 2 buyers on one payTo'), segs: ['E4', 'E5'] },
  { code: 'B7', layer: 'buyer', step: 1, kind: 'issue', title: L('掲載が動作の保証にならない', 'A listing does not mean it works'), body: L('Circle Agent Marketplace は検証・監視しないと明記', 'Circle Agent Marketplace states it does not verify or monitor'), segs: ['E4'] },
  { code: 'B6', layer: 'buyer', step: 2, kind: 'issue', title: L('402 から入力が分からない', 'The 402 does not tell you the input'), body: L('払える約2,200ホストの 922（42%）が入力必須。厳選80件で使い方なし 6・公開どおりでも通らない 9', '922 of ~2,200 payable hosts (42%) need input. Of 80 curated: 6 without usage, 9 fail even as documented'), segs: ['E4', 'E5', 'P'] },
  { code: 'B1', layer: 'buyer', step: 3, kind: 'layer', title: L('上限の置き場所が製品ごとに違う', 'Each product puts limits elsewhere'), body: L('Circle・Coinbase・Cloudflare・AWS で別々。合計の上限を掛けられない', 'Circle, Coinbase, Cloudflare and AWS each differ; no overall cap'), segs: ['E4', 'E5', 'P'] },
  { code: 'B2', layer: 'buyer', step: 3, kind: 'issue', title: L('受取先を確かめる手順がない', 'No step to check the payee'), body: L('署名前に payTo を確かめる標準の手順がない', 'No standard way to check payTo before signing'), segs: ['E4', 'E5'] },
  { code: 'S5', layer: 'seller', step: 2, kind: 'issue', title: L('掲載価格と請求額が違う', 'Listed price ≠ charged price'), body: L('カタログと 402 の不一致 57／759ホスト。nohumans で違う請求 97件', 'Catalog vs 402 mismatch on 57/759 hosts; 97 wrong charges on nohumans'), segs: ['E4', 'E5'] },
  { code: 'S6', layer: 'seller', step: 2, kind: 'issue', title: L('署名に要る情報を載せない', 'Missing what signing needs'), body: L('EIP-712 の name・version がなく Base の USDC で署名できない', 'No EIP-712 name/version, so Base USDC cannot be signed'), segs: ['E4'] },
  { code: 'S1', layer: 'seller', step: 4, kind: 'issue', title: L('入力を確かめる前に決済する', 'Settles before checking input'), body: L('送金成立後の未納品23件中 14件は、決済のあとで 400／405', '14 of 23 paid-but-undelivered returned 400/405 after settling'), segs: ['E4', 'E5', 'P'] },
  { code: 'S7', layer: 'seller', step: 4, kind: 'issue', title: L('同じ署名で何度も返す', 'Serves the same signature again'), body: L('再送1,000回に 248回 データを返した', 'Returned data 248 times out of 1,000 replays'), segs: ['E4'] },
  { code: 'S9', layer: 'seller', step: 4, kind: 'issue', title: L('別の API の支払いで流用', 'A payment reused for another API'), body: L('署名がどのリソースへの支払いかを確かめない', 'Does not check which resource the signature pays for'), segs: ['E4', 'P'] },
  { code: 'S2', layer: 'seller', step: 7, kind: 'issue', title: L('正しい要求でも届かない', 'Correct requests still not delivered'), body: L('23件中 9件（500・503 等）。nohumans で支払い後エラー 146・再び 402 464', '9 of 23 (500, 503, …); on nohumans 146 errors after paying, 464 repeat 402s'), segs: ['E4', 'E5', 'P'] },
  { code: 'S3', layer: 'seller', step: 7, kind: 'issue', title: L('動作する API が少ない', 'Few APIs actually work'), body: L('30,600件中 動作確認 5,523件（18%）（Decixa）', '5,523 of 30,600 confirmed working (18%) (Decixa)'), segs: ['E4'] },
  { code: 'S8', layer: 'seller', step: 7, kind: 'issue', title: L('有料の応答がキャッシュから出る', 'Paid responses leak from cache'), body: L('nginx のキャッシュから 100% 流出', '100% leaked from the nginx cache'), segs: ['E4'] },
  { code: 'S4', layer: 'seller', step: 8, kind: 'issue', title: L('届いても説明と違う', 'Delivered, but not as described'), body: L('「live」の為替が 10時間前。例の入力で data: []', '“Live” FX was 10 hours old; the sample input returned data: []'), segs: ['E4', 'E5'] },
  { code: 'F1', layer: 'facilitator', step: 5, kind: 'issue', title: L('決済済みと返すが送金がない', 'Says settled, no transfer'), body: L('settlement_pending と tx を返したが、tx がチェーン上にない 5件', '5 returned settlement_pending and a tx that is not on chain'), segs: ['E4', 'E5'] },
  { code: 'F3', layer: 'facilitator', step: 5, kind: 'issue', title: L('事業者の規則違反', 'Operators break their own rules'), body: L('主要 15社すべてに違反（計 49件）', 'All 15 major operators had violations (49 in total)'), segs: ['E4', 'E5', 'P'] },
  { code: 'F4', layer: 'facilitator', step: 5, kind: 'issue', title: L('1社への集中', 'Concentration on one operator'), body: L('seller の 93%超 が1社のみに依存', 'Over 93% of sellers depend on a single operator'), segs: ['E4', 'E5'] },
  { code: 'F2', layer: 'facilitator', step: 7, kind: 'layer', title: L('決済の応答ヘッダが任意', 'The settlement header is optional'), body: L('tx を buyer に返さなくても取引が成立する', 'A trade completes without returning the tx to the buyer'), segs: ['E4', 'E5'] },
  { code: 'C1', layer: 'chain', step: 6, kind: 'spec', title: L('仕様が定めていること', 'What the spec defines'), body: L('EIP-3009 の nonce と再利用の拒否・有効期限・署名の検証。Base の revert の 56.2% は再送を弾いたもの', 'EIP-3009 nonce and reuse rejection, expiry and signature checks. 56.2% of Base reverts were blocked replays'), segs: ['E4', 'E5', 'P'] },
  { code: 'C2', layer: 'chain', step: 8, kind: 'issue', title: L('送金の有無を取り違える', 'Misreading whether money moved'), body: L('ログ検索は RPC のエラーで「送金なし」と誤る。41件が実は送金済み。authorizationState(署名者, nonce) なら確定できる', 'Log searches misread RPC errors as “no transfer”; 41 had actually settled. authorizationState(signer, nonce) is definitive'), segs: ['E4', 'E5'] },
  { code: 'K2', layer: 'sdk', step: 4, kind: 'issue', title: L('再送対策が既定で無効', 'Replay protection off by default'), body: L('再送の検出・キャッシュ禁止ヘッダを既定で行わない（3系統）→ S7・S8 の原因', 'No replay detection or no-cache headers by default (3 SDKs) → causes S7, S8'), segs: ['E4'] },
  { code: 'K3', layer: 'sdk', step: 5, kind: 'issue', title: L('Solana の支払い検証の欠陥', 'Flaw in Solana payment checks'), body: L('GHSA-qr2g-p6q7-w82m（2026年3月）。修正版 @x402/svm 2.6.0／PyPI x402 2.3.0／Go 2.5.0', 'GHSA-qr2g-p6q7-w82m (Mar 2026). Fixed in @x402/svm 2.6.0 / PyPI x402 2.3.0 / Go 2.5.0'), segs: ['E4', 'E5'] },
  { code: 'K1', layer: 'sdk', step: 7, kind: 'issue', title: L('settle の失敗を見ずに返す', 'Returns without checking settle'), body: L('Flask SDK v0.2.1 以前の既定動作', 'Default in Flask SDK v0.2.1 and earlier'), segs: ['E4'] },
]

const ACTIONS: { when: Localized; title: Localized; body: Localized; refs: string }[] = [
  {
    when: L('①②の前', 'Before ①②'),
    title: L('実購入の記録を引く', 'Look up real purchase records'),
    body: L('Seller Probe は実在の事業者のエンドポイントを使い方どおりに買い、届いたか・説明どおりかをエンドポイントごとに公開する（11/9：払った62件中50件が説明どおり）', 'Seller Probe buys real operators’ endpoints as documented and publishes, per endpoint, whether it arrived and matched the description (Nov 9: 50 of 62 paid matched)'),
    refs: 'B3–B7 · S2–S5',
  },
  {
    when: L('⑧', '⑧'),
    title: L('送金を nonce で確かめる', 'Check the transfer by nonce'),
    body: L('決済ヘッダに頼らず、USDC の authorizationState(署名者, nonce) で、自分の署名が使われたかをチェーンから直接確かめる', 'Instead of trusting the settlement header, ask USDC’s authorizationState(signer, nonce) on chain whether your signature was used'),
    refs: 'F1 · F2 · C2',
  },
  {
    when: L('⑦で届かなければ', 'If ⑦ fails'),
    title: L('同じ支払いで取り直す', 'Re-fetch with the same payment'),
    body: L('Delivery Receipt に対応した seller なら、本文のハッシュに署名したレシートを受け取り、決済し直さずに再取得できる（対応は現在 JIN・OSD）', 'With a seller that supports Delivery Receipt, you get a receipt signed over the body hash and can re-fetch without paying again (JIN and OSD today)'),
    refs: 'S1 · S2',
  },
]

const COPY = {
  ja: {
    eyebrow: 'Market issues',
    title: '仕様が守るのは署名の再送防止まで。決済しても届かない問題は外側の4層にある',
    lead: 'x402 v2 仕様の Security Considerations が定めるのは、再送の防止（nonce・有効期限・署名の検証）と認証との組み合わせだけ。予算管理やセッションは仕様の対象外で、受領より先に決済が終わり、返金・再取得の定めもない。1回の支払い（E4 per-call 調達）を8つの段階に分け、課題が起きる段階と層に置いた。',
    hint: '層をクリックすると課題が広がります。各課題にカーソルを合わせる（タップする）と、数字と該当セグメントが表示されます',
    count: (n: number) => `課題 ${n}件`,
    layer: '層',
    legend: [
      ['issue', '報告されている問題・実購入で観測した数字'],
      ['layer', '仕様の外で、その層が自分で決めていること'],
      ['spec', '仕様が定めていること'],
    ] as [Kind, string][],
    segs: '該当セグメント',
    actionsTitle: 'buyer の手元で今できること',
    source:
      '出典：x402 Protocol Specification v2、arXiv:2605.11781、arXiv:2605.30998、arXiv:2607.19545、GHSA-qr2g-p6q7-w82m、各社公開資料、x402 Endpoint（2026年11月2日取得）、Seller Probe 実購入記録（2026年10月28日〜11月9日）、nohumans.directory 公開購入記録、Decixa 月次レポート（dev.to）、Circle Agent Marketplace（2026年11月10日時点）。',
    pdf: 'PDF で見る',
  },
  en: {
    eyebrow: 'Market issues',
    title: 'The spec only protects against signature replay. Paid-but-not-delivered problems live in the four layers outside it',
    lead: 'The Security Considerations of the x402 v2 spec cover only replay protection (nonce, expiry, signature checks) and how it combines with authentication. Budgets and sessions are out of scope; payment settles before delivery, and there is no rule for refunds or re-fetching. We split one payment (E4 per-call procurement) into 8 steps and placed each issue at the step and layer where it happens.',
    hint: 'Click a layer to open its issues. Hover (or tap) an issue to see its numbers and segments',
    count: (n: number) => `${n} issues`,
    layer: 'Layer',
    legend: [
      ['issue', 'Reported problems and numbers from real purchases'],
      ['layer', 'Decided by that layer, outside the spec'],
      ['spec', 'Defined by the spec'],
    ] as [Kind, string][],
    segs: 'Segments',
    actionsTitle: 'What a buyer can do today',
    source:
      'Sources: x402 Protocol Specification v2, arXiv:2605.11781, arXiv:2605.30998, arXiv:2607.19545, GHSA-qr2g-p6q7-w82m, public materials from each company, x402 Endpoint (fetched Nov 2, 2026), Seller Probe purchase records (Oct 28 – Nov 9, 2026), nohumans.directory public purchase records, Decixa monthly report (dev.to), Circle Agent Marketplace (as of Nov 10, 2026).',
    pdf: 'View as PDF',
  },
}

const KIND_DOT: Record<Kind, string> = { issue: 'bg-[#F57C8E]', layer: 'bg-[#F2D57A]', spec: 'bg-[#5EC9A0]' }

function SegTags({ segs, lang }: { segs: Seg[]; lang: Lang }) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      {segs.map((s) => (
        <span key={s} className="rounded border border-fg/20 px-1 font-mono text-[9px] leading-[1.5] text-fg/60">
          {s === 'P' ? (lang === 'ja' ? '型P' : 'Type P') : s}
        </span>
      ))}
    </span>
  )
}

function IssueFace({ i, lang }: { i: Issue; lang: Lang }) {
  return (
    <span className="flex h-full flex-col items-start gap-1 text-left">
      <span className="flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${KIND_DOT[i.kind]}`} />
        <span className="font-mono text-[10px] text-fg/50">{i.code}</span>
      </span>
      <span className="text-[11.5px] font-medium leading-[1.45] text-fg">{i.title[lang]}</span>
    </span>
  )
}

function IssueDetail({ i, lang, segLabel }: { i: Issue; lang: Lang; segLabel: string }) {
  const step = STEPS[i.step - 1]
  return (
    <div className="p-4">
      <p className="flex items-center gap-2 text-[11px] text-fg/50">
        <span className={`h-2 w-2 rounded-full ${KIND_DOT[i.kind]}`} />
        <span className="font-mono">{i.code}</span>
        <span>
          {'①②③④⑤⑥⑦⑧'[i.step - 1]} {step.name[lang]} · {i.layer}
        </span>
      </p>
      <p className="mt-2 text-sm font-semibold text-fg">{i.title[lang]}</p>
      <p className="mt-1.5 text-sm leading-[1.7] text-fg/70">{i.body[lang]}</p>
      <p className="mt-3 flex items-center gap-2 text-[11px] text-fg/45">
        {segLabel}
        <SegTags segs={i.segs} lang={lang} />
      </p>
    </div>
  )
}

function FlowPill({ label, color }: { label: string; color: string }) {
  return (
    <span className="mb-1.5 block rounded-full px-2 py-0.5 text-center text-[10px] font-semibold leading-[1.4] text-[#0b0b0b]" style={{ background: color }}>
      {label}
    </span>
  )
}

export function MarketIssues() {
  const { lang } = useLang()
  const t = COPY[lang]
  const cols = 'grid-cols-[7.5rem_repeat(8,minmax(0,1fr))]'
  // Layers start folded (flow + issue codes only); clicking a layer opens it.
  const [open, setOpen] = useState<Set<Layer>>(() => new Set())
  const toggle = (k: Layer) =>
    setOpen((cur) => {
      const next = new Set(cur)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  const layerName = (ly: (typeof LAYERS)[number]) => (lang === 'ja' ? ly.name : ly.key === 'chain' ? 'Chain' : ly.name)
  return (
    <div className="relative max-w-6xl mx-auto px-6 mt-16 md:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs tracking-widest text-gold">{t.eyebrow}</p>
        <h3 className="mt-2 max-w-4xl text-xl md:text-2xl font-semibold tracking-tight text-fg leading-[1.4]">{t.title}</h3>
        <p className="mt-3 max-w-3xl text-sm text-fg/60 leading-[1.8]">{t.lead}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-fg/55">
          {t.legend.map(([k, label]) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${KIND_DOT[k]}`} />
              {label}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-fg/40">{t.hint}</p>
      </motion.div>

      <DiagramProvider className="liquid-glass mt-6 rounded-2xl p-3 md:p-4">
        {/* lg+: layers × 8 steps */}
        <div className="hidden lg:block">
          <div className={`grid ${cols} gap-1.5`}>
            <div className="px-2 py-2 text-[11px] text-fg/45">{t.layer}</div>
            {STEPS.map((s, k) => (
              <div key={k} className="rounded-lg bg-fg/[0.06] px-1.5 py-2 text-center">
                <p className="text-[11.5px] font-semibold text-fg">
                  {'①②③④⑤⑥⑦⑧'[k]} {s.name[lang]}
                </p>
                <p className="text-[10px] text-fg/45">{s.sub[lang]}</p>
              </div>
            ))}
          </div>
          {LAYERS.map((ly) => (
            <div key={ly.key} className={`mt-1.5 grid ${cols} gap-1.5 border-t border-fg/10 pt-1.5`}>
              <button
                type="button"
                aria-expanded={open.has(ly.key)}
                onClick={() => toggle(ly.key)}
                className="self-start rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-fg/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <span className="flex items-center gap-1.5">
                  <span className="inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold text-[#0b0b0b]" style={{ background: ly.color }}>
                    {layerName(ly)}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-fg/50 transition-transform ${open.has(ly.key) ? 'rotate-180' : ''}`} />
                </span>
                <span className="mt-1.5 block text-[10.5px] text-fg/60">{ly.what[lang]}</span>
                {open.has(ly.key) && <span className="mt-0.5 block text-[10px] leading-[1.5] text-fg/40">{ly.who[lang]}</span>}
                {!open.has(ly.key) && (
                  <span className="mt-0.5 block text-[10px] text-fg/40">
                    {t.count(ISSUES.filter((i) => i.layer === ly.key).length)}
                  </span>
                )}
              </button>
              {STEPS.map((_, k) => {
                const step = k + 1
                const flow = FLOW[ly.key]?.[step]
                const items = ISSUES.filter((i) => i.layer === ly.key && i.step === step)
                return (
                  <div key={k} className="min-w-0 space-y-1.5 py-1">
                    {flow && <FlowPill label={flow[lang]} color={ly.color} />}
                    {!open.has(ly.key) && items.length > 0 && (
                      // folded: just the issue codes; clicking opens the layer
                      <button type="button" onClick={() => toggle(ly.key)} className="flex flex-wrap gap-1" aria-label={`${layerName(ly)}: ${items.map((i) => i.code).join(', ')}`}>
                        {items.map((i) => (
                          <span key={i.code} className="inline-flex items-center gap-1 rounded-md border border-fg/15 bg-bg/40 px-1.5 py-0.5 font-mono text-[10px] text-fg/70 hover:border-fg/35">
                            <span className={`h-1.5 w-1.5 rounded-full ${KIND_DOT[i.kind]}`} />
                            {i.code}
                          </span>
                        ))}
                      </button>
                    )}
                    {open.has(ly.key) && items.map((i) => (
                      <DNode
                        key={i.code}
                        id={`mi-${i.code}`}
                        label={`${i.code} ${i.title[lang]}`}
                        align={step <= 4 ? 'left' : 'right'}
                        faceClassName="!px-2 !py-2"
                        face={<IssueFace i={i} lang={lang} />}
                        detail={<IssueDetail i={i} lang={lang} segLabel={t.segs} />}
                      />
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* below lg: grouped by layer, in step order */}
        <div className="space-y-3 lg:hidden">
          {LAYERS.map((ly) => (
            <div key={ly.key}>
              <button type="button" aria-expanded={open.has(ly.key)} onClick={() => toggle(ly.key)} className="flex w-full items-center gap-2 rounded-lg py-1 text-left">
                <span className="inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold text-[#0b0b0b]" style={{ background: ly.color }}>
                  {layerName(ly)}
                </span>
                <span className="text-[11px] text-fg/50">{ly.what[lang]}</span>
                <span className="ml-auto text-[10px] text-fg/40">{t.count(ISSUES.filter((i) => i.layer === ly.key).length)}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-fg/50 transition-transform ${open.has(ly.key) ? 'rotate-180' : ''}`} />
              </button>
              <div className={`mt-2 grid-cols-2 gap-2 ${open.has(ly.key) ? 'grid' : 'hidden'}`}>
                {ISSUES.filter((i) => i.layer === ly.key).map((i) => (
                  <DNode
                    key={i.code}
                    id={`mi-m-${i.code}`}
                    label={`${i.code} ${i.title[lang]}`}
                    faceClassName="!px-2 !py-2"
                    face={
                      <span className="block text-left">
                        <span className="text-[10px] text-fg/45">
                          {'①②③④⑤⑥⑦⑧'[i.step - 1]} {STEPS[i.step - 1].name[lang]}
                        </span>
                        <IssueFace i={i} lang={lang} />
                      </span>
                    }
                    detail={<IssueDetail i={i} lang={lang} segLabel={t.segs} />}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </DiagramProvider>

      {/* what a buyer can do today */}
      <p className="mt-8 text-sm font-semibold text-fg">{t.actionsTitle}</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {ACTIONS.map((a) => (
          <div key={a.refs} className="liquid-glass rounded-2xl p-4">
            <p className="flex items-center justify-between gap-2 text-[11px] text-fg/50">
              <span>{a.when[lang]}</span>
              <span className="font-mono">{a.refs}</span>
            </p>
            <p className="mt-1.5 text-sm font-semibold text-fg">{a.title[lang]}</p>
            <p className="mt-1.5 text-xs leading-[1.75] text-fg/60">{a.body[lang]}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10.5px] leading-[1.7] text-fg/35">{t.source}</p>
      <a
        href="/market-issues/x402-market-issues.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors"
      >
        {t.pdf}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  )
}
