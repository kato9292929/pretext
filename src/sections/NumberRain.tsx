import { useEffect, useRef } from 'react'

/*
 * Hero background: a "402 motif" number rain with a hidden binary layer.
 *
 * - Noise columns (~70%): random 0–9, but ~12% of tokens are forced into a
 *   vertical "402" triple (highlighted gold).
 * - 402 columns (~20%): stream 4 0 2 4 0 2 … (highlighted gold).
 * - Binary columns (~10%, min 2 / max 4): stream only 0/1 — the ASCII bits of
 *   "x402", in order, so they decode. Blended in, never highlighted.
 *
 * The columns of 0s and 1s decode to something. ASCII.
 * 01111000 00110100 00110000 00110010  ->  x 4 0 2
 *
 * Runs in the light theme only (dark theme keeps the video background).
 */

// ASCII bits of "x402": x=01111000 4=00110100 0=00110000 2=00110010
const BITS = '01111000001101000011000000110010' // 32 bits, order must be preserved
const NOISE = '0123456789'
const TRIPLE = '402'

// Muted noise palette — gold is reserved for the 402 accent, so noise/binary
// stay in soft teal/blue/green/grey and never "float".
const NOISE_COLORS = ['#8fbfa0', '#4bb6b6', '#5aa6d8', '#8f9fd0', '#9aa2ae']
const BINARY_COLOR = '#3fb2c0'
const GOLD = '#b8912f'
const FADE = 'rgba(245, 242, 236, 0.12)' // cream light bg, for the fade trail

type ColType = 'noise' | '402' | 'binary'
type Col = {
  type: ColType
  drop: number
  acc: number
  speed: number
  color: string
  offset: number
  runLeft: number
}

export function NumberRain() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const root = document.documentElement
    const fontSize = 20
    const font = `600 ${fontSize}px "SF Mono", "Menlo", "Consolas", monospace`
    const rand = (n: number) => Math.floor(Math.random() * n)
    const isLight = () => root.getAttribute('data-theme') === 'light'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let cols: Col[] = []
    let raf = 0
    let last = 0

    const setup = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const n = Math.max(1, Math.ceil(canvas.width / fontSize))
      // Binary columns: ~10%, but always at least 2 (max 4) so the hidden layer never disappears.
      const binaryCount = Math.min(4, Math.max(2, Math.round(n * 0.1)))
      const count402 = Math.round(n * 0.2)
      const idx = Array.from({ length: n }, (_, i) => i)
      for (let i = n - 1; i > 0; i--) {
        const j = rand(i + 1)
        ;[idx[i], idx[j]] = [idx[j], idx[i]]
      }
      const types: ColType[] = new Array(n).fill('noise')
      let k = 0
      for (let b = 0; b < binaryCount && k < n; b++, k++) types[idx[k]] = 'binary'
      for (let c = 0; c < count402 && k < n; c++, k++) types[idx[k]] = '402'
      cols = types.map((type) => ({
        type,
        drop: rand(Math.ceil(canvas.height / fontSize)),
        acc: 0,
        speed: 0.35 + Math.random() * 0.65,
        color: NOISE_COLORS[rand(NOISE_COLORS.length)],
        offset: rand(32),
        runLeft: 0,
      }))
    }
    setup()

    // Returns the glyph to draw at the column's current head + how to colour it.
    const glyphOf = (col: Col): { ch: string; kind: 'gold' | 'binary' | 'noise' } => {
      if (col.type === '402') return { ch: TRIPLE[col.drop % 3], kind: 'gold' }
      if (col.type === 'binary') return { ch: BITS[(col.drop + col.offset) % 32], kind: 'binary' }
      // noise column: occasionally inject a vertical 402 triple
      if (col.runLeft > 0) {
        const ch = TRIPLE[3 - col.runLeft]
        col.runLeft--
        return { ch, kind: 'gold' }
      }
      if (Math.random() < 0.045) {
        col.runLeft = 2 // this glyph is '4', next two are '0','2'
        return { ch: '4', kind: 'gold' }
      }
      return { ch: NOISE[rand(10)], kind: 'noise' }
    }

    const paint = (col: Col, x: number, y: number) => {
      const g = glyphOf(col)
      if (g.kind === 'gold') {
        ctx.globalAlpha = 0.85
        ctx.fillStyle = GOLD
      } else if (g.kind === 'binary') {
        ctx.globalAlpha = 0.5
        ctx.fillStyle = BINARY_COLOR
      } else {
        ctx.globalAlpha = 0.4
        ctx.fillStyle = col.color
      }
      ctx.fillText(g.ch, x, y)
      ctx.globalAlpha = 1
    }

    // Reduced motion: draw one static grid (keeps the 402 accent + binary columns).
    const drawStatic = () => {
      if (!isLight()) return
      setup()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = font
      ctx.textBaseline = 'top'
      const rows = Math.ceil(canvas.height / fontSize)
      for (let i = 0; i < cols.length; i++) {
        const col = cols[i]
        for (let r = 0; r < rows; r++) {
          col.drop = r
          paint(col, i * fontSize, r * fontSize)
        }
      }
    }

    if (reduce) {
      drawStatic()
      const obs = new MutationObserver(drawStatic)
      obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
      window.addEventListener('resize', drawStatic)
      return () => {
        obs.disconnect()
        window.removeEventListener('resize', drawStatic)
      }
    }

    const FRAME_MS = 55
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (!isLight()) return // light theme only; dark keeps the video
      if (t - last < FRAME_MS) return
      last = t

      ctx.globalAlpha = 1
      ctx.fillStyle = FADE
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = font
      ctx.textBaseline = 'top'

      const maxRow = Math.ceil(canvas.height / fontSize)
      for (let i = 0; i < cols.length; i++) {
        const col = cols[i]
        col.acc += col.speed
        if (col.acc < 1) continue // speed variation: advance only when accumulated
        col.acc -= 1
        paint(col, i * fontSize, col.drop * fontSize)
        col.drop++
        if (col.drop > maxRow && Math.random() > 0.975) col.drop = 0
      }
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', setup)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setup)
    }
  }, [])

  useEffect(() => {
    // A nudge for anyone (or any agent) reading the console.
    try {
      // eslint-disable-next-line no-console
      console.log('%cdecode the binary columns → ASCII', 'color:#b8912f')
    } catch {
      /* noop */
    }
  }, [])

  return <canvas ref={ref} className="bg-light-canvas" aria-hidden="true" />
}
