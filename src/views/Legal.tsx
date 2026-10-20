import { useLang, type Localized } from '../i18n'
import { CONTACT_EMAIL } from '../primitives'

export type LegalDocKey = 'privacy' | 'disclaimer' | 'security'

type Section = { heading: Localized; body: Localized[] }
type Doc = { title: Localized; updated: string; intro?: Localized; sections: Section[] }

const COMPANY = 'x402株式会社'

const DOCS: Record<LegalDocKey, Doc> = {
  privacy: {
    title: { ja: 'プライバシーポリシー', en: 'Privacy Policy' },
    updated: '2026-08-20',
    intro: {
      ja: `${COMPANY}（以下「当社」）は、本ウェブサイト（x402jp.com）における個人情報の取扱いについて、以下のとおり定めます。`,
      en: `${COMPANY} ("we") sets out how personal information is handled on this website (x402jp.com) as follows.`,
    },
    sections: [
      {
        heading: { ja: '取得する情報', en: 'Information we collect' },
        body: [
          {
            ja: '本サイトは静的な情報提供サイトであり、閲覧のみでは個人を特定できる情報を取得しません。お問い合わせ（メール）でご提供いただいた氏名・メールアドレス・内容を取得します。',
            en: 'This is a static informational site; simply browsing does not collect personally identifiable information. When you contact us by email, we receive the name, email address, and content you provide.',
          },
          {
            ja: 'サイトの運用・改善のため、アクセスログ（IPアドレス、ブラウザ情報、参照元等）を取得する場合があります。',
            en: 'We may collect access logs (IP address, browser information, referrer, etc.) to operate and improve the site.',
          },
        ],
      },
      {
        heading: { ja: '利用目的', en: 'Purpose of use' },
        body: [
          {
            ja: '取得した情報は、お問い合わせへの対応、サービスの提供・改善、および法令遵守のために利用します。',
            en: 'We use the information collected to respond to inquiries, provide and improve our services, and comply with laws.',
          },
        ],
      },
      {
        heading: { ja: '第三者への提供', en: 'Disclosure to third parties' },
        body: [
          {
            ja: '法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。運用上、外部の事業者（ホスティング等）に取扱いを委託する場合があります。',
            en: 'Except as required by law, we do not provide personal information to third parties without consent. We may entrust handling to external providers (e.g. hosting) for operations.',
          },
        ],
      },
      {
        heading: { ja: '開示・訂正・削除', en: 'Access, correction, and deletion' },
        body: [
          {
            ja: `ご自身の個人情報の開示・訂正・削除等をご希望の場合は、下記の窓口までご連絡ください。合理的な範囲で速やかに対応します。`,
            en: 'To request access to, correction of, or deletion of your personal information, contact us below. We respond promptly within reason.',
          },
        ],
      },
      {
        heading: { ja: '改定', en: 'Revisions' },
        body: [
          {
            ja: '本ポリシーは、法令の変更や運用の見直しに応じて改定することがあります。',
            en: 'We may revise this policy in line with legal changes or operational review.',
          },
        ],
      },
    ],
  },
  disclaimer: {
    title: { ja: '免責事項', en: 'Disclaimer' },
    updated: '2026-08-20',
    sections: [
      {
        heading: { ja: '掲載情報について', en: 'About the information provided' },
        body: [
          {
            ja: '本サイトの掲載内容には正確を期していますが、その完全性・正確性・有用性・最新性を保証するものではありません。',
            en: 'We strive for accuracy, but do not warrant the completeness, accuracy, usefulness, or timeliness of the content on this site.',
          },
        ],
      },
      {
        heading: { ja: '損害の免責', en: 'Limitation of liability' },
        body: [
          {
            ja: '本サイトの利用または利用できなかったことにより生じたいかなる損害についても、当社は責任を負いません。',
            en: 'We are not liable for any damages arising from the use of, or inability to use, this site.',
          },
        ],
      },
      {
        heading: { ja: '外部リンク', en: 'External links' },
        body: [
          {
            ja: '本サイトから第三者のサイトへのリンクについて、その内容や運用に関して当社は責任を負いません。各社のブランドや商標は各権利者に帰属します。',
            en: 'We are not responsible for the content or operation of third-party sites linked from this site. Brands and trademarks belong to their respective owners.',
          },
        ],
      },
      {
        heading: { ja: '内容の変更', en: 'Changes to content' },
        body: [
          {
            ja: '本サイトの内容は、予告なく変更・中断・終了する場合があります。',
            en: 'The content of this site may be changed, suspended, or discontinued without notice.',
          },
        ],
      },
    ],
  },
  security: {
    title: { ja: '情報セキュリティ基本方針', en: 'Information Security Policy' },
    updated: '2026-08-20',
    intro: {
      ja: `${COMPANY}は、事業活動で取り扱う情報資産を適切に保護することが社会的責務であると認識し、以下の基本方針を定めます。`,
      en: `${COMPANY} recognizes that protecting the information assets handled in its business is a social responsibility, and establishes the following policy.`,
    },
    sections: [
      {
        heading: { ja: '体制', en: 'Governance' },
        body: [
          {
            ja: '情報セキュリティを維持・改善するための体制を整備し、責任者を定めて継続的に運用します。',
            en: 'We maintain a structure to preserve and improve information security, assign responsibility, and operate it on an ongoing basis.',
          },
        ],
      },
      {
        heading: { ja: '法令遵守', en: 'Compliance' },
        body: [
          {
            ja: '情報セキュリティに関する法令、規範および契約上の要求事項を遵守します。',
            en: 'We comply with laws, standards, and contractual requirements relating to information security.',
          },
        ],
      },
      {
        heading: { ja: '対策', en: 'Safeguards' },
        body: [
          {
            ja: '情報資産への不正アクセス、漏えい、改ざん、紛失、破壊等を防止するため、適切な技術的・組織的対策を講じます。',
            en: 'We take appropriate technical and organizational measures to prevent unauthorized access, leakage, tampering, loss, and destruction of information assets.',
          },
        ],
      },
      {
        heading: { ja: '教育と継続的改善', en: 'Training and continual improvement' },
        body: [
          {
            ja: '役職員への教育を行い、定期的な見直しを通じて情報セキュリティ対策を継続的に改善します。',
            en: 'We train our officers and staff and continually improve our measures through regular review.',
          },
        ],
      },
      {
        heading: { ja: 'インシデント対応', en: 'Incident response' },
        body: [
          {
            ja: '情報セキュリティ上の事故が発生した場合は、速やかに対応し、再発防止に努めます。',
            en: 'In the event of a security incident, we respond promptly and work to prevent recurrence.',
          },
        ],
      },
    ],
  },
}

