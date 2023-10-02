import { AccountInfo } from "@airgap/beacon-types"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { TezosToolkit } from "@taquito/taquito"
export interface ContextState {
  tezos: TezosToolkit
  wallet: BeaconWallet
  acc?: AccountInfo
  address?: string
  message: string
  updateMessage: (message: string) => void
  setAccount: () => Promise<void>
  syncTaquito: () => Promise<void>
  disconnect: () => Promise<void>
  sign: (message: string) => Promise<{ message: string; signature: string; publicKey: string }>
}
