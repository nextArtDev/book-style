// import { getTopInteractedTags } from '@/lib/actions/tag.actions'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
// import { Badge } from '../ui/badge'
// import RenderTag from '../shared/RenderTag'

interface UserCardProps {
  user: {
    id: string
    phone: string
    // picture?: string
    image: { url: string } | null
    name: string
    // username: string
  }
}

const UserCard: FC<UserCardProps> = async ({ user }) => {
  // const interactedTags = await getTopInteractedTags({ phone: user.phone })
  // const interactedTags = await getTopInteractedTags({})
  return (
    <Link
      href={`/social/profile/${user.id}`}
      className="max-xs:min-w-full xs:w-[260px] w-full"
    >
      <article className="flex w-full flex-col items-center justify-center rounded-2xl border p-4">
        <Image
          src={user.image?.url ?? '/assets/icons/user.svg'}
          alt={user.name}
          width={50}
          height={50}
          className=" rounded-2xl border"
        />

        <div className="mt-4 text-center">
          <h3 className="line-clamp-1 font-bold text-slate-300 ">
            {user.name}
          </h3>
          <p className="mt-2 text-slate-400 ">{user.phone}</p>
        </div>

        <div className="mt-5">
          {/* {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag
                  key={tag.id}
                  id={JSON.stringify(tag.id)}
                  name={tag.name}
                />
              ))}
            </div>
          ) : (
            <Badge>بدون تگ</Badge>
          )} */}
        </div>
      </article>
    </Link>
  )
}

export default UserCard
