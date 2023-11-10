"use client"

import Dropdown from "@/components/dropdown"
import { useContext, useState, useEffect } from "react"
import EventCard from "@/components/event/event-card"
import { Event } from "@/interfaces/event.interface"
import { useRouter } from "next/navigation"
import { Context } from "@/context"
import { Language } from "@/utils/language"
import { River, RiverStatus } from "@/interfaces/river.interface"
import Loading from "../loading"
import useSWR from "swr"
import { apiUrl } from "@/constants"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Events({ params }: { params: { id: number } }) {
  let event: Event = {
    uid: "0",
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

  // let river: River = {
  //   id: 0,
  //   name: "磺溪",
  //   agreement: "ipfs://QmbxnccENRW6awW1bUmZYGc4v81hEdHZnDz88vRD6Hyawc",
  //   dataset: "ipfs",
  //   gen: 2,
  //   createdTime: "2023-09-30 22:25",
  //   expiredTime: "2023-10-1 22:25",
  //   status: RiverStatus.alive,
  //   stewards: ["tz1YEqTs8H1ffjMzasTWk1LKifsKZ1TdhF4o"],
  //   stewardsCount: 1,
  //   currentTokenId: 0,
  //   currentTokenContract: "KT11111",
  //   events: [],
  //   walletAddr: "KT1NeZApGbSQicX3672TQAeL21Cg6fQ3Q9fe",
  //   proposals: []
  // }

  let river: River | null = null

  const { data } = useSWR(params.id ? `${apiUrl}/rivers/${params.id}` : null, fetcher)
  if (data !== undefined && !data.error) {
    river = data
  }

  let stewardsCount = 5
  let eventId = parseInt(event.uid) // substring

  const lang = Language()

  const [events, setEvents] = useState<Event[]>()
  const [approved, setApproved] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const { address, approveEvent } = useContext(Context)

  let showApprove =
    address !== undefined &&
    river !== null &&
    Array.isArray(river.stewards) &&
    river.stewards.indexOf(address) >= 0 &&
    !approved

  const getEvents = () => {
    setEvents(Array.from(Array(10).keys()).map((temp, i) => event))
  }

  const router = useRouter()

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  useEffect(() => {
    getEvents()
  }, [])

  const approve = () => {
    setShowOverlay(true)

    if (!address || !river || isNaN(eventId)) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }

    approveEvent(river.walletAddr, eventId)
      .then((res) => {
        setShowOverlay(false)
        if (res) {
          setApproved(true)
        }
      })
      .catch(() => {
        alert(lang.alert)
        setShowOverlay(false)
      })
  }

  return (
    <>
      <Dropdown type="riverNav" onChange={navigate} currRoute={"events"} />
      <main className="">
        <div>
          {events?.map((event, i) => (
            <EventCard
              key={i}
              event={event}
              stewardsCount={stewardsCount}
              showApprove={showApprove}
              onClick={approve}
            />
          ))}
        </div>
        {/* Overlay */}
        {showOverlay && (
          <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black opacity-50">
            <Loading />
          </div>
        )}
      </main>
    </>
  )
}
