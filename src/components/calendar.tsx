import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Event } from "@/types";
import { EventType } from "@/constants";
import MonthNavigation from "./month-navigation";

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fullscreenEventBackgroundColor = {
  [EventType.Appointment]: "bg-pink-100",
  [EventType.Event]: "bg-blue-100"
}

export const Calendar = ({ selectedDate, setSelectedDate, isFullScreen, events }: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  isFullScreen: boolean;
  events: Record<string, Event[]>;
}) => {
  const [visibleMonth, setVisibleMonth] = useState(new Date());

  useEffect(() => {
    setVisibleMonth(selectedDate);
  }, [selectedDate]);

  const onDateClick = (day: number, monthOffset = 0) => {
    if (isFullScreen && monthOffset === 0) {
      window.location.href = '#';
    }
    const newDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + monthOffset, day);

    if (monthOffset !== 0) {
      setVisibleMonth(newDate);
    }
    setSelectedDate(newDate);
  };

  const getVisibleDays = (year: number, month: number) => {
    const currentMonthDate = new Date(year, month, 1);
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = currentMonthDate.getDay();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const previousMonthDays = Array.from(
      { length: firstDayOfWeek },
      (_, i) => daysInPreviousMonth - firstDayOfWeek + i + 1
    );
    const currentMonthDays = Array.from(
      { length: daysInCurrentMonth },
      (_, i) => i + 1
    );
    const remainingDays = 35 - (previousMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

    return { prev: previousMonthDays, current: currentMonthDays, next: nextMonthDays };
  };

  const getEventsForDate = (year: number, month: number, day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[formattedDate] || [];
  };

  const generateVisibleDays = (year: number, month: number) => {
    const { prev, current, next } = getVisibleDays(year, month);

    const generateButtonCell = (day: number, offset: number) => {
      let key = `current-${day}`;
      if (offset === -1) key = `prev-${day}`;
      if (offset === 1) key = `next-${day}`;
      const events = getEventsForDate(year, month + offset, day);
      const isSelected = day === selectedDate.getDate() &&
        visibleMonth.getMonth() === selectedDate.getMonth() &&
        visibleMonth.getFullYear() === selectedDate.getFullYear();
      const offsetMonthDate = new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + offset,
        1
      );

      return (
        <Button
          key={key}
          aria-label={`${day} ${offsetMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}, ${isSelected ? 'selected' : 'not selected'}`}
          role="gridcell"
          variant="ghost"
          className={`h-full w-full p-0 bg-white flex flex-col items-center justify-start overflow-hidden rounded-full border-2
            ${isSelected ? 'border-blue-500' : 'border-transparent'}
            ${events.length > 0 && offset === 0 && 'bg-primary'}
            ${isFullScreen && 'border-gray-300 rounded-none h-32 sm:h-36 md:h-48 w-10 sm:w-20 md:w-28'}
            ${isFullScreen && isSelected && 'border-blue-500'}
            ${offset !== 0 && 'opacity-35'}
          `}
          onClick={() => onDateClick(day, offset)}
        >
          <span className="p-1">{day}</span>
          {isFullScreen && events.length > 0 && offset === 0 && (
            <div className="w-full flex flex-col flex-grow gap-1">
              {events.map(event => (
                <div
                  key={event.id}
                  className={`text-xs p-1 text-start ${fullscreenEventBackgroundColor[event.type]}`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </Button>
      )
    };

    return [
      ...prev.map((day: number) => (
        generateButtonCell(day, -1)
      )),
      ...current.map((day: number) => (
        generateButtonCell(day, 0)
      )),
      ...next.map((day: number) => (
        generateButtonCell(day, 1)
      ))
    ];
  }

  return (
    <div className={isFullScreen ? 'h-full w-auto' : ""}>
      <MonthNavigation visibleMonth={visibleMonth} setVisibleMonth={setVisibleMonth} />
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(day => (
          <div key={day} className={`text-center text-sm font-medium`}>
            {day}
          </div>
        ))}
      </div>
      <div className={`grid grid-cols-7 gap-1 py-2`} role="grid">
        {generateVisibleDays(visibleMonth.getFullYear(), visibleMonth.getMonth())}
      </div>
    </div>
  );
};
