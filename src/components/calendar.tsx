import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { Event } from "@/types";
import { EventType } from "@/constants";
import MonthNavigation from "./month-navigation";

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fullscreenEventBackgroundColor = {
  [EventType.Appointment]: "bg-pink-100",
  [EventType.Event]: "bg-blue-100"
}

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  isFullScreen: boolean;
  events: Record<string, Event[]>;
}

export const Calendar = ({
  selectedDate,
  setSelectedDate,
  isFullScreen,
  events
}: CalendarProps) => {
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(selectedDate));

  useEffect(() => {
    setVisibleMonth(selectedDate);
  }, [selectedDate]);

  const formatDateKey = useCallback((year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }, []);

  const getEventsForDate = useCallback((year: number, month: number, day: number): Event[] => {
    const dateKey = formatDateKey(year, month, day);
    return events[dateKey] || [];
  }, [events]);

  const onDateClick = useCallback((day: number, monthOffset = 0) => {
    if (isFullScreen && monthOffset === 0) {
      window.location.href = '#';
    }
    const newDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + monthOffset, day);

    if (monthOffset !== 0) {
      setVisibleMonth(newDate);
    }
    setSelectedDate(newDate);
  }, [isFullScreen, visibleMonth, setSelectedDate]);

  const getVisibleDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const prevMonthDays = Array.from(
      { length: firstDay },
      (_, i) => daysInPrevMonth - firstDay + i + 1
    );
    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );
    const nextMonthDays = Array.from(
      { length: 35 - (firstDay + daysInMonth) },
      (_, i) => i + 1
    );

    return { prev: prevMonthDays, current: currentMonthDays, next: nextMonthDays };
  }, [visibleMonth]);

  const CalendarCell = useCallback(({ day, offset }: { day: number; offset: number }) => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth() + offset;
    const events = getEventsForDate(year, month, day);

    const isSelected = day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear();

    const offsetMonthDate = new Date(year, month, 1);

    const baseClasses = "h-full w-full p-0 flex flex-col items-center justify-start overflow-hidden border-2";
    const selectedClasses = isSelected ? 'border-blue-500' : 'border-transparent';
    const fullscreenClasses = isFullScreen ?
      'border-gray-300 rounded-none h-32 sm:h-36 md:h-48 w-10 sm:w-20 md:w-28' :
      'rounded-full';
    const offsetClasses = offset !== 0 && 'opacity-35';
    const eventClasses = events.length > 0 && offset === 0 ? 'bg-primary' : 'bg-white';
    const fullScreenSelectedClasses = isFullScreen && isSelected && 'border-blue-500';

    return (
      <Button
        key={`${offset}-${day}`}
        aria-label={`${day} ${offsetMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}, ${isSelected ? 'selected' : 'not selected'}`}
        role="gridcell"
        variant="ghost"
        className={`${baseClasses} ${selectedClasses} ${fullscreenClasses} ${fullScreenSelectedClasses} ${offsetClasses} ${eventClasses}`}
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
    );
  }, [visibleMonth, selectedDate, isFullScreen, onDateClick, getEventsForDate]);

  return (
    <div className={isFullScreen ? 'h-full w-auto' : undefined}>
      <MonthNavigation visibleMonth={visibleMonth} setVisibleMonth={setVisibleMonth} />
      <div className="grid grid-cols-7 gap-1" role="row">
        {DAYS.map(day => (
          <div role="columnheader" key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 py-2" role="grid" aria-label="Calendar">
        {getVisibleDays.prev.map(day => <CalendarCell key={`prev-${day}`} day={day} offset={-1} />)}
        {getVisibleDays.current.map(day => <CalendarCell key={`current-${day}`} day={day} offset={0} />)}
        {getVisibleDays.next.map(day => <CalendarCell key={`next-${day}`} day={day} offset={1} />)}
      </div>
    </div>
  );
};