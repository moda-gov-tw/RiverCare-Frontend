"use client"
import { getLanguage, setLanguage, LANGUAGE } from "@/utils/language"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { FlipArrow } from "../flip-arrow"

export const LanguageController = ({ mobile }: { mobile: boolean }) => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currLang, setCurrLang] = useState<string>("")

  function switchLanguage(val: string) {
    setLanguage(val)
    window.location.reload()
  }

  useEffect(() => {
    setCurrLang(LANGUAGE[getLanguage()])
  }, [])

  let mobileStyle = "py-4"
  let desktopStyle = "absolute w-[90px] top-[30px] flex w-full flex-col bg-gray"

  return (
    <div
      className="relative flex flex-col hover:cursor-pointer"
      onClick={() => setIsLangOpen(!isLangOpen)}
    >
      {/* Button */}
      <div className="flex justify-center">
        <button>{currLang}</button>
        <div className="ml-4 flex items-center">
          <FlipArrow opened={isLangOpen} />
        </div>
      </div>
      {/* Language list */}
      {isLangOpen && (
        <div className={mobile ? mobileStyle : desktopStyle}>
          {Object.entries(LANGUAGE).map(([key, value], i) => (
            <button key={i} onClick={() => switchLanguage(key)} className="px-2 py-1">
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
