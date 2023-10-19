import QRCode from "react-qr-code"

const QRCodeContainer = ({
  href,
  margin,
  customClass = ""
}: {
  href: string
  margin: boolean
  customClass?: string
}) => {
  return (
    <div id="qrcode" className="bg-secondary m-auto flex flex-col rounded-lg">
      <div className={`relative flex justify-center ${margin ? "m-2" : ""} ${customClass}`}>
        <QRCode
          size={256}
          bgColor={"#FFFFFF"}
          fgColor={"#000000"}
          style={{
            height: "auto",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: "#FFFFFF"
          }}
          // id={passcode}
          value={`${href}`}
          // viewBox={`0 0 268 268`}
        />
      </div>
    </div>
  )
}
export default QRCodeContainer
