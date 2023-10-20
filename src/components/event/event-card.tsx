import { Context } from "@/context"
import { useContext } from "react"
import Button from "../button"
import EventInfo from "./event-info"
import { Event } from "@/interfaces/event.interface"

const EventCard = ({ event, stewardsCount }: { event: Event; stewardsCount: number }) => {
  const { address } = useContext(Context)

  return (
    <div className="relative mx-auto my-2 border p-4">
      <div className="absolute left-3 top-2 text-2xl text-[#BCBCBC]">#{event.tokenId}</div>
      <div className="mt-4 text-2xl font-bold">{event.name}</div>
      <EventInfo event={event} stewardsCount={stewardsCount} />
      {}
      <div className="my-4">
        <Button>Approve Event</Button>
      </div>
    </div>
  )
}
export default EventCard
