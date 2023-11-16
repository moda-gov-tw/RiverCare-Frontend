import Image from "next/image"
import Button from "../button"
import { Event } from "@/interfaces/event.interface"
import Stewardship from "@/../public/images/stewardship.svg"
import Approval from "@/../public/images/approval.svg"
import Progress from "../progress"
import { Language } from "@/utils/language"
import { showDate, showWallet } from "@/utils/string"

const EventInfo = ({
  event,
  stewardsCount
}: {
  event: Event
  stewardsCount: number | undefined
}) => {
  const lang = Language()
  const approvedRatio =
    stewardsCount && event.approvalsCount ? event.approvalsCount / stewardsCount : 0
  return (
    <div className="flex flex-col justify-between font-monda">
      <div className="w-full px-4 py-1 text-left">
        <div className="mb-4 mt-2 text-lg text-[#595959]">{event.description}</div>
        <div className="my-2 font-semibold">
          {lang.eventInfo.createTime}
          {showDate(event.createdTime)}
        </div>
        <div className="my-2 font-semibold">
          {lang.eventInfo.creator}
          {showWallet({ wallet: event.host })}
        </div>
        <div className="my-2 font-semibold">
          {lang.eventInfo.edition}
          {event.editions}
        </div>
      </div>
      <div className="p-4 pt-0 text-left">
        <div className="my-4 flex items-center text-lg text-action">
          <Image src={Stewardship} alt="" className="mr-4" width={28} />
          {lang.eventInfo.participants}{" "}
          <span className="font-bold">&nbsp;{event.participantsCount}</span>
        </div>
        {event.participants.length > 0 && (
          <div className="my-2 max-h-[120px] overflow-y-scroll border p-4 text-xs ">
            {event.participants.map((address, i) => (
              <div key={i}>{address}</div>
            ))}
          </div>
        )}
        <div className="my-4 flex items-center text-lg text-primary">
          <Image src={Approval} alt="" className="mr-4" width={28} />
          {lang.eventInfo.approveRate}{" "}
          <span className="font-bold">&nbsp;{approvedRatio * 100}%</span>
        </div>
        {stewardsCount && <Progress value={event.approvalsCount} total={stewardsCount} />}
      </div>
    </div>
  )
}
export default EventInfo
