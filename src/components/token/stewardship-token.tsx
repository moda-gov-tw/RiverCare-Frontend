import { River } from "@/interfaces/river.interface"
import StewardshipTokenSrc from "@/../public/images/stewardship-token.png"
import Image from "next/image"
import Link from "next/link"
import { BASE_URL } from "@/constants"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const StewardshipToken = ({ river }: { river: any }) => {
  const { data } = useSWR(`${BASE_URL}/api/rivers/${river.riverId}`, fetcher)
  if (data !== undefined && !data?.error) {
    river = data
  }

  return (
    <div className="m-8 border bg-white p-2 text-left">
      <Link href={`/river/${river.riverId}`}>
        <Image className="mx-auto" src={StewardshipTokenSrc} alt="" width={200} height={200} />
        <div className="mx-2 mb-1 mt-4">{river.name}</div>
        <div className="mx-2 mt-1">Gen # {river.gen}</div>
      </Link>
    </div>
  )
}
export default StewardshipToken
