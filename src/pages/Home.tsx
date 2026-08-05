import { Hero } from '../sections/Hero'
import { Ecosystem } from '../sections/Ecosystem'
import { Insights } from '../sections/Insights'
import { Featured } from '../sections/Featured'
import { Architecture } from '../sections/Architecture'
import { Foundation } from '../sections/Foundation'

export function Home() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <Insights />
      <Featured />
      <Architecture />
      <Foundation />
    </>
  )
}