export function LegalPage({ doc }: { doc: LegalDocKey }) {
  const { lang } = useLang()
  const d = DOCS[doc]
  const updatedLabel = lang === 'ja' ? '最終更新' : 'Last updated'
  const contactLabel = lang === 'ja' ? 'お問い合わせ' : 'Contact'
  return (
    <section className="relative z-10 max-w-3xl mx-auto px-6 pt-28 md:pt-36 pb-20 md:pb-28">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg">{d.title[lang]}</h1>
      <p className="mt-3 text-xs uppercase tracking-widest text-fg/40">
        {updatedLabel} {d.updated}
      </p>
      {d.intro && (
        <p className="mt-6 text-sm md:text-base text-fg/70 leading-[1.9]">{d.intro[lang]}</p>
      )}

      <div className="mt-10 space-y-8">
        {d.sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-base md:text-lg font-semibold text-fg">
              <span className="text-gold font-mono text-sm mr-2">{String(i + 1).padStart(2, '0')}</span>
              {s.heading[lang]}
            </h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p, j) => (
                <p key={j} className="text-sm text-fg/70 leading-[1.9]">
                  {p[lang]}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-fg/10 text-sm text-fg/60 leading-[1.9]">
        <p>{COMPANY}</p>
        <p>東京都港区浜松町2丁目2番15号 浜松町ダイヤビル2F</p>
        <p className="mt-2">
          {contactLabel}:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold hover:brightness-110">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  )
}
