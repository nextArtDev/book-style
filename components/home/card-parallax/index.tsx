'use client'

import { useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import Card from './Card'

import { Billboard, Category, Image, Product } from '@prisma/client'
import { CategoryFullStructure } from '@/lib/queries/home/category'

interface CardParallaxProps {
  billboards: (Billboard & { categories: Category[] })[]
}
export default function CardParallax({ billboards }: CardParallaxProps) {
  //   console.log(categories)

  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <main ref={container} className="relative mt-[10vh]">
      {billboards?.map((billboard, i) => {
        const targetScale = 1 - (billboards.length - i) * 0.05
        return (
          <Card
            key={`p_${i}`}
            i={i}
            // {...project}
            billboard={billboard}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </main>
  )
}
