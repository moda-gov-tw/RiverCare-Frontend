import Image from "next/image"
import Button from "./button"
import CheckIcon from "@/../public/images/check.png"

const Success = ({
  imgSrc,
  message,
  buttonText,
  buttonLink
}: {
  imgSrc?: string
  message: string
  buttonText?: string
  buttonLink?: string
}) => {
  return (
    <div className="flex flex-col items-center">
      {imgSrc && (
        <div className="relative">
          <Image src={imgSrc} alt="" width={200} height={200} />
          <Image
            className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-5"
            src={CheckIcon}
            alt=""
            width={40}
            height={40}
          />
        </div>
      )}
      <div className="mx-auto font-bold text-action">{message}</div>
      {buttonLink && buttonText && (
        <div className="mt-4">
          <Button href={buttonLink}>{buttonText}</Button>
        </div>
      )}
    </div>
  )
}
export default Success
