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
