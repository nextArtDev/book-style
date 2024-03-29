import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/navbar/Navbar'

export default async function HomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="bg-light-bg dark:bg-dark-bg">
      {/* <div className="bg-light-bg dark:bg-dark-bg"> */}
      {/* <div className="relative h-full w-full bg-secondary "> */}
      {/* <div className="-z-0 absolute h-full w-full dark:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[radial-gradient(#ffffff33_1px,#00091d52_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div> */}
      <div className="mb-20">
        <Navbar />
      </div>
      <div>{modal}</div>
      <div>{children}</div>

      <Footer />
      {/* </div> */}
    </div>
  )
}
//<div class="relative h-full w-full bg-white"><div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>
