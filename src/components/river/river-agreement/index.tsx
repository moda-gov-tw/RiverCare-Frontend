import Button from "../../button"
import { Language } from "@/utils/language"

const RiverAgreement = ({ agreement }: { agreement: string }) => {
  const lang = Language()

  return (
    <div className="mx-2 my-4 flex flex-col justify-between font-monda">
      <div className="w-full text-center text-2xl font-bold">{lang.riverCard.agreement}</div>
      <div className="my-4 bg-gray p-4">{agreement}</div>
    </div>
  )
}
export default RiverAgreement
