import React, { useMemo } from 'react'
import names from '../helpers/timezones'

interface ITimezone {
  onChange: (value: string) => void
  timezone: string
  label: string
  otherLabel: string
}

// Continents and oceans get their own group, Africa first; everything else
// (UTC offsets, old country aliases like US/Eastern) goes under "Others".
const REGIONS = [
  'Africa',
  'America',
  'Asia',
  'Atlantic',
  'Australia',
  'Europe',
  'Indian',
  'Pacific',
  'Antarctica',
  'Arctic'
]

// Inside a group the region is already said, so "Africa/Dar_es_Salaam"
// reads "Dar es Salaam" and "America/Argentina/Salta" reads "Argentina / Salta".
const cityLabel = (name: string, inRegion: boolean) =>
  (inRegion ? name.split('/').slice(1) : name.split('/'))
    .join(' / ')
    .replace(/_/g, ' ')

const Timezone: React.FC<ITimezone> = ({ onChange, timezone, label, otherLabel }) => {
  const groups = useMemo(() => {
    const byRegion: Record<string, string[]> = {}
    const others: string[] = []
    for (const name of names) {
      if (name === 'UTC') continue
      const region = name.split('/')[0]
      if (name.includes('/') && REGIONS.includes(region)) {
        ;(byRegion[region] ||= []).push(name)
      } else {
        others.push(name)
      }
    }
    return { byRegion, others }
  }, [])

  return (
    <select
      id="timezone-select"
      value={timezone}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
    >
      {/* The default, so it sits on top where it's found first. */}
      <option value="UTC">UTC</option>
      {REGIONS.filter((r) => groups.byRegion[r]).map((region) => (
        <optgroup label={region} key={region}>
          {groups.byRegion[region].map((name) => (
            <option value={name} key={name}>
              {cityLabel(name, true)}
            </option>
          ))}
        </optgroup>
      ))}
      <optgroup label={otherLabel}>
        {groups.others.map((name) => (
          <option value={name} key={name}>
            {cityLabel(name, false)}
          </option>
        ))}
      </optgroup>
    </select>
  )
}

export default Timezone
