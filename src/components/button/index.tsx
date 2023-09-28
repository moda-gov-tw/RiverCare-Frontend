"use client"

import Link from "next/link"
import { ReactNode } from "react"
import styles from "./styles.module.scss"

const Button = ({
  href,
  onClick,
  disabled = false,
  customClass = "",
  outline = true,
  textColor = "white",
  bgColor = "action",
  children
}: {
  href?: string
  onClick?: any
  disabled?: boolean
  customClass?: string
  outline?: boolean
  textColor?: string
  bgColor?: string
  children: ReactNode
}) => {
  let outlineStyle = outline ? "border border-black" : ""
  let textColorStyle: string = textColor !== undefined ? `text-${textColor}` : "text-white"
  let bgColorStyle: string = bgColor !== undefined ? `bg-${bgColor}` : "text-action"

  if (href)
    return (
      <Link
        className={
          styles.button + ` ${outlineStyle} ${textColorStyle} ${bgColorStyle} ${customClass}`
        }
        href={href}
      >
        {children}
      </Link>
    )
  else
    return (
      <button
        className={
          styles.button + ` ${outlineStyle} ${textColorStyle} ${bgColorStyle} ${customClass} `
        }
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
}
export default Button
