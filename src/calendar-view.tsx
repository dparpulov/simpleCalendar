"use client"

import { useEffect, useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import SessionCard from "./components/session-card"
import { events } from "./mock-data"
import { Calendar } from "./components/calendar"
import { Event } from "./types"
import { Button } from "./components/ui/button"

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[] | []>([]);

  useEffect(() => {
    const formattedDate = selectedDate.getFullYear() + "-" +
      String(selectedDate.getMonth() + 1).padStart(2, '0') + "-" +
      String(selectedDate.getDate()).padStart(2, '0');

    setSelectedDayEvents(events[formattedDate] || []);
  }, [selectedDate]);

  return (
    <div className={`flex flex-col min-w-80 bg-background text-foreground h-screen`}>
      <div className={`py-4 ${isFullScreen && 'px-4 h-screen'}`}>
        <div className={`flex justify-end mb-4`}>
          <Button
            aria-label="Go to today"
            variant="ghost"
            className="text-xs mr-2"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </Button>
          <Toggle
            aria-label="Toggle full screen"
            pressed={isFullScreen}
            onPressedChange={setIsFullScreen}
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Toggle>
        </div>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isFullScreen={isFullScreen}
          events={events}
        />
      </div>
      {!isFullScreen && (
        <>
          <div className="border-t border-divider" />
          <Card className="border-none shadow-none">
            <CardHeader className="text-start px-0 pb-2">
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>{selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              {selectedDayEvents.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {selectedDayEvents.map((event) => (
                    <SessionCard key={event.id} {...event} />
                  ))}
                </div>
              ) : (
                <p className="text-start">No events for this date.</p>
              )}
            </CardContent>
          </Card >
        </>
      )}
    </div >
  )
}