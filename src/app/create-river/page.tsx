"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import Success from "@/components/success"
import UploadFile from "@/components/upload-file"
import { Context } from "@/context"
import { uploadToIpfs, uploadToIpfsWithMetadata } from "@/utils/ipfs"
import { Language } from "@/utils/language"
import { useState, useContext } from "react"
import Loading from "./loading"

export default function CreateRiver({ params }: { params: { id: number } }) {
  const lang = Language()
  const { address, createRiver } = useContext(Context)

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [agreement, setAgreement] = useState<string>("")
  const [dataset, setDataset] = useState<string>("")
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const create = async () => {
    setShowOverlay(true)

    let agreementUri = await uploadToIpfs(agreement)
    let datasetUri = await uploadToIpfs(dataset)
    let metadataUri = await uploadToIpfsWithMetadata(name, description)

    if (!agreementUri || !datasetUri || !metadataUri) {
      alert(lang.alert)
      setShowOverlay(false)
      return
    }
    createRiver(name, description, agreementUri, datasetUri, metadataUri)
      .then((res) => {
        setShowOverlay(false)
        if (res) setIsSuccess(true)
      })
      .catch(() => {
        alert(lang.alert)
        setShowOverlay(false)
      })
  }

  const validated = () => {
    if (!description || !agreement || !dataset) return false
    if (!address || !address?.startsWith("tz")) return false
    return true
  }

  return (
    <main className="border bg-white p-6 font-monda xl:p-10">
      {!isSuccess ? (
        <>
          {/* name */}
          <div className="flex flex-col items-start">
            <div className="mr-4">{lang.createRiver.name.label} : </div>
            <Input
              value={name}
              placeholder={lang.createRiver.name.placeholder}
              onChange={setName}
            />
          </div>
          {/* description */}
          <div className="mt-4 flex flex-col items-start ">
            <div>{lang.createRiver.description.label} : </div>
            <Input
              value={description}
              type="text-area"
              placeholder={lang.createRiver.description.placeholder}
              onChange={setDescription}
            />
          </div>
          {/* agreement */}
          <div className="mt-4 flex flex-col items-start ">
            <div>{lang.createRiver.agreement.label} : </div>
            <Input
              value={agreement}
              type="text-area"
              placeholder={lang.createRiver.agreement.placeholder}
              onChange={setAgreement}
            />
          </div>
          {/* dataset JSON */}
          <div className="mt-4 flex flex-col items-start ">
            <div>{lang.createRiver.dataset.label} : </div>
            <div className="py-4">
              <UploadFile onChange={setDataset} />
            </div>
          </div>

          <div className="m-6">
            <Button onClick={create} disabled={!validated()}>
              {lang.createRiver.create}
            </Button>
          </div>
        </>
      ) : (
        <Success
          imgSrc="/images/stewardship-token.png"
          message={lang.createRiver.success}
          buttonLink={`/my-page`}
          buttonText={"Go"}
        />
      )}
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black opacity-50">
          <Loading />
        </div>
      )}
    </main>
  )
}
