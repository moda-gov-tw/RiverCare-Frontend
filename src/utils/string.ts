export const showWallet = ({
  wallet,
  full = false
}: {
  wallet: string | undefined | null
  full?: boolean
}) => {
  try {
    if (wallet === undefined || wallet === null || wallet === "") {
      return ""
    } else if (!full) {
      return `${wallet.slice(0, 5)}...${wallet.slice(wallet.length - 5, wallet.length)}`
    } else return wallet
  } catch (e) {
    return ""
  }
}

export const showDate = (str: string) => {
  const date = new Date(str)
  const result = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  return result
}
