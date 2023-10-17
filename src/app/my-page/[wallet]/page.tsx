"use client"

import EventToken from "@/components/token/event-token"
import StewardshipToken from "@/components/token/stewardship-token"

export default function Mypage({ params }: { params: { wallet: string } }) {
  return (
    <main className="m-4 w-auto border text-left">
      <div className="m-6 text-xl font-bold">River Title</div>
      <StewardshipToken />
      <EventToken />
    </main>
  )
}
