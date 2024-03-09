'use client'
import { cn } from '@/lib/utils'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import style from './card-parallax/style.module.scss'
import { CategoryFullStructure } from '@/lib/queries/home/category'
import { FC } from 'react'

import Image from 'next/image'

interface CarouselFlipBookProps {
  categories: CategoryFullStructure[] | null
}

const CarouselFlipBook: FC<CarouselFlipBookProps> = ({ categories }) => {
  const book = useRef<any>(null)
  const [canFlip, setCanFlip] = useState(true)
  const flipInterval = 2000
  const [userInteracted, setUserInteracted] = useState(false)

  useEffect(() => {
    const flipPage = () => {
      if (!book.current || userInteracted) return

      let currentPage = book.current.pageFlip()?.getCurrentPageIndex() || 0
      let totalPages = book.current.pageFlip()?.getPageCount() || 0

      if (currentPage === totalPages - 1) {
        book.current?.pageFlip()?.flip(0)
      } else {
        book.current?.pageFlip()?.flipNext()
      }
    }

    let intervalId: NodeJS.Timeout

    if (canFlip) {
      intervalId = setInterval(flipPage, flipInterval)
    }

    return () => clearInterval(intervalId)
  }, [canFlip, flipInterval, userInteracted])

  const handlePageTurn = () => {
    setUserInteracted(true)

    setTimeout(() => {
      setUserInteracted(false)
    }, 2000)
  }

  return (
    <section
      className={cn(
        'max-w-5xl overflow-hidden px-8 mx-auto w-full flex items-center justify-center'
      )}
    >
      {/* @ts-ignore */}
      <HTMLFlipBook
        // className="flip-book"

        // style={{ boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.5)' }}
        onFlip={handlePageTurn}
        ref={book}
        // width={300}
        // height={500}
        width={350} // base page width
        height={433} // base page height
        size={'stretch'}
        // set threshold values=
        minWidth={315}
        // maxWidth={1000}
        minHeight={420}
        // maxHeight={1350}
        // maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={false} // disable content scrolling on mobile devices
      >
        {categories?.map((category, i) => (
          <div
            key={category.id}
            style={{
              backgroundColor: '#fdfaf7',
              color: '#785e3a',
              border: 'solid 1px #c2b5a3',
              boxShadow: `inset ${
                i % 2 === 0 ? '7px' : '-7px'
              } 0 30px -7px rgba(0, 0, 0, 0.4)`,
            }}
            // bg-[#fefefe]
            className="photocopied relative border border-[#c2b5a3] grid grid-cols-2 dark:bg-light-bg bg-dark-bg "
          >
            <div className=" relative p-2 overflow-hidden w-full h-3/4">
              <Image
                className="object-cover  rounded-md"
                fill
                src={category.image?.url || ''}
                alt={category.name}
              />
            </div>

            <div className="pt-12 flex items-center justify-center text-center">
              <div className={cn(' text-xl font-semibold ', style.paperCorner)}>
                <p className=" text-primary dark:text-secondary ">
                  {category.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </section>
  )
}

export default CarouselFlipBook
