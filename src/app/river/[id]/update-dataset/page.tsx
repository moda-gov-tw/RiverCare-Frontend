"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react"
import { Context } from "@/context"
import UploadFile from "@/components/upload-file"
import { uploadToIpfs } from "@/utils/ipfs"
export default function UpdateDataset({ params }: { params: { id: number } }) {
  const context = useContext(Context)

  const [dataset, setDataset] = useState<string>()

  const validated = () => {
    if (!dataset) return false
    return true
  }

  const updateDataset = async () => {
    let ipfsHash = await uploadToIpfs(dataset)
  }

  return (
    <main className="p-6 text-left">
      <div className="w-full">
        <div>Event&apos;s dataset:</div>
        <div className="flex justify-center py-8">
          <UploadFile onChange={setDataset} />
        </div>
      </div>
      <div className="my-4 w-full text-center">
        <Button onClick={updateDataset} disabled={!validated()}>
          Create!
        </Button>
      </div>
    </main>
  )
}
