import { Video, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Event } from "../types"
import { EventType } from "@/constants"


const backgroundColor = {
  [EventType.Appointment]: "bg-pink-100",
  [EventType.Event]: "bg-blue-100"
}

const leftBorderColor = {
  [EventType.Appointment]: "border-l-pink-500",
  [EventType.Event]: "border-l-blue-500"
}

const videoColors = {
  [EventType.Appointment]: "bg-pink-200 text-pink-500",
  [EventType.Event]: "bg-blue-200 text-blue-500"
}

export default function SessionCard(event: Event) {
  return (
    <div className={`rounded-lg p-4 ${backgroundColor[event.type]} border border-l-8
      ${leftBorderColor[event.type]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold mb-2 text-left">{event.title}</h3>
          <p className="text-sm opacity-80">
            {event.startTime} - {event.endTime} {event.timeZone}
          </p>
        </div>
        {event.callUrl && (
          <Video className={`w-12 h-12 rounded-full p-2 ${videoColors[event.type]}`} />
        )}
      </div>
      {event.client && (
        <div className="flex items-center mt-3">
          <Avatar className="w-6 h-6 mr-2">
            {event.client && (
              <AvatarImage src={event.client.avatar} />
            )}
            <AvatarFallback className="w-6 h-6"><User className="" /></AvatarFallback>
          </Avatar>
          <a
            href="#"
            className={`text - sm text - black`}
          >
            View Client Profile
          </a>
        </div>
      )}
    </div>
  )
}