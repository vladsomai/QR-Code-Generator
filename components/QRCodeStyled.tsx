import QRCodeStyling, { FileExtension } from 'qr-code-styling'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

const qrCodeFormats = ['png', 'svg', 'jpeg', 'webp']

export interface QrCodeCompProps {
  data: string
}
const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  margin: 1,
  imageOptions: { hideBackgroundDots: true, imageSize: 1, margin: 1 },
  dotsOptions: { type: 'dots', color: '#000000' },
  backgroundOptions: { color: '#ffffff' },
  cornersSquareOptions: { type: 'extra-rounded', color: '#000000' },
  cornersDotOptions: { type: 'dot', color: '#000000' },
})

const QRCodeComp = (props: QrCodeCompProps) => {
  const qrCodeImage = useRef<HTMLDivElement | null>(null)
  const [imgUrl, setImgUrl] = useState<string | null>(null)

  const qrCodeFormatSelectionBox = useRef<HTMLSelectElement | null>(null)
  const [qrCodeFormat, setQrCodeFormat] = useState(qrCodeFormats[0])
  const onSelectionChange = () => {
    if (qrCodeFormatSelectionBox && qrCodeFormatSelectionBox.current) {
      let selectedAxis =
        qrCodeFormatSelectionBox.current.options[
          qrCodeFormatSelectionBox.current.selectedIndex
        ].text

      setQrCodeFormat(selectedAxis)
    }
  }

  useEffect(() => {
    // qrCode.append(qrCodeImage.current as HTMLElement)
    qrCode.update({
      data: 'http://9o.at/R1_V6_G0000A00000_kkkkkkkkkkkkkkkkkkkkk',
    })
    qrCode.getRawData('svg').then((item) => {
      if (item == null) return

      var urlCreator = window.URL || window.webkitURL
      const imgUrl = urlCreator.createObjectURL(item as Blob)
      setImgUrl(imgUrl)
    })
  }, [])

  useEffect(() => {
    if (props.data) {
      qrCode.update({
        data: props.data,
      })
    }
    qrCode.getRawData('svg').then((item) => {
      if (item == null) return

      var urlCreator = window.URL || window.webkitURL
      const imgUrl = urlCreator.createObjectURL(item as Blob)
      setImgUrl(imgUrl)
    })
  }, [props.data])

  const download = () => {
    qrCode.download({
      name: `qr_${qrCodeFormat}`,
      extension: qrCodeFormat as FileExtension,
    })
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="" ref={qrCodeImage}></div>
        {imgUrl && (
          <Image alt='QR code' src={imgUrl} width={300} priority height={300}></Image>
        )}
        <div>
          <select
            ref={qrCodeFormatSelectionBox}
            className="select select-bordered"
            defaultValue={qrCodeFormats[0]}
            onChange={onSelectionChange}
          >
            {qrCodeFormats.map((item: string) => (
              <option key={qrCodeFormats.indexOf(item)}>{item}</option>
            ))}
          </select>
          <div
            className="tooltip tooltip-warning"
            data-tip="Don't forget to generate the QR code before downloading!"
          >
            <button className="btn m-2" onClick={download}>
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QRCodeComp
