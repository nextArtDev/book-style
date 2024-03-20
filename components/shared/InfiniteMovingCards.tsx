'use client'

import { Golpa } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
  itemClassName,
  quoteClassName,
  nameClassName,
}: {
  items: {
    id: string
    title: string
    content: string
    views: number
    authorId: string
  }[]
  // items: {
  //   quote: string
  //   name: string
  //   title: string
  // }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
  quoteClassName?: string
  nameClassName?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)
  // const [isMounted, setIsMounted] = useState(false)

  // useEffect(() => {
  //   setIsMounted(true)
  // }, [])
  useEffect(() => {
    addAnimation()
  }, [])
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        )
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        )
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }
  // if (!isMounted) {
  //   return null
  // }
  return (
    <div
      dir="ltr"
      ref={containerRef}
      className={cn(
        'dark:mix-blend-hard-light scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <Link
            href={`/social/question/${item.id}`}
            className={cn(
              'w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]',
              itemClassName
              // Golpa.className
            )}
            style={
              {
                //   background:
                //     'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
              }
            }
            key={item.id}
          >
            <blockquote className="flex flex-col">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <p
                dir="rtl"
                className={cn(
                  'flex-1 line-clamp-6 pr-8 text-xs md:text-sm overflow-hidden relative z-20 font-normal',
                  quoteClassName
                )}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <div dir="rtl" className="flex flex-row items-center">
                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      'truncate w-[50%]  highlight px-1 py-1  text-xs font-semibold md:text-sm flex justify-center gap-1 items-center mx-8  opacity-90',
                      nameClassName,
                      idx % 3 === 0
                        ? 'highlight-indigo-500 dark:highlight-indigo-300 highlight-variant-1'
                        : idx % 3 === 1
                        ? 'highlight-emerald-400 highlight-variant-17'
                        : 'highlight-sky-400 highlight-variant-9'
                    )}
                  >
                    {/* {item.name} */}
                    <ExternalLink className="" />
                    {/* {'پست: '} */}
                    {item.title}
                  </div>
                  {/* <span
                    className={cn(
                      'inline-block pr-12  font-normal',
                      nameClassName
                    )}
                  >
                    {item.title}
                  </span> */}
                </div>
              </div>
            </blockquote>
          </Link>
        ))}
      </ul>
    </div>
  )
}
