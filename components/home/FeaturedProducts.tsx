import { getFeaturedProducts } from '@/lib/queries/home/products'
import { FC } from 'react'
import HorizontalScrollCarousel from './horizontal-carousel/HorizontalScrollCarousel '

interface FeaturedProductsProps {}

const FeaturedProducts: FC<FeaturedProductsProps> = async ({}) => {
  const featuredProducts = await getFeaturedProducts({ take: 7 })
  if (!featuredProducts)
    return (
      <p className="flex justify-center items-center text-muted text-2xl ">
        {' '}
        کتابهای منتخب موجود نیستند.{' '}
      </p>
    )

  const cards = featuredProducts.map((featuredProduct) => ({
    url: featuredProduct.images[0].url,
    title: featuredProduct.title,
    id: featuredProduct.id,
    cover: featuredProduct?.cover,
  }))
  return (
    <div className="">
      <div className="my-10 flex flex-col ">
        <p className="mr-8 mt-4 -mb-10 font-bold tex-lg md:text-2xl highlight-variant-4 highlight highlight-green-400 w-fit p-2 ">
          محبوب‌ترین‌ها
        </p>
        <HorizontalScrollCarousel
          cards={cards}
          rtl={true}
          className="overflow-x-hidden "
        />
      </div>
      <div className="my-10 flex flex-col ">
        <p className="mr-8 mt-4 -mb-10 font-bold tex-lg md:text-2xl highlight-variant-3 highlight highlight-red-400 w-fit p-2">
          پرفروش‌ترین‌ها
        </p>
        <HorizontalScrollCarousel
          cards={cards}
          rtl={false}
          className="overflow-x-hidden "
        />
      </div>
    </div>
  )
}

export default FeaturedProducts
