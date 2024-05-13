'use client'
import React, { useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryFullStructure } from '@/lib/queries/home/category'
import FlipCover from './product/3d-cover/FlipCover'
import { Product } from '@prisma/client'
import Lenis from '@studio-freight/lenis'
import { Separator } from '../ui/separator'

export const HeroParallax = ({
  categories,
}: {
  categories: CategoryFullStructure[] | null
}) => {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  const products = categories?.flatMap((category) =>
    category.products?.map((product) => product)
  )

  const firstRow = products?.slice(0, 4)
  const secondRow = products?.slice(4, 8)
  const thirdRow = products?.slice(8, 11)
  const forthRow = products?.slice(0, 4)
  //   console.log({ firstRow })
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 300]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -300]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [5, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-600, 200]),
    springConfig
  )
  return (
    <div
      ref={ref}
      className="h-[280vh] pb-1 md:pb-2 pt-20  overflow-hidden  antialiased relative flex flex-col self-auto[perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className=" flex flex-row-reverse space-x-reverse -space-x-2 mb-1">
          {firstRow?.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product?.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  -space-x-2 mb-1 ">
          {secondRow?.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product?.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse -space-x-2">
          {forthRow?.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product?.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse -space-x-2">
          {forthRow?.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product?.id}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg max-w-7xl h-[35vh] relative mx-auto pt-3 pb-4 md:pb-6 px-4 w-full  left-0 top-0">
      <div>
        <Separator className="bg-black p-[1px] " />
        <Separator className="bg-transparent " />
        <Separator className="bg-black p-[1px] " />
      </div>
      <h1 className="w-full text-center py-3 bg-gradient-to-r from-gray-600 via-black/55 to-gray-400 dark:from-yellow-600 dark:via-white/55 dark:to-yellow-400 inline-block text-transparent bg-clip-text text-5xl md:text-7xl font-bold  ">
        کتابفروشی فردا <br />
      </h1>
      <Separator className="bg-black p-0.5 " />
      <p className="max-w-2xl text-center w-full text-xl border-b border-black  md:text-3xl py-4 dark:text-neutral-200">
        کتابفروشی و لوازم تحریر فردا
      </p>
      <div className="absolute bg-light-bg dark:bg-dark-bg top-0 right-[50%] translate-x-[50%] w-fit px-1 h-fit text-rose-500 font-semibold ">
        نشر تخصصی
      </div>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: (Product & { images: { url: string }[] }) | undefined
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      //   whileHover={{
      //     y: -10,
      //   }}
      key={product?.title}
      className="relative group/product h-auto w-auto  flex-shrink-0"
    >
      <Link href={`/products/${product?.id}`} className=" ">
        {/* <Image
          src={product.images[0].url}
          fill
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        /> */}
        <FlipCover
          title={product?.title!}
          cover={product?.cover}
          url={product?.images[0].url!}
        />
      </Link>
      {/* <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div> */}
      {/* <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product?.title}
      </h2> */}
    </motion.div>
  )
}
