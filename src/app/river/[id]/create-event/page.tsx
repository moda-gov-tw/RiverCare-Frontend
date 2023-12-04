"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react"
import { Context } from "@/context"
import Loading from "../loading"
import { Language } from "@/utils/language"
import { River } from "@/interfaces/river.interface"
import Success from "@/components/success"
import useSWR from "swr"
import { BASE_URL } from "@/constants"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function CreateEvent({ params }: { params: { id: number } }) {
  let river: River | null = null

  const { data } = useSWR(params.id ? `${BASE_URL}/api/rivers/${params.id}` : null, fetcher)
  if (data !== undefined && !data?.error) {
    river = data
  }

  const lang = Language()
  const router = useRouter()
  const { address, createEvent } = useContext(Context)

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editions, setEditions] = useState("")
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const validated = () => {
    let e = parseInt(editions)
    if (name === "" || description === "") return false
    if (editions !== "" && (isNaN(e) || e <= 0)) return false
    return true
  }

  const create = () => {
    setShowOverlay(true)

    if (!validated() || !address || !river || !river.walletAddr) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }

    let e = editions === "" ? -1 : parseInt(editions)

    createEvent(river.walletAddr, e, name, description)
      .then((res) => {
        setShowOverlay(false)
        if (res) setIsSuccess(true)
      })
      .catch(() => {
        alert(lang.alert)
        setShowOverlay(false)
      })
  }

  return (
    <>
      <div className="mb-6 mt-4 font-monda text-5xl font-bold text-title">{river?.name}</div>
      <Dropdown type="riverNav" onChange={navigate} currRoute={"create-event"} />
      <main className="border p-6 text-left font-monda">
        {river?.gen === 0 ? (
          <div className="text-center">{lang.unavailableInGenZero}</div>
        ) : !isSuccess ? (
          <>
            <div className="mb-4">
              <div className="mb-2">{lang.createEvent.name.label}</div>
              <Input
                value={name}
                placeholder={lang.createEvent.name.placeholder}
                onChange={setName}
              />
            </div>
            <div>
              <div>{lang.createEvent.description.label}</div>
              <Input
                value={description}
                type="text-area"
                placeholder={lang.createEvent.description.placeholder}
                onChange={setDescription}
              />
            </div>
            <div>
              <div>{lang.createEvent.editions.label}</div>
              <Input
                value={editions}
                placeholder={lang.createEvent.editions.placeholder}
                onChange={setEditions}
              />
            </div>
            <div className="my-4 w-full text-center">
              <Button onClick={create} disabled={!validated()}>
                {lang.createRiver.create}
              </Button>
            </div>
          </>
        ) : (
          <Success
            imgSrc="/images/event-token.png"
            message={lang.createEvent.success}
            buttonLink={`/my-page/hosted-events`}
            buttonText={"Go"}
          />
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
