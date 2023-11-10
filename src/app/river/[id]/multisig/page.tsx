"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Proposal from "@/components/proposal"
import { ProposalStatus, ProposalType } from "@/interfaces/proposal.interface"
import { Language } from "@/utils/language"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { River, RiverStatus } from "@/interfaces/river.interface"
import Modal from "react-modal"
import UpdateAgreement from "../update-agreement/page"
import UpdateDataset from "../update-dataset/page"
import ProposeTransfer from "../propose-transfer/page"
import Loading from "../loading"
import useSWR from "swr"
import { apiUrl } from "@/constants"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Multisig({ params }: { params: { id: number } }) {
  const router = useRouter()
  const lang = Language()
  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  const getProposals = () => {
    let mockdata: Proposal = {
      uid: "0", // riverId-proposalId
      transactionType: ProposalType.transferTezos, // enum
      agreement: "", // ipfs
      dataset: "", //ipfs
      targetAddr: "tz1YEqTs8H1ffjMzasTWk1LKifsKZ1TdhF4o", // only transfer
      transferMutez: 1000000000, // only transfer
      proposerAddr: "tz1YEqTs8H1ffjMzasTWk1LKifsKZ1TdhF4o", // addr
      status: ProposalStatus.proposing, // enum
      createdTime: "2023-10-30T03:12:52Z", // timestamp
      expiredTime: "2023-11-01 22:25", // timestamp -> river expiredTime
      approvals: [],
      approvalCount: 1
    }

    return Array.from(Array(10).keys()).map((temp, i) => mockdata)
  }

  let river: River | null = null

  const { data } = useSWR(params.id ? `${apiUrl}/rivers/${params.id}` : null, fetcher)
  if (data !== undefined && !data.error) {
    river = data
  }

  const proposals = getProposals()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [proposalType, setProposalType] = useState<ProposalType>()

  const toggleModal = (type?: ProposalType) => {
    setIsModalOpen(!isModalOpen)
    if (type !== undefined) setProposalType(type)
  }

  return (
    <>
      <Dropdown type="riverNav" onChange={navigate} currRoute={"multisig"} />
      <main className="border p-3 text-left">
        {river ? (
          <>
            <div className="border px-4 py-2">
              <div className="text-xs font-bold">
                {lang.multisig.walletAddress}
                {river.walletAddr}
              </div>
            </div>
            {/* Member List */}
            <div>
              <div className="my-4 text-lg font-bold">
                {lang.multisig.memberList}(threshold: 1/3)
              </div>
              <div className="max-h-[120px] overflow-scroll border px-4 py-2">
                {river.stewards &&
                  river.stewards.map((address, i) => (
                    <div className="text-xs" key={i}>
                      {address}
                    </div>
                  ))}
              </div>
            </div>
            {/* Proposal List */}
            <div>
              <div className="my-4 text-lg font-bold">{lang.multisig.proposal}</div>
              <div className="">
                {proposals.map((proposal, i) => (
                  <Proposal
                    key={i}
                    proposal={proposal}
                    river={river}
                    onSend={(e: any) => setShowOverlay(true)}
                    onFinish={(e: any) => setShowOverlay(false)}
                  />
                ))}
              </div>
            </div>
            {/* Create proposal modals */}
            <div className="flex flex-col gap-4 p-2 xl:flex-row">
              <div className="text-center">
                <Button
                  onClick={(e: any) => {
                    toggleModal(ProposalType.transferTezos)
                  }}
                  customClass="w-full"
                >
                  {lang.multisig.transferProposal}
                </Button>
              </div>
              <div className="text-center">
                <Button
                  onClick={(e: any) => {
                    toggleModal(ProposalType.updateAgreement)
                  }}
                  customClass="w-full"
                >
                  {lang.multisig.agreeUpdate}
                </Button>
              </div>
              <div className="text-center">
                <Button
                  onClick={(e: any) => {
                    toggleModal(ProposalType.updateDataset)
                  }}
                  customClass="w-full"
                >
                  {lang.multisig.datasetUpdate}
                </Button>
              </div>
              <Modal
                isOpen={isModalOpen}
                className={
                  "absolute right-1/2 top-1/2 w-full max-w-xl -translate-y-1/2 translate-x-1/2 rounded-xl border bg-white"
                }
                overlayClassName={""}
                ariaHideApp={false}
              >
                <button
                  onClick={(e: any) => toggleModal()}
                  className="w-full pr-6 pt-4 text-right text-black"
                >
                  x
                </button>
                {proposalType === ProposalType.transferTezos && (
                  <ProposeTransfer
                    riverAddress={river.walletAddr}
                    onSend={(e: any) => setShowOverlay(true)}
                    onFinish={(e: any) => setShowOverlay(false)}
                  />
                )}
                {proposalType === ProposalType.updateAgreement && (
                  <UpdateAgreement
                    riverAddress={river.walletAddr}
                    onSend={(e: any) => setShowOverlay(true)}
                    onFinish={(e: any) => setShowOverlay(false)}
                  />
                )}
                {proposalType === ProposalType.updateDataset && (
                  <UpdateDataset
                    riverAddress={river.walletAddr}
                    onSend={(e: any) => setShowOverlay(true)}
                    onFinish={(e: any) => setShowOverlay(false)}
                  />
                )}
              </Modal>
            </div>
          </>
        ) : (
          <div>River not found</div>
        )}

        {/* Overlay */}
        {showOverlay && (
          <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black opacity-50">
            <Loading />
          </div>
        )}
      </main>
    </>
  )
}
