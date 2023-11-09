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

export default function Event({ params }: { params: { id: number } }) {
  let mockRiver: River = {
    id: 0,
    name: "磺溪",
    agreement: "ipfs://QmbxnccENRW6awW1bUmZYGc4v81hEdHZnDz88vRD6Hyawc",
    dataset: "ipfs",
    gen: 2,
    createdTime: "2023-09-30 22:25",
    expiredTime: "2023-10-1 22:25",
    status: RiverStatus.alive,
    stewards: ["tz1YEqTs8H1ffjMzasTWk1LKifsKZ1TdhF4o"],
    stewardsCount: 1,
    currentTokenId: 0,
    currentTokenContract: "KT11111",
    events: [],
    walletAddr: "KT1NeZApGbSQicX3672TQAeL21Cg6fQ3Q9fe",
    proposals: []
  }

  let mockEvent: Event = {
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

  const lang = Language()

  const [agreed, setAgreed] = useState(false)
  const [approved, setApproved] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [signature, setSignature] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [joined, setJoined] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const { address, sign, claimEvent, approveEvent } = useContext(Context)

  let event = mockEvent
  let eventId = parseInt(event.uid) // substring
  let river = mockRiver

  const signAgree = () => {
    setShowOverlay(true)
    if (!address) {
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

    if (!address || !publicKey || !signature || isNaN(eventId)) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    claimEvent(river.walletAddr, eventId, publicKey, signature)
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

    if (!address || isNaN(eventId)) {
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
    <main className="border bg-white p-4">
      {!isSuccess ? (
        <>
          <EventInfo event={event} stewardsCount={10} />
          {address && river.stewards.indexOf(address) >= 0 && !approved && (
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
