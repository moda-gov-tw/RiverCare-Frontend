"use client"

import Button from "@/components/button"
import Proposal from "@/components/proposal"

export default function Multisig({ params }: { params: { id: number } }) {
  return (
    <main className="border border-gray p-3 text-left">
      <div className="border border-gray px-4 py-2">
        <div className="">Wallet address: KT123123123</div>
      </div>
      <div>
        <div className="text-2xl">Member List (threshold: 1/3)</div>
        <div className="border border-gray px-4 py-2">
          {Array.from(Array(10).keys()).map((temp, i) => (
            <div className="text-sm" key={i}>
              tz123123123
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-2xl">Proposals</div>
        <div className="border border-gray px-4 py-2">
          {Array.from(Array(3).keys()).map((temp, i) => (
            <Proposal key={i} />
          ))}
        </div>
      </div>
      <div className="m-6 text-center">
        <Button>Create proposal</Button>
      </div>
    </main>
  )
}
