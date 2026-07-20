/**
 * hero.ts — Pretext-powered animated hero section
 *
 * Uses @chenglou/pretext for DOM-free text measurement and layout.
 * Text flows in two columns around animated golden orbs,
 * all without triggering browser reflows.
 */
import {
  prepareWithSegments,
  layoutNextLine,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from '@chenglou/pretext'

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT_SIZE = 15
const LINE_HEIGHT = Math.round(FONT_SIZE * 1.78) // ≈ 27px
const FONT = `${FONT_SIZE}px/${LINE_HEIGHT}px "Noto Sans JP", sans-serif`

const MOBILE_FONT_SIZE = 12
const MOBILE_LINE_HEIGHT = Math.round(MOBILE_FONT_SIZE * 1.75) // ≈ 21px
const MOBILE_FONT = `${MOBILE_FONT_SIZE}px/${MOBILE_LINE_HEIGHT}px "Noto Sans JP", sans-serif`
const COL_PAD_H = 48   // horizontal outer padding
const COL_GAP   = 44   // gap between columns
const ORB_PAD   = 18   // clearance around orb radius
const MAX_POOL  = 300  // pre-allocated line element pool

// ── Body text ─────────────────────────────────────────────────────────────────

const BODY_TEXT_JA =
  'エージェンティックコマースの習熟度は、現在レベル1〜2です。Stripeが東京のイベントで' +
  '提示したフレームによれば、レベル1は「フォームへの入力代行」、レベル2は「文脈による' +
  '検索と意思決定支援」。この段階では、Visa・Mastercard・American Expressが主導する' +
  '既存カードネットワークが市場の主軸です。GAP × Gemini × Google Payのように、AIが' +
  '人間の代わりにECで注文する体験はすでに動いています。最終的な決済はVisaNetを通ります。' +
  'レベル4「判断の委譲」に到達したとき、構造が変わります。「予算1万円以内で揃えて」と' +
  '指示するだけでAIが自律的に購入を完結させる世界では、エージェントはフォームを埋められ' +
  'ないし、クレジットカードを持てない。しかしUSDCの署名はできます。American Expressは' +
  '2026年4月、AIエージェントが購買をミスした場合にAmexが費用を負担するAgent Purchase' +
  ' Protectionを発表しました。Visaは「AIマレット戦略」としてフロント側に既存カード' +
  'ネットワーク、バックエンド側にステーブルコインという二層構造を提唱しています。' +
  'Mastercardはエージェントへの権限委譲を保証するAgent Payを主要金融機関に展開済みです。' +
  '「カードかステーブルコインか」という二項対立はすでに終わっています。x402とMPP' +
  '（Machine Payments Protocol）は、この構造の「下の配管」として機能します。x402は' +
  'HTTP 402ステータスコードに決済を乗せ、エージェントが1リクエスト・1決済・1完結で' +
  '自律的にAPIリソースを調達できるようにします。MPPはStripe × TempoによってIETFに' +
  '標準提案され、カード・ステーブルコイン・Lightningを1つのインターフェースで統合します。' +
  'LangChain・CrewAI・Claude MCPはすでにx402アダプターを標準搭載しており、エージェント' +
  'が普及するほどx402対応APIへの需要が増えます。Fireblocksが指摘するように、クレジット' +
  'カードは1日5回スワイプする人間のために設計されました。エージェントは数百万件の取引を' +
  '処理します。AgentCashは1つの残高で250以上のAPIへのアクセスを提供し、Meowはエージェント' +
  'が自律的に法人口座を開設できる仕組みを実装しました。Worldは虹彩スキャンによる生体認証' +
  'でエージェントの背後に実在する人間を証明し、シビル攻撃を防ぎます。日本のAPIエコノミー' +
  'では、x402 Bazaarに登録された70以上のエンドポイントがほぼすべて英語圏のものです。' +
  '世界中のAIエージェントがBazaar経由でAPIを自律発見するとき、日本のデータが取得できない' +
  '空白が続いています。APIキーは「誰が叩いているか」を問う。x402は「支払われているか」' +
  'を問う。この問いの転換が起きている今、私たちx402 Inc.はこの配管を日本・APACに引きます。'

const BODY_TEXT_EN =
  'Agentic commerce is at Level 1–2. According to Stripe\'s framework presented in Tokyo, ' +
  'Level 1 is automated form-filling; Level 2 is contextual search and decision support. ' +
  'At this stage, the market is anchored by Visa, Mastercard, and American Express. ' +
  'GAP × Gemini × Google Pay already works — AI ordering on behalf of humans, settled ' +
  'through VisaNet. This is the current mainstream, and it will remain so. Level 4 changes ' +
  'the structure. In a world where "buy everything under ¥10,000" executes autonomously, ' +
  'agents can\'t fill out forms. They can\'t hold credit cards. But they can sign USDC ' +
  'transactions. American Express launched Agent Purchase Protection in April 2026 — Amex ' +
  'covers costs when an AI agent makes a purchasing mistake. Visa\'s "AI Mullet" strategy ' +
  'places existing card networks at the front, stablecoins at the back. Mastercard Agent Pay, ' +
  'already deployed across major financial institutions, provides cryptographic proof of ' +
  'delegated authority. The binary of "card or stablecoin" is over. x402 and MPP (Machine ' +
  'Payments Protocol) operate as the plumbing beneath this structure. x402 embeds payment ' +
  'into HTTP 402, enabling agents to autonomously procure API resources in a single ' +
  'request-pay-complete cycle. MPP, co-developed by Stripe and Tempo and submitted to the ' +
  'IETF, unifies cards, stablecoins, and Lightning under one interface. LangChain, CrewAI, ' +
  'and Claude MCP ship x402 adapters as standard. As agents proliferate, demand for x402-' +
  'enabled APIs grows. As Fireblocks observed: credit cards were designed for humans who ' +
  'swipe five times a day. Agents process millions of transactions. AgentCash gives one ' +
  'balance access to 250+ APIs. Meow lets agents open corporate bank accounts autonomously. ' +
  'World uses iris biometrics to prove a real human stands behind each agent, preventing ' +
  'Sybil attacks. In Japan\'s API ecosystem, virtually all 70+ endpoints in the x402 Bazaar ' +
  'are English-language services. When AI agents worldwide discover APIs autonomously through ' +
  'Bazaar, Japanese data simply doesn\'t exist in that map. API keys ask: who is calling? ' +
  'x402 asks: was it paid? This shift is happening now. x402 Inc. brings this infrastructure ' +
  'to Japan and APAC.'

let currentBodyText = BODY_TEXT_JA

// ── Types ──────────────────────────────────────────────────────────────────────

interface OrbState {
  el:  HTMLDivElement
  x:   number
  y:   number
  vx:  number
  vy:  number
  r:   number
}

// ── Geometry ───────────────────────────────────────────────────────────────────

/**
 * Returns the horizontal interval [left, right] that a circle occupies
 * across the full vertical extent of a text line band, or null if no overlap.
 */
function circleIntervalForBand(
  cx: number, cy: number, cr: number,
  bandY: number, bandH: number,
  pad: number,
): [number, number] | null {
  const bot = bandY + bandH
  // Clamp to the band's closest y to the circle center
  const clamped = cy < bandY ? bandY : cy > bot ? bot : cy
  const dy = clamped - cy
  const rp = cr + pad
  const disc = rp * rp - dy * dy
  if (disc <= 0) return null
  const hw = Math.sqrt(disc)
  return [cx - hw, cx + hw]
}

/**
 * Given a column interval [colX, colX+colW] and a list of orbs,
 * returns the widest available [x, width] after carving out the orb
 * that causes the most intrusion.
 */
function availableInterval(
  colX: number,
  colW: number,
  orbs: OrbState[],
  bandY: number,
  bandH: number,
): [number, number] {
  let x = colX
  let w = colW

  for (const orb of orbs) {
    const interval = circleIntervalForBand(orb.x, orb.y, orb.r, bandY, bandH, ORB_PAD)
    if (!interval) continue

    const [oL, oR] = interval
    if (oL >= x + w || oR <= x) continue // no overlap

    // Pick the larger of left segment or right segment
    const leftW  = Math.max(0, oL - x)
    const rightX = oR
    const rightW = Math.max(0, x + w - rightX)

    if (leftW >= rightW) {
      w = leftW
    } else {
      x = rightX
      w = rightW
    }
  }

  return [x, w]
}

// ── Main export ────────────────────────────────────────────────────────────────

export function initHero(container: HTMLElement): () => void {
  container.style.position = 'relative'
  container.style.overflow = 'hidden'

  // ── Orbs (decorative glowing blobs) ───────────────────────────────────────
  const ORB_DEFS = [
    { r: 110, color: 'rgba(212, 175, 55, 0.24)',  blur: 50, vx:  0.38, vy:  0.22 },
    { r:  72, color: 'rgba(247, 231, 176, 0.18)', blur: 36, vx: -0.28, vy:  0.40 },
    { r:  52, color: 'rgba(184, 134, 11, 0.16)',  blur: 28, vx:  0.18, vy: -0.32 },
  ]

  const orbs: OrbState[] = ORB_DEFS.map(d => {
    const el = document.createElement('div')
    el.style.cssText = `
      position:absolute;
      width:${d.r * 2}px;height:${d.r * 2}px;
      border-radius:50%;
      background:radial-gradient(circle at center,${d.color} 0%,transparent 70%);
      filter:blur(${d.blur}px);
      pointer-events:none;
      z-index:0;
      will-change:transform;
    `
    container.appendChild(el)
    return { el, x: 0, y: 0, vx: d.vx, vy: d.vy, r: d.r }
  })

  // ── Text line element pool ─────────────────────────────────────────────────
  const pool: HTMLSpanElement[] = []
  for (let i = 0; i < MAX_POOL; i++) {
    const el = document.createElement('span')
    el.className = 'hero-line'
    el.style.cssText =
      `position:absolute;white-space:pre;` +
      `font:${FONT};color:rgba(228,224,216,0.55);` +
      `z-index:1;visibility:hidden;will-change:contents,left,top;`
    container.appendChild(el)
    pool.push(el)
  }

  // ── State ──────────────────────────────────────────────────────────────────
  let W = 0
  let H = 0
  let textStartY = 0
  let isMobile   = false
  let prepared:       PreparedTextWithSegments | null = null
  let preparedMobile: PreparedTextWithSegments | null = null
  let usedLines = 0
  let rafId     = 0

  // ── Resize handler ─────────────────────────────────────────────────────────
  function onResize(): void {
    W = container.offsetWidth
    H = container.offsetHeight
    isMobile = W < 768

    const headerEl = container.querySelector<HTMLElement>('.hero-header')
    textStartY = headerEl
      ? headerEl.offsetTop + headerEl.offsetHeight + 16
      : Math.round(H * 0.38)

    // Prepare text once per font (font must be loaded for accuracy)
    if (!prepared)       prepared       = prepareWithSegments(currentBodyText, FONT)
    if (!preparedMobile) preparedMobile = prepareWithSegments(currentBodyText, MOBILE_FONT)

    // Spread orbs across the lower 2/3 of the hero
    const spread: [number, number, number, number][] = [
      [0.22, 0.62, 0.38, 0.22],
      [0.75, 0.70, -0.28, 0.40],
      [0.50, 0.82, 0.18, -0.32],
    ]
    orbs.forEach((orb, i) => {
      const [rx, ry, vx, vy] = spread[i] ?? [0.5, 0.6, 0.3, 0.2]
      orb.x  = W * rx
      orb.y  = H * ry
      orb.vx = vx
      orb.vy = vy
    })
  }

  // ── Render loop ────────────────────────────────────────────────────────────
  function render(): void {
    if (!prepared || W === 0) {
      rafId = requestAnimationFrame(render)
      return
    }

    // On mobile: single column with orb avoidance, small font
    if (isMobile) {
      if (!preparedMobile) { rafId = requestAnimationFrame(render); return }

      // Physics — slow drift, stay in bounds
      for (const orb of orbs) {
        orb.x += orb.vx * 0.45
        orb.y += orb.vy * 0.45
        if (orb.x < orb.r)     { orb.vx =  Math.abs(orb.vx); orb.x = orb.r }
        if (orb.x > W - orb.r) { orb.vx = -Math.abs(orb.vx); orb.x = W - orb.r }
        if (orb.y < textStartY){ orb.vy =  Math.abs(orb.vy); orb.y = textStartY }
        if (orb.y > H - orb.r) { orb.vy = -Math.abs(orb.vy); orb.y = H - orb.r }
        orb.el.style.transform = `translate(${orb.x - orb.r}px,${orb.y - orb.r}px)`
      }

      for (let i = 0; i < usedLines; i++) pool[i]!.style.visibility = 'hidden'
      usedLines = 0

      // Scale orb radii down so they fit the narrow mobile column
      const mobileOrbs = orbs.map(o => ({ ...o, r: Math.round(o.r * 0.5) }))

      const colX = 16
      const colW = W - 32
      const endY = H - 60
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
      let y = textStartY

      while (y + MOBILE_LINE_HEIGHT <= endY && usedLines < MAX_POOL) {
        const [lineX, lineW] = availableInterval(colX, colW, mobileOrbs, y, MOBILE_LINE_HEIGHT)
        if (lineW < 48) { y += MOBILE_LINE_HEIGHT; continue }

        const line = layoutNextLine(preparedMobile, cursor, lineW)
        if (!line) break

        const el = pool[usedLines++]!
        el.style.font       = MOBILE_FONT
        el.style.left       = `${lineX}px`
        el.style.top        = `${y}px`
        el.style.visibility = 'visible'
        el.textContent      = line.text
        cursor = line.end
        y += MOBILE_LINE_HEIGHT
      }

      rafId = requestAnimationFrame(render)
      return
    }

    // 1. Physics — bounce orbs inside the hero area
    for (const orb of orbs) {
      orb.x += orb.vx
      orb.y += orb.vy

      const minX = COL_PAD_H
      const maxX = W - COL_PAD_H
      const minY = textStartY + orb.r
      const maxY = H - 48 - orb.r

      if (orb.x < minX) { orb.vx =  Math.abs(orb.vx); orb.x = minX }
      if (orb.x > maxX) { orb.vx = -Math.abs(orb.vx); orb.x = maxX }
      if (orb.y < minY) { orb.vy =  Math.abs(orb.vy); orb.y = minY }
      if (orb.y > maxY) { orb.vy = -Math.abs(orb.vy); orb.y = maxY }

      orb.el.style.transform = `translate(${orb.x - orb.r}px,${orb.y - orb.r}px)`
    }

    // 2. Hide all previously used lines
    for (let i = 0; i < usedLines; i++) {
      pool[i]!.style.visibility = 'hidden'
    }
    usedLines = 0

    // 3. Two-column text layout with pretext
    const colW  = (W - COL_PAD_H * 2 - COL_GAP) / 2
    const col1X = COL_PAD_H
    const col2X = COL_PAD_H + colW + COL_GAP
    const endY  = H - 64

    // Cursor is shared across both columns so text flows col1 → col2
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }

    for (let col = 0; col < 2; col++) {
      const baseColX = col === 0 ? col1X : col2X
      let y = textStartY

      while (y + LINE_HEIGHT <= endY) {
        const [lineX, lineW] = availableInterval(baseColX, colW, orbs, y, LINE_HEIGHT)

        if (lineW < 64) { y += LINE_HEIGHT; continue }

        const line = layoutNextLine(prepared, cursor, lineW)
        if (!line) {
          // Text exhausted — restart from beginning for continuous fill
          cursor = { segmentIndex: 0, graphemeIndex: 0 }
          break
        }

        if (usedLines >= MAX_POOL) break

        const el = pool[usedLines++]!
        el.style.left       = `${lineX}px`
        el.style.top        = `${y}px`
        el.style.visibility = 'visible'
        el.textContent      = line.text
        cursor = line.end
        y += LINE_HEIGHT
      }

      if (usedLines >= MAX_POOL) break
    }

    rafId = requestAnimationFrame(render)
  }

  // ── Language switching ─────────────────────────────────────────────────────
  function onLangChange(e: Event): void {
    const lang = (e as CustomEvent<{ lang: string }>).detail.lang
    currentBodyText = lang === 'en' ? BODY_TEXT_EN : BODY_TEXT_JA
    prepared       = prepareWithSegments(currentBodyText, FONT)
    preparedMobile = prepareWithSegments(currentBodyText, MOBILE_FONT)
  }
  window.addEventListener('langchange', onLangChange)

  // ── Boot ───────────────────────────────────────────────────────────────────
  window.addEventListener('resize', onResize)
  onResize()
  rafId = requestAnimationFrame(render)

  // Return cleanup function
  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('langchange', onLangChange)
  }
}
