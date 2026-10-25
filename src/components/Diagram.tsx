import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

/* Diagram nodes with on-demand detail popovers.

   - Mouse: the detail opens when the pointer actually moves over a node
     (pointermove, not mouseenter), so scrolling the page under a still cursor
     never switches nodes. It closes shortly after the pointer leaves the node
     and its popover.
   - Touch / pen: tap toggles. Keyboard: focus opens, Escape closes.
   - On lg+ the popover floats over the diagram (no layout shift); below lg it
     opens inline under the tapped node.
   - Every detail is rendered into the HTML (hidden until opened) so the text
     is visible to crawlers in the static build. */

type Ctx = {
  active: string | null
  open: (id: string) => void
  scheduleClose: (id: string) => void
  close: () => void
}

const DiagramCtx = createContext<Ctx>({ active: null, open: () => {}, scheduleClose: () => {}, close: () => {} })

export function DiagramProvider({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [active, setActive] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const root = useRef<HTMLDivElement>(null)

  const open = useCallback((id: string) => {
    clearTimeout(timer.current)
    setActive(id)
  }, [])
  const scheduleClose = useCallback((id: string) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive((cur) => (cur === id ? null : cur)), 160)
  }, [])
  const close = useCallback(() => {
    clearTimeout(timer.current)
    setActive(null)
  }, [])

  // Tap / click outside the diagram closes the open detail.
  useEffect(() => {
    if (!active) return
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [active, close])

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <DiagramCtx.Provider value={{ active, open, scheduleClose, close }}>
      <div ref={root} className={className}>
        {children}
      </div>
    </DiagramCtx.Provider>
  )
}

const ALIGN = {
  left: 'lg:left-0',
  right: 'lg:right-0',
  center: 'lg:left-1/2 lg:-translate-x-1/2',
}

export function DNode({
  id,
  face,
  detail,
  label,
  align = 'left',
  className = '',
  faceClassName = '',
  style,
  dashed = false,
  strong = false,
}: {
  id: string
  face: ReactNode
  detail: ReactNode
  /** Accessible name for the node button. */
  label: string
  align?: keyof typeof ALIGN
  className?: string
  faceClassName?: string
  style?: CSSProperties
  dashed?: boolean
  strong?: boolean
}) {
  const { active, open, scheduleClose, close } = useContext(DiagramCtx)
  const on = active === id
  const lastPointer = useRef<string>('mouse')
  const popId = `dn-${id}`

  return (
    <div
      className={`relative ${on ? 'z-40' : 'z-10'} ${className}`}
      style={style}
      onPointerMove={(e) => {
        if (e.pointerType === 'mouse' && !on) open(id)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') scheduleClose(id)
      }}
    >
      <button
        type="button"
        aria-expanded={on}
        aria-controls={popId}
        aria-label={label}
        onPointerDown={(e) => {
          lastPointer.current = e.pointerType
        }}
        onClick={() => {
          if (lastPointer.current === 'mouse') open(id)
          else if (on) close()
          else open(id)
        }}
        onFocus={(e) => {
          // Keyboard focus only; a tap also focuses, and its click handles toggling.
          if (e.currentTarget.matches(':focus-visible')) open(id)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') close()
        }}
        className={`block w-full h-full rounded-xl border px-3 py-2.5 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
          dashed ? 'border-dashed' : ''
        } ${
          on
            ? 'border-gold bg-gold/10'
            : strong
              ? 'border-transparent bg-bg/40'
              : 'border-fg/25 bg-bg/40 hover:border-fg/40'
        } ${faceClassName}`}
        style={
          strong && !on
            ? {
                // gradient border for the market nodes
                background:
                  'linear-gradient(rgb(var(--bg) / 0.85), rgb(var(--bg) / 0.85)) padding-box, linear-gradient(90deg, #B9E6A0, #E8C86A, #E9B8C8, #B7B4EC) border-box',
              }
            : undefined
        }
      >
        {face}
      </button>
      <div
        id={popId}
        role="region"
        aria-label={label}
        hidden={!on}
        className={`mt-2 w-full text-left lg:absolute lg:top-full lg:w-[420px] ${ALIGN[align]}`}
      >
        <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-fg/15 bg-bg/95 shadow-2xl backdrop-blur-md">
          {detail}
        </div>
      </div>
    </div>
  )
}

/** Percent-based placement for lg+ absolute layouts; below lg nodes stay in normal flow. */
export function place(x: number, y: number, w: number, h: number, W: number, H: number): CSSProperties {
  return {
    ['--x' as string]: `${(x / W) * 100}%`,
    ['--y' as string]: `${(y / H) * 100}%`,
    ['--w' as string]: `${(w / W) * 100}%`,
    ['--h' as string]: `${(h / H) * 100}%`,
  }
}

/** Class that applies `place()` on lg+. */
export const PLACED = 'lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[var(--w)] lg:h-[var(--h)]'
