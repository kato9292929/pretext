import { Hero } from '../sections/Hero'
import { Featured } from '../sections/Featured'
import { Architecture } from '../sections/Architecture'
import { Foundation } from '../sections/Foundation'
import { Insights } from '../sections/Insights'

export function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Architecture />
      <Foundation />
      <Insights />
    </>
  )
}
