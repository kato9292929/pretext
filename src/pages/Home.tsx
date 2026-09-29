import { Hero } from '../sections/Hero'
import { Ecosystem } from '../sections/Ecosystem'
import { Featured } from '../sections/Featured'
import { News } from '../sections/News'
import { Architecture } from '../sections/Architecture'
import { Foundation } from '../sections/Foundation'
import { Services } from '../sections/Services'

export function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <News />
      <Ecosystem />
      <Architecture />
      <Foundation />
      <Services />
    </>
  )
}
