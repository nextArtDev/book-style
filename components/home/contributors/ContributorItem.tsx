'use client'
import { ContributorWithImage } from '@/lib/queries/home/contributors'
import { FC } from 'react'
import { CardBody, CardContainer, CardItem } from '../../shared/3DCard'
import Image from 'next/image'
import Link from 'next/link'
import { translateArray } from '@/lib/utils'
import NoPic from '../../../public/images/no-profile.webp'
import MagazineEffect from '../magazine-effect/MagazineEffect'

interface ContributorItemProps {
  contributor: ContributorWithImage
}

const ContributorItem: FC<ContributorItemProps> = ({ contributor }) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="flex-start bg-primary/5 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[15rem]  rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className=" text-xl font-bold text-neutral-600 dark:text-white"
        >
          {contributor.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className=" text-neutral-500 text-sm max-w-sm mt-1 dark:text-neutral-300"
        >
          {translateArray(contributor.role.map((role) => role)).join(' | ')}
        </CardItem>
        <CardItem translateZ="60" className="max-w-[95%] max-h-[350px] pt-4  ">
          <Link href={`/contributors/${contributor.id}`} className=" ">
            {/* <Image
              src={contributor.image?.url || NoPic.src}
              height="512"
              width="356"
              className="h-[512] w-[356] object-cover rounded-xl group-hover/card:shadow-xl"
              alt={contributor.name}
            /> */}
            <MagazineEffect
              src={contributor.image?.url || NoPic.src}
              // className="h-[512] w-[356] object-cover rounded-xl group-hover/card:shadow-xl"
              className="h-fit"
              alt={contributor.name}
            />
          </Link>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

export default ContributorItem
