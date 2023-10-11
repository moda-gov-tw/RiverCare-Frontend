"use client"

import { useState } from "react"
import { FlipArrow } from "./flip-arrow"
import { Language } from "@/utils/language"

const Dropdown = ({ type }: { type: string }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [option, setOption] = useState<number>(0)

  const lang = Language()
  let options = type === "sorting" ? lang.sortMethod : lang.riverNav

  return (
    <div
      className="mx-auto my-4 flex w-full flex-col font-bold"
      onClick={(e) => setShowMenu(!showMenu)}
    >
      <div className="flex w-full items-center justify-between border px-2 py-1">
        <div>{options[option]}</div>
        <FlipArrow opened={showMenu} />
      </div>
      <div className={`${!showMenu && "hidden"} flex w-full flex-col bg-gray px-2 py-2 transition`}>
        {options.map((item, i) => (
          <button key={i} className="text-left hover:underline" onClick={(e) => setOption(i)}>
            {options[i]}
          </button>
        ))}
      </div>
    </div>
  )
}
export default Dropdown
