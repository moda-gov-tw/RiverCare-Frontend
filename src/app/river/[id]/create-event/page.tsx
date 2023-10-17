"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react"
import { Context } from "@/context"

export default function CreateEvent({ params }: { params: { id: number } }) {
  const router = useRouter()
  const context = useContext(Context)

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editions, setEditions] = useState("")

  const validated = () => {
    let e = parseInt(editions)
    if (name === "" || description === "") return false
    if (isNaN(e) || e <= 0) return false
    return true
  }

  const createEvent = () => {
    // name, description, editions
  }

  return (
    <>
      <Dropdown type="rivernav" onChange={navigate} currRoute={"create-event"} />
      <main className="border p-6 text-left">
        <div className="mb-4">
          <div className="mb-2">Event&apos;s name:</div>
          <Input value={name} placeholder={"enter name"} onChange={setName} />
        </div>
        <div>
          <div>Event&apos;s description:</div>
          <Input
            value={description}
            type="text-area"
            placeholder={"enter description"}
            onChange={setDescription}
          />
        </div>
        <div>
          <div>Event&apos;s editions</div>
          <Input value={editions} placeholder={"enter name"} onChange={setEditions} />
        </div>
        <div className="my-4 w-full text-center">
          <Button onClick={createEvent} disabled={!validated()}>
            Create!
          </Button>
        </div>
      </main>
    </>
  )
}
