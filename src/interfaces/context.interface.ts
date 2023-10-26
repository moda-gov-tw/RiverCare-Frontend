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
  /**
   *
   * @param name River's name
   * @param description River's description
   * @param agreementUri River's agreement URI (https/ipfs)
   * @param datasetUri River's dataset URI (https/ipfs)
   * @param metadataUri River's metadata URI (ipfs)
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  createRiver: (
    name: string,
    description: string,
    agreementUri: string,
    datasetUri: string,
    metadataUri: string
  ) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param publicKey user's public key
   * @param signature user's signature after signing the agreement_uri
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  claimStewardship: (contract: string, publicKey: string, signature: string) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  activateRiver: (contract: string) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  reactivateRiver: (contract: string) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param edition event token edition (-1 means unlimited)
   * @param name event name
   * @param description event description
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  createEvent: (
    contract: string,
    edition: number,
    name: string,
    description: string
  ) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param eventId Event ID to claim
   * @param publicKey user's public key
   * @param signature user's signature after signing the agreement_uri
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  claimEvent: (
    contract: string,
    eventId: number,
    publicKey: string,
    signature: string
  ) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param eventId Event ID to sign
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  approveEvent: (contract: string, eventId: number) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param targetAddress Target tezos address to send
   * @param transferAmount Tezos amount to send (the unit is mutez)
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  createTransferTezosProposal: (
    contract: string,
    targetAddress: string,
    transferAmount: number
  ) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param agreementUri New agreement Uri (ipfs/https)
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  createUpdateAgreementProposal: (contract: string, agreementUri: string) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param datasetUri New dataset Uri (ipfs/https)
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  createUpdateDatasetProposal: (contract: string, datasetUri: string) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param proposalId Proposal ID to sign
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  signProposal: (contract: string, proposalId: number) => Promise<boolean>
  /**
   *
   * @param contract River multisig contract address
   * @param proposalId Proposal ID to resolve
   * @returns TRUE means success, FALSE means something wrong, see console log
   */
  resolveProposal: (contract: string, proposalId: number) => Promise<boolean>
}
