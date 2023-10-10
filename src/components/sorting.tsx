"use client"

import { useState } from "react"
import { FlipArrow } from "./flip-arrow"

export enum SortMethod {
  createdTime = "Created Time",
  name = "Name"
}

const Sorting = ({}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [sort, setSort] = useState(SortMethod.createdTime)

  return (
    <div
      className="mx-auto my-4 flex w-full flex-col font-bold"
      onClick={(e) => setShowMenu(!showMenu)}
    >
      <div className="flex w-full items-center justify-between border px-2 py-1">
        <div>{sort}</div>
        <FlipArrow opened={showMenu} />
      </div>
      <div className={`${!showMenu && "hidden"} flex w-full flex-col bg-gray px-2 py-2 transition`}>
        {Object.values(SortMethod).map((item, i) => (
          <button key={i} className="text-left" onClick={(e) => setSort(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
export default Sorting
