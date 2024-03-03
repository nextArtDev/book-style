'use client'

import { Golpa } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { ReviewWithUserImage } from '@/lib/queries/home/reviews'
import UserAvatar from '@/components/shared/Avatar'
import { StarIcon } from 'lucide-react'
import { Rating } from '@mui/material'
import Link from 'next/link'

export const InfiniteMovingReviews = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
  itemClassName,
  quoteClassName,
  nameClassName,
}: {
  items: ReviewWithUserImage[] | null
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

  return (
    <div
      dir="ltr"
      ref={containerRef}
      className={cn(
        'mix-blend-luminosity dark:mix-blend-hard-light scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <div className={cn('relative')}>
        <ul
          ref={scrollerRef}
          className={cn(
            ' flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
            start && 'animate-scroll ',

            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
        >
          {items?.map((item, idx) => (
            <Link
              href={
                item.contributorId
                  ? `/contributors/${item.contributorId}`
                  : `/products/${item.productId}`
              }
              className={cn(
                'w-[400px] h-[270px] max-w-full relative rounded-sm flex-shrink-0 md:w-[450px]',
                style.paper,
                itemClassName
              )}
              style={
                {
                  //   background:
                  //     'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
                }
              }
              key={item.id}
            >
              <div className={style.textarea}>
                <blockquote dir="rtl" className={cn('text-right')}>
                  <div className="absolute w-full h-full top-0 left-0 ">
                    <div
                      aria-hidden="true"
                      className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                    ></div>
                    <span
                      className={cn(
                        'text-right overflow-hidden line-clamp-6 inline-block relative z-20 font-normal',
                        quoteClassName
                      )}
                    >
                      {item.comment}
                    </span>
                    <div className="relative z-20  flex flex-row items-center">
                      <div className="flex flex-col gap-1">
                        <span
                          className={cn(
                            'flex gap-2 items-center  pr-4  font-normal',
                            nameClassName
                          )}
                        >
                          <UserAvatar
                            alt={item.User?.name}
                            src={item.User?.image?.url}
                          />
                          {/* {item.name} */}
                          {/* </span>
                        <span
                          className={cn(
                            'inline-block pr-4  font-normal',
                            nameClassName
                          )}
                        > */}
                          <Rating
                            dir="ltr"
                            value={item.rating}
                            readOnly
                            precision={0.5}
                            defaultValue={5}
                            icon={
                              <StarIcon
                                fontSize="inherit"
                                className={cn(
                                  'text-center text-yellow-500 fill-yellow-400 h-5 w-5 flex-shrink-0'
                                )}
                              />
                            }
                            emptyIcon={
                              <StarIcon
                                fontSize="inherit"
                                className="text-gray-200 h-5 w-5 flex-shrink-0"
                              />
                            }
                          />
                          {/* {item.title} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
