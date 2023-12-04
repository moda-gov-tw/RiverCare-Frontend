import { ASSETS_URL } from "@/constants"

const serverUrl = `${ASSETS_URL}/api/internal/ipfs/upload`

export const uploadToIpfs = async (data: any) => {
  const metadata = JSON.stringify(data)
  const res = (await uploadDataToServer(metadata))[0]
  return `ipfs://${res.path}`
}

async function uploadDataToServer(data: any) {
  const form = new FormData()
  form.append("file", new Blob([data]), "")
  return fetch(serverUrl, {
    method: "POST",
    body: form
  }).then((response) => response.json())
}

export const uploadToIpfsWithMetadata = (name: string, description: string) => {
  let data = metadata
  data.name = name
  data.description = description
  return uploadToIpfs(data)
}

const metadata = {
  name: "River name",
  description: "River description",
  version: "1.2.1",
  changelog: [
    {
      version: "1.2.1",
      content: ["BUG FIXED: set sp.verify after checking signature"]
    },
    {
      version: "1.2.0",
      content: [
        "Change the type of dataset_uri & agreement_uri from STRING to BYTE",
        "Add a payload generator for checking the specific format of signature"
      ]
    },
    {
      version: "1.1.0",
      content: [
        "Change the prompt_uri to dataset_uri",
        "Reformat the storage in multisig",
        "Add zero_tez verifier in entrypoints",
        "Add description in multisig"
      ]
    }
  ],
  license: "MIT",
  authors: ["NakoOn <twitter: @nako_on>"],
  source: {
    tools: ["SmartPy"],
    location: []
  },
  interfaces: ["TZIP-016"],
  views: [
    {
      name: "get_all_user",
      description: "Return all of the users owning current generation's stewardship token"
    },
    {
      name: "is_alive",
      description: "Return whether the multisig is alive or not"
    }
  ]
}
