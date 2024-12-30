import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyCalendar from './components/Calendar'

window.initMyCalendar = (props: { companyId: string, errorMessage?: string }) => {
  const container = document.getElementById('calendar-container');

  createRoot(container!).render(
    <StrictMode>
      <MyCalendar companyId={props.companyId} />
    </StrictMode>,
  )
};
