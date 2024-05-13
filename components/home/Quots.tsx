import React, { useEffect, useState } from 'react'
import { InfiniteMovingCards } from '../shared/InfiniteMovingCards'
import { Question } from '@prisma/client'

export function Quotes({ quotes }: { quotes: Question[] }) {
  return (
    <div className="h-[40rem]  rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={quotes}
        direction="right"
        speed="fast"
        className="text-xl text-right "
        itemClassName="yellowBg right-12 text-justify "
        quoteClassName="pt-[0.3vh] sm:pt-[4vh] text-black !leading-[4.5vh] sm:!leading-[4.9vh] !tracking-tighter "
        nameClassName="text-black/70 text-base "
      />
    </div>
  )
}
