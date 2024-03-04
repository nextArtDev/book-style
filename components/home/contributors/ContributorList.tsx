'use client'

import { ContributorWithImage } from '@/lib/queries/home/contributors'
import { FC } from 'react'
import ContributorItem from './ContributorItem'
import SearchIcon from '@/public/assets/icons/search.svg'
import LocalSearchbar from '@/components/social/search/LocalSearchbar'
interface ContributorListProps {
  contributors: ContributorWithImage[]
}

const ContributorList: FC<ContributorListProps> = ({ contributors }) => {
  return (
    <section>
      <div className="my-8 max-w-sm mx-auto">
        <LocalSearchbar
          route="/contributors"
          iconPosition="left"
          imgSrc={SearchIcon}
          placeholder="جست‌وجوی نام عوامل انتشار کتاب..."
          otherClasses="flex-1"
        />
      </div>
      <div className=" px-2 mx-auto grid grid-flow-cols-dense grid-cols-2  sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 place-content-baseline">
        {contributors.map((contributor) => (
          <ContributorItem key={contributor.id} contributor={contributor} />
        ))}
      </div>
    </section>
  )
}

export default ContributorList
