import { Wordmark, NAV_LINKS } from '../primitives'
import { useLang, type Localized } from '../i18n'

const COPY = {
  ja: {
    company: 'x402株式会社',
    addressLabel: '所在地',
    address: '東京都港区浜松町2丁目2番15号 浜松町ダイヤビル2F',
    ceoLabel: '代表取締役',
    ceo: '加藤雅人',
    corpLabel: '法人番号',
    corp: '7010401194879',
    siteLabel: 'Pages',
    legalLabel: 'Legal',
    contact: 'Contact',
    rights: '© 2026 x402株式会社',
  },
  en: {
    company: 'x402 Inc.',
    addressLabel: 'Address',
    address: 'Hamamatsucho Dia Bldg. 2F, 2-2-15 Hamamatsucho, Minato-ku, Tokyo, Japan',
    ceoLabel: 'CEO',
    ceo: 'Masato Kato',
    corpLabel: 'Corporate Number',
    corp: '7010401194879',
    siteLabel: 'Pages',
    legalLabel: 'Legal',
    contact: 'Contact',
    rights: '© 2026 x402 Inc.',
  },
}

const LEGAL: { label: Localized; href: string }[] = [
  { label: { ja: 'プライバシーポリシー', en: 'Privacy Policy' }, href: '/privacy.html' },
  { label: { ja: '免責事項', en: 'Disclaimer' }, href: '/disclaimer.html' },
  { label: { ja: '情報セキュリティ基本方針', en: 'Information Security Policy' }, href: '/security.html' },
]

export function Footer() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <footer className="relative z-10 border-t border-fg/10">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand + registration */}
          <div>
            <Wordmark />
            <p className="mt-4 text-sm text-fg/60">{t.company}</p>
            <dl className="mt-5 grid max-w-sm grid-cols-[6rem_1fr] gap-y-1.5 text-xs">
              <dt className="text-fg/40">{t.addressLabel}</dt>
              <dd className="text-fg/70 leading-[1.7]">{t.address}</dd>
              <dt className="mt-1 text-fg/40 sm:mt-0">{t.ceoLabel}</dt>
              <dd className="text-fg/70">{t.ceo}</dd>
              <dt className="mt-1 text-fg/40 sm:mt-0">{t.corpLabel}</dt>
              <dd className="font-mono text-fg/70">{t.corp}</dd>
            </dl>
          </div>

          {/* Site pages */}
          <div>
            <p className="text-xs uppercase tracking-widest text-fg/40">{t.siteLabel}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-fg/70 hover:text-gold transition-colors">
                    {l.label[lang]}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-fg/70 hover:text-gold transition-colors">
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs uppercase tracking-widest text-fg/40">{t.legalLabel}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-fg/70 hover:text-gold transition-colors">
                    {l.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-fg/10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="text-xs text-fg/40">{t.rights}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {LEGAL.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-fg/45 hover:text-gold transition-colors"
              >
                {l.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
