"use client"

import Button, { ButtonStyle } from "@/components/button"
import { Context } from "@/context"
import { useContext, useEffect, useState } from "react"

export default function Home() {
  const context = useContext(Context)

  const connectWallet = async () => {
    if (context.address === undefined) {
      await context.syncTaquito()
    }
  }

  return (
    <main className="flex flex-col text-center">
      <div className="text-title">Rivercare</div>
      <div className="">RiverCareRiverCareRiverCareRiverCareRiverCareRiverCareRiverCareRiver</div>
      <div className="text-2xl text-white">
        {context.acc?.address !== undefined ? (
          <>
            <Button href="/create-river">Create River</Button>
            <Button style={ButtonStyle.primary} href="/river-list">
              River List
            </Button>
          </>
        ) : (
          <Button onClick={connectWallet}>Connect</Button>
        )}
      </div>
    </main>
  )
}
