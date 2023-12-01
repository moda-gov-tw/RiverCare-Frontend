"use client"

import Button from "@/components/button"
import Dropdown from "@/components/dropdown"
import Proposal from "@/components/proposal"
import { ProposalType } from "@/interfaces/proposal.interface"
import { Language } from "@/utils/language"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { River, RiverStatus } from "@/interfaces/river.interface"
import Modal from "react-modal"
import UpdateAgreement from "../../../../components/proposal/update-agreement/page"
import UpdateDataset from "../../../../components/proposal/update-dataset/page"
import ProposeTransfer from "../../../../components/proposal/propose-transfer/page"
import Loading from "../loading"
import useSWR from "swr"
import { API_URL } from "@/environments/environment"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Multisig({ params }: { params: { id: number } }) {
  const router = useRouter()
  const lang = Language()
  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  let river: River | null = null

  const { data } = useSWR(params.id ? `${API_URL}/rivers/${params.id}` : null, fetcher)
  if (data !== undefined && !data?.error) {
    river = data
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [proposalType, setProposalType] = useState<ProposalType>()

  const toggleModal = (type?: ProposalType) => {
    setIsModalOpen(!isModalOpen)
    if (type !== undefined) setProposalType(type)
  }

  const closeOverlay = () => {
    setShowOverlay(false)
  }

  const openOverlay = () => {
    setShowOverlay(true)
  }

  return (
    <>
      <Dropdown type="riverNav" onChange={navigate} currRoute={"multisig"} />
      <main className="border p-3 text-left">
        {river ? (
          <>
            <div className="border px-4 py-2">
              <div className="text-xs font-bold">
                {lang.multisig.walletAddress}&nbsp;
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
                {river?.proposals
                  ?.map((proposal, i) => (
                    <Proposal
                      key={i}
                      proposal={proposal}
                      river={river}
                      onSend={openOverlay}
                      onFinish={closeOverlay}
                    />
                  ))
                  .reverse()}
              </div>
            </div>
            {/* Create proposal modals */}
            <div className="flex flex-col justify-center gap-4 p-2 xl:flex-row">
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
                    onSend={openOverlay}
                    onFinish={closeOverlay}
                  />
                )}
                {proposalType === ProposalType.updateAgreement && (
                  <UpdateAgreement
                    riverAddress={river.walletAddr}
                    onSend={openOverlay}
                    onFinish={closeOverlay}
                  />
                )}
                {proposalType === ProposalType.updateDataset && (
                  <UpdateDataset
                    riverAddress={river.walletAddr}
                    onSend={openOverlay}
                    onFinish={closeOverlay}
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
