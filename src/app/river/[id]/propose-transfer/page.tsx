"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react"
import { Context } from "@/context"

export default function ProposeTransfer({ params }: { params: { id: number } }) {
  const context = useContext(Context)

  const [targetAddr, setTargetAddr] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  const validated = () => {
    let a = parseInt(amount)
    if (isNaN(a) || a <= 0) return false
    if (!targetAddr) return false
    return true
  }

  const proposeTransfer = async () => {
    console.log()
    //parseInt(amount)
  }

  return (
    <main className="p-6 text-left">
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
        <Input value={amount} type="text" placeholder={"enter the amount"} onChange={setAmount} />
      </div>
      <div className="my-4 w-full text-center">
        <Button onClick={proposeTransfer} disabled={!validated()}>
          Create!
        </Button>
      </div>
    </main>
  )
}
