import { Context } from "@/context"
import { useContext } from "react"
import Button, { ButtonStyle } from "../button"
import EventInfo from "./event-info"
import { Event } from "@/interfaces/event.interface"
import { Language } from "@/utils/language"

const EventCard = ({
  event,
  stewardsCount,
  showApprove,
  onClick
}: {
  event: Event
  stewardsCount: number | undefined
  showApprove: boolean
  onClick?: any
}) => {
  const lang = Language()

  const eventId = parseInt(event.uid.split("-")[1])

  return (
    <div className="relative mx-auto my-2 border p-4">
      <div className="absolute left-3 top-2 text-2xl text-[#BCBCBC]">#{eventId}</div>
      <div className="mt-4 text-2xl font-bold">{event.name}</div>
      <EventInfo event={event} stewardsCount={stewardsCount} />
      {showApprove && (
        <Button style={ButtonStyle.primary} onClick={onClick}>
          {lang.eventCard.approve}
        </Button>
      )}
      <div className="my-4"></div>
    </div>
  )
}
export default EventCard
