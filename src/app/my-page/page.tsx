"use client"

import ConnectHint from "@/components/connect-hint"
import Dropdown from "@/components/dropdown"
import EventToken from "@/components/token/event-token"
import StewardshipToken from "@/components/token/stewardship-token"
import { Context } from "@/context"
import { Event } from "@/interfaces/event.interface"
import { River, RiverStatus } from "@/interfaces/river.interface"
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
    let mockEvent: Event = {
      uid: "1",
      name: "River cleanup",
      tokenId: 0,
      tokenContract: "KT1111",
      description: "this is the description of the river cleanup, this event is for......",
      editions: 100,
      amount: 100,
      host: "tz1111",
      createdTime: "2023-09-30 22:25",
      participants: ["tz1111", "tz1111", "tz1111", "tz1111", "tz1111"],
      participantsCount: 5,
      approvals: ["tz1111", "tz1111", "tz1111"],
      approvalCount: 3
    }

    return {
      stewarships: Array.from(Array(2).keys()).map((temp, i) => mockRiver),
      events: Array.from(Array(3).keys()).map((temp, i) => mockEvent)
    }
  }

  const [type, setType] = useState("stewardship")
  const [stewardships, setStewardships] = useState<River[]>([])
  const [events, setEvents] = useState<Event[]>([])

  const { address } = useContext(Context)

  useEffect(() => {
    let tokens = getTokens()
    setStewardships(tokens.stewarships)
    setEvents(tokens.events)
  }, [type])

  if (!address?.startsWith("tz")) return <ConnectHint />
  return (
    <>
      <Dropdown
        type="tokenType"
        onChange={(item: { route: string }) => {
          setType(item.route)
        }}
      />
      <main className="m-4 w-auto border text-left">
        {type === "stewardship" &&
          stewardships.length > 0 &&
          stewardships.map((river: River, i) => <StewardshipToken key={i} river={river} />)}
        {type === "event" &&
          events.length > 0 &&
          events.map((event: Event, i) => <EventToken key={i} event={event} />)}
      </main>
    </>
  )
}
