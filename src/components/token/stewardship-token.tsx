import { River } from "@/interfaces/river.interface"
import StewardshipTokenSrc from "@/../public/images/stewardship-token.png"
import Image from "next/image"
import Link from "next/link"

const StewardshipToken = ({ river }: { river: River }) => {
  return (
    <div className="m-8 border bg-white p-2 text-left">
      <Link href={`/river/${river.id}`}>
        <Image className="mx-auto" src={StewardshipTokenSrc} alt="" width={200} height={200} />
        <div className="mx-2 mb-1 mt-4">{river.name}</div>
        <div className="mx-2 mt-1">Gen # {river.gen}</div>
      </Link>
    </div>
  )
}
export default StewardshipToken
