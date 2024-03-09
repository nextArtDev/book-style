'use client'
import { getCartTotal } from '@/lib/utils'
import { useCartStore } from '@/store'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

interface CartItemsProps {}

const CartItems: FC<CartItemsProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  const cart = useCartStore((state) => state.cart)

  const total = getCartTotal(cart)

  if (!isMounted) {
    return null
  }
  return (
    <div>
      <Link href="/cart" className="relative flex items-center space-x-2">
        <ShoppingCart size={30} className="mt-2" />
        <p className="text-rose-500 absolute top-0 right-1.5 rounded-full text-center dark:border-rose-300 ">
          {cart.length}
        </p>
      </Link>
    </div>
  )
}

export default CartItems
