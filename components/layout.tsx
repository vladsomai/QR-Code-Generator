import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ session, children }: any) {
  return (
    <>
      {/* <div className="h-[7vh]">
        <Navbar />
      </div> */}

      {/* <main className="h-[88vh] tracking-wider overflow-auto"> */}
      <main className="h-[100vh] tracking-wider overflow-auto">
        {children}
      </main>

      {/* <div className="h-[5vh]">
        <Footer />
      </div> */}
    </>
  )
}
