"use client"

import { Proposal, ProposalStatus, ProposalType } from "@/interfaces/proposal.interface"
import Button, { ButtonStyle } from "../button"
import { Language } from "@/utils/language"
import { FlipArrow } from "../flip-arrow"
import { useState } from "react"
import Progress from "../progress"
import { approveLowerbound, approveRatioTotal } from "@/constants"
import Link from "next/link"
import { Context } from "@/context"
import { useContext } from "react"
import { showWallet } from "@/utils/string"
import { River } from "@/interfaces/river.interface"

const Proposal = ({
  proposal,
  river,
  onSend,
  onFinish
}: {
  proposal: Proposal
  river: River
  onSend?: any
  onFinish?: any
}) => {
  const lang = Language()
  const { address, signProposal, resolveProposal } = useContext(Context)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  let id = parseInt(proposal.uid)
  let title = lang.proposal.transactionType[proposal.transactionType]
  let status = lang.proposal.status[proposal.status]

  let approvedRatio = proposal.approvalCount / river.stewardsCount

  const [showDetail, setShowDetail] = useState(false)

  const isApproved = () => {
    return approvedRatio >= 1 / approveRatioTotal && proposal.approvalCount >= approveLowerbound
  }

  const sign = () => {
    onSend()
    if (!address || !river.walletAddr) {
      alert(lang.alert)
      onFinish()
      return
    }
    signProposal(river.walletAddr, id)
      .then((res) => {
        onFinish()
        if (res) setIsSuccess(true)
      })
      .catch(() => {
        alert(lang.alert)
        onFinish()
      })
  }

  const resolve = () => {
    onSend()
    if (!address || !river.walletAddr) {
      alert(lang.alert)
      onFinish()
      return
    }
    resolveProposal(river.walletAddr, id)
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
      <div className=" flex flex-col bg-[#DDDDDD] p-2">
        {showDetail && (
          <div>
            <div className="mt-2">
              <div className="font-bold">Content</div>
              <div className="mx-0 flex justify-between gap-2 text-xs">
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
                    <div className="">{showWallet({ wallet: proposal.targetAddr })}</div>
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
            {isApproved() ? (
              <Button style={ButtonStyle.primary} onClick={resolve}>
                Resolve
              </Button>
            ) : (
              <Button style={ButtonStyle.primary} onClick={sign}>
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
