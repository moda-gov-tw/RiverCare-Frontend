"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Proposal from "@/components/proposal"
import { ProposalStatus, ProposalType } from "@/interfaces/proposal.interface"
import { Language } from "@/utils/language"
import { useRouter } from "next/navigation"
import { Context } from "@/context"
import { useContext } from "react"
import { River, RiverStatus } from "@/interfaces/river.interface"

export default function Multisig({ params }: { params: { id: number } }) {
  const router = useRouter()
  const context = useContext(Context)

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  const getProposals = () => {
    let mockdata: Proposal = {
      uid: "0", // riverId-proposalId
      transactionType: ProposalType.transferTezos, // enum
      agreement: "", // ipfs
      dataset: "", //ipfs
      targetAddr: "tz1111", // only transfer
      transferMutez: 1000000, // only transfer
      proposerAddr: "tz1111", // addr
      status: ProposalStatus.proposing, // enum
      createdTime: "2023-09-30 22:25", // timestamp
      expiredTime: "2023-10-30 22:25", // timestamp -> river expiredTime
      approvals: ["tz1111", "tz1211"],
      approvalCount: 2
    }

    return Array.from(Array(10).keys()).map((temp, i) => mockdata)
  }

  const getRiver = () => {
    let mockdata: River = {
      id: 0,
      name: "磺溪",
      agreement: "agreement",
      dataset: "ipfs",
      gen: 2,
      createdTime: "2023-09-30 22:25",
      expiredTime: "2023-10-1 22:25",
      status: RiverStatus.alive,
      stewards: ["tz1123", "tz1123", "tz1123", "tz1123", "tz1123"],
      stewardsCount: 5,
      currentTokenId: 0,
      currentTokenContract: "KT11111",
      events: [],
      walletAddr: "KT1111",
      proposals: []
    }
    return mockdata
  }

  const river = getRiver()
  const proposals = getProposals()

  const createProposal = () => {}

  return (
    <>
      <Dropdown type="rivernav" onChange={navigate} currRoute={"multisig"} />
      <main className="border p-3 text-left">
        <div className="border px-4 py-2">
          <div className="text-xs font-bold">Wallet address: {river.walletAddr}</div>
        </div>
        <div>
          <div className="my-4 text-lg font-bold">Member List (threshold: 1/3)</div>
          <div className="max-h-[120px] overflow-scroll border px-4 py-2">
            {river.stewards.map((address, i) => (
              <div className="text-xs" key={i}>
                {address}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="my-4 text-lg font-bold">Proposals</div>
          <div className="">
            {proposals.map((proposal, i) => (
              <Proposal key={i} proposal={proposal} />
            ))}
          </div>
        </div>
        <div className="m-6 text-center">
          <Button onClick={createProposal}>Create proposal</Button>
        </div>
      </main>
    </>
  )
}
