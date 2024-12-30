import { useEffect, useRef, useState, Suspense } from "react";
import type { CalendarProps, DateValue } from "react-aria-components";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
  Text,
} from "react-aria-components";
import { useCompanyColor } from "../../hooks/useCompanyColor";
import classes from "./style.module.css";
import {parseDate, today} from '@internationalized/date';

// Constants for default states
const DEFAULT_HIGHLIGHT_BACKGROUND = "none";
const DEFAULT_HIGHLIGHT_FOREGROUND = "white";
const DEFAULT_DATE = today();

// Types for company details
type CompanyDetails = {
  bgColor: string | null;
  name: string;
  id: string;
};

// Extended Calendar props
interface MyCalendarProps<T extends DateValue> extends CalendarProps<T> {
  errorMessage?: string;
  companyId: string;
}

// Reusable component
export default function MyCalendar<T extends DateValue>({
  errorMessage,
  companyId,
  ...props
}: MyCalendarProps<T>) {
  const { bgColor, error: companyError } = useCompanyColor(companyId); // Hook to get company colors
  const calendarRef = useRef<HTMLDivElement>(null);
  const [shouldDisable, setShouldDisable] = useState(false);
  const [currentError, setCurrentError] = useState(errorMessage || "");
  const [value, setValue] = useState(DEFAULT_DATE);

  // Update calendar styles based on company details
  useEffect(() => {
    if (calendarRef.current) {
      const calendarElement = calendarRef.current;

      // Set calendar styles
      calendarElement.style.setProperty(
        "--highlight-background",
        bgColor || DEFAULT_HIGHLIGHT_BACKGROUND
      );
      calendarElement.style.setProperty(
        "--highlight-foreground",
        DEFAULT_HIGHLIGHT_FOREGROUND
      );
    }

    // Update error state and disable status
    if (companyError) {
      setShouldDisable(true);
      setCurrentError(companyError);
    } else {
      setShouldDisable(false);
      setCurrentError(errorMessage || "");
    }
  }, [bgColor, companyError, errorMessage]);

  return (
    <Suspense fallback={<div>...Loading...</div>}>
      <Calendar
        {...props}
        ref={calendarRef}
        className={classes["react-aria-Calendar"]}
        isDisabled={shouldDisable}
        minValue={DEFAULT_DATE}
        value={value} 
        onChange={setValue}
      >
        {/* Header section */}
        <header>
          <Button className={classes["react-aria-Button"]} slot="previous">
            ◀
          </Button>
          <Heading className={classes["react-aria-Heading"]} />
          <Button className={classes["react-aria-Button"]} slot="next">
            ▶
          </Button>
        </header>

        {/* Calendar grid */}
        <CalendarGrid>
          {(date) => (
            <CalendarCell
              className={classes["react-aria-CalendarCell"]}
              date={date}
            />
          )}
        </CalendarGrid>

        {/* Error message */}
        {currentError && (
          <Text slot="errorMessage" className={classes["react-aria-ErrorMessage"]}>
            {currentError}
          </Text>
        )}
      </Calendar>
    </Suspense>
  );
}
