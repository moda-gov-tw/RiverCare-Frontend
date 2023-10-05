"use client"

import styles from "./styles.module.scss"

const Input = ({
  placeholder,
  defaultValue,
  type,
  value,
  onChange,
  customClass
}: {
  placeholder?: string
  defaultValue?: string
  type?: string
  value: string
  onChange?: any
  customClass?: string
}) => {
  if (type === "text-area") {
    return (
      <textarea
        className={`${styles.textarea} ${customClass}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }
  return (
    <input
      className={`${styles.input} ${customClass}`}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
export default Input
