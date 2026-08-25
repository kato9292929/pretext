import fs from 'fs'
const P = '/home/user/pretext/public/products/'
const dataUri = (f) => 'data:image/png;base64,' + fs.readFileSync(P + f).toString('base64')
const IMG = {
  endpoint: dataUri('endpoint.png'),
  aa: dataUri('aa.png'),
  osd: dataUri('osd.png'),
  jin: dataUri('jin.png'),
}

const products = [
  { tag: '01 · MAP', badge: 'HTTP/1.1 402', name: 'x402 Endpoint', img: IMG.endpoint,
    desc: 'x402対応の課金エンドポイントを集めた一覧。約19,000件超を毎日記録し、推移を時系列で追える。REST と MCP の両方で配信。', links: ['サイトを見る', 'note', 'GitHub'] },
  { tag: '02 · CONSUME', badge: 'Railway', name: 'x402 Autonomous Agent', img: IMG.aa,
    desc: 'オンチェーンの身元（ERC-8004, agentId 55560）を持つエージェントが、毎朝データを per-call で購入し日次の判断を記録。', links: ['準備中', 'note', 'GitHub'] },
  { tag: '03 · PRODUCE', badge: 'HTTP/1.1 402', name: 'Onchain Stock Data', img: IMG.osd,
    desc: 'Claude(Opus) が毎週、米国株と日本株を10銘柄ずつ選んで予想。判定日付きの数値カタリストを scorecard に採点。', links: ['サイトを見る', 'note', 'GitHub'] },
  { tag: '03 · PRODUCE', badge: 'HTTP/1.1 402', name: 'Japan Inflation Nowcast', img: IMG.jin,
    desc: '東京のスーパーの店頭価格を毎日記録して作る独自の物価指数。x402 エンドポイントとして配信し per-call で購入できる。', links: ['サイトを見る'] },
]

const classes = [
  { badge: 'E0', cls: 'Class 1 · 2', name: '社内エージェント / 決済なし',
    groups: [['予算上限型', ['qm', 'Cloudflare OS']], ['起案・承認分離', ['Stripe Approvals']]] },
  { badge: 'E3', cls: 'Class 3', name: 'カード / 承認制チェックアウト',
    groups: [['3a｜都度承認', ['Crossmint', 'Stripe Approvals']], ['3b｜委任枠内で自律', ['Visa', 'Mastercard', 'Lobster.cash', 'Robinhood']], ['基盤・信頼', ['American Express', 'Stripe Issuing', 'Meow']]] },
  { badge: 'E4', cls: 'Class 4', name: 'x402 A to A｜per-call調達',
    groups: [['4a｜実装型', ['Glassnode', 'You.com']], ['4b｜設定型', ['Cloudflare Monetization Gateway']], ['4c｜配布型', ['AgentCash', 'Agentic.market', 'Nevermined']], ['買い手側基盤', ['Cloudflare Wallets']]] },
  { badge: 'E5', cls: 'Class 5', name: 'x402 A to A｜エージェント間市場',
    groups: [['5a｜escrow・評価内蔵', ['Virtuals ACP', 'AgenC']], ['5b｜単一identityへ集約', ['OKX AI']]] },
]
const composite = [
  { badge: '型α', cls: 'Class 1 + 4', name: '内部起点・外部決済', chips: ['Hermes Agent'] },
  { badge: '型β', cls: 'Class 3 / 4 境界', name: '機械主体・カード', chips: ['Oobit'] },
  { badge: '型P', cls: 'Class 3 + 4', name: '決済オプション併設', chips: ['Stripe Machine Payments', 'Visa Intelligent Commerce', 'Coinbase Business', 'Adyen Agentic'] },
]

const payload = [
  '対象URLにGET（またはPOST）',
  '402 Payment Required が返る（ヘッダに支払い先・金額・チェーン）',
  'USDCの支払いを署名（Base: EIP-3009 / Solana: SPL。手数料は facilitator 負担）',
  '署名を X-PAYMENT ヘッダに載せ、同じURLへ再リクエスト',
  '200 OK とデータ（PAYMENT-RESPONSE に決済トランザクション）',
]
const groups = [
  { name: 'Japan Inflation Nowcast', host: 'jin.x402jp.com', eps: [
    ['GET', '/api/jin/latest', '200', 'free'], ['GET', '/api/jin/series', '402', '$0.01'], ['GET', '/api/jin/movers', '402', '$0.02'] ] },
  { name: 'Onchain Stock Data', host: 'osd.x402jp.com', eps: [
    ['GET', '/api/alpha/catalysts/physical-ai', '200', 'free'], ['GET', '/api/alpha/portfolio/current', '402', '$0.01'],
    ['GET', '/api/alpha/portfolio/scorecard', '402', '$0.01'], ['GET', '/api/alpha/jp/portfolio/current', '402', '$0.01'],
    ['GET', '/api/alpha/jp/catalysts', '402', '$0.01'], ['POST', '/api/alpha/catalyst/submit', '402', '$0.01'] ] },
  { name: 'Intelligence', host: 'vercel', eps: [
    ['GET', 'macro/dashboard', '402', '$0.30'], ['GET', 'yield/scan', '402', '$0.20'],
    ['POST', 'portfolio/analyze', '402', '$0.50'], ['GET', 'hyperliquid/scan', '402', '$0.20'] ] },
]

