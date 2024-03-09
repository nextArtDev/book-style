'use client'
import { cn } from '@/lib/utils'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'

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
        ' overflow-hidden px-8 mx-auto w-full flex items-center justify-center'
      )}
    >
      {/* @ts-ignore */}
      <HTMLFlipBook
        // className="flip-book"

        style={{ boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.5)' }}
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
              backgroundColor: 'hsl(35, 55, 98)',
              color: 'hsl(35, 35, 35)',
              border: 'solid 1px hsl(35, 20, 70)',
              boxShadow: `inset ${
                i % 2 === 0 ? '7px' : '-7px'
              } 0 30px -7px rgba(0, 0, 0, 0.4)`,
            }}
            className="relative mix-blend-multiply bg-[hsl(35, 55, 98)]   "
          >
            <Image
              className="object-cover "
              fill
              src={category.image?.url || ''}
              alt={category.name}
            />
          </div>
        ))}
      </HTMLFlipBook>
    </section>
  )
}

export default CarouselFlipBook
