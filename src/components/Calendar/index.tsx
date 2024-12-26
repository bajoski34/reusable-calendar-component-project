import {useEffect, useRef} from 'react';
import type {CalendarProps, DateValue} from 'react-aria-components';
import {Button, Calendar, CalendarCell, CalendarGrid, Heading, Text} from 'react-aria-components';
import classes from './style.module.css';

interface MyCalendarProps<T extends DateValue> extends CalendarProps<T> {
  errorMessage?: string;
}

const getRandomColor = () => {
  // Generate a random hex color
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function MyCalendar<T extends DateValue>(
  { errorMessage, ...props }: MyCalendarProps<T>
) {

  const calendarRef = useRef(null);

  useEffect(function() {
    
    const timeoutId = setTimeout(() => {}, 1000);

    if(calendarRef.current) {
      let htmlElement = calendarRef.current;
      htmlElement.style.setProperty('--highlight-background', getRandomColor());
      htmlElement.style.setProperty('--highlight-foreground', 'black');
    }

    return () => {
      clearTimeout(timeoutId);
    }
    
  },[]);


  return (
    <Calendar {...props} ref={calendarRef}  className={classes['react-aria-Calendar']}>
      <header>
        <Button className={classes['react-aria-Button'] } slot="previous">◀</Button>
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
