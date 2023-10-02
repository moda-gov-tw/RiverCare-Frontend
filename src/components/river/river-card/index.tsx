import Button from "../../button"
import RiverInfo from "../river-info"

const RiverCard = ({ id }: { id: number }) => {
  let createdTime = ""
  let gen = 0
  let status = 0
  let ownersCount = 10
  let expiredTime = "3 days"

  return (
    <div className="mx-auto my-2 border p-4">
      <RiverInfo
        createdTime={createdTime}
        gen={gen}
        status={status}
        ownersCount={ownersCount}
        expiredTime={expiredTime}
      />
      <div className="mt-4">
        <Button bgColor="action" textColor="white" href={`/river/${id}`}>
          View
        </Button>
      </div>
    </div>
  )
}
export default RiverCard
