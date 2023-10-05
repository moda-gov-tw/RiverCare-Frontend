"use client"

import Button, { ButtonStyle } from "@/components/button"
import EventInfo from "@/components/event/event-info"
import RiverAgreement from "@/components/river/river-agreement"

export default function Event({ params }: { params: { id: number } }) {
  let title = "River"
  let description =
    "sdefgsdfklgjsdklfghjksldcvslergfjklsdfjcvlsjhdkfgkldhswjfgvklhbjnzm,xscdvlakshdjklf"
  let createdTime = ""
  let creator = "sdf"
  let gen = 0
  let edition = 0

  let agreement = "123123"

  const handleAgree = () => {}

  return (
    <main className="border border-gray">
      <EventInfo
        id={params.id}
        title={title}
        description={description}
        createdTime={createdTime}
        creator={creator}
        edition={edition}
      />
      <RiverAgreement agreement={agreement} />
      <div className="flex flex-col">
        <Button style={ButtonStyle.highlight} onClick={handleAgree}>
          I agree for above statement
        </Button>
        <Button onClick={handleAgree} disabled={false}>
          Join event!
        </Button>
      </div>
    </main>
  )
}
