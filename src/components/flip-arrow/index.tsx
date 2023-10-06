import styles from "./styles.module.scss"

export const FlipArrow = ({ opened = false }) => {
  return (
    <div className={`${styles.arrow} ${opened ? styles.active : ""}`}>
      <span className="bg-black" />
      <span className="bg-black" />
    </div>
  )
}
