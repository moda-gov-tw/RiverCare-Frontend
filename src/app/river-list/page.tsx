"use client"

// import Dropdown from "@/components/dropdown"
import RiverCard from "@/components/river/river-card"
import { apiUrl } from "@/constants"
import { River } from "@/interfaces/river.interface"
import useSWR from "swr"
import { Language } from "@/utils/language"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function RiverList() {
  const lang = Language()

  let rivers: River | null = null

  const { data } = useSWR(`${apiUrl}/rivers/`, fetcher)
  if (data !== undefined && !data.error) {
    rivers = data
  }

  return (
    <main className="">
      <div className="MainText mb-6 mt-4 font-monda text-5xl font-bold text-title">
        {lang.riverList.title}
      </div>
      {/* <Dropdown type="sorting" onChange={setSortMethod} /> */}
      {Array.isArray(rivers) && rivers?.length > 0 ? (
        rivers.map((river, i) => <RiverCard key={i} river={river} />)
      ) : (
        <div className="font-monda">- No river found -</div>
      )}
    </main>
  )
}
