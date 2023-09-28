"use client"

import Button from "@/components/button"
import Input from "@/components/input"

export default function CreateEvent({ params }: { params: { id: number } }) {
  return (
    <main className="border border-gray">
      <div>
        <div>Event&apos;s name:</div>
        <Input value="" />
      </div>
      <div>
        <div>Event&apos;s description:</div>
        <Input value="" />
      </div>
      <Button>Create!</Button>
    </main>
  )
}
