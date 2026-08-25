import fs from 'fs'
const P = '/home/user/pretext/public/products/'
const L = '/home/user/pretext/public/logos/'
const dataUri = (p) => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64')
const IMG = {
  endpoint: dataUri(P + 'endpoint.png'),
  aa: dataUri(P + 'aa.png'),
  osd: dataUri(P + 'osd.png'),
  jin: dataUri(P + 'jin.png'),
}
// Optional logo files (fall back to text when absent)
const tryLogo = (f) => { try { return dataUri(L + f) } catch { return null } }
const JCBA = tryLogo('jcba.png')

const introProducts = '当社はエージェントエコシステムを「内側から」観測・検証するため、三層モデルを自社で運用しています。'

const products = [
  { layer: 'MAP（発見）', badge: 'HTTP/1.1 402', name: 'x402 Endpoint', img: IMG.endpoint,
    desc: 'x402（HTTP 402）対応の課金エンドポイントを横断収集したカタログ。約19,700件を収録し、x402scan を主軸に pay.sh 等のディレクトリと自社登録分を毎日統合・重複排除・正規化して日次スナップショットとして保存。2026年6月上旬からの件数・カテゴリ・ホスト構成の推移を時系列で追える。REST API と MCP サーバーで配信し、AIエージェントが直接読み取れる。',
    links: ['サイトを見る', 'note', 'GitHub'] },
  { layer: 'CONSUME（消費）', badge: 'Railway', name: 'x402 Autonomous Agent', img: IMG.aa,
    desc: 'オンチェーンID（ERC-8004）を持つ自律エージェント。毎朝 06:00 JST にデータを per-call で購入し、その日の判断を追記専用で記録。決済は Base / Solana の USDC で1コールごとにオンチェーン完結、署名は Circle の Developer-Controlled Wallet。売買執行は接続せず記録のみ。週次の高額購入（5本・$10.50）前には World ID による人間の承認を必須とし、委任範囲を人間が管理する。',
    links: ['準備中', 'note', 'GitHub'] },
  { layer: 'PRODUCE（データ生成）', badge: 'HTTP/1.1 402', name: 'Onchain Stock Data', img: IMG.osd,
    desc: 'Claude が毎週、米国株・日本株を10銘柄ずつ選定し「判定日付きの数値カタリスト」を添えて予想。判定日経過後に決算・適時開示など一次情報と突き合わせ hit / partial / miss を採点し scorecard に記録。上書き・削除せず git に追記し、積み上がる track record そのものが価値。配信は REST（x402 都度払い）、MCP は計画中。※投資助言ではなく AI 予測精度の検証記録。',
    links: ['サイトを見る', 'note', 'GitHub'] },
  { layer: 'PRODUCE（データ生成）', badge: 'HTTP/1.1 402', name: 'Japan Inflation Nowcall', img: IMG.jin,
    desc: '東京のあるスーパーの店頭価格を人手で記録してつくる独自の食品物価指数。固定基準日=100 に対し同一SKUの価格相対を Jevons 幾何平均で集計し、10カテゴリ等加重で指数化（販促除外／込みの2系列・観測日ベース）。x402 で配信し、latest は無料、series / movers は per-call で購入できる。',
    links: ['サイトを見る'] },
]

const ecoIntro = '当社は「誰に支払うか」を主軸に、「誰が起案し、誰が承認するか」「カード網か、呼び出しごとの支払い（per-call）か」を重ね、市場を5つのクラスに分類して調査しています。'

const classes = [
  { n: '1', name: '社内エージェント', desc: '決済が発生しない内部統制型。予算上限管理や起案・承認の分離。',
    groups: [[null, ['qm', 'Cloudflare OS']]] },
  { n: '2', name: 'クレジットカード／承認制チェックアウト', desc: '人間の委任に基づきカード網で決済。名義と責任は人間に帰属。',
    groups: [['都度承認型', ['Crossmint', 'Stripe Approvals']], ['委任自律型', ['Visa', 'American Express', 'Meow']]] },
  { n: '3', name: 'x402 A to A／per-call', desc: '都度払いによる調達。アカウントのない相手とも HTTP 402 で即時決済。',
    groups: [[null, ['Glassnode', 'You.com', 'AgentCash', 'Agentic.market']]] },
  { n: '4', name: 'エージェント間市場', desc: 'エージェント同士の直接取引。escrow（預託）や評価機能を内蔵。',
    groups: [[null, ['Virtuals ACP', 'AgenC', 'OKX AI']]] },
]
const composite = [
  { badge: 'α', name: '内部起点・外部決済', desc: '起案は社内、決済は外部へ per-call で接続。', chips: ['Hermes Agent'] },
  { badge: 'β', name: 'エージェント・カード決済', desc: 'エージェントはウォレットで自律的に動くが、決済はカード網。', chips: ['Oobit'] },
  { badge: 'P', name: '決済オプション併設', desc: '既存の決済手段の選択肢の一つとして x402 を実装。', chips: ['Stripe Machine Payments', 'Visa Intelligent Commerce', 'Adyen Agentic'] },
]

