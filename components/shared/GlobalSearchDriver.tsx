'use client'
import Search from '@/public/assets/icons/search.svg'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import Image from 'next/image'
import GlobalSearch from '../social/search/GlobalSearch'
import { cn } from '@/lib/utils'

interface GlobalSearchDriver {
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export function GlobalSearchDriver({ className, variant }: GlobalSearchDriver) {
  // const [goal, setGoal] = React.useState(350)

  // function onClick(adjustment: number) {
  //   setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  // }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={variant || 'ghost'}
          className="relative bg-transparent outline-none  "
        >
          <Image
            src={Search}
            alt="Search"
            fill
            className="bg-transparent cursor-pointer p-1"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          'bg-black/5 dark:bg-white/20 backdrop-blur-sm',
          className
        )}
      >
        {/* <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: 'hsl(var(--foreground))',
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div> */}
        <div className="relative mx-auto w-full h-[560px] max-w-sm">
          <GlobalSearch social={false} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
