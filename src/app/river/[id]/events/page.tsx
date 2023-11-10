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
  let river: River | null = null

  const { data } = useSWR(params.id ? `${apiUrl}/rivers/${params.id}` : null, fetcher)
  if (data !== undefined && !data.error) {
    river = data
  }

  let stewardsCount = 5

  const lang = Language()

  const [approved, setApproved] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const { address, approveEvent } = useContext(Context)

  let showApprove =
    address !== undefined &&
    river !== null &&
    Array.isArray(river.stewards) &&
    river.stewards.indexOf(address) >= 0 &&
    !approved

  const router = useRouter()

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }
  const approve = (uid: string) => {
    setShowOverlay(true)

    let eventId = parseInt(uid.split("-")[1])

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
        {river ? (
          <div>
            {river.events?.map((event, i) => (
              <EventCard
                key={i}
                event={event}
                stewardsCount={stewardsCount}
                showApprove={showApprove}
                onClick={() => {
                  approve(event.uid)
                }}
              />
            ))}
          </div>
        ) : (
          <div>River not found</div>
        )}

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
