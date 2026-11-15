import { useLang, type Lang, type Localized } from '../i18n'
import { CONTACT_EMAIL } from '../primitives'

export type LegalDocKey = 'privacy' | 'disclaimer' | 'security'

type Section = { heading: Localized; body: Localized[] }
type Doc = { title: Localized; updated: string; intro?: Localized; sections: Section[] }

const COMPANY = 'x402株式会社'

const DOCS: Record<LegalDocKey, Doc> = {
  privacy: {
    title: { ja: 'プライバシーポリシー', en: 'Privacy Policy', zh: '隐私政策' },
    updated: '2026-11-02',
    intro: {
      ja: `${COMPANY}（以下「当社」）は、本ウェブサイト（x402jp.com）における個人情報の取扱いについて、以下のとおり定めます。`,
      en: `${COMPANY} ("we") sets out how personal information is handled on this website (x402jp.com) as follows.`,
      zh: `${COMPANY}（以下简称“本公司”）就本网站（x402jp.com）中个人信息的处理，制定如下规定。`,
    },
    sections: [
      {
        heading: { ja: '取得する情報', en: 'Information we collect', zh: '收集的信息' },
        body: [
          {
            ja: '本サイトは静的な情報提供サイトであり、閲覧のみでは個人を特定できる情報を取得しません。お問い合わせ（メール）でご提供いただいた氏名・メールアドレス・内容を取得します。',
            en: 'This is a static informational site; simply browsing does not collect personally identifiable information. When you contact us by email, we receive the name, email address, and content you provide.',
            zh: '本网站为静态信息提供网站，仅浏览本网站不会收集可识别个人身份的信息。对于您通过联系我们（电子邮件）提供的姓名、电子邮件地址及内容，本公司将予以收集。',
          },
          {
            ja: 'サイトの運用・改善のため、アクセスログ（IPアドレス、ブラウザ情報、参照元等）を取得する場合があります。',
            en: 'We may collect access logs (IP address, browser information, referrer, etc.) to operate and improve the site.',
            zh: '为运营和改进本网站，本公司可能收集访问日志（IP 地址、浏览器信息、来源页面等）。',
          },
        ],
      },
      {
        heading: { ja: 'アクセス解析ツール', en: 'Analytics tools', zh: '访问分析工具' },
        body: [
          {
            ja: '本サイトは、利用状況の把握とサイトの改善のため、Google LLC が提供する Google アナリティクスと、Vercel Inc. が提供する Vercel Web Analytics を利用しています。',
            en: 'To understand how the site is used and to improve it, we use Google Analytics, provided by Google LLC, and Vercel Web Analytics, provided by Vercel Inc.',
            zh: '为了解使用情况并改进本网站，本网站使用由 Google LLC 提供的 Google Analytics，以及由 Vercel Inc. 提供的 Vercel Web Analytics。',
          },
          {
            ja: 'Google アナリティクスは Cookie を使って、閲覧したページ、滞在時間、参照元、端末やブラウザの種類などを匿名で収集します。個人を特定する情報は含まれません。収集されたデータは Google のプライバシーポリシー（https://policies.google.com/privacy）に基づいて管理されます。',
            en: 'Google Analytics uses cookies to collect, anonymously, the pages viewed, time on page, referrer, and device and browser type. It does not include personally identifying information. The data is handled under Google’s Privacy Policy (https://policies.google.com/privacy).',
            zh: 'Google Analytics 使用 Cookie 以匿名方式收集所浏览的页面、停留时间、来源页面、设备及浏览器类型等信息，其中不包含可识别个人身份的信息。所收集的数据依据 Google 隐私政策（https://policies.google.com/privacy）进行管理。',
          },
          {
            ja: 'Google アナリティクスによる収集は、ブラウザの Cookie を無効にするか、Google アナリティクス オプトアウト アドオン（https://tools.google.com/dlpage/gaoptout）を使うことで止められます。',
            en: 'You can stop collection by Google Analytics by disabling cookies in your browser or by using the Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout).',
            zh: '您可以通过在浏览器中停用 Cookie，或使用 Google Analytics 停用浏览器插件（https://tools.google.com/dlpage/gaoptout），停止 Google Analytics 的数据收集。',
          },
          {
            ja: 'Vercel Web Analytics は Cookie を使わず、閲覧数や参照元などを集計した統計として扱います。',
            en: 'Vercel Web Analytics does not use cookies and handles page views, referrers and similar data as aggregated statistics.',
            zh: 'Vercel Web Analytics 不使用 Cookie，仅将浏览量、来源页面等作为汇总统计数据处理。',
          },
        ],
      },
      {
        heading: { ja: '利用目的', en: 'Purpose of use', zh: '使用目的' },
        body: [
          {
            ja: '取得した情報は、お問い合わせへの対応、サービスの提供・改善、および法令遵守のために利用します。',
            en: 'We use the information collected to respond to inquiries, provide and improve our services, and comply with laws.',
            zh: '所收集的信息将用于回复咨询、提供及改进服务，以及遵守法律法规。',
          },
        ],
      },
      {
        heading: { ja: '第三者への提供', en: 'Disclosure to third parties', zh: '向第三方提供' },
        body: [
          {
            ja: '法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。運用上、外部の事業者（ホスティング等）に取扱いを委託する場合があります。',
            en: 'Except as required by law, we do not provide personal information to third parties without consent. We may entrust handling to external providers (e.g. hosting) for operations.',
            zh: '除依据法律法规的情形外，未经本人同意，本公司不会向第三方提供个人信息。出于运营需要，本公司可能委托外部服务商（托管服务等）处理相关信息。',
          },
        ],
      },
      {
        heading: { ja: '開示・訂正・削除', en: 'Access, correction, and deletion', zh: '披露、更正与删除' },
        body: [
          {
            ja: `ご自身の個人情報の開示・訂正・削除等をご希望の場合は、下記の窓口までご連絡ください。合理的な範囲で速やかに対応します。`,
            en: 'To request access to, correction of, or deletion of your personal information, contact us below. We respond promptly within reason.',
            zh: '如您希望披露、更正或删除本人的个人信息，请通过下方联系方式与我们联系。本公司将在合理范围内尽快处理。',
          },
        ],
      },
      {
        heading: { ja: '改定', en: 'Revisions', zh: '修订' },
        body: [
          {
            ja: '本ポリシーは、法令の変更や運用の見直しに応じて改定することがあります。',
            en: 'We may revise this policy in line with legal changes or operational review.',
            zh: '本政策可能根据法律法规的变更或运营方式的调整而进行修订。',
          },
        ],
      },
    ],
  },
  disclaimer: {
    title: { ja: '免責事項', en: 'Disclaimer', zh: '免责声明' },
    updated: '2026-08-20',
    sections: [
      {
        heading: { ja: '掲載情報について', en: 'About the information provided', zh: '关于所载信息' },
        body: [
          {
            ja: '本サイトの掲載内容には正確を期していますが、その完全性・正確性・有用性・最新性を保証するものではありません。',
            en: 'We strive for accuracy, but do not warrant the completeness, accuracy, usefulness, or timeliness of the content on this site.',
            zh: '本公司力求本网站所载内容准确，但不保证其完整性、准确性、有用性及时效性。',
          },
        ],
      },
      {
        heading: { ja: '損害の免責', en: 'Limitation of liability', zh: '损害免责' },
        body: [
          {
            ja: '本サイトの利用または利用できなかったことにより生じたいかなる損害についても、当社は責任を負いません。',
            en: 'We are not liable for any damages arising from the use of, or inability to use, this site.',
            zh: '对于因使用或无法使用本网站而产生的任何损害，本公司概不负责。',
          },
        ],
      },
      {
        heading: { ja: '外部リンク', en: 'External links', zh: '外部链接' },
        body: [
          {
            ja: '本サイトから第三者のサイトへのリンクについて、その内容や運用に関して当社は責任を負いません。各社のブランドや商標は各権利者に帰属します。',
            en: 'We are not responsible for the content or operation of third-party sites linked from this site. Brands and trademarks belong to their respective owners.',
            zh: '对于从本网站链接至第三方网站的内容及运营，本公司概不负责。各公司的品牌及商标归各自权利人所有。',
          },
        ],
      },
      {
        heading: { ja: '内容の変更', en: 'Changes to content', zh: '内容变更' },
        body: [
          {
            ja: '本サイトの内容は、予告なく変更・中断・終了する場合があります。',
            en: 'The content of this site may be changed, suspended, or discontinued without notice.',
            zh: '本网站的内容可能在不事先通知的情况下变更、中断或终止。',
          },
        ],
      },
    ],
  },
  security: {
    title: { ja: '情報セキュリティ基本方針', en: 'Information Security Policy', zh: '信息安全基本方针' },
    updated: '2026-08-20',
    intro: {
      ja: `${COMPANY}は、事業活動で取り扱う情報資産を適切に保護することが社会的責務であると認識し、以下の基本方針を定めます。`,
      en: `${COMPANY} recognizes that protecting the information assets handled in its business is a social responsibility, and establishes the following policy.`,
      zh: `${COMPANY}认识到妥善保护在业务活动中处理的信息资产是本公司的社会责任，特制定以下基本方针。`,
    },
    sections: [
      {
        heading: { ja: '体制', en: 'Governance', zh: '管理体制' },
        body: [
          {
            ja: '情報セキュリティを維持・改善するための体制を整備し、責任者を定めて継続的に運用します。',
            en: 'We maintain a structure to preserve and improve information security, assign responsibility, and operate it on an ongoing basis.',
            zh: '本公司建立用于维持和改进信息安全的管理体制，指定负责人，并持续运行。',
          },
        ],
      },
      {
        heading: { ja: '法令遵守', en: 'Compliance', zh: '遵守法律法规' },
        body: [
          {
            ja: '情報セキュリティに関する法令、規範および契約上の要求事項を遵守します。',
            en: 'We comply with laws, standards, and contractual requirements relating to information security.',
            zh: '本公司遵守与信息安全相关的法律法规、规范及合同要求。',
          },
        ],
      },
      {
        heading: { ja: '対策', en: 'Safeguards', zh: '安全措施' },
        body: [
          {
            ja: '情報資産への不正アクセス、漏えい、改ざん、紛失、破壊等を防止するため、適切な技術的・組織的対策を講じます。',
            en: 'We take appropriate technical and organizational measures to prevent unauthorized access, leakage, tampering, loss, and destruction of information assets.',
            zh: '为防止对信息资产的未授权访问、泄露、篡改、丢失、损毁等，本公司采取适当的技术及组织措施。',
          },
        ],
      },
      {
        heading: { ja: '教育と継続的改善', en: 'Training and continual improvement', zh: '培训与持续改进' },
        body: [
          {
            ja: '役職員への教育を行い、定期的な見直しを通じて情報セキュリティ対策を継続的に改善します。',
            en: 'We train our officers and staff and continually improve our measures through regular review.',
            zh: '本公司对管理人员及员工开展培训，并通过定期审查持续改进信息安全措施。',
          },
        ],
      },
      {
        heading: { ja: 'インシデント対応', en: 'Incident response', zh: '事件应对' },
        body: [
          {
            ja: '情報セキュリティ上の事故が発生した場合は、速やかに対応し、再発防止に努めます。',
            en: 'In the event of a security incident, we respond promptly and work to prevent recurrence.',
            zh: '如发生信息安全事故，本公司将迅速应对，并努力防止再次发生。',
          },
        ],
      },
    ],
  },
}

export function LegalPage({ doc }: { doc: LegalDocKey }) {
  const { lang } = useLang()
  const d = DOCS[doc]
  const updatedLabel = ({ ja: '最終更新', en: 'Last updated', zh: '最后更新' } satisfies Record<Lang, string>)[lang]
  const contactLabel = ({ ja: 'お問い合わせ', en: 'Contact', zh: '联系我们' } satisfies Record<Lang, string>)[lang]
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
