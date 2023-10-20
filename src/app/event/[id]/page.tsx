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

export default function Event({ params }: { params: { id: number } }) {
  let mockRiver: River = {
    id: 0,
    name: "磺溪",
    agreement: "agreement",
    dataset: "ipfs",
    gen: 2,
    createdTime: "2023-09-30 22:25",
    expiredTime: "2023-10-1 22:25",
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

  const lang = Language()

  const [agreed, setAgreed] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { address } = useContext(Context)

  let event = mockEvent
  let river = mockRiver

  const handleAgree = () => {
    setIsSuccess(true)
  }

  const handleApprove = () => {}

  return (
    <main className="border bg-white p-4">
      {!isSuccess ? (
        <>
          <EventInfo event={event} stewardsCount={10} />
          <div className="border-b-2 pb-8">
            <Button style={ButtonStyle.primary} onClick={handleApprove}>
              Approve
            </Button>
          </div>
          {address && event.participants.indexOf(address) < 0 && (
            <>
              <RiverAgreement agreement={river.agreement} />
              <div className="my-2">
                <Button
                  style={ButtonStyle.highlight}
                  onClick={(e: any) => {
                    setAgreed(!agreed)
                  }}
                >
                  <div className="flex">
                    {agreed && <Image src={Check} alt="" width={24} />}
                    <span className="ml-4">I agree for above</span>
                  </div>
                </Button>
              </div>
              <div className="my-2">
                <Button onClick={handleAgree} disabled={!agreed}>
                  Join event!
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="py-8">
          <Success
            imgSrc="/images/event-token.png"
            message={lang.createRiver.success}
            buttonLink={`/my-page`}
            buttonText={"View my token"}
          />
        </div>
      )}
    </main>
  )
}
