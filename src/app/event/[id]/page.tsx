"use client"

import Button, { ButtonStyle } from "@/components/button"
import EventInfo from "@/components/event/event-info"
import RiverAgreement from "@/components/river/river-agreement"
import { Context } from "@/context"
import Check from "@/../public/images/check.png"
import { Event } from "@/interfaces/event.interface"
import { River, RiverStatus } from "@/interfaces/river.interface"
import { useContext, useState } from "react"
import Image from "next/image"
import Success from "@/components/success"
import { Language } from "@/utils/language"
import Loading from "./loading"
import useSWR from "swr"
import { apiUrl } from "@/constants"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Event({ params }: { params: { id: string } }) {
  let [riverId, eventId] = params.id.split("-")
  let river: River | null = null
  let event: Event | null = null

  const { data: riverData } = useSWR(riverId ? `${apiUrl}/rivers/${riverId}` : null, fetcher)
  if (riverData !== undefined && !riverData.error) {
    river = riverData
  }
  const { data: eventData } = useSWR(params.id ? `${apiUrl}/events/${params.id}` : null, fetcher)
  if (eventData !== undefined && !eventData.error) {
    event = eventData
  }

  const lang = Language()

  const [agreed, setAgreed] = useState(false)
  const [approved, setApproved] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [signature, setSignature] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [joined, setJoined] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const { address, sign, claimEvent, approveEvent } = useContext(Context)

  const signAgree = () => {
    setShowOverlay(true)
    if (!address || !river) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    sign(river.agreement)
      .then((res) => {
        setShowOverlay(false)
        if (res) {
          setPublicKey(res.publicKey)
          setSignature(res.signature)
          setAgreed(!agreed)
        }
      })
      .catch(() => {
        alert(lang.alert)
        setShowOverlay(false)
      })
  }

  const join = () => {
    setShowOverlay(true)
    let id = parseInt(eventId)

    if (!address || !publicKey || !signature || !river || isNaN(id)) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    claimEvent(river.walletAddr, id, publicKey, signature)
      .then((res) => {
        setShowOverlay(false)
        if (res) {
          setJoined(true)
          setIsSuccess(true)
        }
      })
      .catch(() => {
        alert(lang.alert)
        setShowOverlay(false)
      })
  }

  const approve = () => {
    setShowOverlay(true)
    let id = parseInt(eventId)

    if (!address || !river || isNaN(id)) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    approveEvent(river.walletAddr, id)
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
    <main className="border bg-white p-4">
      {event !== null && river !== null ? (
        !isSuccess ? (
          <>
            <EventInfo event={event} stewardsCount={10} />
            {address && river.stewards?.indexOf(address) >= 0 && !approved && (
              <div className="border-b-2 pb-8">
                <Button style={ButtonStyle.primary} onClick={approve}>
                  {lang.createEvent.approved}
                </Button>
              </div>
            )}
            {address && event.participants.indexOf(address) < 0 && (
              <>
                <RiverAgreement agreement={river.agreement} />
                <div className="my-2">
                  <Button style={ButtonStyle.highlight} onClick={signAgree}>
                    <div className="flex">
                      {agreed && <Image src={Check} alt="" width={24} />}
                      <span className="ml-4 text-black">{lang.joinRiver.agree}</span>
                    </div>
                  </Button>
                </div>
                <div className="my-2">
                  <Button onClick={join} disabled={!agreed}>
                    {lang.createEvent.join}
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="py-8">
            <Success
              imgSrc="/images/event-token.png"
              message={"Successfully get event token"}
              buttonLink={`/my-page`}
              buttonText={"View my token"}
            />
          </div>
        )
      ) : (
        <div>- Event not found -</div>
      )}
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black opacity-50">
          <Loading />
        </div>
      )}
    </main>
  )
}
