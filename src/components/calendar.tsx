import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Event } from "@/types";
import { EventType } from "@/constants";

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

  const daysInVisibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const firstDayOfVisibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay();
  const totalDaysInPrevMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 0).getDate();
  const visibleDaysFromPrevMonth = firstDayOfVisibleMonth;
  const visibleDaysFromNextMonth = 35 - (visibleDaysFromPrevMonth + daysInVisibleMonth);

  useEffect(() => {
    setVisibleMonth(selectedDate);
  }, [selectedDate]);

  const changeMonth = (offset: number) => {
    setVisibleMonth(
      new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + offset, 1)
    );
  };

  const changeYear = (offset: number) => {
    setVisibleMonth(
      new Date(visibleMonth.getFullYear() + offset, visibleMonth.getMonth(), 1)
    );
  };

  const prevYear = () => changeYear(-1);
  const nextYear = () => changeYear(1);
  const prevMonth = () => changeMonth(-1);
  const nextMonth = () => changeMonth(1);

  const onDateClick = (day: number, monthOffset = 0) => {
    const newDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + monthOffset, day);
    if (isFullScreen && monthOffset === 0) {
      window.location.href = '#';
    }

    if (monthOffset !== 0) {
      setVisibleMonth(newDate);
    }
    setSelectedDate(newDate);
  };

  const generateDays = (
    numberOfDays: number,
    offset: number,
    getKey: Function,
    getDayOfMonth: Function
  ) => {
    return Array.from({ length: numberOfDays }).map((_, index) => {
      const day = getDayOfMonth(index);
      return (
        <Button
          key={getKey(day)}
          aria-label={String(day) + ' ' + visibleMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          role="gridcell"
          variant="ghost"
          className={`h-full w-full p-0 opacity-35 bg-white flex flex-col items-center justify-center overflow-hidden rounded-full
            ${isFullScreen && 'border-2 border-gray-300 rounded-none justify-start'}
          `}
          onClick={() => onDateClick(day, offset)}
        >
          <span className="p-1">{day}</span>
        </Button>
      );
    });
  }

  const daysOfPreviousMonth = generateDays(
    visibleDaysFromPrevMonth,
    -1,
    (day: number) => `prev-${day}`,
    (index: number) => totalDaysInPrevMonth - visibleDaysFromPrevMonth + index + 1
  );

  const daysOfNextMonth = generateDays(
    visibleDaysFromNextMonth,
    1,
    (day: number) => `next-${day}`,
    (index: number) => index + 1
  );

  const getEventsForDate = (year: number, month: number, day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[formattedDate] || [];
  };

  const checkIsSelectedDate = (day: number) => {
    return day === selectedDate.getDate() &&
      visibleMonth.getMonth() === selectedDate.getMonth() &&
      visibleMonth.getFullYear() === selectedDate.getFullYear();
  };

  const daysOfCurrentMonth = Array.from({ length: daysInVisibleMonth }).map((_, index) => {
    const day = index + 1;
    const dayEvents = getEventsForDate(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
    const isSelected = checkIsSelectedDate(day);

    return (
      <Button
        key={day + '-' + index}
        role="gridcell"
        aria-label={`${day} ${visibleMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}, ${isSelected ? 'selected' : 'not selected'}`}
        variant="ghost"
        aria-selected={isSelected}
        className={`h-full w-full p-0 bg-white flex flex-col items-center justify-start overflow-hidden rounded-full border-2
          ${isSelected ? 'border-blue-500' : 'border-transparent'}
          ${dayEvents.length > 0 && 'bg-primary'}
          ${isFullScreen && 'border-gray-300 rounded-none h-32 sm:h-36 md:h-48 w-10 sm:w-20 md:w-28'}
          ${isFullScreen && isSelected && 'border-blue-500'}
        `}
        onClick={() => onDateClick(day)}
      >
        <span className="p-2">{day}</span>
        {isFullScreen && dayEvents.length > 0 && (
          <div className="w-full flex flex-col flex-grow gap-1">
            {dayEvents.map(event => (
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
  });

  return (
    <div className={isFullScreen ? 'h-full w-auto' : ""}>
      <div className="flex justify-center items-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={prevYear} aria-label="Previous year">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="font-semibold mx-auto" aria-live="polite">
          {visibleMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={nextMonth} aria-label="Next month">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextYear} aria-label="Next year">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(day => (
          <div key={day} className={`text-center text-sm font-medium`}>
            {day}
          </div>
        ))}
      </div>
      <div className={`grid grid-cols-7 gap-1 py-2`} role="grid">
        {daysOfPreviousMonth}
        {daysOfCurrentMonth}
        {daysOfNextMonth}
      </div>
    </div>
  );
};
