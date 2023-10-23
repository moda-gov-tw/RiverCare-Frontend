"use client"
import { useState } from "react"

const UploadFile = ({ onChange }: { onChange?: any }) => {
  const [filename, setFilename] = useState<string>()

  const readFile = (event: any) => {
    const fileReader = new FileReader()
    const { files } = event.target

    fileReader.readAsText(files[0], "UTF-8")
    fileReader.onload = (e) => {
      const content = e.target?.result?.toString()
      if (content) {
        onChange(JSON.parse(content))
      }
    }
  }

  return (
    <div className="relative my-[20px] flex w-[220px] bg-white text-center hover:cursor-pointer">
      <div className="absolute left-1/2  top-1/2 flex h-[50px] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white hover:cursor-pointer">
        <div className="w-full rounded border border-dashed bg-white px-5 py-6 hover:cursor-pointer">
          {filename !== undefined ? filename : "Upload a json file"}
        </div>
      </div>
      <input
        className="h-[50px] w-full bg-white font-monda opacity-0 hover:cursor-pointer"
        type="file"
        onChange={(e) => {
          readFile(e)
          if (e.target.files !== null) {
            setFilename(e.target.files[0].name)
          }
        }}
        accept="application/JSON"
      />
    </div>
  )
}
export default UploadFile
