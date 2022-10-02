import QRCodeStyling from 'qr-code-styling'
import { useEffect, useMemo, useRef } from 'react'

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

  useEffect(() => {
    qrCode.append(qrCodeImage.current as HTMLElement)
  }, [])

  useEffect(() => {
    qrCode.update({
      data: props.data,
    })
  }, [props.data])

  return (
    <>
      <div ref={qrCodeImage}></div>
    </>
  )
}

export default QRCodeComp
