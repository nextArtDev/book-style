import FeaturedProducts from '@/components/home/FeaturedProducts'
import { HeroParallax } from '@/components/home/HeroParallax'
import { Quotes } from '@/components/home/Quots'
import { SwipeCarousel } from '@/components/home/SwipeCarousel'
import CardParallax from '@/components/home/card-parallax'
import HighlightReviews from '@/components/home/highlight-reviews/HighlightReviews'
import {
  getAllBillboards,
  getAllBillboardsWithCategories,
} from '@/lib/queries/dashboard/billboards'
import { getAllCategories } from '@/lib/queries/home/category'
import { getPopularProducts } from '@/lib/queries/home/products'

export default async function Home() {
  const categories = await getAllCategories({})
  const billboards = await getAllBillboardsWithCategories()
  if (!billboards)
    return (
      <p className="w-full h-full flex items-center justify-center text-3xl text-center ">
        هنوز بیلبوردی اضافه نشده....
      </p>
    )
  // console.log(
  //   billboards.map((billboard) =>
  //     billboard.categories.map((category) => console.log(category.name))
  //   )
  // )
  return (
    <main className="flex-1 ">
      <HeroParallax categories={categories} />
      <Quotes />
      <div dir="ltr" className="w-[94vw] overflow-x-hidden">
        <SwipeCarousel categories={categories} />
      </div>
      <FeaturedProducts />
      <CardParallax billboards={billboards} />
      <HighlightReviews />
    </main>
  )
}
