'use client'

import { Separator } from '@/components/ui/separator'

import { columns, OrderColumn } from './columns'
import { Heading } from '@/components/dashboard/Heading'
import { DataTable } from '@/components/dashboard/DataTable'

interface OrderClientProps {
  data: OrderColumn[]
  pageNumber: number
  isNext: boolean
  totalOrders: number
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data,
  pageNumber,
  isNext,
  totalOrders,
}) => {
  return (
    <>
      <Heading
        title={`سفارشات (${totalOrders})`}
        description="سفارشات فروشگاه را مدیریت کنید."
      />
      <Separator />
      <DataTable
        searchKey="products"
        columns={columns}
        data={data}
        pageNumber={pageNumber}
        isNext={isNext}
      />
    </>
  )
}
