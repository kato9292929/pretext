/**
 * generate-og.mjs
 * Generates public/og-image.png from an SVG that replicates
 * the "x402とは / Protocol" section of the site.
 * Run: node scripts/generate-og.mjs
 */
import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '../public/og-image.png')

const W = 1200
const H = 630

// ── SVG replicating the Protocol / x402とは section ──────────────────────────
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#0d0d13"/>
    <stop offset="100%" stop-color="#070709"/>
  </linearGradient>
  <linearGradient id="codebg" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#0a0a14"/>
    <stop offset="100%" stop-color="#080810"/>
  </linearGradient>
  <radialGradient id="orb" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="rgba(196,163,90,0.14)"/>
    <stop offset="100%" stop-color="rgba(196,163,90,0)"/>
  </radialGradient>
</defs>

<!-- Background -->
<rect width="${W}" height="${H}" fill="url(#bg)"/>

<!-- Subtle orb glow -->
<ellipse cx="200" cy="400" rx="280" ry="280" fill="url(#orb)" opacity="0.7"/>

<!-- Top nav bar (branding) -->
<rect width="${W}" height="56" fill="#070709" opacity="0.9"/>
<text x="48" y="35" font-family="Georgia, serif" font-size="20" font-weight="300" fill="#e4e0d8">x402 </text>
<text x="99" y="35" font-family="Georgia, serif" font-size="20" font-weight="300" fill="#c4a35a">Inc.</text>

<!-- Section separator -->
<rect x="0" y="56" width="${W}" height="1" fill="#1c1c26"/>

<!-- ── Left column ── -->

<!-- Eyebrow -->
<text x="48" y="116" font-family="Arial, sans-serif" font-size="11" font-weight="500" letter-spacing="5" fill="#c4a35a">PROTOCOL</text>

<!-- Section title -->
<text x="48" y="178" font-family="Georgia, serif" font-size="52" font-weight="400" fill="#e4e0d8">x402とは</text>

<!-- Divider under title -->
<rect x="48" y="196" width="60" height="2" fill="#c4a35a" opacity="0.5"/>

<!-- Body text line 1 -->
<text x="48" y="238" font-family="Arial, sans-serif" font-size="15.5" fill="#9a968e" xml:space="preserve">HTTP 402 "Payment Required" ステータスコードは、</text>
<text x="48" y="262" font-family="Arial, sans-serif" font-size="15.5" fill="#9a968e">1997年から予約されていましたが、30年近く未使用でした。</text>

<!-- Body text line 2 -->
<text x="48" y="302" font-family="Arial, sans-serif" font-size="15.5" fill="#9a968e">Coinbase・Cloudflare・Stripeが主導し、</text>
<text x="48" y="326" font-family="Arial, sans-serif" font-size="15.5" fill="#9a968e">Linux Foundation傘下のオープンスタンダードとして設立。</text>

<!-- Body text line 3 - highlighted -->
<text x="48" y="366" font-family="Arial, sans-serif" font-size="15.5" fill="#9a968e">製品ではなく、プラットフォームでもなく—</text>
<text x="48" y="390" font-family="Georgia, serif" font-size="17" font-weight="400" fill="#e4e0d8">公共財</text>
<text x="99" y="390" font-family="Arial, sans-serif" font-size="15.5" fill="#9a968e">です。</text>

<!-- ── Right column: Code block ── -->
<rect x="560" y="72" width="592" height="530" rx="14" fill="url(#codebg)" stroke="#1c1c26" stroke-width="1"/>

<!-- Code block header -->
<rect x="560" y="72" width="592" height="44" rx="14" fill="#0a0a14"/>
<rect x="560" y="102" width="592" height="14" fill="#0a0a14"/>
<circle cx="586" cy="94" r="5" fill="#1c1c26"/>
<circle cx="606" cy="94" r="5" fill="#1c1c26"/>
<circle cx="626" cy="94" r="5" fill="#1c1c26"/>
<text x="660" y="98" font-family="Arial, sans-serif" font-size="12" fill="#5a5650" letter-spacing="1">HTTP Flow</text>
<rect x="560" y="116" width="592" height="1" fill="#1c1c26"/>

<!-- Code content -->
<text x="590" y="158" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">→ GET /api/data HTTP/1.1</text>
<text x="598" y="180" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">  Host: api.example.com</text>

<text x="590" y="220" font-family="'Courier New', monospace" font-size="14" fill="#c4a35a">← HTTP/1.1 402 Payment Required</text>
<text x="598" y="242" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">  X-Payment-Required: version=1</text>
<text x="598" y="264" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">  X-Payment-Amount: 0.001</text>
<text x="598" y="286" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">  X-Payment-Token: USDC</text>

<text x="590" y="326" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">→ GET /api/data HTTP/1.1</text>
<text x="598" y="348" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">  X-Payment: &lt;signed_payload&gt;</text>

<text x="590" y="388" font-family="'Courier New', monospace" font-size="14" fill="#4adf8a">← HTTP/1.1 200 OK</text>
<text x="598" y="410" font-family="'Courier New', monospace" font-size="14" fill="#5a5650">  Content-Type: application/json</text>

<!-- Bottom info row -->
<rect x="0" y="510" width="${W}" height="1" fill="#1c1c26"/>
<rect x="0" y="511" width="${W}" height="${H - 511}" fill="#070709"/>

<text x="48" y="548" font-family="Georgia, serif" font-size="26" font-weight="300" fill="#c4a35a">165M+</text>
<text x="48" y="568" font-family="Arial, sans-serif" font-size="10" fill="#5a5650" letter-spacing="1.5">TRANSACTIONS</text>

<text x="220" y="548" font-family="Georgia, serif" font-size="26" font-weight="300" fill="#c4a35a">500K+</text>
<text x="220" y="568" font-family="Arial, sans-serif" font-size="10" fill="#5a5650" letter-spacing="1.5">ENTITIES</text>

<text x="390" y="548" font-family="Georgia, serif" font-size="26" font-weight="300" fill="#c4a35a">25+</text>
<text x="390" y="568" font-family="Arial, sans-serif" font-size="10" fill="#5a5650" letter-spacing="1.5">FOUNDING MEMBERS</text>

<text x="1152" y="560" font-family="Arial, sans-serif" font-size="14" fill="#7a6435" text-anchor="end">x402jp.com</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(OUT, png)
console.log('✓ Generated public/og-image.png (' + png.length + ' bytes)')
