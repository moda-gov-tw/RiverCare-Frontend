import Button, { ButtonStyle } from "../button"

const Proposal = ({}) => {
  return (
    <div className="m-0 border border-gray text-left">
      <div className="flex items-center justify-between border-b p-1">
        <div>
          <span className="">#0</span>
          <span className=""> Proposing </span>
        </div>
        <div> ^ </div>
      </div>
      <div className="bg-gray p-2">
        <Button style={ButtonStyle.danger}>Reject</Button>
        <Button style={ButtonStyle.primary}>Sign</Button>
      </div>
    </div>
  )
}
export default Proposal
