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
  'x402はAIエージェントとAPIサービスの間に流れるパイプラインです。TCP/IPと同じように、' +
  '誰も意識しないが全員が使っています。HTTPの402ステータスコードは1997年に予約' +
  'されたまま30年近く眠っていました。Coinbase、Cloudflare、Stripeが叩き起こし、' +
  'Linux Foundation傘下のオープンスタンダードとして動き出しました。サーバーが402を' +
  '返したとき、クライアントは自動的に支払いを完了してリクエストを再試行します。' +
  '人間でもAIエージェントでも、フォームも手続きも要りません。ECサイトには既存の' +
  '決済で十分です。しかしAPIコールに値段をつけ、エージェントが何百ものサービスを' +
  '自律的に利用するシナリオでは、x402が唯一の現実解になります。LangChain・CrewAI・' +
  'Claude MCPはすでにx402アダプターを標準搭載しています。エージェントが普及する' +
  'ほど、x402対応APIへの需要が増えます。開発者は対応しないと「エージェントから' +
  '買ってもらえない」状況になっていきます。StripeはMPPとx402の両方をサポートし、' +
  'Visa ICCは4プロトコルを全対応しています。「x402 = クリプトユーザーが意識的に' +
  '選ぶ決済手段」という認識は間違いです。正しくは「x402 = インフラ」です。私たち' +
  'x402 Inc.は、このパイプラインを日本に引きます。'

const BODY_TEXT_EN =
  'x402 is the pipeline between AI agents and API services. Like TCP/IP, nobody ' +
  'thinks about it—everyone uses it. HTTP\'s 402 status code sat reserved since ' +
  '1997, dormant for nearly thirty years. Coinbase, Cloudflare, and Stripe woke ' +
  'it up. Now it\'s an open standard under the Linux Foundation. When a server ' +
  'returns 402, the client—human or AI agent—automatically settles the payment ' +
  'and retries. No forms, no friction. Existing payment rails handle commerce just ' +
  'fine. But when APIs have prices and agents autonomously use hundreds of services ' +
  'at once, x402 is the only realistic solution. LangChain, CrewAI, and Claude MCP ' +
  'already ship x402 adapters by default. As agents proliferate, demand for x402-' +
  'enabled APIs grows. Stripe supports both MPP and x402. Visa ICC backs all four ' +
  'protocols. The frame "x402 = crypto-native payment choice" is wrong. The correct ' +
  'frame: "x402 = infrastructure." We are x402 Inc. We are laying this pipeline in Japan.'

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
    { r: 110, color: 'rgba(196, 163, 90, 0.22)',  blur: 50, vx:  0.38, vy:  0.22 },
    { r:  72, color: 'rgba(74, 143, 255, 0.18)',  blur: 36, vx: -0.28, vy:  0.40 },
    { r:  52, color: 'rgba(196, 163, 90, 0.14)',  blur: 28, vx:  0.18, vy: -0.32 },
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
