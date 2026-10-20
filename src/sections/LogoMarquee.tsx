import { useLang } from '../i18n'

/* Chains and payment infrastructure we actually settle on or have implemented.
   Logos are the official files from each brand's page (public/logos/marquee/,
   see README there), used unaltered. `dark` is shown on the dark theme,
   `light` on the light theme. Items without an official download are text.
   Never call these "partners". */

type Logo = { dark?: string; light?: string; w: number; h: number }
type Item = { name: string; logo?: Logo; testnet?: boolean }

const ITEMS: Item[] = [
  // Chains
  { name: 'Solana', logo: { dark: '/logos/marquee/solana.svg', w: 646, h: 96 } },
  { name: 'Base', logo: { dark: '/logos/marquee/base-white.svg', light: '/logos/marquee/base-black.svg', w: 1280, h: 324 } },
  { name: 'Polygon' },
  { name: 'Arc', testnet: true, logo: { dark: '/logos/marquee/arc-white.svg', light: '/logos/marquee/arc-black.svg', w: 500, h: 171 } },
  { name: 'Tempo', testnet: true },
  // Stablecoins
  { name: 'USDC', logo: { dark: '/logos/marquee/usdc-white.svg', light: '/logos/marquee/usdc-black.svg', w: 1068, h: 309 } },
  { name: 'JPYC' },
  // Payment infrastructure
  { name: 'Circle', logo: { dark: '/logos/marquee/circle-white.svg', light: '/logos/marquee/circle-licorice.svg', w: 467, h: 120 } },
  { name: 'Nevermined' },
  { name: 'Stripe', logo: { dark: '/logos/marquee/stripe-white.svg', light: '/logos/marquee/stripe-slate.svg', w: 360, h: 151 } },
  // Standards — always text
  { name: 'x402' },
  { name: 'ERC-8004' },
  { name: 'MPP' },
]

function Text({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`text-base md:text-xl font-semibold tracking-tight text-fg/75 ${className}`}>{name}</span>
}

function Entry({ item }: { item: Item }) {
  const { logo } = item
  return (
    <li className="flex shrink-0 items-center gap-1.5 px-6 md:px-9">
      {logo?.dark && (
        <img
          src={logo.dark}
          alt={item.name}
          width={logo.w}
          height={logo.h}
          className="logo-on-dark h-6 md:h-8 w-auto"
          draggable={false}
        />
      )}
      {logo?.light ? (
        <img
          src={logo.light}
          alt={item.name}
          width={logo.w}
          height={logo.h}
          className="logo-on-light h-6 md:h-8 w-auto"
          draggable={false}
        />
      ) : logo?.dark ? (
        // No official dark-on-light version (e.g. Solana): show the name instead of recoloring the mark
        <Text name={item.name} className="logo-on-light" />
      ) : null}
      {!logo && <Text name={item.name} />}
      {item.testnet && (
        <span className="self-start rounded border border-fg/20 px-1 text-[9px] leading-[1.5] text-fg/50">testnet</span>
      )}
    </li>
  )
}

export function LogoMarquee() {
  const { lang } = useLang()
  const label = lang === 'ja' ? '対応チェーンと利用中の決済基盤' : 'Supported chains and payment infrastructure in use'
  return (
    <div className="mt-14 w-full max-w-5xl">
      <p className="text-[11px] tracking-widest text-fg/45">{label}</p>
      <div className="marquee mt-4" role="region" aria-label={label}>
        <div className="marquee-track">
          <ul className="flex items-center">
            {ITEMS.map((it) => (
              <Entry key={it.name} item={it} />
            ))}
          </ul>
          {/* Second copy makes the loop seamless; hidden from assistive tech */}
          <ul className="marquee-dup flex items-center" aria-hidden="true">
            {ITEMS.map((it) => (
              <Entry key={it.name} item={it} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
