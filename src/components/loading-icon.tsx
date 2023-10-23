import LoadingSrc from "@/../public/images/loading.gif"
import Image from "next/image"

const LoadingIcon = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Image src={LoadingSrc} alt="" width={100} />
    </div>
  )
}
export default LoadingIcon