const chip = (t) => `<span class="chip">${t}</span>`
const gold = (t) => `<span class="tag">${t}</span>`

const productCard = (p) => `
  <div class="pcard">
    <div class="pimg"><img src="${p.img}" alt=""></div>
    <div class="prow"><span class="ptag">${p.tag}</span><span class="badge">${p.badge}</span></div>
    <h3>${p.name}</h3>
    <p class="pdesc">${p.desc}</p>
    <div class="plinks">${p.links.map((l) => `<span>${l} ↗</span>`).join('')}</div>
  </div>`

const classCard = (c) => `
  <div class="ccard">
    <div class="crow"><span class="ebadge">${c.badge}</span><span class="cname">${c.name}</span></div>
    <span class="cls">${c.cls}</span>
    ${c.groups.map(([sub, items]) => `<div class="cgrp"><div class="sub">${sub}</div><div class="chips">${items.map(chip).join('')}</div></div>`).join('')}
  </div>`

const compCard = (c) => `
  <div class="compcard">
    <div class="crow"><span class="ebadge alt">${c.badge}</span><span class="cname">${c.name}</span><span class="cls">${c.cls}</span></div>
    <div class="chips">${c.chips.map(chip).join('')}</div>
  </div>`

const epRow = (e) => `<div class="ep"><span class="m">${e[0]}</span><code>${e[1]}</code><span class="st ${e[2] === '200' ? 'ok' : 'pay'}">${e[2]}</span><span class="price">${e[3]}</span></div>`
const groupCol = (g) => `
  <div class="gcol">
    <div class="ghead"><h4>${g.name}</h4><code class="host">${g.host}</code></div>
    ${g.eps.map(epRow).join('')}
  </div>`

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<title>x402 Inc. — boards</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&display=swap');
  :root{--gold:#E8C338;--fg:#ffffff;--muted:rgba(255,255,255,.62);--faint:rgba(255,255,255,.4);--line:rgba(255,255,255,.1);--card:rgba(255,255,255,.03)}
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#000;color:var(--fg);font-family:'Outfit',-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
  .board{width:1920px;height:1080px;background:#000;padding:72px 96px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center}
  .board + .board{border-top:1px solid #111}
  .eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:14px}
  .eyebrow h2{font-size:40px;font-weight:700;letter-spacing:-.02em}
  .pill{border:1px solid rgba(232,195,56,.45);color:var(--gold);background:rgba(232,195,56,.08);border-radius:999px;padding:6px 16px;font-size:18px}
  .lead{color:var(--muted);font-size:22px;line-height:1.6;max-width:1400px;margin-bottom:30px}
  .tag{color:var(--gold)}
  .chip{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:5px 12px;font-size:15px;color:var(--muted);margin:0 6px 6px 0}
  .badge{border:1px solid rgba(232,195,56,.4);color:var(--gold);border-radius:999px;padding:3px 12px;font-size:14px;font-family:monospace}
  /* HERO */
  .hero{align-items:center;justify-content:center;text-align:center}
  .hero h1{font-size:132px;font-weight:800;line-height:.98;letter-spacing:-.03em}
  .hero .l1{color:#fff}
  .hero .l2{background:linear-gradient(120deg,#8A6D10,#C99A24 20%,#F3DE8E 42%,#FDF6D0 52%,#E8C338 66%,#B8901A 88%);-webkit-background-clip:text;background-clip:text;color:transparent}
  .hero .strip{margin-top:56px;display:flex;gap:16px}
  .hero .strip .chip{font-size:20px;padding:10px 22px;color:#fff;border-color:rgba(232,195,56,.35)}
  /* PRODUCTS */
  .prow4{display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
  .pcard{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:20px;display:flex;flex-direction:column}
  .pimg{border-radius:14px;overflow:hidden;aspect-ratio:16/10;background:#111;margin-bottom:16px}
  .pimg img{width:100%;height:100%;object-fit:cover;display:block}
  .prow{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
  .ptag{color:var(--gold);font-size:16px;letter-spacing:.04em}
  .pcard h3{font-size:26px;font-weight:700;margin-bottom:10px}
  .pdesc{color:var(--muted);font-size:17px;line-height:1.6}
  .plinks{margin-top:16px;display:flex;gap:16px;color:var(--gold);font-size:16px;font-weight:600}
  /* ECOSYSTEM */
  .eco4{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
  .ccard{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:22px}
  .crow{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px}
  .ebadge{background:var(--gold);color:#000;border-radius:999px;font-size:15px;font-weight:700;padding:2px 10px;font-family:monospace}
  .ebadge.alt{background:transparent;border:1px solid var(--gold);color:var(--gold)}
  .cname{color:var(--gold);font-size:19px;font-weight:600}
  .cls{border:1px solid rgba(232,195,56,.4);color:var(--gold);border-radius:999px;padding:2px 10px;font-size:13px;font-family:monospace}
  .cgrp{margin-top:14px}
  .sub{color:var(--faint);font-size:13px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:7px}
  .comp3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:22px}
  .compcard{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px 20px}
  .comp-h{color:var(--gold);font-size:15px;letter-spacing:.14em;text-transform:uppercase;margin:26px 0 4px}
  /* ENDPOINTS */
  .ebody{display:grid;grid-template-columns:1.1fr 2.4fr;gap:34px}
  .pay{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:26px}
  .pay h3{font-size:26px;margin-bottom:14px}
  .curl{background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:14px;font-family:monospace;font-size:16px;color:#ddd;margin-bottom:18px}
  .step{display:flex;gap:12px;margin-bottom:12px;color:var(--muted);font-size:16px;line-height:1.5}
  .num{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--gold);font-family:monospace}
  .grps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .gcol{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:22px}
  .ghead{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px}
  .ghead h4{font-size:21px}
  .host{color:var(--faint);font-size:13px;font-family:monospace}
  .ep{display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid var(--line);font-size:15px}
  .ep .m{color:var(--faint);font-family:monospace;font-size:12px;width:38px}
  .ep code{font-family:monospace;color:#ddd;font-size:13.5px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .st{font-family:monospace;font-size:12px;border-radius:999px;padding:2px 8px;border:1px solid}
  .st.ok{color:#28c840;border-color:rgba(40,200,64,.4)}
  .st.pay{color:var(--gold);border-color:rgba(232,195,56,.4)}
  .price{color:var(--gold);font-weight:700;font-size:14px;width:46px;text-align:right}
</style></head><body>

  <!-- BOARD 1: HERO -->
  <section class="board hero">
    <h1><span class="l1">The agentic economy</span><br><span class="l2">runs on x402.</span></h1>
    <div class="strip"><span class="chip">HTTP 402</span><span class="chip">Agentic Commerce</span><span class="chip">A to A</span><span class="chip">Research</span></div>
  </section>

  <!-- BOARD 2: PRODUCTS -->
  <section class="board">
    <div class="eyebrow"><h2>Products</h2><span class="pill">Automatic</span></div>
    <p class="lead">x402 Inc. は、エージェント経済とエージェント決済のエコシステムを、AIとの詳細なリサーチで分析するリサーチ会社です。x402対応のエンドポイント、独自データ、それを叩くエージェントを自ら作り、観測と検証の instruments として使います。</p>
    <div class="prow4">${products.map(productCard).join('')}</div>
  </section>

  <!-- BOARD 3: ECOSYSTEM -->
  <section class="board">
    <div class="eyebrow"><h2>Ecosystem</h2><span class="pill">segmentation</span></div>
    <p class="lead">エージェント決済は単一の方向へ移行しません。Classは「支払い相手との間柄」で分かれ、そこに局面（誰が起案・承認するか）と経済形（カード網か per-call の A to A か）が重なります。</p>
    <div class="eco4">${classes.map(classCard).join('')}</div>
    <div class="comp-h">複合｜局面 × 経済形</div>
    <div class="comp3">${composite.map(compCard).join('')}</div>
  </section>

  <!-- BOARD 4: ENDPOINTS -->
  <section class="board">
    <div class="eyebrow"><h2>How to Pay</h2><span class="pill">Endpoints</span></div>
    <div class="ebody">
      <div class="pay">
        <h3>How to Pay</h3>
        <div class="curl"><span style="color:#666">$ </span>curl https://jin.x402jp.com/api/jin/latest</div>
        ${payload.map((s, i) => `<div class="step"><span class="num">${i + 1}</span><span>${s}</span></div>`).join('')}
      </div>
      <div class="grps">${groups.map(groupCol).join('')}</div>
    </div>
  </section>

</body></html>`

fs.writeFileSync('/home/user/pretext/exports/boards.html', html)
console.log('wrote boards.html', (html.length / 1024).toFixed(0) + 'KB')
