import type {CalendarProps, DateValue} from 'react-aria-components';
import {Button, Calendar, CalendarCell, CalendarGrid, Heading, Text} from 'react-aria-components';
import classes from './style.module.css';

interface MyCalendarProps<T extends DateValue> extends CalendarProps<T> {
  errorMessage?: string;
}

export default function MyCalendar<T extends DateValue>(
  { errorMessage, ...props }: MyCalendarProps<T>
) {
  return (
    <Calendar {...props} className={classes['react-aria-Calendar']}>
      <header>
        <Button slot="previous">◀</Button>
        <Heading className={classes['react-aria-Heading']} />
        <Button className={classes['react-aria-Button'] } slot="next">▶</Button>
      </header>
      <CalendarGrid>
        {(date) => <CalendarCell className={classes['react-aria-CalendarCell']} date={date} />}
      </CalendarGrid>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </Calendar>
  );
}
