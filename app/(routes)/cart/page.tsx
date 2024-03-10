import Basket from '@/components/home/product/Basket'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await currentUser()
  if (!user) redirect('/login')

  return (
    <div>
      <Basket />
    </div>
  )
}

export default page
