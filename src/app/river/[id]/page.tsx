"use client"

import Button, { ButtonStyle } from "@/components/button"
import RiverAgreement from "@/components/river/river-agreement"
import RiverInfo from "@/components/river/river-info"
import Schedule from "@/components/schedule"

export default function River({ params }: { params: { id: number } }) {
  let createdTime = ""
  let gen = 0
  let status = 0
  let ownersCount = 10
  let expiredTime = "3 days"
  let agreement = "I agree..."

  const handleAgree = () => {}

  return (
    <main className="border border-gray">
      <Schedule />
      <RiverInfo
        createdTime={createdTime}
        gen={gen}
        status={status}
        ownersCount={ownersCount}
        expiredTime={expiredTime}
      />
      <RiverAgreement agreement={agreement} />
      <div className="flex flex-col">
        <Button style={ButtonStyle.highlight} onClick={handleAgree}>
          I agree for above statement
        </Button>
        <Button onClick={handleAgree} disabled={false}>
          Join!
        </Button>
      </div>
    </main>
  )
}
