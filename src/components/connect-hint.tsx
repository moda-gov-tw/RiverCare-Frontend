"use client"

import { Language } from "@/utils/language"
const ConnectHint = ({}) => {
  const lang = Language()
  return <div className="my-24 font-bold"> {lang.hint}</div>
}
export default ConnectHint
