import Sorting from "@/components/sorting"
import RiverCard from "@/components/river/river-card"
import { River, RiverStatus } from "@/interfaces/river.interface"

const getRivers = async () => {
  let mockdata: River = {
    id: 0,
    name: "磺溪",
    agreement: "agreement",
    prompt: ["", "", "", "", ""],
    gen: 0,
    createdTime: "2023-09-30 22:25",
    expiredTime: "",
    status: RiverStatus.alive,
    stewards: ["tz1123"],
    stewardsCount: 1,
    currentTokenId: 0,
    currentTokenContract: "KT11111",
    events: [],
    walletAddr: "KT1111",
    proposals: []
  }

  return Array.from(Array(10).keys()).map((temp, i) => mockdata)
}

export default async function RiverList() {
  const rivers = await getRivers()

  return (
    <main className="">
      <div className="text-2xl text-title">River List</div>
      <div className="text-lg">RivercareRivercareRivercare</div>
      <Sorting />
      {rivers && rivers.map((river, i) => <RiverCard key={i} river={river} />)}
    </main>
  )
}
