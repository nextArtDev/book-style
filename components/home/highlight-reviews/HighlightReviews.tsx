import { InfiniteMovingCards } from '@/components/shared/InfiniteMovingCards'
import { FC } from 'react'

import { cn } from '@/lib/utils'
import { InfiniteMovingReviews } from './InfiniteMovingReviews'
import { Review, User } from '@prisma/client'
import { ReviewWithUserImage } from '@/lib/queries/home/reviews'

interface HighlightReviewsProps {
  hotReviews: ReviewWithUserImage[] | null
}

const HighlightReviews: FC<HighlightReviewsProps> = ({ hotReviews }) => {
  return (
    <div
      className={cn(
        'h-[40rem] py-2  rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden'
      )}
    >
      <InfiniteMovingReviews
        items={hotReviews}
        direction="left"
        speed="normal"
        className="text-sm text-right "
        itemClassName="text-justify"
        quoteClassName="text-black pr-2 pl-4 pt-[1.7vh] leading-[4.2vh] font-semibold "
        nameClassName="text-black/70 text-base "
      />
    </div>
  )
}

export default HighlightReviews

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
