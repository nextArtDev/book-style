import { format } from 'date-fns-jalali'

import { formatter } from '@/lib/utils'

import { OrderColumn } from './components/columns'
import { OrderClient } from './components/client'
import { prisma } from '@/lib/prisma'
import Pagination from '@/components/social/Pagination'

const OrdersPage = async ({
  params,
  searchParams,
}: {
  params: { storeId: string }
  searchParams: { [key: string]: string | undefined }
}) => {
  const pageSize = 20

  const page = searchParams.page ? +searchParams.page : 1
  const skipAmount = (page - 1) * pageSize

  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: skipAmount,
    take: pageSize,
  })

  const totalOrders = await prisma.order.count()

  // Calculate if there are more questions to be fetched
  const isNext = totalOrders > skipAmount + orders.length

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.title)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price)
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'dd MMMM yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient
          data={formattedOrders}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
          totalOrders={totalOrders}
        />
      </div>
    </div>
  )
}

export default OrdersPage
