"use client"

import ConnectHint from "@/components/connect-hint"
import Dropdown from "@/components/dropdown"
import EventToken from "@/components/token/event-token"
import StewardshipToken from "@/components/token/stewardship-token"
import { API_URL } from "@/environments/environment"
import { Context } from "@/context"
import { Event } from "@/interfaces/event.interface"
import { River, RiverStatus } from "@/interfaces/river.interface"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Mypage({ params }: { params: { wallet: string } }) {
  const { address } = useContext(Context)

  const router = useRouter()

  let stewardships: River[] | null = null

  const { data } = useSWR(address ? `${API_URL}/${address}/stewardshipTokens` : null, fetcher)
  if (data !== undefined && !data?.error) {
    stewardships = data
  }

  const navigate = (item: { route: string }) => {
    router.push(`/my-page/${item.route}`)
  }

  console.log(stewardships)

  if (!address?.startsWith("tz")) return <ConnectHint />
  return (
    <>
      <Dropdown type="myPage" onChange={navigate} />
      <main className="m-4 w-auto border bg-white text-left font-monda">
        {stewardships &&
          stewardships.length > 0 &&
          stewardships.map((river: River, i) => <StewardshipToken key={i} river={river} />)}
      </main>
    </>
  )
}
