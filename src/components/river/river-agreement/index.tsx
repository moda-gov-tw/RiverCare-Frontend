import Button from "../../button"

const RiverAgreement = ({ agreement }: { agreement: string }) => {
  return (
    <div className="my-2 flex flex-col justify-between">
      <div className="w-full text-center text-2xl font-bold">Agreement</div>
      <div className="my-4 bg-gray p-2">{agreement}</div>
    </div>
  )
}
export default RiverAgreement
