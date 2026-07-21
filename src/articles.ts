export type Article = {
  title: string
  blurb: string
  tag: string
  href: string
}

/* Latest featured insights — surfaced on the home page and the research page */
export const FEATURED_ARTICLES: Article[] = [
  {
    tag: '委任付き自律決済',
    title:
      'x402 per call自律決済の前に来る委任付き自律決済——エージェントへの委任が解いている三つの問題',
    blurb:
      'per-call 自律決済に至る前段として、人間からエージェントへの「委任付き自律決済」が何を解いているのか。委任が解く三つの問題を整理します。',
    href: 'https://note.com/x402inc/n/n3940b09a8d77',
  },
  {
    tag: 'Stripe · Foundation',
    title:
      'MPP経由の受け入れとx402：StripeがA to Aで両方を担ぐ構造と7月14日のx402 Foundation発足',
    blurb:
      'Stripe が A to A で MPP経由の受け入れと x402 の両方を担ぐ構造とは何か。7月14日の x402 Foundation 発足が持つ意味を読み解きます。',
    href: 'https://note.com/x402inc/n/nd740252230f2',
  },
  {
    tag: 'AWS · Cloudflare',
    title:
      'AWSとCloudflareのx402対応と市場拡大：x402を知っている開発者からCloudFront/Cloudflareを使っている全事業者の参入へ',
    blurb:
      'AWS・Cloudflare の x402対応で、参入者は「x402を知っている開発者」から CloudFront/Cloudflare を使う全事業者へ。市場拡大の構造を分析します。',
    href: 'https://note.com/x402inc/n/nde1375fd27c9',
  },
]
