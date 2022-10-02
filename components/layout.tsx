import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ session, children }: any) {
  return (
    <>
      <div className="h-[7vh]">
        <Navbar />
      </div>

      <main className="hidden lg:block h-[88vh] tracking-wider">
        {children}
      </main>

      <main className="lg:hidden flex justify-center h-[84vh] items-center text-center">
        <h1 className="text-6xl">
          You cannot view this website on small screens!
        </h1>
      </main>

      <div className="h-[5vh]">
        <Footer />
      </div>
    </>
  )
}
