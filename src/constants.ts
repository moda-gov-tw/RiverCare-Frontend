import { NetworkType } from "@airgap/beacon-types"

export const NETWORK_TYPE = NetworkType.CUSTOM

// environments
export const NODE_URL = process.env.NEXT_PUBLIC_NODE_URL || "https://ghostnet.tezos.marigold.dev"
export const ASSETS_URL = process.env.NEXT_PUBLIC_ASSETS_URL || "https://testnets.akaswap.com"
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://rivercare-plurality.akaswap.com"
export const RIVER_FACTORY =
  process.env.NEXT_PUBLIC_RIVER_FACTORY || "KT1Lu42Q6iaREyaxLSi1H4rE2DHjw1hh739N"

// These 3 values should be the same as in the River Factory SC
export const GEN_DURATION = 10
export const APPROVAL_RATIO_NUMBER = 1
export const APPROVAL_RATIO_TOTAL = 3
export const APPROVAL_LOWER_BOUND = 1
