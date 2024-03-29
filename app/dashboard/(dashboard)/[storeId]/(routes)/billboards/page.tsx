// import { format } from 'date-fns'
import { format } from 'date-fns-jalali'
import { BillboardColumn } from './components/columns'

import { BillboardClient } from './components/BillboardClient'
import { getAllBillboardsForBillboards } from '@/lib/queries/dashboard/billboards'
import { notFound } from 'next/navigation'
import { Billboard } from '@prisma/client'

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  // const billboards = await prisma.billboard.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // })
  const billboards = await getAllBillboardsForBillboards({
    storeId: params.storeId,
  })

  if (!billboards) {
    return notFound()
  }
  const formattedBillboards: BillboardColumn[] = billboards.map(
    (item: Billboard) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'dd MMMM yyyy'),
    })
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
