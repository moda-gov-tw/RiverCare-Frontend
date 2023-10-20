"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import Success from "@/components/success"
import { Language } from "@/utils/language"
import { useState } from "react"

export default function CreateRiver({ params }: { params: { id: number } }) {
  const lang = Language()

  const [name, setName] = useState<string>("")
  const [agreement, setAgreement] = useState("")
  const [riverId, setRiverId] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const createRiver = () => {
    setIsSuccess(true)
  }

  return (
    <main className="border p-6 xl:p-10">
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
            <div>description : </div>
            <Input
              value={agreement}
              type="text-area"
              placeholder={"please enter the description of the river"}
              onChange={setAgreement}
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

          <div className="m-6">
            <Button onClick={createRiver}>{lang.createRiver.create}</Button>
          </div>
        </>
      ) : (
        <Success
          imgSrc="/images/stewardship-token.png"
          message={lang.createRiver.success}
          buttonLink={`/river/${riverId}`}
          buttonText={"Go"}
        />
      )}
    </main>
  )
}
