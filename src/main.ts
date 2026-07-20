import './style.css'
import { initHero } from './hero'
import { initI18n } from './i18n'
import { mountChrome } from './chrome'

// ── Shared nav + footer (injected on every page) ────────────────────────────
mountChrome()

// ── Hero (pretext-powered) ──────────────────────────────────────────────────
const heroEl = document.querySelector<HTMLElement>('[data-pretext]')
if (heroEl) {
  // Wait for fonts before initialising so pretext measurements are accurate
  document.fonts.ready.then(() => { initHero(heroEl) })
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

// ── Intersection Observer: fade-in on scroll ─────────────────────────────────
const style = document.createElement('style')
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: none;
  }
`
document.head.appendChild(style)

const animTargets = document.querySelectorAll(
  '.feature-card, .step, .spec, .about-lead, .about-code, .company-info, .company-mission'
)
animTargets.forEach((el, i) => {
  el.classList.add('fade-in')
  ;(el as HTMLElement).style.transitionDelay = `${(i % 6) * 60}ms`
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
  { threshold: 0.12 }
)

animTargets.forEach(el => observer.observe(el))
