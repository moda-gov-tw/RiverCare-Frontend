"use client"

import ConnectHint from "@/components/connect-hint"
import Dropdown from "@/components/dropdown"
import EventToken from "@/components/token/event-token"
import { Context } from "@/context"
import { Event } from "@/interfaces/event.interface"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function HostedEvents({ params }: { params: { wallet: string } }) {
  const getTokens = () => {
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

    return Array.from(Array(1).keys()).map((temp, i) => mockEvent)
  }

  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])

  const { address } = useContext(Context)

  useEffect(() => {
    let tokens = getTokens()
    setEvents(tokens)
  }, [])

  const navigate = (item: { route: string }) => {
    router.push(`/my-page/${item.route}`)
  }

  if (!address?.startsWith("tz")) return <ConnectHint />
  return (
    <>
      <Dropdown type="myPage" onChange={navigate} currRoute={"hosted-events"} />
      <main className="m-4 w-auto border text-left font-monda">
        {events.length > 0 &&
          events.map((event: Event, i) => <EventToken key={i} event={event} isHost={true} />)}
      </main>
    </>
  )
}
