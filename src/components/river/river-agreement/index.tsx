import Button from "../../button"

const RiverAgreement = ({ agreement }: { agreement: string }) => {
  return (
    <div className="mx-2 my-4 flex flex-col justify-between font-monda">
      <div className="w-full text-center text-2xl font-bold">Agreement</div>
      <div className="my-4 bg-gray p-4">{agreement}</div>
    </div>
  )
}
export default RiverAgreement
