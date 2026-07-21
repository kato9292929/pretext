export function WatermarkBand() {
  return (
    <section className="c3-pricing-section relative z-10">
      {/* Noise filter (fractal, overlay blend) for the watermark */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Human → AI</span>
          <span className="c3-watermark-line-2">AI ↔ AI へ</span>
        </div>
      </div>

      <p className="relative z-[3] mt-10 max-w-xl text-center text-white/60 text-base leading-[1.7]">
        決済のレイヤーが、人間のためのものからエージェント同士のものへ移り変わる。x402
        Inc.は、その連続性を実装しながら証明していきます。
      </p>
    </section>
  )
}
