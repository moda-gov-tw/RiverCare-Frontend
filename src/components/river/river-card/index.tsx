import { River } from "@/interfaces/river.interface"
import Button from "../../button"
import RiverInfo from "../river-info"
import Image from "next/image"

const RiverCard = ({ river }: { river: River }) => {
  return (
    <div className="mx-auto my-2 border p-4">
      <Image
        src={`/${river.currentTokenId}`}
        alt={`${river.currentTokenId}`}
        width={100}
        height={100}
      />
      <div className="">{river.name}</div>
      <RiverInfo
        createdTime={river.createdTime}
        gen={river.gen}
        status={river.status}
        // ownersCount={river.stewardsCount}
      />
      <div className="my-2">
        <Button href={`/river/${river.id}`}>View</Button>
      </div>
    </div>
  )
}
export default RiverCard
