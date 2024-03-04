import FeaturedProducts from '@/components/home/FeaturedProducts'
import { HeroParallax } from '@/components/home/HeroParallax'
import { Quotes } from '@/components/home/Quots'
import { SwipeCarousel } from '@/components/home/SwipeCarousel'
import CardParallax from '@/components/home/card-parallax'
import HighlightReviews from '@/components/home/highlight-reviews/HighlightReviews'
import { getHotReviews } from '@/lib/queries/home/reviews'
import { getHotQuestions } from '@/lib/actions/social/question.action'
import {
  getAllBillboards,
  getAllBillboardsWithCategories,
} from '@/lib/queries/dashboard/billboards'
import { getAllCategories } from '@/lib/queries/home/category'
import { getPopularProducts } from '@/lib/queries/home/products'

export default async function Home() {
  const categories = await getAllCategories({})
  const billboards = await getAllBillboardsWithCategories()
  const hotQuotes = await getHotQuestions()
  const hotReviews = await getHotReviews()
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
      <div className="-mt-20">
        <HeroParallax categories={categories} />
      </div>
      <Quotes quotes={hotQuotes} />
      <div dir="ltr" className="w-[94vw] overflow-x-hidden">
        <SwipeCarousel categories={categories} />
      </div>
      <FeaturedProducts />
      <CardParallax billboards={billboards} />
      <HighlightReviews hotReviews={hotReviews} />
    </main>
  )
}
