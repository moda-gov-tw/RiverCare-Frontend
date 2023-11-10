"use client"

import { assetsUrl } from "@/constants"
import useSWR from "swr"

async function getAgreement(hash: string) {
  const res = await fetch(`${assetsUrl}/ipfs/${hash}`)
  if (!res.ok) return
  return res.json()
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())
import { Language } from "@/utils/language"

const RiverAgreement = ({ agreement }: { agreement: string }) => {
  const lang = Language()

  const hash = agreement.split("ipfs://")[1]
  let strArr = undefined
  const { data } = useSWR(agreement ? `${assetsUrl}/ipfs/${hash}` : null, fetcher)
  if (data !== undefined && !data.error) {
    strArr = data
  }

  return (
    <div className="mx-2 my-4 flex flex-col justify-between font-monda">
      <div className="w-full text-center text-2xl font-bold">{lang.riverCard.agreement}</div>
      <div className="my-4 bg-gray p-4">
        {Array.isArray(strArr) &&
          strArr.map((str: string, i: number) => (
            <div className="" key={i}>
              {str}
            </div>
          ))}
      </div>
    </div>
  )
}
export default RiverAgreement
