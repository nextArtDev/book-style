'use client'
import { Separator } from '@/components/ui/separator'
import { getCartTotal, groupById } from '@/lib/utils'
import { useCartStore } from '@/store'
import { FC } from 'react'
import OrderItem from './OrderItem'
import Summary from './Summary'
interface BasketProps {}

const Basket: FC<BasketProps> = ({}) => {
  // const dispatch = useDispatch<AppDispatch>()
  // const cart = useAppSelector<Product[]>((state) => state.items)
  const cart = useCartStore((state) => state.cart)

  const grouped = groupById(cart)
  const basketTotal = getCartTotal(cart)

  return (
    <div className="">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-base md:text-2xl font-bold tracking-tight pb-4">
          سبد خرید
        </h1>

        <div>
          <h2 className="sr-only">موارد سبد خرید</h2>

          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-500 border-b border-t border-gray-200 dark:border-gray-500 "
          >
            {Object.keys(grouped).map((id) => {
              const item = grouped[id][0]
              const total = getCartTotal(grouped[id])

              return <OrderItem key={id} product={item} total={total} />
            })}
          </ul>
          <Separator />
          <Summary />
        </div>
      </div>
    </div>
  )
}

export default Basket
