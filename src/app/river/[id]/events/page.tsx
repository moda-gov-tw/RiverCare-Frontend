"use client"

import Dropdown from "@/components/dropdown"
import { useContext, useState, useEffect } from "react"
import EventCard from "@/components/event/event-card"
import { Event } from "@/interfaces/event.interface"
import { useRouter } from "next/navigation"

export default function Events({ params }: { params: { id: number } }) {
  let mockdata: Event = {
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

  let stewardsCount = 5

  const [events, setEvents] = useState<Event[]>()

  const getEvents = () => {
    setEvents(Array.from(Array(10).keys()).map((temp, i) => mockdata))
  }

  const router = useRouter()

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <Dropdown type="rivernav" onChange={navigate} currRoute={"events"} />
      <main className="">
        <div>
          {events?.map((event, i) => (
            <EventCard key={i} event={event} stewardsCount={stewardsCount} />
          ))}
        </div>
      </main>
    </>
  )
}