const payload = [
  '対象URLに GET（または POST）',
  '402 Payment Required が返る（ヘッダに支払い先・金額・チェーン）',
  'USDC の支払いを署名（Base: EIP-3009 / Solana: SPL。手数料は facilitator 負担）',
  '署名を X-PAYMENT ヘッダに載せ、同じURLへ再リクエスト',
  '200 OK とデータ（PAYMENT-RESPONSE に決済トランザクション）',
]
const groups = [
  { name: 'Japan Inflation Nowcall', host: 'jin.x402jp.com', eps: [
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
const wordmark = `<span class="wm"><span class="wx">x402</span><span class="wi"> Inc.</span></span>`
const assoc = JCBA
  ? `<img class="assoc-img" src="${JCBA}" alt="日本暗号資産ビジネス協会">`
  : `<div class="assoc"><span class="ao"></span><div><div class="aj">日本暗号資産ビジネス協会 会員</div><div class="ae">Japan Cryptoasset Business Association</div></div></div>`
const brandbar = `<div class="brandbar">${wordmark}${assoc}</div>`

const productCard = (p) => `
  <div class="pcard">
    <div class="pimg"><img src="${p.img}" alt=""></div>
    <div class="prow"><span class="ptag">${p.layer}</span><span class="badge">${p.badge}</span></div>
    <h3>${p.name}</h3>
    <p class="pdesc">${p.desc}</p>
    <div class="plinks">${p.links.map((l) => `<span>${l} ↗</span>`).join('')}</div>
  </div>`

const classCard = (c) => `
  <div class="ccard">
    <div class="crow"><span class="nbadge">${c.n}</span><span class="cname">${c.name}</span></div>
    <p class="cdesc">${c.desc}</p>
    ${c.groups.map(([sub, items]) => `<div class="cgrp">${sub ? `<div class="sub">${sub}</div>` : ''}<div class="chips">${items.map(chip).join('')}</div></div>`).join('')}
  </div>`

const compCard = (c) => `
  <div class="compcard">
    <div class="crow"><span class="nbadge alt">型${c.badge}</span><span class="cname">${c.name}</span></div>
    <p class="cdesc">${c.desc}</p>
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
  :root{--gold:#E8C338;--fg:#ffffff;--muted:rgba(255,255,255,.64);--faint:rgba(255,255,255,.42);--line:rgba(255,255,255,.1);--card:rgba(255,255,255,.03)}
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#000;color:var(--fg);font-family:'Outfit',-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
  .board{width:1920px;min-height:1080px;background:#000;padding:72px 96px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center}
  .board + .board{border-top:1px solid #111}
  .eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:14px}
  .eyebrow h2{font-size:40px;font-weight:700;letter-spacing:-.02em}
  .pill{border:1px solid rgba(232,195,56,.45);color:var(--gold);background:rgba(232,195,56,.08);border-radius:999px;padding:6px 16px;font-size:18px}
  .lead{color:var(--muted);font-size:21px;line-height:1.6;max-width:1500px;margin-bottom:30px}
  .chip{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:5px 12px;font-size:15px;color:var(--muted);margin:0 6px 6px 0}
  .badge{border:1px solid rgba(232,195,56,.4);color:var(--gold);border-radius:999px;padding:3px 12px;font-size:13px;font-family:monospace;white-space:nowrap}
  /* brand bar */
  .brandbar{position:absolute;left:96px;right:96px;bottom:40px;display:flex;align-items:center;justify-content:space-between}
  .wm{font-weight:800;font-size:30px;letter-spacing:-.02em}
  .wm .wx{color:#fff}
  .wm .wi{background:linear-gradient(120deg,#8A6D10,#C99A24 20%,#F3DE8E 45%,#FDF6D0 55%,#E8C338 70%,#B8901A 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
  .assoc{display:flex;align-items:center;gap:12px}
  .assoc .ao{width:26px;height:26px;border-radius:50%;border:3px solid #c0392b;box-shadow:inset 0 0 0 2px #d4a017}
  .assoc .aj{font-size:15px;color:rgba(255,255,255,.8)}
  .assoc .ae{font-size:11px;color:var(--faint);letter-spacing:.04em}
  .assoc-img{height:48px;width:auto}
  /* HERO */
  .hero{align-items:center;justify-content:center;text-align:center}
  .hero h1{font-size:130px;font-weight:800;line-height:.98;letter-spacing:-.03em}
  .hero .l1{color:#fff}
  .hero .l2{background:linear-gradient(120deg,#8A6D10,#C99A24 20%,#F3DE8E 42%,#FDF6D0 52%,#E8C338 66%,#B8901A 88%);-webkit-background-clip:text;background-clip:text;color:transparent}
  .hero .strip{margin-top:52px;display:flex;gap:16px}
  .hero .strip .chip{font-size:20px;padding:10px 22px;color:#fff;border-color:rgba(232,195,56,.35)}
  /* PRODUCTS */
  .prow4{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
  .pcard{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:20px;display:flex;flex-direction:column}
  .pimg{border-radius:14px;overflow:hidden;aspect-ratio:16/10;background:#111;margin-bottom:14px}
  .pimg img{width:100%;height:100%;object-fit:cover;display:block}
  .prow{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:9px}
  .ptag{color:var(--gold);font-size:15px;font-weight:600;letter-spacing:.02em}
  .pcard h3{font-size:24px;font-weight:700;margin-bottom:9px}
  .pdesc{color:var(--muted);font-size:14px;line-height:1.62}
  .plinks{margin-top:14px;display:flex;flex-wrap:wrap;gap:14px;color:var(--gold);font-size:15px;font-weight:600}
  /* ECOSYSTEM */
  .eco4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  .ccard{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:22px}
  .crow{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px}
  .nbadge{background:var(--gold);color:#000;border-radius:50%;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;flex:none}
  .nbadge.alt{background:transparent;border:1.5px solid var(--gold);color:var(--gold);border-radius:999px;width:auto;padding:0 12px;height:28px;font-size:15px}
  .cname{color:#fff;font-size:19px;font-weight:700}
  .cdesc{color:var(--muted);font-size:14.5px;line-height:1.55;margin-bottom:12px}
  .cgrp{margin-top:12px}
  .sub{color:var(--gold);font-size:13px;font-weight:600;margin-bottom:7px}
  .comp3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:20px}
  .compcard{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px}
  .comp-h{color:var(--gold);font-size:15px;letter-spacing:.14em;margin:24px 0 4px;display:flex;align-items:center;gap:10px}
  .comp-h .nbadge{width:26px;height:26px;font-size:14px}
  /* ENDPOINTS */
  .ebody{display:grid;grid-template-columns:1.1fr 2.4fr;gap:32px}
  .pay{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:26px}
  .pay h3{font-size:24px;margin-bottom:14px}
  .curl{background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:14px;font-family:monospace;font-size:15px;color:#ddd;margin-bottom:18px}
  .step{display:flex;gap:12px;margin-bottom:12px;color:var(--muted);font-size:15px;line-height:1.5}
  .num{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--gold);font-family:monospace}
  .grps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
  .gcol{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:22px}
  .ghead{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}
  .ghead h4{font-size:20px}
  .host{color:var(--faint);font-size:13px;font-family:monospace}
  .ep{display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid var(--line);font-size:15px}
  .ep .m{color:var(--faint);font-family:monospace;font-size:12px;width:38px}
  .ep code{font-family:monospace;color:#ddd;font-size:13px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
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

  <!-- BOARD 2: PRODUCTS (three-layer model) -->
  <section class="board">
    <div class="eyebrow"><h2>Products</h2><span class="pill">三層モデル</span></div>
    <p class="lead">${introProducts}</p>
    <div class="prow4">${products.map(productCard).join('')}</div>
  </section>

  <!-- BOARD 3: ECOSYSTEM (5 classes) -->
  <section class="board">
    <div class="eyebrow"><h2>市場動向</h2><span class="pill">2026年のエージェント経済・決済</span></div>
    <p class="lead">${ecoIntro}</p>
    <div class="eco4">${classes.map(classCard).join('')}</div>
    <div class="comp-h"><span class="nbadge alt">5</span>複合型</div>
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
console.log('wrote boards.html', (html.length / 1024).toFixed(0) + 'KB', 'JCBA logo:', JCBA ? 'embedded' : 'text fallback')
