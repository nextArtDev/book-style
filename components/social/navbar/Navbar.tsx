import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SiteLogo from '../../../public/assets/images/site-logo.svg'
import MobileNav from './MobileNav'
import GlobalSearch from '../search/GlobalSearch'
import { ThemeToggle } from '@/components/ui/theme-toggle'
// import GlobalSearch from '../search/GlobalSearch'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav
      dir="ltr"
      className=" fixed z-50 flex w-full h-16 min-h-16 bg-primary/10 backdrop-blur-3xl items-center justify-between gap-5 border-b dark:shadow-none sm:px-12 "
    >
      <div className="flex items-center justify-center  space-x-4">
        <ThemeToggle />
        <Link href={'/'} className="flex items-center gap-1">
          <Image src={SiteLogo} width={23} height={23} alt="DevFlow" />
          <p className=" font-bold text-primary/50 max-sm:hidden ">
            کتاب <span className="text-secondary">گرام</span>{' '}
          </p>
        </Link>
      </div>
      <div className="min-w-sm">
        <GlobalSearch social={true} />
      </div>
      <div className="flex-between gap-5">
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
