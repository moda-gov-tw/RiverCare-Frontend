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
  status: number
  ownersCount: number
  expiredTime: string
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="mx-auto p-4 text-left">
        <div>Created Time: {createdTime}</div>
        <div>Generation: {gen}</div>
        <div>Status: {status}</div>
      </div>
      <div className="mx-auto p-4">
        <div>{ownersCount}</div>
        <div>{expiredTime}</div>
      </div>
    </div>
  )
}
export default RiverInfo
