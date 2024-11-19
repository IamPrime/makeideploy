import React, { useMemo } from 'react'
import names from '../helpers/timezones'

// This one na the shape of the props wey we dey expect
interface ITimezone {
  onChange: (value: string) => void
  timezone: string
}

// This na our Timezone component
const Timezone: React.FC<ITimezone> = ({ onChange, timezone }) => {
  // This function dey handle when person change the timezone
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  // We dey use useMemo make our component no dey slow if we get plenty timezones
  const options = useMemo(() => {
    // We dey create option for each timezone name
    return names.map((name) => (
      <option value={name} key={name}>
        {name}
      </option>
    ))
  }, []) // This empty array mean say we go only run this when the component first show

  // This na wetin we dey show for screen
  return (
    <select
      value={timezone}
      onChange={handleChange}
      aria-label="Wetin be your Timezone"
    >
      <option value="">Wetin be your Timezone</option>
      {options}
    </select>
  )
}

// We dey export our Timezone component make other parts of our app fit use am
export default Timezone