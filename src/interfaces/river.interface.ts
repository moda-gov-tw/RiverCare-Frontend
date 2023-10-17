import { Event } from "./event.interface"
import { Proposal } from "./proposal.interface"

export enum RiverStatus {
  dead = "Dead",
  alive = "Alive"
}
export declare interface River {
  id: number
  name: string
  agreement: string
  dataset: string
  gen: number
  createdTime: string
  expiredTime: string
  status: RiverStatus
  stewards: string[]
  stewardsCount: number
  currentTokenId: number
  currentTokenContract: string
  events: Event[]
  walletAddr: string
  proposals: Proposal[]
}
