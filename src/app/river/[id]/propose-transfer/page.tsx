"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import { useState, useContext } from "react"
import { Context } from "@/context"
import { Language } from "@/utils/language"

export default function ProposeTransfer({
  riverAddress,
  onSend,
  onFinish
}: {
  riverAddress: string
  onSend?: any
  onFinish?: any
}) {
  const lang = Language()
  const { address, createTransferTezosProposal } = useContext(Context)

  const [targetAddr, setTargetAddr] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const validated = () => {
    let a = parseInt(amount)
    if (isNaN(a) || a <= 0) return false
    if (!targetAddr || !(targetAddr.startsWith("tz") || targetAddr.startsWith("KT"))) return false
    return true
  }

  const proposeTransfer = async () => {
    onSend()

    if (!validated || !address || !riverAddress) {
      alert(lang.alert)
      onFinish()
      return
    }
    createTransferTezosProposal(riverAddress, targetAddr, parseFloat(amount) * 1000000)
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
        <div className="mx-auto mb-8 text-center text-lg">Proposal created successfully</div>
      ) : (
        <>
          <div>
            <div>Target address:</div>
            <Input
              value={targetAddr}
              type="text"
              placeholder={"enter the target tezos address"}
              onChange={setTargetAddr}
            />
          </div>
          <div>
            <div>Amount(tez):</div>
            <Input
              value={amount}
              type="text"
              placeholder={"enter the amount"}
              onChange={setAmount}
            />
          </div>
          <div className="my-4 w-full text-center">
            <Button onClick={proposeTransfer} disabled={!validated()}>
              Create!
            </Button>
          </div>
        </>
      )}
    </main>
  )
}
