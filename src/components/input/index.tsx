"use client"

import styles from "./styles.module.scss"

const Input = ({
  placeholder,
  defaultValue,
  value
}: {
  placeholder?: string
  defaultValue?: string
  value: string
}) => {
  return (
    <input
      className={styles.input + ""}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
    />
  )
}
export default Input
