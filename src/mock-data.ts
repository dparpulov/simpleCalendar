import { EventType } from "./constants"
import { Event } from "./types"

export const events: Record<string, Event[]> = {
  "2024-10-24": [
    {
      id: 1,
      type: EventType.Appointment,
      title: "Team Meeting",
      description: "Discuss project progress and next steps",
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      timeZone: "CET+1",
      callUrl: "#",
    },
    {
      id: 2,
      type: EventType.Event,
      title: "Lunch with Client",
      description: "Discuss project progress and next steps",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      timeZone: "CET+1",
      client: {
        url: "#",
        avatar: "https://randomuser.me/api/portraits/lego/6.jpg"
      },
    },
    {
      id: 3,
      type: EventType.Event,
      title: "Lunch with Client",
      description: "Discuss project progress and next steps",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      timeZone: "CET+1",
      callUrl: "#",
      client: {
        url: "#",
        avatar: "https://randomuser.me/api/portraits/lego/6.jpg"
      },
    },
    {
      id: 4,
      type: EventType.Event,
      title: "Lunch with Client",
      description: "Discuss project progress and next steps",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      timeZone: "CET+1",
      client: {
        url: "#",
        avatar: "https://randomuser.me/api/portraits/lego/6.jpg"
      },
    },
    {
      id: 5,
      type: EventType.Event,
      title: "Lunch with Client",
      description: "Discuss project progress and next steps",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      timeZone: "CET+1",
      callUrl: "#",
      client: {
        url: "#",
        avatar: "https://randomuser.me/api/portraits/lego/6.jpg"
      },
    },
    {
      id: 6,
      type: EventType.Event,
      title: "Lunch with Client",
      description: "Discuss project progress and next steps",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      timeZone: "CET+1",
      callUrl: "#",
      client: {
        url: "#",
        avatar: "https://randomuser.me/api/portraits/lego/6.jpg"
      },
    },
    {
      id: 7,
      type: EventType.Event,
      title: "Lunch with Client",
      description: "Discuss project progress and next steps",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      timeZone: "CET+1",
      callUrl: "#",
      client: {
        url: "#",
        avatar: "https://randomuser.me/api/portraits/lego/6.jpg"
      },
    },
    {
      id: 8,
      type: EventType.Event,
      title: "Lunch with Client",
      description: "Discuss project progress and next steps",
      startTime: "12:30 PM",
      endTime: "01:30 PM",
      timeZone: "CET+1",
      callUrl: "#",
      client: {
        url: "#",
        avatar: "https://randomuser.me/api/portraits/lego/6.jpg"
      },
    },
  ],
  "2024-10-25": [
    {
      id: 3,
      type: EventType.Event,
      title: "Project Deadline",
      description: "Discuss project progress and next steps",
      startTime: "09:00 PM",
      endTime: "11:00 PM",
      timeZone: "CET",
      callUrl: "#",
      client: {
        url: "#",
      },
    },
    {
      id: 4,
      type: EventType.Appointment,
      title: "Gym Session",
      description: "Discuss project progress and next steps",
      startTime: "06:00 PM",
      endTime: "07:00 PM",
      timeZone: "CET",
      callUrl: "#",
    },
  ],
  "2024-10-26": [
    {
      id: 5,
      type: EventType.Appointment,
      title: "Doctor's Appointment",
      description: "Discuss project progress and next steps",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      timeZone: "CET",
    },
  ],
  "2024-11-26": [
    {
      id: 5,
      type: EventType.Appointment,
      title: "Doctor's Appointment",
      description: "Discuss project progress and next steps",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      timeZone: "CET",
      callUrl: "#",
    },
  ],
  "2024-11-01": [
    {
      id: 5,
      type: EventType.Appointment,
      title: "Doctor's Appointment",
      description: "Discuss project progress and next steps",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      timeZone: "CET",
      callUrl: "#",
    },
  ],
}