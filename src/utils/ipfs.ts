import { assetsUrl } from "@/constants"

const serverUrl = `https://${assetsUrl}/api/internal/ipfs/upload`

export const updateToIpfs = async (data: any) => {
  const metadata = JSON.stringify(data)
  const res = (await uploadDataToServer(metadata))[0]
  return res.path
}

async function uploadDataToServer(data: any) {
  const form = new FormData()
  form.append("file", new Blob([data]), "")
  return fetch(serverUrl, {
    method: "POST",
    body: form
  }).then((response) => response.json())
}
