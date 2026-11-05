import { Hero } from '../sections/Hero'
import { Ecosystem } from '../sections/Ecosystem'
import { Featured } from '../sections/Featured'
import { News } from '../sections/News'
import { AgentShowcase } from '../sections/AgentShowcase'
import { AgenticIntro } from '../sections/AgenticIntro'
import { Foundation } from '../sections/Foundation'
import { Services } from '../sections/Services'

export function Home() {
  return (
    <>
      <Hero />
      <section className="relative z-10 overflow-hidden py-16 md:py-24">
        <AgenticIntro />
        <AgentShowcase />
      </section>
      <News />
      <Featured />
      <Ecosystem />
      <Foundation />
      <Services />
    </>
  )
}
