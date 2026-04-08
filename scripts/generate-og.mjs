/**
 * generate-og.mjs — builds public/og-image.png
 * Matches the "x402とは / Protocol" section screenshot using Outfit font.
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '../public/og-image.png')

const W = 1200
const H = 630

// Embed Outfit font as base64
const fontDir = join(__dirname, '../node_modules/@fontsource/outfit/files')
const outfit400 = readFileSync(join(fontDir, 'outfit-latin-400-normal.woff')).toString('base64')
const outfit700 = readFileSync(join(fontDir, 'outfit-latin-700-normal.woff')).toString('base64')
const outfit900 = readFileSync(join(fontDir, 'outfit-latin-900-normal.woff')).toString('base64')

const svg = /* xml */`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <style>
    @font-face {
      font-family: 'Outfit';
      font-weight: 400;
      src: url('data:font/woff;base64,${outfit400}') format('woff');
    }
    @font-face {
      font-family: 'Outfit';
      font-weight: 700;
      src: url('data:font/woff;base64,${outfit700}') format('woff');
    }
    @font-face {
      font-family: 'Outfit';
      font-weight: 900;
      src: url('data:font/woff;base64,${outfit900}') format('woff');
    }
  </style>
  <linearGradient id="bggrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0d0d13"/>
    <stop offset="100%" stop-color="#070709"/>
  </linearGradient>
  <linearGradient id="codebg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0c0c16"/>
    <stop offset="100%" stop-color="#080810"/>
  </linearGradient>
  <clipPath id="clip"><rect width="${W}" height="${H}"/></clipPath>
</defs>
<g clip-path="url(#clip)">

<!-- Background -->
<rect width="${W}" height="${H}" fill="url(#bggrad)"/>

<!-- ── LEFT COLUMN (0–620) ── -->

<!-- PROTOCOL eyebrow -->
<text x="64" y="72"
  font-family="Outfit, Arial, sans-serif"
  font-size="12" font-weight="400" letter-spacing="5"
  fill="#c4a35a">PROTOCOL</text>

<!-- x402とは title -->
<text x="60" y="158"
  font-family="Outfit, Arial Black, sans-serif"
  font-size="64" font-weight="900"
  fill="#e8e4dc">x402とは</text>

<!-- Body paragraph 1 -->
<text x="64" y="218" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">HTTP 402 "Payment Required" ステータスコードは、1997年から</text>
<text x="64" y="242" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">予約されていましたが、30年近く未使用のままでした。</text>

<!-- Body paragraph 2 -->
<text x="64" y="282" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">Coinbase、Cloudflare、Stripeが主導し、Linux Foundation傘下の</text>
<text x="64" y="306" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">x402 Foundationとして設立されたこのオープンスタンダード</text>
<text x="64" y="330" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">は、ウェブリクエストに支払いを直接組み込む普遍的な方法を定</text>
<text x="64" y="354" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">義します。製品ではなく、プラットフォームでもなく—<tspan fill="#e8e4dc" font-weight="500">公共財</tspan>で</text>
<text x="64" y="378" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">す。</text>

<!-- Body paragraph 3 -->
<text x="64" y="418" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">サーバーが402を返したとき、クライアント（人間でもAIエージ</text>
<text x="64" y="442" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">ェントでも）は自動的に支払いを完了し、リクエストを再試行し</text>
<text x="64" y="466" font-family="Outfit, Arial, sans-serif" font-size="15.5" font-weight="400" fill="#6a6560">ます。人間が毎回フォームを入力する必要はありません。</text>

<!-- 仕様を読む button -->
<rect x="64" y="500" width="156" height="46" rx="10" fill="none" stroke="#2a2a36" stroke-width="1.5"/>
<text x="142" y="528" font-family="Outfit, Arial, sans-serif" font-size="14.5" font-weight="400" fill="#6a6560" text-anchor="middle">仕様を読む →</text>

<!-- ── RIGHT COLUMN: Code block (640–1136) ── -->
<rect x="630" y="36" width="506" height="558" rx="18" fill="url(#codebg)" stroke="#1e1e2a" stroke-width="1.2"/>

<!-- Code header bar -->
<rect x="630" y="36" width="506" height="52" rx="18" fill="#0d0d18"/>
<rect x="630" y="72" width="506" height="16" fill="#0d0d18"/>
<rect x="630" y="88" width="506" height="1" fill="#1e1e2a"/>

<!-- Traffic light dots -->
<circle cx="660" cy="62" r="5.5" fill="#2a2a36"/>
<circle cx="678" cy="62" r="5.5" fill="#2a2a36"/>
<circle cx="696" cy="62" r="5.5" fill="#2a2a36"/>

<!-- HTTP Flow label -->
<text x="716" y="68" font-family="Outfit, Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5a5650" letter-spacing="0.5">HTTP Flow</text>

<!-- Code lines -->
<!-- Request 1 -->
<text x="660" y="126" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">→  GET /api/data HTTP/1.1</text>
<text x="668" y="148" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">   Host: api.example.com</text>

<!-- 402 Response -->
<text x="660" y="190" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#c4a35a">←  HTTP/1.1 402 Payment Required</text>
<text x="668" y="212" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">   X-Payment-Required: version=1</text>
<text x="668" y="234" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">   X-Payment-Amount: 0.001</text>
<text x="668" y="256" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">   X-Payment-Token: USDC</text>

<!-- Request 2 with payment -->
<text x="660" y="298" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">→  GET /api/data HTTP/1.1</text>
<text x="668" y="320" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">   X-Payment: &lt;signed_payload&gt;</text>

<!-- 200 OK -->
<text x="660" y="362" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#4adf8a">←  HTTP/1.1 200 OK</text>
<text x="668" y="384" font-family="'Courier New', Courier, monospace" font-size="13.5" fill="#5a5650">   Content-Type: application/json</text>

</g>
</svg>`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(OUT, png)
console.log(`✓ og-image.png (${(png.length / 1024).toFixed(0)}KB)`)
