"use client"

import ConnectHint from "@/components/connect-hint"
import Dropdown from "@/components/dropdown"
import EventToken from "@/components/token/event-token"
import StewardshipToken from "@/components/token/stewardship-token"
import { Context } from "@/context"
import { Event } from "@/interfaces/event.interface"
import { River, RiverStatus } from "@/interfaces/river.interface"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function Mypage({ params }: { params: { wallet: string } }) {
  const getTokens = () => {
    let mockRiver: River = {
      id: 0,
      name: "磺溪",
      agreement: "agreement",
      dataset: "ipfs",
      gen: 0,
      createdTime: "2023-09-30 22:25",
      expiredTime: "",
      status: RiverStatus.alive,
      stewards: ["tz1123"],
      stewardsCount: 1,
      currentTokenId: 0,
      currentTokenContract: "KT11111",
      events: [],
      walletAddr: "KT1111",
      proposals: []
    }

    return Array.from(Array(2).keys()).map((temp, i) => mockRiver)
  }

  const router = useRouter()
  const [stewardships, setStewardships] = useState<River[]>([])

  const { address } = useContext(Context)

  useEffect(() => {
    let tokens = getTokens()
    setStewardships(tokens)
  }, [])

  const navigate = (item: { route: string }) => {
    router.push(`/my-page/${item.route}`)
  }

  if (!address?.startsWith("tz")) return <ConnectHint />
  return (
    <>
      <Dropdown type="myPage" onChange={navigate} />
      <main className="m-4 w-auto border bg-white text-left font-monda">
        {stewardships.length > 0 &&
          stewardships.map((river: River, i) => <StewardshipToken key={i} river={river} />)}
      </main>
    </>
  )
}
