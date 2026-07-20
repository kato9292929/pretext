import './style.css'
import { initHero } from './hero'
import { initI18n } from './i18n'
import { mountChrome } from './chrome'

// ── Shared nav + footer (injected on every page) ────────────────────────────
mountChrome()

// ── pretext-powered flowing text (now hosted in CONTACT) ────────────────────
const pretextEl = document.querySelector<HTMLElement>('[data-pretext]')
if (pretextEl) {
  // Wait for fonts before initialising so pretext measurements are accurate
  document.fonts.ready.then(() => { initHero(pretextEl) })
}

// ── Language toggle ─────────────────────────────────────────────────────────
initI18n()

// ── Nav: scroll state ───────────────────────────────────────────────────────
const nav = document.getElementById('nav')
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40)
  }, { passive: true })
}

// ── Nav: mobile menu ────────────────────────────────────────────────────────
const menuBtn   = document.getElementById('nav-menu-btn')
const navLinks  = document.querySelector<HTMLElement>('.nav-links')

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open')
    menuBtn.setAttribute('aria-expanded', String(open))
  })

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open')
      menuBtn.setAttribute('aria-expanded', 'false')
    })
  })
}

// ── Smooth scroll for anchor links ──────────────────────────────────────────
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href')
    if (!href) return
    const target = document.querySelector(href)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})

// ── Intersection Observer: blur-in reveal on scroll ──────────────────────────
const animTargets = document.querySelectorAll(
  '.product-card, .feat-card, .vr-card, .section-title, .products-intro, ' +
  '.paradigm-card, .agent-buy-card, .thesis-block, .about-grid, .layer-block, .ep-category-title'
)
animTargets.forEach((el, i) => {
  el.classList.add('reveal')
  ;(el as HTMLElement).style.transitionDelay = `${(i % 5) * 55}ms`
})

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('visible')
        observer.unobserve(target)
      }
    })
  },
  { threshold: 0.08 }
)

animTargets.forEach(el => observer.observe(el))
