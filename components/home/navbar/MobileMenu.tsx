'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Hamburger from '@/public/assets/icons/hamburger.svg'
import { Menu } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '@/lib/utils'
import { Billboard } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { useCurrentUser } from '@/hooks/use-current-user'
import { homeSidebarLinks } from '@/lib/constants'

interface MobileMenuProps {
  // billboards:
  //   | (Billboard & { categories: { id: string; name: string }[] })[]
  //   | null
}

function MobileMenu() {
  // console.log(billboards.map((bi) => bi.categories))
  // console.log(billboards)
  const user = useCurrentUser()

  return (
    <div className="md:hidden z-50">
      <Sheet>
        <SheetTrigger asChild className="fixed top-0 right-0">
          <Image
            src={Hamburger}
            alt="menu"
            width={40}
            height={40}
            className="cursor-pointer m-2 md:hidden invert dark:invert-0 "
          />
        </SheetTrigger>
        <SheetContent side={'right'} className="">
          <Link href={'/'} className="flex items-center gap-1">
            {/* <Image src={SiteLogo} width={23} height={23} alt="DevFlow" /> */}
            <p className="font-bold text-secondary">
              کتاب <span className="text-primary">فردا</span>{' '}
            </p>
          </Link>
          <div>
            <SheetClose asChild>
              <NavContent />
            </SheetClose>

            {!user?.id && !user?.isVerified && (
              <div className="flex flex-col gap-3 mt-4 ">
                <SheetClose asChild>
                  <Link href={'/login'}>
                    <Button
                      variant={'destructive'}
                      className="w-full px-4 py-3 "
                    >
                      <span>ورود</span>
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu

const NavContent = () => {
  const pathname = usePathname()

  return (
    <section className=" flex h-full flex-col gap-6 pt-14  ">
      {homeSidebarLinks.map((item) => {
        const isActive =
          // (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`flex items-center justify-start gap-4 rounded-lg p-4 ${
                isActive
                  ? 'rounded-lg bg-muted-foreground text-muted font-semibold '
                  : 'bg-muted text-muted-foreground '
              }`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                style={{ transform: 'rotateY(180deg)' }}
                className={`${
                  isActive ? 'invert-0 dark:invert' : 'invert dark:invert-0'
                }`}
              />
              <p className={`${isActive ? 'font-bold' : ''}`}>{item.label}</p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}
