import React, { useMemo } from 'react'
import names from '../helpers/timezones'

// This one na the shape of the props wey we dey expect
interface ITimezone {
  onChange: (value: string) => void
  timezone: string
}

// This na our Timezone component
const Timezone: React.FC<ITimezone> = ({ onChange, timezone }) => {
  const options = useMemo(() => {
    return names.map((name) => (
      <option value={name} key={name}>
        {name}
      </option>
    ))
  }, [])

  return (
    <select
      value={timezone}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Wetin be your Timezone"
    >
      <option value="">Wetin be your Timezone</option>
      {options}
    </select>
  )
}

// We dey export our Timezone component make other parts of our app fit use am
export default Timezone