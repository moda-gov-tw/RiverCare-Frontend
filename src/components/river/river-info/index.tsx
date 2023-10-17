import { RiverStatus } from "@/interfaces/river.interface"
import Stewardship from "@/../public/images/stewardship.svg"
import refresh from "@/../public/images/refresh.svg"
import Image from "next/image"

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
  let dayLeft = 3

  return (
    <div className="flex flex-col justify-between xl:flex-row">
      <div className="mx-0 p-4 text-left">
        <div className="py-1">Created Time: {createdTime}</div>
        <div className="py-1">
          Generation: <span className="font-bold">{gen}</span>
        </div>
        <div className="py-1">
          Status: <span className="font-bold">{status}</span>
        </div>
      </div>
      {ownersCount !== undefined && expiredTime !== undefined && (
        <div className="mx-0 flex justify-around p-4 pt-0 text-left">
          <div className="my-2 flex items-center text-xl font-bold text-action">
            <Image src={Stewardship} alt="" className="mr-4" width={28} />
            {ownersCount} people
          </div>
          <div className="relative my-2 flex items-center  text-xl font-bold text-danger">
            <Image src={refresh} alt="" className="mr-4" width={28} />
            in {dayLeft} days
            <div className="absolute left-[42px] top-[28px] text-xs">{expiredTime}</div>
          </div>
        </div>
      )}
    </div>
  )
}
export default RiverInfo
