// import Dropdown from "@/components/dropdown"
import RiverCard from "@/components/river/river-card"
import { apiUrl } from "@/constants"
import { River, RiverStatus } from "@/interfaces/river.interface"
import { Language } from "@/utils/language"
import { useEffect, useState } from "react"

async function getRivers() {
  const res = await fetch(`${apiUrl}/rivers`)
  if (!res.ok) return
  return res.json()
}

export default async function RiverList() {
  const lang = Language()
  const rivers = (await getRivers()) as River[]

  return (
    <main className="">
      <div className="MainText mb-6 mt-4 font-monda text-5xl font-bold text-title">
        {lang.riverList.title}
      </div>
      {/* <Dropdown type="sorting" onChange={setSortMethod} /> */}
      {rivers && rivers.length > 0 ? (
        rivers.map((river, i) => <RiverCard key={i} river={river} />)
      ) : (
        <div className="font-monda">- No river found -</div>
      )}
    </main>
  )
}
