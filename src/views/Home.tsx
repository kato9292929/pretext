import { Hero } from '../sections/Hero'
import { Featured } from '../sections/Featured'
import { News } from '../sections/News'
import { AgentShowcase } from '../sections/AgentShowcase'
import { AgenticIntro } from '../sections/AgenticIntro'
import { EndpointTeaser } from '../sections/EndpointTeaser'
import { MarketIssues } from '../sections/MarketIssues'
import { DocsLinks } from '../sections/DocsLinks'
import { HowToPay } from '../sections/HowToPay'
import { Services } from '../sections/Services'
import { Team } from '../sections/Team'

export function Home() {
  return (
    <>
      <Hero />
      <section className="relative z-10 overflow-hidden pt-16 md:pt-24">
        <AgenticIntro />
        <AgentShowcase showPayMcp />
      </section>
      <Featured />
      <section className="relative z-10 overflow-hidden pb-16 md:pb-24">
        <MarketIssues />
        <EndpointTeaser />
        <HowToPay />
        <DocsLinks />
      </section>
      <News />
      <Team />
      <Services />
    </>
  )
}
