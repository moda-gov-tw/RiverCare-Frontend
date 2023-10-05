import styles from "./styles.module.scss"

export const Burger = ({
  isNavOpen,
  setIsNavOpen
}: {
  isNavOpen: boolean
  setIsNavOpen: () => {}
}) => {
  return (
    <svg className="h-6 w-6 stroke-black stroke-2" onClick={() => setIsNavOpen()}>
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        className={`${isNavOpen ? styles.burger_top_opened : styles.burger_top}`}
      />
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        className={`${isNavOpen ? styles.burger_middle_opened : ""}`}
      />
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        className={`${isNavOpen ? styles.burger_bottom_opened : styles.burger_bottom}`}
      />
    </svg>
  )
}
