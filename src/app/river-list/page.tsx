"use client"

// import Dropdown from "@/components/dropdown"
import RiverCard from "@/components/river/river-card"
import { BASE_URL } from "@/constants"
import { River } from "@/interfaces/river.interface"
import useSWR from "swr"
import { Language } from "@/utils/language"
import LoadingIcon from "@/components/loading-icon"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function RiverList() {
  const lang = Language()

  let rivers: River | null = null

  const { data } = useSWR(`${BASE_URL}/api/rivers`, fetcher)
  if (data !== undefined && !data?.error) {
    rivers = data.river
  }

  return (
    <main className="">
      <div className=" mb-6 mt-4 font-monda text-5xl font-bold text-title">
        {lang.riverList.title}
      </div>
      {/* <Dropdown type="sorting" onChange={setSortMethod} /> */}
      {data ? (
        Array.isArray(rivers) && rivers?.length > 0 ? (
          rivers.map((river, i) => <RiverCard key={i} river={river} />).reverse() // For descending temporarily
        ) : (
          <div className="font-monda">- No river found -</div>
        )
      ) : (
        <div>
          <LoadingIcon />
        </div>
      )}
    </main>
  )
}
