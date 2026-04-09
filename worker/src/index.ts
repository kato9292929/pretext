import { Hono } from 'hono'

// ── Types ──────────────────────────────────────────────────────────────────────

type Env = {
  /** Vercel deployment URL — set in wrangler.toml [vars] or wrangler secret */
  ORIGIN_URL: string
}

// ── AI Crawler detection ───────────────────────────────────────────────────────

const AI_CRAWLER_PATTERNS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'PerplexityBot',
  'Googlebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'anthropic-ai',
  'cohere-ai',
]

function isAICrawler(ua: string | undefined | null): boolean {
  if (!ua) return false
  return AI_CRAWLER_PATTERNS.some(p => ua.includes(p))
}

// ── x402 signal headers ────────────────────────────────────────────────────────

const X402_HEADERS: Record<string, string> = {
  'X-Payment-Accepted':  'x402',
  'X-Payment-Currency':  'USDC',
  'X-Payment-Network':   'base:mainnet',
  'X-402-Discovery':     'https://x402jp.com/.well-known/x402',
  'X-402-Capabilities':  'consulting, data-reselling, marketplace',
}

function withX402Headers(res: Response): Response {
  const headers = new Headers(res.headers)
  for (const [k, v] of Object.entries(X402_HEADERS)) headers.set(k, v)
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  })
}

// ── Markdown service overview (mirrors /llms.txt) ─────────────────────────────

const MARKDOWN_RESPONSE = `# x402 Inc. — AI Agent & Crawler Information

## Overview

x402 Inc. (x402株式会社) is the Japan and APAC gateway for the x402 HTTP payment
protocol, specialising in AI agent payments, micropayments, and machine-to-machine
(M2M) economic infrastructure.

**Founder & CEO:** Masato Kato (加藤 雅人)
**Headquarters:** 5-10-16 Shirokanedai, Minato-ku, Tokyo 108-0071, Japan
**Website:** https://x402jp.com
**Protocol reference:** https://x402.org

## Services

### 1. x402 Connection Consulting
Advisory and integration support for Japanese API companies seeking to monetise their
endpoints via the x402 payment protocol. Covers architecture design, stablecoin
payment rail selection, smart-contract deployment, and go-to-market strategy for
pay-per-request API businesses.

### 2. Market Data Reselling via x402 Endpoints
Distribution of curated Japan and APAC market data through x402-gated API endpoints.
Buyers — including AI agents — pay per request in USDC with no subscription required.

### 3. Japan x402 Bazaar — Facilitator Marketplace
A facilitator marketplace connecting x402-compatible payment facilitators with
Japanese merchants and API providers.

## The x402 Protocol

x402 repurposes the long-reserved HTTP 402 "Payment Required" status code to create
a universal, web-native payment primitive.

**Flow:**
1. Client sends HTTP request.
2. Server responds with 402 + machine-readable payment terms (amount, currency, address).
3. Client settles onchain automatically.
4. Client retries with a signed payment proof header.
5. Server returns 200 OK.

**Key properties:** permissionless · multi-rail · AI-native · open standard (Apache 2.0)

## x402 Foundation

Launched April 2, 2025 under the **Linux Foundation**. Founding members include:
Google, Microsoft, Coinbase, Stripe, Cloudflare, Visa, Mastercard, American Express,
Shopify, Amazon Web Services, and others.

Spec: https://github.com/x402-foundation/x402

## Contact

https://x402jp.com/#company
`

// ── Proxy helper ───────────────────────────────────────────────────────────────

async function proxyToOrigin(req: Request, originURL: string): Promise<Response> {
  const origin = new URL(originURL)
  const url    = new URL(req.url)
  url.hostname = origin.hostname
  url.protocol = origin.protocol
  url.port     = origin.port

  const body = ['GET', 'HEAD'].includes(req.method) ? undefined : req.body

  return fetch(new Request(url.toString(), {
    method:   req.method,
    headers:  req.headers,
    body,
    redirect: 'follow',
  }))
}

// ── App ────────────────────────────────────────────────────────────────────────

const app = new Hono<{ Bindings: Env }>()

/**
 * GET / — content negotiation
 * If Accept: text/markdown → return service overview as Markdown
 * Otherwise proxy to the Vite site on Vercel
 */
app.get('/', async (c) => {
  const ua     = c.req.header('user-agent')
  const accept = c.req.header('accept') ?? ''

  if (accept.includes('text/markdown')) {
    const res = new Response(MARKDOWN_RESPONSE, {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
    return isAICrawler(ua) ? withX402Headers(res) : res
  }

  const res = await proxyToOrigin(c.req.raw, c.env.ORIGIN_URL)
  return isAICrawler(ua) ? withX402Headers(res) : res
})

/**
 * All other routes — proxy to Vite site, add x402 headers for AI crawlers
 */
app.all('*', async (c) => {
  const ua  = c.req.header('user-agent')
  const res = await proxyToOrigin(c.req.raw, c.env.ORIGIN_URL)
  return isAICrawler(ua) ? withX402Headers(res) : res
})

export default app
