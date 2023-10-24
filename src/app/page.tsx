"use client"

import Button, { ButtonStyle } from "@/components/button"
import Footer from "@/components/footer"
import { Context } from "@/context"
import { useContext } from "react"

export default function Home() {
  const context = useContext(Context)

  const connectWallet = async () => {
    if (context.address === undefined) {
      await context.syncTaquito()
    }
  }

  return (
    <main className="flex flex-col items-center justify-center font-monda">
      <div className="mt-20">
        <div className="flex items-center justify-center text-[20vmin] font-bold text-white drop-shadow-[0px_0px_1px_rgba(0,0,0,0.5)]">
          Rivercare
          <div className="absolute text-[18vmin] font-bold text-title">RiverCare</div>
        </div>
      </div>
      <div>
        <p className="break-all">
          RiverCare, the decentralized identity based on the stewardship&apos;s care actions
        </p>
      </div>
      <div className="mt-32 flex flex-col gap-8 text-2xl text-white xl:flex-row xl:text-3xl">
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
      <div className="fixed bottom-0">
        <Footer />
      </div>
    </main>
  )
}
