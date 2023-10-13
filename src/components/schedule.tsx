import { RiverStatus } from "@/interfaces/river.interface"

const Dot = ({ text, disabled }: { text?: string; disabled?: boolean }) => {
  return (
    <div className="relative">
      <div
        className={`h-[18px] w-[18px] rounded-full ${disabled ? " bg-[#D9D9D9]" : "bg-primary"}`}
      />
      <div
        className={`absolute left-1/2 top-6 -translate-x-1/2 text-xs font-bold ${
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
        className={`relative w-full -translate-y-1/2 border-b border-primary ${
          dashed && "border-dashed"
        } ${disabled && "border-[#D9D9D9]"}`}
      >
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
            : " text-primary"
        } ${disabled && "border-[#D9D9D9] text-[#D9D9D9]"}`}
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

const Schedule = ({ gen, expiredTime }: { gen: number; expiredTime: string }) => {
  const deadline = new Date(expiredTime)

  let dotText = ["Activated", `Gen ${gen} deadline`, "Activate", `Gen ${gen + 1} deadline`]
  let dotDisabled = [false, false, true, true]
  let lineBottomText = ["3M", "", "3M"]
  let lineTopText = [`Gen ${gen}`, "Until activated", `Gen ${gen + 1}`]
  let lineDisabled = [false, false, true]

  if (gen === 0) {
    dotText[0] = "Created"
    lineBottomText[0] = "1M"
  }

  if (deadline > new Date()) {
    lineDisabled = [false, true, true]
    dotDisabled[1] = true
  }
  return (
    <div className="my-10 flex justify-center">
      {lineTopText.map((lineTopText, i) => (
        <>
          <Dot text={dotText[i]} disabled={dotDisabled[i]} />
          <Line
            bottomText={lineBottomText[i]}
            topText={lineTopText}
            disabled={lineDisabled[i]}
            dashed={i === 1}
            currGen={gen}
          />
        </>
      ))}
      <Dot text={dotText[3]} disabled={dotDisabled[3]} />
    </div>
  )
}
export default Schedule
