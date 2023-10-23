"use client"

import React, { createContext, useState } from "react"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { NETWORK_TYPE, NODE_URL } from "@/environments/environment"
import { TezosToolkit, MichelsonMap } from "@taquito/taquito"
import { char2Bytes } from "@taquito/utils"
import { AccountInfo, Network, RequestSignPayloadInput, SigningType } from "@airgap/beacon-types"
import { ContextState } from "@/interfaces/context.interface"
import { riverFactory } from "./constants"

const TEZOS = new TezosToolkit(NODE_URL)
const WALLET = new BeaconWallet({
  name: "akaswap-event",
  network: { type: NETWORK_TYPE, rpcUrl: NODE_URL },
  featuredWallets: ["temple", "kukai", "metamask", "plenty"]
})
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
    // We check the storage and only do a permission request if we don't have an active account yet
    // This piece of code should be called on startup to "load" the current address from the user
    // If the activeAccount is present, no "permission request" is required again, unless the user "disconnects" first.
    let activeAccount = await wallet.client.getActiveAccount()
    if (activeAccount === undefined) {
      await wallet.clearActiveAccount()
      await wallet
        .requestPermissions()
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

    // const payloadBytes = char2Bytes(input)
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

  const stringToHex = (str: string) => Buffer.from(str, "utf-8").toString("hex")

  //////////////
  // Creation //
  //////////////
  const createRiver = async (
    name: string,
    description: string,
    agreementUri: string,
    datasetUri: string,
    metadataUri: string
  ) => {
    return await TEZOS.wallet
      .at(riverFactory)
      .then(async (c) =>
        c.methodsObject
          .create_multisig({
            name: stringToHex(name),
            description: stringToHex(description),
            agreement_uri: stringToHex(agreementUri),
            dataset_uri: stringToHex(datasetUri),
            contract_metadata: stringToHex(metadataUri)
          })
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }
  /////////////////
  // Activations //
  /////////////////

  const claimStewardship = async (contract: string, publicKey: string, signature: string) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methodsObject
          .claim_gen0_stewardship({
            public_key: publicKey,
            signature: signature
          })
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const activateRiver = async (contract: string) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methods
          .activate()
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const reactivateRiver = async (contract: string) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methods
          .reactivate()
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  ////////////
  // Events //
  ////////////

  const createEvent = async (
    contract: string,
    edition: number,
    name: string,
    description: string
  ) => {
    let editionData: number | null = null
    if (edition > 0) editionData = edition
    const nameData = stringToHex(name)
    const descriptionData = stringToHex(description)

    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methodsObject
          .create_event({
            edition: editionData,
            name: nameData,
            description: descriptionData
          })
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const claimEvent = async (
    contract: string,
    eventId: number,
    publicKey: string,
    signature: string
  ) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methodsObject
          .claim_event({
            public_key: publicKey,
            signature: signature,
            event_id: eventId
          })
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const approveEvent = async (contract: string, eventId: number) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methods
          .approve_event(eventId)
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  ///////////////
  // Proposals //
  ///////////////

  const createTransferTezosProposal = async (
    contract: string,
    targetAddress: string,
    transferAmount: number
  ) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methodsObject
          .create_proposal({
            content: { transfer_tez: { amount: transferAmount, to_: targetAddress } },
            reserve: new MichelsonMap()
          })
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const createUpdateAgreementProposal = async (contract: string, agreementUri: string) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methodsObject
          .create_proposal({
            content: { update_agreement_uri: stringToHex(agreementUri) },
            reserve: new MichelsonMap()
          })
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const createUpdateDatasetProposal = async (contract: string, datasetUri: string) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methodsObject
          .create_proposal({
            content: { update_dataset_uri: stringToHex(datasetUri) },
            reserve: new MichelsonMap()
          })
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const signProposal = async (contract: string, proposalId: number) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methods
          .sign_proposal(proposalId)
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
  }

  const resolveProposal = async (contract: string, proposalId: number) => {
    return await TEZOS.wallet
      .at(contract)
      .then(async (c) =>
        c.methods
          .resolve_proposal(proposalId)
          .send()
          .then(async (op) => {
            console.log("Hash : " + op.opHash)
            return await op.confirmation().then((result) => {
              return result !== undefined && result.completed
            })
          })
      )
      .catch((e) => {
        console.log(e)
        return false
      })
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
        sign,
        createRiver,
        claimStewardship,
        activateRiver,
        reactivateRiver,
        createEvent,
        claimEvent,
        approveEvent,
        createTransferTezosProposal,
        createUpdateAgreementProposal,
        createUpdateDatasetProposal,
        signProposal,
        resolveProposal
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
