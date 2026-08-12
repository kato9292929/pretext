# x402jp.com — Design System

Reference for reusing this site's look (dark-first, gold accent, glass cards,
JP/EN + light/dark). Stack: **React 18 + TypeScript + Vite + Tailwind CSS +
motion/react + lucide-react**. No CSS framework beyond Tailwind; design tokens
are CSS variables so light/dark swap cleanly.

## 1. Design tokens

Tokens live as CSS variables in `src/index.css` and are exposed to Tailwind as
`fg` / `bg` / `gold` (alpha-aware).

```css
/* src/index.css */
:root,
:root[data-theme='dark'] {
  --fg: 255 255 255;   /* #ffffff */
  --bg: 12 12 12;      /* #0c0c0c */
  --gold: 232 195 56;  /* #E8C338 */
}
:root[data-theme='light'] {
  --fg: 26 22 15;      /* warm near-black */
  --bg: 245 242 236;   /* warm off-white */
  --gold: 154 123 18;  /* #9A7B12 */
}
html, body {
  background-color: rgb(var(--bg));
  color: rgb(var(--fg));
}
::selection { background-color: rgba(61, 129, 227, 0.3); } /* blue */
```

```js
// tailwind.config.js — theme.extend.colors
fg:   'rgb(var(--fg) / <alpha-value>)',
bg:   'rgb(var(--bg) / <alpha-value>)',
gold: 'rgb(var(--gold) / <alpha-value>)',
```

Usage: `text-fg`, `text-fg/60`, `bg-bg`, `text-gold`, `border-fg/10`, etc.
Because tokens are `rgb(...)`, the `/<alpha>` opacity suffix works everywhere.

## 2. Fonts

- **Outfit** — headings / wordmark (`font-family: 'Outfit'`)
- **Inter** — body / UI
- **Noto Sans JP** — Japanese
- Monospace stack for code/labels: `"SF Mono", "Menlo", "Consolas", monospace`

Loaded via Google Fonts `@import` at the top of `index.css`
(`Inter:400..900`, `Noto Sans JP:400..900`, `Outfit:400..800`).

## 3. Theme + i18n (React context, localStorage)

Two tiny providers wrap the app (`src/i18n.tsx`):

- **ThemeProvider** — `useTheme()` → `{ theme, setTheme }`, key `x402-theme`,
  default `dark`. On change it sets `document.documentElement.setAttribute('data-theme', theme)`.
- **LanguageProvider** — `useLang()` → `{ lang, setLang }`, key `x402-lang`.

i18n has no router and no separate EN pages. Every component holds a `COPY`
object and indexes it by `lang`:

```ts
export type Localized<T = string> = { ja: T; en: T }

const COPY = {
  ja: { title: 'プロダクト', … },
  en: { title: 'Products', … },
}
function Section() {
  const { lang } = useLang()
  const t = COPY[lang]           // t.title
  // for inline fields: obj.desc[lang]
}
```

## 4. Section layout convention

Every section repeats the same shell:

```tsx
<section className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    <SectionEyebrow label="Products" tag="Automatic" heading />
    <p className="mt-6 text-fg/60 text-base leading-[1.7] max-w-3xl">{t.intro}</p>
  </motion.div>

  <div className="mt-10 grid md:grid-cols-3 gap-5">…cards…</div>
</section>
```

- Container: `max-w-6xl mx-auto px-6`, vertical rhythm `py-14 md:py-20`.
- Cards: `liquid-glass rounded-2xl p-6`, grids use `gap-5`.
- Reveal: `motion.div` with `whileInView` + `viewport={{ once:true }}`,
  ease `[0.22, 1, 0.36, 1]`, stagger via `delay: (i % cols) * 0.08`.

## 5. Liquid-glass card

The signature surface. Nearly-transparent fill + a masked gradient border that
catches light top/bottom. Light theme inverts the tint.

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {           /* gradient hairline border via mask */
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,.45) 0%, rgba(255,255,255,.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,.15) 80%, rgba(255,255,255,.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
/* light theme: dark tint instead of white */
:root[data-theme='light'] .liquid-glass { background: rgba(0,0,0,.015); box-shadow: inset 0 1px 1px rgba(0,0,0,.06); }
:root[data-theme='light'] .liquid-glass::before { background: linear-gradient(180deg, rgba(0,0,0,.22) 0%, … rgba(0,0,0,.22) 100%); }
```

## 6. Primitives (`src/primitives.tsx`)

- **Wordmark** — `x402` in `rgb(var(--fg))` + ` Inc.` in the gold gradient,
  Outfit font.
- **SectionEyebrow** `{ label, tag?, heading? }` — `heading` variant renders a
  large `text-fg` label + a small gold "tag" chip (border/bg/text all
  `rgb(var(--gold) / …)`). This is the section-title pattern.
- **Pill** `{ label, href, gold? }` — rounded-full CTA. `gold` variant is
  `liquid-glass text-fg hover:brightness-125`; renders an `<a>` (mailto/http get
  `target=_blank`). Trailing `ChevronRight` (lucide).
- **Gold text gradient** (shiny headline / wordmark accent):

```ts
export const gradientStyle = {
  backgroundImage:
    'linear-gradient(to right,#6B5310 0%,#A67C10 12.5%,#FDF6D0 32.5%,#E8C338 50%,#A67C10 67.5%,#6B5310 87.5%,#6B5310 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  color: 'transparent', WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)', // optional SVG grain filter mounted once in Layout
}
```

Contact route is a single `mailto:` (`CONTACT_EMAIL = 'hello@x402jp.com'`).

## 7. Backgrounds (theme-dependent, fixed, `z-0`)

Both live in `src/Layout.tsx`, behind everything (content is `z-10`).

- **Dark** — a fixed fullscreen `<video>` (loop/muted), recolored into a soft
  flowing "ribbon": `filter: grayscale(1) brightness(1.04) contrast(0.9)
  blur(22px); transform: scale(1.12)`, with a `linear-gradient(100deg, pastel…)`
  overlay at `mix-blend-mode: color` + a radial white sheen at `soft-light`.
- **Light** — a `<canvas>` of colourful **streaming digits** (Matrix rain),
  weighted toward `4/0/2`, in the gold+pastel palette. See `src/sections/NumberRain.tsx`.
  It only animates while `data-theme === 'light'` and is hidden in dark via CSS.

Toggle rule in CSS: `:root[data-theme='light'] .bg-media { display:none }` and
the light canvas shows only under `[data-theme='light']`.

## 8. Animations

- **motion/react** `whileInView` reveals (see §4).
- `.animate-shiny` — moving gold gradient on headlines (`background-position`
  sweep, 6s).
- `.animate-aurora` — moving multicolor gradient for special buttons
  (`linear-gradient(100deg, …)` + `background-size:200%`, 9s).

## 9. File map

```
src/
  Layout.tsx            shell: providers + fixed backgrounds + Navbar/children/Contact/Footer
  i18n.tsx              Language/Theme providers, Localized type
  primitives.tsx        Wordmark, SectionEyebrow, Pill, gradientStyle, CONTACT_EMAIL
  index.css             tokens, fonts, .liquid-glass, .animate-*, theme rules
  sections/*.tsx        one component per section (Ecosystem, Featured, Insights, …)
  pages/*.tsx           compose sections per page
  main*.tsx             one Vite entry per HTML page (multi-page build)
tailwind.config.js      fg/bg/gold token mapping
```

Multi-page Vite: each `*.html` has its own `main-*.tsx` entry that mounts
`<Layout><Page/></Layout>`.
