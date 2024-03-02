import { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContributorFullStructure } from '@/lib/queries/home/contributors'

import Link from 'next/link'
import { SingleProductFullStructure } from '@/lib/queries/home/products'
import FlipCover from './3d-cover/FlipCover'
import { Separator } from '@/components/ui/separator'
import HorizontalScrollCarousel from '../horizontal-carousel/HorizontalScrollCarousel '

interface RelatedBooksProps {
  products: SingleProductFullStructure[] | null
}

const RelatedBooks: FC<RelatedBooksProps> = ({ products }) => {
  const cards = products?.map((product) => ({
    url: product.images[0].url,
    title: product.title,
    id: product.id,
    cover: product.cover,
  }))
  if (cards) {
    return (
      <section>
        {/* <Separator className="mt-2" /> */}
        <h2 className="py-2 -pb-8 -mb-8 text-xl font-semibold">
          کتابهای مرتبط:
        </h2>
        <HorizontalScrollCarousel
          cards={cards}
          rtl={true}
          className="overflow-x-hidden"
        />
        {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <FlipCover
                title={product.title}
                cover={product.cover}
                url={product.images?.[0].url!}
              />
            </Link>
          ))}
        </div> */}
      </section>
    )
  } else {
    return null
  }
}

export default RelatedBooks
