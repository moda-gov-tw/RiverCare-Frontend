import { RiverStatus } from "@/interfaces/river.interface"
import React from "react"
import { Language } from "@/utils/language"
import { GEN_DURATION } from "@/constants"

const Dot = ({ text, disabled }: { text?: string; disabled?: boolean }) => {
  return (
    <div className="relative">
      <div
        className={`h-[18px] w-[18px] rounded-full ${disabled ? " bg-[#D9D9D9]" : "bg-primary"}`}
      />
      <div
        className={`absolute left-1/2 top-6 w-[40px] -translate-x-1/2 text-center text-xs font-bold  ${
          disabled ? " text-[#D9D9D9]" : "text-primary"
        }`}
      >
        {text}
      </div>
    </div>
  )
}
const Line = ({
  bottomText,
  topText,
  currGen,
  dashed = false,
  disabled
}: {
  bottomText?: string
  topText?: string
  currGen: number
  dashed?: boolean
  disabled?: boolean
}) => {
  return (
    <div className="relative flex w-1/4 text-xs">
      <div
        className={`relative w-full -translate-y-1/2 border-b ${dashed && "border-dashed"} ${
          disabled ? " border-[#D9D9D9]" : "border-primary"
        }`}
      >
        {/* arrow */}
        <div
          className={`absolute bottom-0 right-0 w-2 -translate-y-full rotate-45 border ${
            disabled ? " border-[#D9D9D9]" : "border-primary"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-2 translate-y-1 -rotate-45 border ${
            disabled ? " border-[#D9D9D9]" : "border-primary"
          }`}
        ></div>
      </div>
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 ${
          topText?.startsWith("Gen")
            ? currGen === parseInt(topText?.replace("Gen ", ""))
              ? "whitespace-nowrap rounded-lg bg-danger px-2 py-1 text-white"
              : "whitespace-nowrap rounded-lg border border-danger bg-white px-2 py-1 text-danger"
            : disabled
            ? " border-[#D9D9D9] text-[#D9D9D9]"
            : "text-primary"
        }`}
      >
        {topText}
      </div>
      <div
        className={`absolute left-1/2 top-4 -translate-x-1/2 ${
          disabled ? " text-[#D9D9D9]" : "text-action"
        } `}
      >
        {bottomText}
      </div>
    </div>
  )
}

const Schedule = ({ gen, needActivate }: { gen: number; needActivate: boolean }) => {
  const lang = Language()

  let dotText = [
    `${lang.schedule.activated}`,
    `Gen ${gen} ${lang.schedule.deadline}`,
    `${lang.schedule.activate}`,
    `Gen ${gen + 1} ${lang.schedule.deadline}`
  ]
  let dotDisabled = [false, true, true, true]
  let lineBottomText = [
    `${GEN_DURATION}${lang.schedule.days}`,
    "",
    `${GEN_DURATION}${lang.schedule.days}`
  ]
  let lineTopText = [
    `${lang.schedule.gen} ${gen}`,
    `${lang.schedule.until}`,
    `${lang.schedule.gen} ${gen + 1}`
  ]
  let lineDisabled = [false, true, true]

  if (gen === 0) {
    dotText[0] = "Created"
    lineBottomText[0] = "1M"
    dotDisabled[1] = true
    lineDisabled = [false, true, true]
  }

  if (needActivate) {
    lineDisabled = [false, false, true]
    dotDisabled[1] = false
  }
  return (
    <div className="my-10 flex justify-center">
      {lineTopText.map((lineTopText, i) => (
        <React.Fragment key={i}>
          <Dot key={`Dot ${i}`} text={dotText[i]} disabled={dotDisabled[i]} />
          <Line
            key={`Line ${i}`}
            bottomText={lineBottomText[i]}
            topText={lineTopText}
            disabled={lineDisabled[i]}
            dashed={i === 1}
            currGen={gen}
          />
        </React.Fragment>
      ))}
      <Dot text={dotText[3]} disabled={dotDisabled[3]} />
    </div>
  )
}
export default Schedule
