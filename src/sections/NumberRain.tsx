import { useEffect, useRef } from 'react'

// Reverted palette (pre pink/silver): gold + pastel green/teal/blue/lilac.
const PALETTE = ['#b98d28', '#caa646', '#8fd0a8', '#3ac6c6', '#57b8ea', '#9aa9ec']
// Weighted toward 4 / 0 / 2, then the rest of the digits.
const GLYPHS = '4022013456789'

/**
 * Colourful digits streaming down the light-theme background (Matrix-style
 * rain). Runs only while the light theme is active; the CSS hides the canvas
 * in dark mode and the draw loop bails out so it costs nothing.
 */
export function NumberRain() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const root = document.documentElement
    const fontSize = 20
    let drops: number[] = []
    let colors: string[] = []
    let raf = 0
    let last = 0

    const rand = (n: number) => Math.floor(Math.random() * n)

    const setup = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const n = Math.ceil(canvas.width / fontSize)
      drops = Array.from({ length: n }, () => rand(canvas.height / fontSize))
      colors = Array.from({ length: n }, () => PALETTE[rand(PALETTE.length)])
    }
    setup()

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      // Only animate in light theme; ~16fps gives the classic cascading step.
      if (root.getAttribute('data-theme') !== 'light') return
      if (t - last < 60) return
      last = t

      // Fade the previous frame toward the light background for soft trails.
      ctx.fillStyle = 'rgba(245, 242, 236, 0.14)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `600 ${fontSize}px "SF Mono", "Menlo", "Consolas", monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < drops.length; i++) {
        const ch = GLYPHS[rand(GLYPHS.length)]
        ctx.fillStyle = colors[i]
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
          colors[i] = PALETTE[rand(PALETTE.length)]
        }
        drops[i]++
      }
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', setup)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return <canvas ref={ref} className="bg-light-canvas" aria-hidden="true" />
}
