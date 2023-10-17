"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react"
import { Context } from "@/context"
import { updateToIpfs } from "@/utils/ipfs"

export default function UpdateAgreement({ params }: { params: { id: number } }) {
  const router = useRouter()
  const context = useContext(Context)

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  const [agreement, setAgreement] = useState<string[]>([])

  const validated = () => {
    if (!agreement || agreement?.length <= 0) return false
    return true
  }

  const updateAgreement = async () => {
    let ipfsHash = await updateToIpfs(agreement)
    console.log(ipfsHash)
  }

  return (
    <>
      <Dropdown type="rivernav" onChange={navigate} currRoute={"update-agreement"} />
      <main className="border p-6 text-left">
        <div>
          <div>Event&apos;s agreement:</div>
          <Input
            value={agreement}
            type="text-area"
            placeholder={"enter agreement"}
            onChange={setAgreement}
          />
        </div>
        <div className="my-4 w-full text-center">
          <Button onClick={updateAgreement} disabled={!validated()}>
            Create!
          </Button>
        </div>
      </main>
    </>
  )
}
