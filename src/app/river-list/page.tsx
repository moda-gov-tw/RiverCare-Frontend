"use client"

import Dropdown from "@/components/dropdown"
import RiverCard from "@/components/river/river-card"
import { River, RiverStatus } from "@/interfaces/river.interface"

export default function RiverList() {
  const getRivers = () => {
    let mockdata: River = {
      id: 0,
      name: "磺溪",
      agreement: "agreement",
      dataset: "ipfs",
      gen: 0,
      createdTime: "2023-09-30 22:25",
      expiredTime: "",
      status: RiverStatus.alive,
      stewards: ["tz1123"],
      stewardsCount: 1,
      currentTokenId: 0,
      currentTokenContract: "KT11111",
      events: [],
      walletAddr: "KT1BUwQFrMvUK2r7fLqaponPEE9eSPozXe2r",
      proposals: []
    }

    return Array.from(Array(10).keys()).map((temp, i) => mockdata)
  }

  const rivers = getRivers()

  const setSortMethod = (item: { route: string }) => {
    console.log(item.route)
  }

  return (
    <main className="">
      <div className="MainText mb-6 mt-4 font-monda text-5xl font-bold text-title">River List</div>
      <Dropdown type="sorting" onChange={setSortMethod} />
      {rivers && rivers.map((river, i) => <RiverCard key={i} river={river} />)}
    </main>
  )
}
