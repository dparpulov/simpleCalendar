import { EventType } from "./constants"

export type Event = {
  id: number
  type: EventType.Appointment | EventType.Event
  title: string
  description: string
  startTime: string
  endTime: string
  timeZone: string
  callUrl?: string
  client?: {
    url: string
    avatar?: string
  }
}