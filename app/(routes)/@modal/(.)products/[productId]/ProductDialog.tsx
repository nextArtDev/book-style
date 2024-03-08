'use client'
import { FC } from 'react'

import { useRouter } from 'next/navigation'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import ProductPage from '@/components/home/product/product-page/ProductPage'
import { SingleProductFullStructure } from '@/lib/queries/home/products'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Currency from '@/components/shared/Currency'
import { Button } from '@/components/ui/button'
import AddToCart from '@/components/home/product/AddToCart'
import RateStar from '@/components/home/RateStar'
import Rolling from '@/components/home/rolling-cover/Rolling'

interface pageProps {
  product: SingleProductFullStructure
  rate: number | null
}

const ProductDialog: FC<pageProps> = ({ product, rate }) => {
  const router = useRouter()
  const onDismiss = () => {
    router.back()
  }
  return (
    <div>
      <Dialog
        open
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            onDismiss()
          }
        }}
      >
        <DialogContent className="rounded-md bg-transparent border-none  ">
          <Rolling
            imageUrl={product.images[0].url}
            className="max-h-full text-xs flex flex-col text-center"
          >
            <div className="flex flex-col space-y-4 p-2 pt-4 items-center ">
              <p className=" font-bold text-sm md:text-base">{product.title}</p>
              <p className="text-xs md:text-sm">{product.subTitle}</p>
              {product.Reviews.length > 0 && rate && (
                <RateStar rate={rate} reviewCounts={product.Reviews.length} />
              )}
              <div className="text-xs  md:text-sm flex items-center gap-0.5">
                <p>نویسنده:</p>
                {product.writer.map((writer) => (
                  <Link href={`/contributors/${writer.id}`} key={writer.id}>
                    <Badge className=" text-xs ">{writer.name}</Badge>
                  </Link>
                ))}
              </div>
              <div className="text-xs  md:text-sm flex items-center  gap-0.5">
                <p>مترجم:</p>
                {product.translator.map((translator) => (
                  <Link
                    href={`/contributors/${translator.id}`}
                    key={translator.id}
                  >
                    <Badge className="  md:text-sm text-xs">
                      {translator.name}
                    </Badge>
                  </Link>
                ))}
              </div>
              <div className="text-xs  md:text-sm flex flex-wrap items-center gap-0.5">
                {product.price && <Currency value={+product?.price} />}
                تومان
              </div>
              <div className="text-xs  md:text-sm flex items-center gap-0.5">
                <AddToCart product={product} />
              </div>
              <Button
                variant={'secondary'}
                onClick={() =>
                  window.location.assign(`/products/${product.id}`)
                }
              >
                مشاهده
              </Button>
            </div>
          </Rolling>
          {/* <div className="w-full">
          </div> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductDialog
