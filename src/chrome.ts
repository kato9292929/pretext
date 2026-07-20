// chrome.ts — shared nav + footer injected on every page (keeps them DRY)

const NAV_HTML = `<nav class="nav" id="nav">
    <a class="nav-logo" href="/">x402 <span>Inc.</span></a>
    <ul class="nav-links">
      <li><a href="/#featured" data-i18n="nav.featured">最新事例</a></li>
      <li><a href="/about.html" data-i18n="nav.about">x402とは</a></li>
      <li><a href="/products.html" data-i18n="nav.products">プロダクト</a></li>
      <li><a href="/research.html" data-i18n="nav.vision">考察・調査</a></li>
    </ul>
    <div class="lang-toggle">
      <button class="lang-btn active" data-lang="ja" aria-pressed="true">JP</button>
      <span class="lang-sep">/</span>
      <button class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
    </div>
    <button class="nav-menu-btn" id="nav-menu-btn" aria-label="メニュー">
      <span></span><span></span><span></span>
    </button>
  </nav>`

const FOOTER_HTML = `<footer id="company" class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">x402 <span>Inc.</span></span>
        <p>HTTP 402 Payment Protocol<br>for the Agentic Economy</p>
      </div>
      <nav class="footer-nav">
        <ul>
          <li><a href="/#featured" data-i18n="ft.nav.featured">最新事例</a></li>
          <li><a href="/about.html" data-i18n="ft.nav.about">x402とは</a></li>
          <li><a href="/products.html" data-i18n="ft.nav.products">プロダクト</a></li>
          <li><a href="/research.html" data-i18n="ft.nav.vision">考察・調査</a></li>
        </ul>
        <ul>
          <li><a href="https://www.x402.org/" target="_blank" rel="noopener">x402.org ↗</a></li>
          <li><a href="https://github.com/x402-foundation/x402" target="_blank" rel="noopener">GitHub ↗</a></li>
          <li><a href="https://note.com/x402inc" target="_blank" rel="noopener">note ↗</a></li>
          <li><a href="https://github.com/kato9292929" target="_blank" rel="noopener">GitHub (Projects) ↗</a></li>
          <li><a href="mailto:hello@x402jp.com">hello@x402jp.com</a></li>
        </ul>
      </nav>
      <div class="footer-company">
        <p class="footer-company-label">COMPANY</p>
        <dl class="footer-company-dl">
          <div><dt data-i18n="ft.company.name.dt">社名</dt><dd>x402株式会社（x402 Inc.）</dd></div>
          <div><dt data-i18n="ft.company.ceo.dt">代表取締役</dt><dd>加藤 雅人（Masato Kato）</dd></div>
          <div><dt data-i18n="ft.company.address.dt">所在地</dt><dd>〒105-0013 東京都港区浜松町2丁目2番15号 浜松町ダイヤビル2F</dd></div>
          <div><dt data-i18n="ft.company.founded.dt">設立</dt><dd>2025年</dd></div>
        </dl>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p data-i18n="ft.copyright">© 2025 x402株式会社 (x402 Inc.). All rights reserved.</p>
      </div>
    </div>
  </footer>`

export function mountChrome(): void {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML)
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML)
  const path = location.pathname.replace(/index\.html$/, '') || '/'
  document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || ''
    if (href.endsWith('.html') && path.endsWith(href.slice(1))) a.classList.add('active')
  })
}
