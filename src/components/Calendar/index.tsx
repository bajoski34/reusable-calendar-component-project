import { useEffect, useRef, useState, Suspense } from "react";
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
import {today, getLocalTimeZone} from '@internationalized/date';

// Constants for default states
const DEFAULT_HIGHLIGHT_BACKGROUND = "none";
const DEFAULT_HIGHLIGHT_FOREGROUND = "white";
const DEFAULT_DATE = today(getLocalTimeZone());

// Extended Calendar props
interface MyCalendarProps{
  errorMessage?: string;
  companyId: string;
}

// Reusable component
export default function MyCalendar({
  companyId
}: MyCalendarProps) {
  const { bgColor, error: companyError } = useCompanyColor(companyId); // Hook to get company colors
  const calendarRef = useRef<HTMLDivElement>(null);
  const [shouldDisable, setShouldDisable] = useState(false);
  const [currentError, setCurrentError] = useState("");
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
      setCurrentError("");
    }
  }, [bgColor, companyError]);

  return (
    <Suspense fallback={<div>...Loading...</div>}>
      <Calendar
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
            {String.fromCharCode(9664)}
          </Button>
          <Heading className={classes["react-aria-Heading"]} />
          <Button className={classes["react-aria-Button"]} slot="next">
            {String.fromCharCode(9654)}
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
