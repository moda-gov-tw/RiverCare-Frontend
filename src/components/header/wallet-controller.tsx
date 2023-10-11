"use client"

import { showWallet } from "@/utils/string"
import { Context } from "@/context"
import { useContext, useEffect, useState } from "react"

export const WalletController = ({}) => {
  const context = useContext(Context)
  const [showUnsync, setShowUnsync] = useState(false)

  const handleSyncUnsync = async () => {
    if (context.address === undefined) {
      await context.syncTaquito()
    } else {
      await context.disconnect()
    }
  }

  useEffect(() => {
    context.setAccount()
  }, [context])

  let label: string = "Connect wallet"
  if (context.acc?.address) {
    if (showUnsync) label = "Disconnect"
    else label = showWallet({ wallet: context.acc.address })
  }

  return (
    <button
      className="min-w-[150px] rounded-3xl border border-black px-4 py-2 text-center font-bold text-primary"
      onClick={handleSyncUnsync}
      onMouseEnter={() => setShowUnsync(true)}
      onMouseLeave={() => setShowUnsync(false)}
    >
      {label}
    </button>
  )
}
