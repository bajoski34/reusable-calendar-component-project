import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import MyCalendar from './components/Calendar'
import {parseDate, today} from '@internationalized/date';

function App() {
  const [value, setValue] = useState(today());

  return (
    <div style={{ display: "flex", gap: "1.5em" }}>
      <MyCalendar defaultValue={today()} companyId={1} />
      <MyCalendar value={value} onChange={setValue} minValue={today()} companyId={1} />
    </div>
  )
}

export default App
