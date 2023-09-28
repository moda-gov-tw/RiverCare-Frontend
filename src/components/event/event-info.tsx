import Button from "../button"

const EventInfo = ({
  id,
  title,
  description,
  createdTime,
  creator,
  edition
}: {
  id: number
  title: string
  description: string
  createdTime: string
  creator: string
  edition: number
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="mx-auto p-4 text-left">
        <div>#{id}</div>
        <div>{title}</div>
        <div>{description}</div>
        <div>Created time: {createdTime}</div>
        <div>created by: {creator}</div>
        <div>Editions: {edition}</div>
      </div>
      <div className="mx-auto p-4">
        <div>Participants</div>
        <div>Approval rate</div>
      </div>
    </div>
  )
}
export default EventInfo
