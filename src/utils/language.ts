import { useEffect, useState } from "react"
import en from "@/../public/lang/en.json"
import zh from "@/../public/lang/zh.json"

export const LANGUAGE = {
  en: "English",
  zh: "中文"
}

export function setLanguage(value: string) {
  if (typeof window !== "undefined") localStorage.setItem("language", value)
  return value
}

export function getLanguage(): "zh" | "en" {
  let lang: string | null = ""
  if (typeof window !== "undefined") {
    lang = localStorage.getItem("language")
  }
  return lang == "zh" ? "zh" : "en"
}

export const Language = (defaultLang: string = "zh") => {
  const [lang, setLang] = useState(defaultLang)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLang(localStorage.getItem("language") || setLanguage(defaultLang))
    }
  }, [defaultLang])

  return lang == "zh" ? zh : en
}
