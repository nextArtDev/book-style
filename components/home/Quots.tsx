import React, { useEffect, useState } from 'react'
import { InfiniteMovingCards } from '../shared/InfiniteMovingCards'
import { Question } from '@prisma/client'

export function Quotes({ quotes }: { quotes: Question[] }) {
  return (
    <div className="h-[40rem]  rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={quotes}
        direction="left"
        speed="normal"
        className="text-xl text-right "
        itemClassName="yellowBg right-12 text-justify "
        quoteClassName="pt-[4vh] text-black leading-[5.1vh]  "
        nameClassName="text-black/70 text-base "
      />
    </div>
  )
}

const testimonials = [
  {
    quote:
      'گمنت، قهرمان نمایشنامه، از امرای ناحیه «گلدرن» یکی از ایالات شمالی هلند است. آنچه اینجا در ضمن نام هلند باید فهمید، عبارت از دو کشور هلند و بلژیک امروزی است که هر دو در گذشته و نیدرلانده که همان «پئی با» بزبان فرانسه باشد، خوانده میشده است.',
    name: 'گوته',
    title: 'شاعر رنگها',
  },
  {
    quote:
      'گمنت، قهرمان نمایشنامه، از امرای ناحیه «گلدرن» یکی از ایالات شمالی هلند است. آنچه اینجا در ضمن نام هلند باید فهمید، عبارت از دو کشور هلند و بلژیک امروزی است که هر دو در گذشته و نیدرلانده که همان «پئی با» بزبان فرانسه باشد، خوانده میشده است.',
    name: 'گوته',
    title: 'شاعر رنگها',
  },
  {
    quote:
      'گمنت، قهرمان نمایشنامه، از امرای ناحیه «گلدرن» یکی از ایالات شمالی هلند است. آنچه اینجا در ضمن نام هلند باید فهمید، عبارت از دو کشور هلند و بلژیک امروزی است که هر دو در گذشته و نیدرلانده که همان «پئی با» بزبان فرانسه باشد، خوانده میشده است.',
    name: 'گوته',
    title: 'شاعر رنگها',
  },
  {
    quote:
      'گمنت، قهرمان نمایشنامه، از امرای ناحیه «گلدرن» یکی از ایالات شمالی هلند است. آنچه اینجا در ضمن نام هلند باید فهمید، عبارت از دو کشور هلند و بلژیک امروزی است که هر دو در گذشته و نیدرلانده که همان «پئی با» بزبان فرانسه باشد، خوانده میشده است.',
    name: 'گوته',
    title: 'شاعر رنگها',
  },
  {
    quote:
      'گمنت، قهرمان نمایشنامه، از امرای ناحیه «گلدرن» یکی از ایالات شمالی هلند است. آنچه اینجا در ضمن نام هلند باید فهمید، عبارت از دو کشور هلند و بلژیک امروزی است که هر دو در گذشته و نیدرلانده که همان «پئی با» بزبان فرانسه باشد، خوانده میشده است.',
    name: 'گوته',
    title: 'شاعر رنگها',
  },
]
