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
import CarouselFlipBook from '@/components/home/CarouselFlipBook'

export default async function Home() {
  // const categories =  getAllCategories({})
  // const billboards =  getAllBillboardsWithCategories()
  // const hotQuotes =  getHotQuestions()
  // const hotReviews =  getHotReviews()
  const [categories, billboards, hotQuotes, hotReviews] = await Promise.all([
    getAllCategories({}),
    getAllBillboardsWithCategories(),
    getHotQuestions(),
    getHotReviews(),
  ])
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
      {/* <div dir="ltr" className="w-[94vw] overflow-x-hidden">
        <SwipeCarousel categories={categories} />
      </div> */}
      <CarouselFlipBook categories={categories} />
      <FeaturedProducts />
      <CardParallax billboards={billboards} />
      <div className="mt-12 flex flex-col ">
        <p className="mr-8 mt-4 -mb-16 font-bold tex-lg md:text-2xl highlight-variant-4 highlight highlight-green-400 w-fit p-2 ">
          مطالب پربازخورد شبکه‌اجتماعی
        </p>
        <Quotes quotes={hotQuotes} />
      </div>
      <div className="mt-10 flex flex-col ">
        <p className="mr-8 mt-4  -mb-16 font-bold tex-lg md:text-2xl highlight-variant-4 highlight highlight-red-400 w-fit p-2 ">
          نظرات کاربران
        </p>
        <HighlightReviews hotReviews={hotReviews} />
      </div>
    </main>
  )
}
