import { Hero } from '../sections/Hero'
import { Insights } from '../sections/Insights'
import { Featured } from '../sections/Featured'
import { Architecture } from '../sections/Architecture'
import { Ecosystem } from '../sections/Ecosystem'
import { Foundation } from '../sections/Foundation'

export function Home() {
  return (
    <>
      <Hero />
      <Insights />
      <Featured />
      <Architecture />
      <Ecosystem />
      <Foundation />
    </>
  )
}
