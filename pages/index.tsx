import Head from 'next/head'
import Layout from '../components/layout'
import { ReactElement, SyntheticEvent, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import dynamic from 'next/dynamic'

const Home: NextPageWithLayout = () => {
  const [text, setText] = useState<string>('')
  const textChanged = (e: SyntheticEvent) => {
    const inputBox = e.target as HTMLInputElement
    setText(inputBox.value)
  }
  const QRCodeComp = dynamic(() => import('../components/QRCodeStyled'), {
    ssr: false,
  })

  return (
    <>
      <Head>
        <title>Tom&apos;s QR generator</title>
      </Head>
      <div className="flex justify-center">
        <div className="flex flex-col w-6/12 items-center bg-slate-200 rounded-box p-5 m-5">
          <div className="flex flex-col items-center m-5 w-full">
            <input
              onChange={textChanged}
              className="input input-bordered w-3/6"
              placeholder="Enter some text to generate a QR code"
            />
          </div>
          <QRCodeComp data={text} />
        </div>
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
