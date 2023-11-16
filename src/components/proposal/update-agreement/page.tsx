"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import { useState, useContext } from "react"
import { Context } from "@/context"
import { Language } from "@/utils/language"
import { uploadToIpfs } from "@/utils/ipfs"

export default function UpdateAgreement({
  riverAddress,
  onSend,
  onFinish
}: {
  riverAddress: string
  onSend?: any
  onFinish?: any
}) {
  const lang = Language()
  const { address, createUpdateAgreementProposal } = useContext(Context)

  const [agreement, setAgreement] = useState<string[]>([])
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const validated = () => {
    if (!agreement || agreement?.length <= 0) return false
    return true
  }

  const updateAgreement = async () => {
    onSend()
    if (!validated || !address || !riverAddress) {
      alert(lang.alert)
      onFinish()
      return
    }
    let ipfsHash = await uploadToIpfs(agreement)
    createUpdateAgreementProposal(riverAddress, ipfsHash)
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
          <div>
            <div>{lang.createRiver.agreement.label}</div>
            <Input
              value={agreement}
              type="text-area"
              placeholder={"enter agreement"}
              onChange={setAgreement}
            />
          </div>
          <div className="my-4 w-full text-center">
            <Button onClick={updateAgreement} disabled={!validated()}>
              {lang.createRiver.create}
            </Button>
          </div>
        </>
      )}
    </main>
  )
}
