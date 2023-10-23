"use client"

import { Proposal, ProposalStatus, ProposalType } from "@/interfaces/proposal.interface"
import Button, { ButtonStyle } from "../button"
import { Language } from "@/utils/language"
import { FlipArrow } from "../flip-arrow"
import { useState } from "react"
import Progress from "../progress"
import { approveRatioTotal } from "@/constants"
import Link from "next/link"
import { Context } from "@/context"
import { useContext } from "react"

const Proposal = ({ proposal }: { proposal: Proposal }) => {
  const lang = Language()
  const context = useContext(Context)

  let title = lang.proposal.transactionType[proposal.transactionType]
  let status = lang.proposal.status[proposal.status]

  let riverTotal = 10 // temp
  let approvedRatio = proposal.approvalCount / riverTotal

  const [showDetail, setShowDetail] = useState(false)

  const signProposal = () => {}

  const resolveProposal = () => {}

  return (
    <div className="m-0 mb-2 border text-left font-monda">
      <button
        className="flex w-full items-center justify-between border-b p-1 text-sm font-bold"
        onClick={(e) => setShowDetail(!showDetail)}
      >
        <div className="flex w-full justify-between">
          <div>
            <span className="mx-1 font-bold text-[#969696]">#0</span>
            <span className=""> {title} </span>
          </div>
          <div className="rounded border px-2"> {status} </div>
        </div>
        <div className="flex w-[50px] justify-end pr-2">
          <FlipArrow opened={showDetail} />
        </div>
      </button>
      <div className="flex flex-col bg-[#DDDDDD] p-2">
        {showDetail && (
          <div>
            <div className="mt-2">
              <div className="font-bold">Content</div>
              <div className="flex w-full justify-between text-xs">
                <div>
                  <div className="text-[#969696]">Function</div>
                  <div className="">{title}</div>
                </div>
                {proposal.transactionType === ProposalType.transferTezos ? (
                  <div>
                    <div className="text-[#969696]">Amount</div>
                    <div className="">{proposal.transferMutez / 1000000} tez</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-[#969696]">ipfs data</div>
                    <div className="">
                      {proposal.agreement && <Link href={`ipfs/${proposal.agreement}`} />}
                      {proposal.dataset && <Link href={`ipfs/${proposal.dataset}`} />}
                    </div>
                  </div>
                )}
                {proposal.transactionType === ProposalType.transferTezos && (
                  <div>
                    <div className="text-[#969696]">Address</div>
                    <div className="">{proposal.targetAddr}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="font-bold">Approved rate: {approvedRatio * 100}%</div>
              <div className="my-2">
                <Progress value={3} total={100} />
              </div>
            </div>
          </div>
        )}
        {proposal.status === ProposalStatus.proposing && (
          <div className="flex w-full gap-1 p-2">
            {approvedRatio >= 1 / approveRatioTotal ? (
              <Button style={ButtonStyle.primary} onClick={resolveProposal}>
                Resolve
              </Button>
            ) : (
              <Button style={ButtonStyle.primary} onClick={signProposal}>
                Sign
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Proposal
