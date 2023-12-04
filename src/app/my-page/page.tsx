"use client"

import ConnectHint from "@/components/connect-hint"
import Dropdown from "@/components/dropdown"
import StewardshipToken from "@/components/token/stewardship-token"
import { Context } from "@/context"
import { BASE_URL } from "@/constants"
import { River } from "@/interfaces/river.interface"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import useSWR from "swr"
import { Language } from "@/utils/language"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Mypage({ params }: { params: { wallet: string } }) {
  const { address } = useContext(Context)

  const lang = Language()
  const router = useRouter()

  let stewardships: any[] | null = null

  const { data } = useSWR(address ? `${BASE_URL}/api/${address}/stewardshipTokens` : null, fetcher)
  if (data !== undefined && !data?.error) {
    stewardships = data
  }

  const navigate = (item: { route: string }) => {
    router.push(`/my-page/${item.route}`)
  }
  if (!address?.startsWith("tz")) return <ConnectHint />
  return (
    <>
      <div className=" mb-6 mt-4 font-monda text-5xl font-bold text-title">{lang.myPageTitle}</div>
      <Dropdown type="myPage" onChange={navigate} />
      <main className="m-4 w-auto border bg-white text-left font-monda">
        {stewardships &&
          stewardships.length > 0 &&
          stewardships
            .filter((river) => river.generation !== 0)
            .map((river: River, i) => <StewardshipToken key={i} river={river} />)}
      </main>
    </>
  )
}
