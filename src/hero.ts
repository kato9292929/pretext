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
  'x402は、HTTPの402ステータスコードを活用した、インターネットネイティブな' +
  '支払いプロトコルです。Coinbaseが開発したこのオープンスタンダードは、ウェブ' +
  '上での価値交換を根本から変革します。AIエージェント同士がリアルタイムで決済' +
  'を完了し、コンテンツクリエイターがマイクロペイメントで収益を得て、企業が' +
  'APIアクセスに対して即座に課金できる。そんな未来が、x402によって実現します。' +
  '従来のクレジットカード決済や銀行振込が持つ複雑さ、高手数料、遅延の問題を' +
  '解消し、HTTP通信と同じシンプルさで資金移動を可能にします。リクエストと' +
  'レスポンスのやり取りで支払いが完結する設計は、開発者にとっても直感的です。' +
  'ブロックチェーン技術を基盤としながらも、エンドユーザーはその複雑さを意識' +
  'することなく、シームレスな体験を享受できます。ステーブルコインを活用した' +
  '安定した価値の移転と、オンチェーンの透明性が組み合わさることで、信頼性の' +
  '高い取引環境を実現します。私たちx402 Inc.は、この革新的なプロトコルを' +
  '日本市場に広め、次世代の決済インフラを構築することを使命としています。' +
  '日本の優れた技術力と、グローバルなオープンスタンダードの融合により、' +
  '新たな経済圏の創出を目指します。企業から個人まで、すべての人がシームレスな' +
  '支払いの恩恵を受けられる、オープンでフラットな金融の未来を共に作りましょう。'

const BODY_TEXT_EN =
  'x402 is the native payment layer for the internet. Built on HTTP\'s reserved ' +
  '402 status code, this open standard—backed by Coinbase, Cloudflare, and ' +
  'Stripe—brings programmable money into the web stack. AI agents settle payments ' +
  'in real time, no human in the loop. Creators earn per read, not per subscription. ' +
  'Developers meter API access per request without middleware overhead. ' +
  'The protocol is permissionless, multi-rail, and composable by design. ' +
  'It runs across blockchains, stablecoins, and fiat rails. x402 Inc. is bringing ' +
  'this infrastructure to Japan—merging world-class engineering with global open ' +
  'standards to build the settlement layer for the next economy. No gatekeepers, ' +
  'no walled gardens. Trustless, transparent, and onchain. The machine economy ' +
  'needs a payment primitive. x402 is that primitive.'

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
