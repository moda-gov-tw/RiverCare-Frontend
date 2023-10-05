"use client"

import React, { createContext, useState } from "react"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { NETWORK_TYPE, NODE_URL } from "@/environments/environment"
import { TezosToolkit } from "@taquito/taquito"
import { char2Bytes } from "@taquito/utils"
import { AccountInfo, Network, RequestSignPayloadInput, SigningType } from "@airgap/beacon-types"
import { ContextState } from "@/interfaces/context.interface"

const TEZOS = new TezosToolkit(NODE_URL)
const WALLET = new BeaconWallet({ name: "akaswap-event" })
TEZOS.setWalletProvider(WALLET)

export const Context = createContext<ContextState>(null!)

export const ContextProvider = (props: any) => {
  const [tezos, setTezos] = useState(TEZOS)
  const [wallet, setWallet] = useState(WALLET)
  const [acc, setAcc] = useState<AccountInfo | undefined>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState("")

  const updateMessage = (message: string) => setMessage(message)

  const setAccount = async () => {
    setAcc(tezos !== undefined ? await wallet.client.getActiveAccount() : undefined)
    setAddress((await wallet.client.getActiveAccount())?.address)
  }

  const syncTaquito = async () => {
    const network: Network = {
      type: NETWORK_TYPE,
      rpcUrl: NODE_URL
    }
    // We check the storage and only do a permission request if we don't have an active account yet
    // This piece of code should be called on startup to "load" the current address from the user
    // If the activeAccount is present, no "permission request" is required again, unless the user "disconnects" first.
    let activeAccount = await wallet.client.getActiveAccount()
    if (activeAccount === undefined) {
      await wallet.clearActiveAccount()
      await wallet
        .requestPermissions({ network })
        .then((response) => {
          console.log(response)
        })
        .catch((e) => console.error(e))
    }
    setTezos(TEZOS)
    setWallet(wallet)
    setAddress(await wallet.getPKH())
    setAcc(await wallet.client.getActiveAccount())
  }

  const disconnect = async () => {
    console.log("disconnect wallet")
    // This will clear the active account and the next "syncTaquito" will trigger a new sync
    await wallet.client.clearActiveAccount()
    setAddress(undefined)
    setAcc(undefined)
  }

  const sign = async (message: string) => {
    const tz = await wallet.client.getActiveAccount()

    const input = message

    const bytes = char2Bytes(input)
    const payloadBytes = "0501" + bytes.length.toString(16).padStart(8, "0") + bytes

    const payload: RequestSignPayloadInput = {
      signingType: SigningType.MICHELINE,
      payload: payloadBytes,
      sourceAddress: tz!.address
    }

    // The signing
    const signedPayload = await wallet.client.requestSignPayload(payload)
    const { signature } = signedPayload

    return {
      message: payload.payload,
      signature,
      publicKey: tz!.publicKey
    }
  }

  return (
    <Context.Provider
      value={{
        tezos,
        wallet,
        acc,
        address,
        message,
        updateMessage,
        setAccount,
        syncTaquito,
        disconnect,
        sign
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
