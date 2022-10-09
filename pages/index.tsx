import Head from 'next/head'
import Layout from '../components/layout'
import {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { NextPageWithLayout } from './_app'
import dynamic from 'next/dynamic'
const QRCodeComp = dynamic(() => import('../components/QRCodeStyled'), {
  ssr: false,
})

const http = ['http', 'https']

const Home: NextPageWithLayout = () => {
  const [text, setText] = useState<string>('')
  const [dummyText, setDummyText] = useState<string>('')

  const httpSelectionRef = useRef<HTMLSelectElement | null>(null)
  const [httpSelection, setHttpSelection] = useState(http[0])
  const onSelectionChange = () => {
    if (httpSelectionRef && httpSelectionRef.current) {
      let selectedAxis =
        httpSelectionRef.current.options[httpSelectionRef.current.selectedIndex]
          .text

      setHttpSelection(selectedAxis)
    }
  }

  const [productName, setProductName] = useState('Product')
  const onProductChange = (e: SyntheticEvent) => {
    const productInputBox = e.target as HTMLInputElement
    setProductName(productInputBox.value)
  }

  const [versionNumber, setVersionNumber] = useState('V1')
  const onVersionChange = (e: SyntheticEvent) => {
    const versionInputBox = e.target as HTMLInputElement
    setVersionNumber(versionInputBox.value)
  }

  const [serialNumber, setSerialNumber] = useState('G0000A00000')
  const onSerialChange = (e: SyntheticEvent) => {
    const serialInputBox = e.target as HTMLInputElement
    setSerialNumber(serialInputBox.value)
  }

  const [key, setKey] = useState('kkkkkkkkkkkkkkkkkkkkk')
  const onKeyChange = (e: SyntheticEvent) => {
    const keyInputBox = e.target as HTMLInputElement
    setKey(keyInputBox.value)
  }

  useEffect(() => {
    setDummyText(
      httpSelection +
        '://9o.at/' +
        productName +
        '_' +
        versionNumber +
        '_' +
        serialNumber +
        '_' +
        key,
    )
  }, [httpSelection, productName, versionNumber, serialNumber, key])

  const generate = () => {
    if (key.length != 21) {
      alert('The key must have exactly 21 characters!')
      return
    }

    setText(
      httpSelection +
        '://9o.at/' +
        productName +
        '_' +
        versionNumber +
        '_' +
        serialNumber +
        '_' +
        key,
    )
  }

  return (
    <>
      <Head>
        <title>Tom&apos;s QR generator</title>
      </Head>
      <div className="flex justify-center h-full w-full">
        <div className="flex flex-col xl:flex-row justify-center w-full items-center p-5">
          <div className="flex flex-col h-4/6 justify-evenly items-start w-2/6 mb-10">
            <select
              ref={httpSelectionRef}
              className="select select-bordered mb-2"
              defaultValue={http[0]}
              onChange={onSelectionChange}
            >
              {http.map((item: string) => (
                <option key={http.indexOf(item)}>{item}</option>
              ))}
            </select>
            <input
              onChange={onProductChange}
              className="input input-bordered w-5/6 mb-2"
              placeholder={'Product name'}
              defaultValue={productName}
            />
            <input
              className="input input-bordered w-5/6 mb-2"
              placeholder="Version number"
              defaultValue={versionNumber}
              onChange={onVersionChange}
            />
            <input
              className="input input-bordered w-5/6 mb-2"
              placeholder="Serial number"
              defaultValue={serialNumber}
              onChange={onSerialChange}
            />
            <input
              className="input input-bordered w-5/6 mb-2"
              placeholder="Key"
              defaultValue={key}
              onChange={onKeyChange}
            />
            <p className="mb-2 whitespace-normal w-5/6 break-words">{dummyText}</p>
            <p className="mb-2">Current text length: {dummyText.length}</p>
            <button className="btn" onClick={generate}>
              Generate QR code
            </button>
          </div>

          <div className="w-2/6 mb-10">
            <QRCodeComp data={text} />
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
