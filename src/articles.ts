import type { Localized } from './i18n'

export type Article = {
  tag: Localized
  title: Localized
  blurb: Localized
  href: string
}

/* Latest featured insights — surfaced on the home page and the research page */
export const FEATURED_ARTICLES: Article[] = [
  {
    tag: { ja: 'Credit Card / H to A', en: 'Credit Card / H to A', zh: 'Credit Card / H to A' },
    title: {
      ja: 'x402 per call自律決済の前に来る委任付き自律決済——エージェントへの委任が解いている三つの問題',
      en: 'Delegated autonomous payments come before x402 per-call payments — the three problems delegation to agents solves',
      zh: '在 x402 按次调用自主支付之前到来的委托式自主支付——向智能体委托所解决的三个问题',
    },
    blurb: {
      ja: 'per-call 自律決済に至る前段として、人間からエージェントへの「委任付き自律決済」が何を解いているのか。委任が解く三つの問題を整理します。',
      en: 'Before per-call autonomous payments, what does human-to-agent "delegated autonomous payment" actually solve? We lay out the three problems delegation addresses.',
      zh: '在走向按次调用自主支付之前，由人向智能体进行的“委托式自主支付”究竟解决了什么？本文梳理委托所解决的三个问题。',
    },
    href: 'https://note.com/x402inc/n/n3940b09a8d77',
  },
  {
    tag: { ja: 'x402 / MPP', en: 'x402 / MPP', zh: 'x402 / MPP' },
    title: {
      ja: 'MPP経由の受け入れとx402：StripeがA to Aで両方を担ぐ構造と7月14日のx402 Foundation発足',
      en: 'MPP acceptance and x402: how Stripe carries both in an A-to-A structure, and the July 14 launch of the x402 Foundation',
      zh: '经由 MPP 的收款与 x402：Stripe 在 A to A 中同时承担两者的结构，以及7月14日 x402 Foundation 的成立',
    },
    blurb: {
      ja: 'Stripe が A to A で MPP経由の受け入れと x402 の両方を担ぐ構造とは何か。7月14日の x402 Foundation 発足が持つ意味を読み解きます。',
      en: 'What is the structure where Stripe carries both MPP acceptance and x402 in agent-to-agent commerce? We unpack the significance of the July 14 x402 Foundation launch.',
      zh: 'Stripe 在 A to A 中同时承担经由 MPP 的收款与 x402，这是怎样的结构？本文解读7月14日 x402 Foundation 成立的意义。',
    },
    href: 'https://note.com/x402inc/n/nd740252230f2',
  },
  {
    tag: { ja: 'Next Future', en: 'Next Future', zh: 'Next Future' },
    title: {
      ja: 'AWSとCloudflareのx402対応と市場拡大：x402を知っている開発者からCloudFront/Cloudflareを使っている全事業者の参入へ',
      en: 'AWS and Cloudflare adopt x402 and the market expands: from developers who know x402 to every business on CloudFront/Cloudflare',
      zh: 'AWS 与 Cloudflare 支持 x402 与市场扩大：从了解 x402 的开发者到所有使用 CloudFront/Cloudflare 的企业入场',
    },
    blurb: {
      ja: 'AWS・Cloudflare の x402対応で、参入者は「x402を知っている開発者」から CloudFront/Cloudflare を使う全事業者へ。市場拡大の構造を分析します。',
      en: 'With AWS and Cloudflare supporting x402, entrants shift from "developers who know x402" to every business using CloudFront/Cloudflare. We analyze the structure of this expansion.',
      zh: '随着 AWS、Cloudflare 支持 x402，参与者从“了解 x402 的开发者”扩展到所有使用 CloudFront/Cloudflare 的企业。本文分析市场扩大的结构。',
    },
    href: 'https://note.com/x402inc/n/nde1375fd27c9',
  },
]
