import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import {
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react'
import type { NextPageWithLayout } from './_app'
import dynamic from 'next/dynamic'

const Home: NextPageWithLayout = () => {
  const [QrImage, setQrLink] = useState<string | null>(null)
  const [text, setText] = useState<string>('')
  const size = 300
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
          <div className="flex flex-col w-3/6">
            <h1 className="text-2xl mb-5">Generate a QR code</h1>
            <input
              onChange={textChanged}
              className="input input-bordered max-w-xs mb-5"
              placeholder="Enter some text to generate a QR code"
            />
          </div>
          <QRCodeComp data={text} />

          {QrImage && (
            <Image
              src={QrImage as string}
              width={size}
              height={size}
              alt="main picture"
              priority
            ></Image>
          )}
        </div>
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
