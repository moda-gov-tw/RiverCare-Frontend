"use client"

import Button, { ButtonStyle } from "@/components/button"
import RiverAgreement from "@/components/river/river-agreement"
import RiverInfo from "@/components/river/river-info"
import Schedule from "@/components/schedule"
import { River } from "@/interfaces/river.interface"
import Image from "next/image"
import { useContext, useState } from "react"
import Check from "@/../public/images/check.png"
import { Context } from "@/context"
import Success from "@/components/success"
import Dropdown from "@/components/dropdown"
import { useRouter } from "next/navigation"
import { Language } from "@/utils/language"
import Loading from "./loading"
import { BASE_URL } from "@/constants"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function River({ params }: { params: { id: number } }) {
  let riverData: River | null = null

  const { data } = useSWR(params.id ? `${BASE_URL}/api/rivers/${params.id}` : null, fetcher)
  if (data !== undefined && !data?.error) {
    riverData = data
  }

  const lang = Language()
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [signature, setSignature] = useState("")
  const [joined, setJoined] = useState(false)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  let needActivate: boolean =
    riverData?.expiredTime !== null &&
    riverData?.expiredTime !== undefined &&
    new Date(riverData?.expiredTime) < new Date()

  const { address, claimStewardship, sign, activateRiver, reactivateRiver } = useContext(Context)

  const signAgree = () => {
    setShowOverlay(true)
    if (!address || !riverData) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    sign(riverData.agreement)
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

    if (!address || !publicKey || !signature || !riverData) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    claimStewardship(riverData.walletAddr, publicKey, signature)
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
    setShowOverlay(true)

    if (!address || !riverData) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    if (riverData.gen === 0) {
      activateRiver(riverData.walletAddr)
        .then((res) => {
          setShowOverlay(false)
          if (res) {
            setIsSuccess(true)
          }
        })
        .catch(() => {
          alert(lang.alert)
          setShowOverlay(false)
        })
    } else
      reactivateRiver(riverData.walletAddr)
        .then((res) => {
          setShowOverlay(false)
          if (res) {
            setIsSuccess(true)
          }
        })
        .catch(() => {
          alert(lang.alert)
          setShowOverlay(false)
        })
  }

  const isSteward = (address: string) => {
    return false
  }

  const navigate = (item: { route: string }) => {
    router.push(`/river/${params.id}/${item.route}`)
  }

  return (
    <>
      <div className="MainText mb-6 mt-4 font-monda text-5xl font-bold text-title">
        {riverData?.name}
      </div>
      <Dropdown type="riverNav" onChange={navigate} />
      <main className="border p-4 font-monda">
        {isSuccess ? (
          joined ? (
            <div>
              <Success
                imgSrc="/images/stewardship-token.png"
                message="Successfully received stewardship token!"
              />
            </div>
          ) : (
            <div>
              <Success message="Successfully activated!" />
            </div>
          )
        ) : riverData ? (
          <>
            <Schedule gen={riverData.gen} needActivate={needActivate} />
            <RiverInfo
              createdTime={riverData.createdTime}
              gen={riverData.gen}
              status={riverData.status}
              ownersCount={riverData.stewardsCount}
              expiredTime={riverData.expiredTime}
            />
            <RiverAgreement agreement={riverData.agreement} />
            <div className="flex flex-col">
              {address && (
                <>
                  {needActivate ? (
                    <div className="my-2">
                      <Button onClick={activate}>{lang.joinRiver.activated}</Button>
                    </div>
                  ) : (
                    riverData.gen === 0 &&
                    riverData.stewards &&
                    riverData.stewards.indexOf(address) < 0 && (
                      <>
                        <div className="my-2">
                          <Button style={ButtonStyle.highlight} onClick={signAgree}>
                            <div className="flex text-black">
                              {agreed ? <Image src={Check} alt="" width={24} /> : <span>▢</span>}
                              <span className="ml-4">{lang.joinRiver.agree}</span>
                            </div>
                          </Button>
                        </div>
                        <div className="my-2">
                          <Button onClick={join} disabled={!agreed}>
                            {lang.joinRiver.join}
                          </Button>
                        </div>
                      </>
                    )
                  )}
                </>
              )}
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
