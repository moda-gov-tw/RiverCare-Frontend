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
    <div className="relative my-[60px] text-center">
      <div className="absolute left-1/2 top-1/2 flex h-[50px] w-[250px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="rounded border border-dashed px-10 py-6">
          {filename !== undefined ? filename : "Choose a json file..."}
        </div>
      </div>
      <input
        className="h-[50px] w-[250px] opacity-0"
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
