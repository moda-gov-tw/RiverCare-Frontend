export enum ProposalStatus {
  dead,
  proposing,
  approved
}

export enum ProposalType {
  transferTezos,
  updateAgreement,
  updateDataset
}

export declare interface Proposal {
  uid: string // riverId-proposalId
  transactionType: ProposalType
  agreement: string // only updateAgreement
  dataset: string // only updatePrompt
  targetAddr: string // only transfer
  transferMutez: number // only transfer
  proposerAddr: string
  status: ProposalStatus
  createdTime: string
  expiredTime: string
  approvals: string[]
  approvalsCount: number
}
