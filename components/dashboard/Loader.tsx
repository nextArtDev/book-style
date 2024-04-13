'use client'

import { HashLoader } from 'react-spinners'

export const Loader = () => {
  return (
    <div className="z-30 absolute inset-0 w-full h-full flex items-center justify-center">
      <HashLoader className="" color="#00000055" size={80} />
    </div>
  )
}
