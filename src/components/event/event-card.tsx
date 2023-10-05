import Button from "../button"
import EventInfo from "./event-info"

const EventCard = ({ id }: { id: number }) => {
  let title = "River"
  let description =
    "sdefgsdfklgjsdklfghjksldcvslergfjklsdfjcvlsjhdkfgkldhswjfgvklhbjnzm,xscdvlakshdjklf"
  let createdTime = ""
  let creator = "sdf"
  let gen = 0
  let edition = 0

  return (
    <div className="mx-auto my-2 border p-4">
      <EventInfo
        id={id}
        title={title}
        description={description}
        createdTime={createdTime}
        creator={creator}
        edition={edition}
      />
      <div className="mt-4">
        <Button>Approve Event</Button>
      </div>
    </div>
  )
}
export default EventCard
