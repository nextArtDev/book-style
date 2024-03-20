import FlipCover from '@/components/home/product/3d-cover/FlipCover'
import { SingleProductFullStructure } from '@/lib/queries/home/products'
import { cn, formatter, getRandomNaturalNumber } from '@/lib/utils'
import Link from 'next/link'

import React, { FC } from 'react'
import ProductTable from './ProductTable'
import { Badge } from '@/components/ui/badge'
import Currency from '@/components/shared/Currency'
import { User } from '@prisma/client'
import ListRating from '@/components/shared/ListRating'
import AddRating from '@/components/shared/AddRating'
import { Separator } from '@/components/ui/separator'
import AddToCart from '../AddToCart'
import { Rating } from '@mui/material'
import { StarIcon } from 'lucide-react'
import RateStar from '../../RateStar'

interface ProductPageProps {
  product: SingleProductFullStructure
  rate: number | null
  user: (User & { image: { url: string } | null }) | null
  beforeRated?: {
    rating: number
  } | null
}

const ProductPage: FC<ProductPageProps> = ({
  product,
  user,
  beforeRated,
  rate,
}) => {
  const randomVariant = getRandomNaturalNumber()
  const highlightVariantClass = `highlight-variant-${randomVariant}`
  return (
    <section className="max-w-7xl pt-8 mx-auto mt-8">
      <article className="grid gap-2 md:gap-4 grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-center gap-y-4">
          <FlipCover
            url={product.images?.[0].url}
            title={product.title}
            cover={product?.cover}
            className="mx-0! px-0!"
          />
          {product.Reviews.length > 0 && rate && (
            <RateStar rate={rate} reviewCounts={product.Reviews.length} />
          )}
        </div>
        <div className="flex flex-col gap-y-4 justify-center items-start pr-8 md:pr-0 ">
          <p
            className={`text-lg font-bold md:text-2xl highlight highlight-red-400 p-1.5 ${highlightVariantClass}`}
          >
            {product.title}
          </p>
          <p className="text-sm max-w-48 text-muted-foreground font-semibold md:text-base highlight highlight-yellow-400 ${highlightVariantClass}">
            {product.subTitle}
          </p>
          <div className="flex items-center gap-2">
            <p>نویسنده:</p>
            {product?.writer?.map((writer) => (
              <Link href={`/contributors/${writer.id}`} key={writer.id}>
                <Badge className="px-6 ml-6 text-base ">{writer.name}</Badge>
              </Link>
            ))}
          </div>
          <div className="flex items-center  gap-2">
            <p>ترجمه:</p>
            {product?.translator?.map((translator) => (
              <Link href={`/contributors/${translator.id}`} key={translator.id}>
                <Badge className="px-5 ml-5 text-base">{translator.name}</Badge>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {product.price && <Currency value={+product?.price} />}
            تومان
            <AddToCart product={product} />
          </div>
        </div>
        <div className="">
          <ProductTable product={product} />
        </div>
      </article>
      <Separator />
      {!beforeRated && (
        <div className="py-12 px-4 ">
          <h2 className="text-xl font-semibold">
            نظر خود راجع به {product.title} را ثبت کنید.
          </h2>
          <AddRating reviews={product.Reviews} product={product} user={user} />
        </div>
      )}
      <ListRating reviews={product.Reviews} />
    </section>
  )
}

export default ProductPage
