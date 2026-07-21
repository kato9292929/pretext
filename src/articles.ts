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
    tag: { ja: '委任付き自律決済', en: 'Delegated payments' },
    title: {
      ja: 'x402 per call自律決済の前に来る委任付き自律決済——エージェントへの委任が解いている三つの問題',
      en: 'Delegated autonomous payments come before x402 per-call payments — the three problems delegation to agents solves',
    },
    blurb: {
      ja: 'per-call 自律決済に至る前段として、人間からエージェントへの「委任付き自律決済」が何を解いているのか。委任が解く三つの問題を整理します。',
      en: 'Before per-call autonomous payments, what does human-to-agent "delegated autonomous payment" actually solve? We lay out the three problems delegation addresses.',
    },
    href: 'https://note.com/x402inc/n/n3940b09a8d77',
  },
  {
    tag: { ja: 'Stripe · Foundation', en: 'Stripe · Foundation' },
    title: {
      ja: 'MPP経由の受け入れとx402：StripeがA to Aで両方を担ぐ構造と7月14日のx402 Foundation発足',
      en: 'MPP acceptance and x402: how Stripe carries both in an A-to-A structure, and the July 14 launch of the x402 Foundation',
    },
    blurb: {
      ja: 'Stripe が A to A で MPP経由の受け入れと x402 の両方を担ぐ構造とは何か。7月14日の x402 Foundation 発足が持つ意味を読み解きます。',
      en: 'What is the structure where Stripe carries both MPP acceptance and x402 in agent-to-agent commerce? We unpack the significance of the July 14 x402 Foundation launch.',
    },
    href: 'https://note.com/x402inc/n/nd740252230f2',
  },
  {
    tag: { ja: 'AWS · Cloudflare', en: 'AWS · Cloudflare' },
    title: {
      ja: 'AWSとCloudflareのx402対応と市場拡大：x402を知っている開発者からCloudFront/Cloudflareを使っている全事業者の参入へ',
      en: 'AWS and Cloudflare adopt x402 and the market expands: from developers who know x402 to every business on CloudFront/Cloudflare',
    },
    blurb: {
      ja: 'AWS・Cloudflare の x402対応で、参入者は「x402を知っている開発者」から CloudFront/Cloudflare を使う全事業者へ。市場拡大の構造を分析します。',
      en: 'With AWS and Cloudflare supporting x402, entrants shift from "developers who know x402" to every business using CloudFront/Cloudflare. We analyze the structure of this expansion.',
    },
    href: 'https://note.com/x402inc/n/nde1375fd27c9',
  },
]
