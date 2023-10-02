import Button from "../../button"

const RiverAgreement = ({ agreement }: { agreement: string }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="w-full text-center font-bold">Agreement</div>
      <div className="m-4 bg-gray p-2">{agreement}</div>
    </div>
  )
}
export default RiverAgreement
