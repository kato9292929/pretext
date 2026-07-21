import { Hero } from '../sections/Hero'
import { MenuBar } from '../sections/MenuBar'
import { Featured } from '../sections/Featured'
import { Architecture } from '../sections/Architecture'
import { Foundation } from '../sections/Foundation'
import { Insights } from '../sections/Insights'

export function Home() {
  return (
    <>
      <Hero />
      <MenuBar />
      <Featured />
      <Architecture />
      <Foundation />
      <Insights />
    </>
  )
}
