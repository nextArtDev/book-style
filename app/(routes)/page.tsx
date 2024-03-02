import FeaturedProducts from '@/components/home/FeaturedProducts'
import { HeroParallax } from '@/components/home/HeroParallax'
import { Quotes } from '@/components/home/Quots'
import { SwipeCarousel } from '@/components/home/SwipeCarousel'
import CardParallax from '@/components/home/card-parallax'
import { getAllCategories } from '@/lib/queries/home/category'
import { getPopularProducts } from '@/lib/queries/home/products'

export default async function Home() {
  const categories = await getAllCategories({})
  // console.log(await getPopularProducts())
  return (
    <main className="flex-1 ">
      <HeroParallax categories={categories} />
      <Quotes />
      <div dir="ltr" className="w-[94vw] overflow-x-hidden">
        <SwipeCarousel categories={categories} />
      </div>
      <FeaturedProducts />
      <CardParallax categories={categories} />
    </main>
  )
}
