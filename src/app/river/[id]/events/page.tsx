"use client"

import EventCard from "@/components/event/event-card"

export default function Events({ params }: { params: { id: number } }) {
  let createdTime = ""
  let gen = 0
  let status = 0
  let ownersCount = 10
  let expiredTime = "3 days"
  let agreement = "I agree..."

  return (
    <main className="border border-gray">
      {Array.from(Array(10).keys()).map((temp, i) => (
        <EventCard key={i} id={i} />
      ))}
    </main>
  )
}
