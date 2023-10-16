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

export default function River({ params }: { params: { id: number } }) {
  let mockdata: River = {
    id: 0,
    name: "磺溪",
    agreement: "agreement",
    prompt: ["", "", "", "", ""],
    gen: 2,
    createdTime: "2023-09-30 22:25",
    expiredTime: "2023-10-1 22:25",
    status: RiverStatus.alive,
    stewards: ["tz1123"],
    stewardsCount: 1,
    currentTokenId: 0,
    currentTokenContract: "KT11111",
    events: [],
    walletAddr: "KT1111",
    proposals: []
  }

  const router = useRouter()
  const [river, setRiver] = useState(mockdata)
  const [agreed, setAgreed] = useState(false)
  const [needActivate, setNeedActivate] = useState(false)
  const [joined, setJoined] = useState(false)

  const { address } = useContext(Context)

  const handleAgree = () => {
    setJoined(true)
  }

  const isSteward = (address: string) => {
    return false
  }

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  return (
    <>
      <Dropdown type="rivernav" onChange={navigate} />
      <main className="border p-4">
        {joined ? (
          <div>
            <Success
              imgSrc="/images/stewardship-token.png"
              message="Successfully received stewardship token!"
            />
            {/* <Image src={StewardshipTokenImg} alt="" /> */}
            <div></div>
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
              {address && river.gen === 0 && !isSteward(address) && (
                <>
                  <div className="my-2">
                    <Button
                      style={ButtonStyle.highlight}
                      onClick={(e: any) => {
                        setAgreed(!agreed)
                      }}
                    >
                      <div className="flex">
                        {agreed && <Image src={Check} alt="" width={24} />}
                        <span className="ml-4">I agree for above</span>
                      </div>
                    </Button>
                  </div>
                  <div className="my-2">
                    <Button onClick={handleAgree} disabled={!agreed}>
                      Join!
                    </Button>
                  </div>
                </>
              )}
              {address && needActivate && (
                <div className="my-2">
                  <Button onClick={handleAgree} disabled={!agreed}>
                    Activate!
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  )
}
