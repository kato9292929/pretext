import { StrictMode } from 'react'
import { Layout } from './Layout'
import { Home } from './views/Home'
import { About } from './views/About'
import { Products } from './views/Products'
import { Research } from './views/Research'
import { LegalPage, type LegalDocKey } from './views/Legal'

/* One React root per page. Astro renders these to HTML at build time and
   hydrates them in the browser (src/pages/*.astro). */

export function HomeApp() {
  return (
    <StrictMode>
      <Layout>
        <Home />
      </Layout>
    </StrictMode>
  )
}

export function AboutApp() {
  return (
    <StrictMode>
      <Layout>
        <About />
      </Layout>
    </StrictMode>
  )
}

export function ProductsApp() {
  return (
    <StrictMode>
      <Layout>
        <Products />
      </Layout>
    </StrictMode>
  )
}

export function ResearchApp() {
  return (
    <StrictMode>
      <Layout>
        <Research />
      </Layout>
    </StrictMode>
  )
}

export function LegalApp({ doc }: { doc: LegalDocKey }) {
  return (
    <StrictMode>
      <Layout>
        <LegalPage doc={doc} />
      </Layout>
    </StrictMode>
  )
}
