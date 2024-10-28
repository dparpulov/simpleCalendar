import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { Button } from "./ui/button"

export default function MonthNavigation({ visibleMonth, setVisibleMonth }: {
  visibleMonth: Date;
  setVisibleMonth: (date: Date) => void;
}) {
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
  return (
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
  )
}