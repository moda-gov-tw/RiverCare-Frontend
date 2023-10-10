import { RiverStatus } from "@/interfaces/river.interface"
import Button from "../../button"

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
  return (
    <div className="flex flex-row justify-between">
      <div className="mx-auto p-4 text-left">
        <div>Created Time: {createdTime}</div>
        <div>
          Generation: <span className="font-bold">{gen}</span>
        </div>
        <div>
          Status: <span className="font-bold">{status}</span>
        </div>
      </div>
      {ownersCount !== undefined && expiredTime !== undefined && (
        <div className="mx-auto p-4">
          <div>{ownersCount}</div>
          <div>{expiredTime}</div>
        </div>
      )}
    </div>
  )
}
export default RiverInfo
