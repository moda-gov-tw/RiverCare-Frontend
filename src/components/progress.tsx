"use client"
import { Language } from "@/utils/language"
const Progress = ({ value, total }: { value: number; total: number | undefined }) => {
  let rate = total ? (value / total) * 100 : 0
  const lang = Language()
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-6 w-full flex-row items-start border bg-white">
        <div
          style={{ width: `${rate}%` }}
          className={`relative h-full bg-primary transition duration-100 ease-in-out`}
        >
          <div
            className={`absolute font-bold ${
              rate <= 80 ? "-right-4 text-primary" : "right-4 text-white"
            }`}
          >
            {value}
          </div>
        </div>
      </div>
      <div className="ml-0 w-full text-xs text-primary">{lang.createRiver.note}</div>
    </div>
  )
}
export default Progress
