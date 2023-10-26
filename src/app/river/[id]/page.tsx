"use client"

import Button, { ButtonStyle } from "@/components/button"
import RiverAgreement from "@/components/river/river-agreement"
import RiverInfo from "@/components/river/river-info"
import Schedule from "@/components/schedule"
import { River, RiverStatus } from "@/interfaces/river.interface"
import Image from "next/image"
import { useContext, useState } from "react"
import Check from "@/../public/images/check.png"
import StewardshipTokenImg from "@/../public/images/stewardship-token.png"
import { Context } from "@/context"
import Success from "@/components/success"
import Dropdown from "@/components/dropdown"
import { useRouter } from "next/navigation"
import { Language } from "@/utils/language"

export default function River({ params }: { params: { id: number } }) {
  let mockdata: River = {
    id: 0,
    name: "磺溪",
    agreement: "ipfs://QmbxnccENRW6awW1bUmZYGc4v81hEdHZnDz88vRD6Hyawc",
    dataset: "ipfs",
    gen: 0,
    createdTime: "2023-09-30 22:25",
    expiredTime: "2023-10-30 22:25",
    status: RiverStatus.alive,
    stewards: ["tz1123"],
    stewardsCount: 1,
    currentTokenId: 0,
    currentTokenContract: "KT11111",
    events: [],
    walletAddr: "KT1NeZApGbSQicX3672TQAeL21Cg6fQ3Q9fe",
    proposals: []
  }

  const lang = Language()
  const router = useRouter()
  const [river, setRiver] = useState(mockdata)
  const [agreed, setAgreed] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [signature, setSignature] = useState("")
  const [joined, setJoined] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  let needActivate = false

  const { address, claimStewardship, sign } = useContext(Context)

  const signAgree = () => {
    setShowOverlay(true)
    if (!address) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    sign(river.agreement)
      .then((res) => {
        setShowOverlay(false)
        if (res) {
          setPublicKey(res.publicKey)
          setSignature(res.signature)
          setAgreed(!agreed)
        }
      })
      .catch(() => {
        alert(lang.alert)
        setShowOverlay(false)
      })
  }

  const join = () => {
    setShowOverlay(true)

    if (!address || !publicKey || !signature) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    claimStewardship(river.walletAddr, publicKey, signature)
      .then((res) => {
        setShowOverlay(false)
        if (res) {
          setJoined(true)
          setIsSuccess(true)
        }
      })
      .catch(() => {
        alert(lang.alert)
        setShowOverlay(false)
      })
  }

  const activate = () => {
    setJoined(true)
  }

  const isSteward = (address: string) => {
    return false
  }

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  if (river.gen === 0 && new Date(river.expiredTime) < new Date()) needActivate = true

  return (
    <>
      <Dropdown type="riverNav" onChange={navigate} />
      <main className="border p-4 font-monda">
        {joined ? (
          <div>
            <Success
              imgSrc="/images/stewardship-token.png"
              message="Successfully received stewardship token!"
            />
          </div>
        ) : (
          <>
            <Schedule gen={river.gen} expiredTime={river.expiredTime} />
            <RiverInfo
              createdTime={river.createdTime}
              gen={river.gen}
              status={river.status}
              ownersCount={river.stewardsCount}
              expiredTime={river.expiredTime}
            />
            <RiverAgreement agreement={river.agreement} />
            <div className="flex flex-col">
              {address && (
                <>
                  {needActivate ? (
                    <div className="my-2">
                      <Button onClick={activate}>Activate!</Button>
                    </div>
                  ) : (
                    river.gen === 0 && (
                      <>
                        <div className="my-2">
                          <Button
                            style={ButtonStyle.highlight}
                            onClick={(e: any) => {
                              signAgree()
                            }}
                          >
                            <div className="flex">
                              {agreed && <Image src={Check} alt="" width={24} />}
                              <span className="ml-4 text-black">I agree for above</span>
                            </div>
                          </Button>
                        </div>
                        <div className="my-2">
                          <Button onClick={join} disabled={!agreed}>
                            Join!
                          </Button>
                        </div>
                      </>
                    )
                  )}
                </>
              )}
            </div>
          </>
        )}
      </main>
    </>
  )
}
