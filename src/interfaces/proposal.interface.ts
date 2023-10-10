export enum ProposalStatus {
  dead = "Dead",
  proposing = "Proposing",
  approved = "Approved"
}

export enum ProposalType {
  transferTezos,
  updateAgreement,
  updatePrompt
}

export declare interface Proposal {
  uid: string // riverId-proposalId
  transactionType: ProposalType
  agreement: string // only updateAgreement
  prompt: string[] // only updatePrompt
  targetAddr: string // only transfer
  transferMutez: number // only transfer
  proposerAddr: string
  status: ProposalStatus
  createdTime: string
  expiredTime: string
  approvals: string[]
  approvalCount: number
}
