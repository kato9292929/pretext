import type { ReactNode } from 'react'
import { LanguageProvider, ThemeProvider } from './i18n'
import { Navbar } from './sections/Navbar'
import { Contact } from './sections/Contact'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-fg">
      {/* Root SVG noise filter (subtle grain, multiply blend) for the shiny headline */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Light-theme background: two ribbons crossing into an X (on-brand for
          x402). One sweeps in from the left at 45°, then one from the right;
          each carries a flowing gold→pastel gradient. */}
      <div className="bg-light pointer-events-none">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            {/* Flows up-right along arm A. */}
            <linearGradient
              id="ribbonGradA"
              x1="0"
              y1="1"
              x2="0.5"
              y2="0.5"
              spreadMethod="reflect"
              gradientTransform="translate(0 0)"
            >
              <stop offset="0" stopColor="#b98d28" />
              <stop offset="0.16" stopColor="#e4cd80" />
              <stop offset="0.34" stopColor="#8fd0a8" />
              <stop offset="0.5" stopColor="#3ac6c6" />
              <stop offset="0.66" stopColor="#57b8ea" />
              <stop offset="0.84" stopColor="#9aa9ec" />
              <stop offset="1" stopColor="#e4cd80" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="0 0;0.5 -0.5"
                dur="5s"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </linearGradient>
            {/* Flows up-left along arm B. */}
            <linearGradient
              id="ribbonGradB"
              x1="1"
              y1="1"
              x2="0.5"
              y2="0.5"
              spreadMethod="reflect"
              gradientTransform="translate(0 0)"
            >
              <stop offset="0" stopColor="#b98d28" />
              <stop offset="0.16" stopColor="#e4cd80" />
              <stop offset="0.34" stopColor="#8fd0a8" />
              <stop offset="0.5" stopColor="#3ac6c6" />
              <stop offset="0.66" stopColor="#57b8ea" />
              <stop offset="0.84" stopColor="#9aa9ec" />
              <stop offset="1" stopColor="#e4cd80" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="0 0;-0.5 -0.5"
                dur="5s"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* Arm A: bottom-left → top-right (draws in first). */}
          <path
            fill="none"
            stroke="url(#ribbonGradA)"
            strokeWidth="220"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1 1"
            strokeDashoffset="1"
            d="M -160,1080 C 350,720 1080,300 1760,-140"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1"
              to="0"
              dur="1.3s"
              begin="0s"
              fill="freeze"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.4 0 0.2 1"
            />
          </path>

          {/* Arm B: bottom-right → top-left (draws in after A). */}
          <path
            fill="none"
            stroke="url(#ribbonGradB)"
            strokeWidth="220"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1 1"
            strokeDashoffset="1"
            d="M 1760,1080 C 1250,720 520,300 -160,-140"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1"
              to="0"
              dur="1.3s"
              begin="0.9s"
              fill="freeze"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.4 0 0.2 1"
            />
          </path>
        </svg>
      </div>

      {/* Fixed fullscreen background video, recolored into a multicolor aurora ribbon (dark theme) */}
      <div className="bg-media fixed inset-0 z-0 pointer-events-none" style={{ isolation: 'isolate' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{
            // Grayscale keeps only the flowing shape; heavy blur + low contrast make it soft & airy.
            filter: 'grayscale(1) brightness(1.04) contrast(0.9) blur(22px)',
            transform: 'scale(1.12)',
          }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Soft, translucent pastel iridescence painted onto the ribbon */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #E7A6C8 0%, #F3C08A 20%, #F7E39C 38%, #B9E6B0 56%, #A9DCEC 74%, #B7B4EC 100%)',
            mixBlendMode: 'color',
            opacity: 0.85,
          }}
        />
        {/* Airy white sheen for a frosted, see-through glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px circle at 60% 42%, rgba(255, 255, 255, 0.14), transparent 60%)',
            mixBlendMode: 'soft-light',
            opacity: 0.9,
          }}
        />
      </div>

      <ThemeProvider>
        <LanguageProvider>
          <Navbar />
          {children}
          <Contact />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  )
}
