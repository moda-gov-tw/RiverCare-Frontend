"use client"

import { RiverStatus } from "@/interfaces/river.interface"
import Stewardship from "@/../public/images/stewardship.svg"
import refresh from "@/../public/images/refresh.svg"
import Image from "next/image"
import { Language } from "@/utils/language"

const RiverInfo = ({
  createdTime,
  gen,
  status,
  ownersCount,
  expiredTime
}: {
  createdTime: string
  gen: number
  status: RiverStatus
  ownersCount?: number
  expiredTime?: string
}) => {
  const lang = Language()
  let dayLeft = 3
  return (
    <div className="flex flex-col justify-between xl:flex-row">
      <div className="mx-0 p-4 text-left">
        <div className="py-1">
          {lang.riverList.createTime}: {new Date(createdTime).toLocaleString()}
        </div>
        <div className="py-1">
          {lang.riverList.generation}: <span className="font-bold">{gen}</span>
        </div>
        <div className="py-1">
          {lang.riverList.status}: <span className="font-bold">{lang.river.status[status]}</span>
        </div>
      </div>
      {ownersCount !== undefined && expiredTime !== undefined && (
        <div className="mx-0 flex justify-around p-4 pt-0 text-left">
          <div className="my-2 flex items-center text-xl font-bold text-action">
            <Image src={Stewardship} alt="" className="mr-4" width={28} />
            {ownersCount} {lang.riverCard.people}
          </div>
          <div className="relative my-2 flex items-center  text-xl font-bold text-danger">
            <Image src={refresh} alt="" className="mr-4" width={28} />
            {`${lang.riverCard.in} ${dayLeft} ${lang.riverCard.day}`}
            <div className="absolute left-[42px] top-[28px] text-xs">
              {new Date(expiredTime).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default RiverInfo
