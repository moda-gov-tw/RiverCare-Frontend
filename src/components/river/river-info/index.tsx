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
  expiredTime: string
}) => {
  const lang = Language()
  const createdDatetime = new Date(createdTime)
  const expiredDatetime = new Date(expiredTime)
  const minLeft = Math.round((expiredDatetime.getTime() - new Date().getTime()) / 1000 / 60)
  const dayLeft = Math.round(minLeft / 60 / 24)
  const hourLeft = Math.round(minLeft / 60)

  return (
    <div className="flex flex-col justify-between xl:flex-row">
      <div className="mx-0 p-4 text-left">
        <div className="py-1">
          {lang.riverList.createTime}:{" "}
          {createdDatetime.toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>
        <div className="py-1">
          {lang.riverList.generation}: <span className="font-bold">{gen}</span>
        </div>
        <div className="py-1">
          {lang.riverList.status}: <span className="font-bold">{lang.river.status[status]}</span>
        </div>
      </div>
      {ownersCount !== undefined && expiredDatetime !== undefined && (
        <div className="mx-0 flex justify-around p-4 pt-0 text-left xl:flex-col xl:pr-12">
          <div className="my-2 flex items-center text-xl font-bold text-action">
            <Image src={Stewardship} alt="" className="mr-4" width={28} />
            {ownersCount} {lang.riverCard.people}
          </div>
          <div className="relative my-2 flex items-center  text-xl font-bold text-danger">
            <Image src={refresh} alt="" className="mr-4" width={28} />
            {status === RiverStatus.alive
              ? `${lang.riverCard.in} ${
                  dayLeft >= 1
                    ? dayLeft + " " + lang.riverCard.days
                    : hourLeft >= 1
                    ? hourLeft + " " + lang.riverCard.hours
                    : minLeft + " " + lang.riverCard.mins
                }`
              : lang.riverCard.ended}
            <div className="absolute left-[42px] top-[28px] text-xs">
              {expiredDatetime.toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric"
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default RiverInfo
