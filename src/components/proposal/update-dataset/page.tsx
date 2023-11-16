"use client"

import Button from "@/components/button"
import { useState, useContext } from "react"
import { Context } from "@/context"
import { Language } from "@/utils/language"
import UploadFile from "@/components/upload-file"
import { uploadToIpfs } from "@/utils/ipfs"

export default function UpdateDataset({
  riverAddress,
  onSend,
  onFinish
}: {
  riverAddress: string
  onSend?: any
  onFinish?: any
}) {
  const lang = Language()
  const { address, createUpdateDatasetProposal } = useContext(Context)

  const [dataset, setDataset] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const validated = () => {
    if (!dataset) return false
    return true
  }

  const updateDataset = async () => {
    onSend()
    if (!validated || !address || !riverAddress) {
      alert(lang.alert)
      onFinish()
      return
    }
    let ipfsHash = await uploadToIpfs(dataset)

    createUpdateDatasetProposal(riverAddress, ipfsHash)
      .then((res) => {
        onFinish()
        if (res) setIsSuccess(true)
      })
      .catch(() => {
        alert(lang.alert)
        onFinish()
      })
  }

  return (
    <main className="p-6 text-left">
      {isSuccess ? (
        <div className="mx-auto mb-8 text-center text-lg">{lang.proposal.successful}</div>
      ) : (
        <>
          <div className="w-full">
            <div>{lang.createRiver.dataset.label}</div>
            <div className="flex justify-center py-8">
              <UploadFile onChange={setDataset} />
            </div>
          </div>
          <div className="my-4 w-full text-center">
            <Button onClick={updateDataset} disabled={!validated()}>
              {lang.createRiver.create}
            </Button>
          </div>
        </>
      )}
    </main>
  )
}
