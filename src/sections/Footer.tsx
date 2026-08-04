import { Wordmark } from '../primitives'
import { useLang } from '../i18n'

const COPY = {
  ja: {
    company: 'x402株式会社',
    addressLabel: '所在地',
    address: '東京都港区浜松町2丁目2番15号 浜松町ダイヤビル2F',
    ceoLabel: '代表取締役',
    ceo: '加藤雅人',
    corpLabel: '法人番号',
    corp: '7010401194879',
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
    rights: '© 2026 x402 Inc.',
  },
}

export function Footer() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <footer className="relative z-10 border-t border-fg/10">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-4 text-sm text-fg/60">{t.company}</p>
          </div>
          <dl className="grid max-w-xl gap-y-2 text-sm sm:grid-cols-[7rem_1fr] sm:gap-x-6">
            <dt className="text-fg/40">{t.addressLabel}</dt>
            <dd className="text-fg/70 leading-[1.7]">{t.address}</dd>
            <dt className="mt-2 text-fg/40 sm:mt-0">{t.ceoLabel}</dt>
            <dd className="text-fg/70">{t.ceo}</dd>
            <dt className="mt-2 text-fg/40 sm:mt-0">{t.corpLabel}</dt>
            <dd className="font-mono text-fg/70">{t.corp}</dd>
          </dl>
        </div>
        <p className="mt-12 text-xs text-fg/40">{t.rights}</p>
      </div>
    </footer>
  )
}
