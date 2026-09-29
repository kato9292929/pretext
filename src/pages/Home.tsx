import { Hero } from '../sections/Hero'
import { Updates } from '../sections/Updates'
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
      <Updates />
      <Featured />
      <News />
      <Ecosystem />
      <Architecture />
      <Foundation />
      <Services />
    </>
  )
}
