import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'
import './magazine.scss'
interface MagazineEffectProps {
  className?: string
  src: string
  alt?: string
}

const MagazineEffect: FC<MagazineEffectProps> = ({ className, src, alt }) => {
  return (
    <div className="zine-container">
      <div className={cn('zine relative', className)}>
        <Image
          className="p-4"
          width={250}
          height={280}
          src={src || ''}
          alt={alt || 'write|translator'}
        />
        {/* <img src={src || ''} alt={alt || 'write|translator'} /> */}
      </div>
    </div>
  )
}

export default MagazineEffect
