// Regional holidays: which country a timezone belongs to, and whether today
// is a holiday there. Server only: the rules engine needs moment-timezone
// and lunar maths (for Eid and Mawlid), too heavy to send to browsers. The
// page gets the result as a prop.
//
// Holiday data © date-holidays contributors, CC-BY-SA-4.0
// (https://github.com/commenthol/date-holidays). Regenerate it with
// `node scripts/build-holidays.mjs`.
import data from './holidays-data.json'
import Time from './time'
import type { Holiday } from './constants'

type DataHoliday = {
  date: string
  name: string
  type: 'public' | 'bank' | 'school' | 'optional' | 'observance'
  substitute?: boolean
}

// Loaded with require: the package's own type declarations don't parse
// (`export default namespace`), and an import would make tsc read them.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const parser = require('date-holidays-parser')
const Holidays = parser.default ?? parser

const COUNTRIES = Object.keys(data.holidays)

// Timezone -> country. Built from each country's zone list, then corrected:
// Dar es Salaam and Addis Ababa are aliases of Nairobi time, so the data
// lists Nairobi for Tanzania and Ethiopia too. Each named city maps to its
// own country, and Nairobi stays Kenya's.
const ZONE_COUNTRY: Record<string, string> = {}
for (const country of COUNTRIES) {
  const zones: string[] = (data.holidays as any)[country].zones || []
  for (const zone of zones) ZONE_COUNTRY[zone] ??= country
}
Object.assign(ZONE_COUNTRY, {
  'Africa/Nairobi': 'KE',
  'Africa/Dar_es_Salaam': 'TZ',
  'Africa/Addis_Ababa': 'ET',
  'Europe/Belfast': 'GB',
  GB: 'GB',
  'GB-Eire': 'GB',

  // The US spans many zones. The data lists the 29 main ones; the picker
  // also offers their old alternative names, which must count too.
  'America/Indianapolis': 'US',
  'America/Fort_Wayne': 'US',
  'America/Knox_IN': 'US',
  'America/Louisville': 'US',
  'America/Atka': 'US',
  'America/Shiprock': 'US',
  Navajo: 'US',
  // Territories that keep the US federal holidays (Thanksgiving, Labor Day,
  // ...): Puerto Rico, US Virgin Islands, Guam, Northern Mariana Islands,
  // American Samoa and the minor outlying islands.
  'America/Puerto_Rico': 'US',
  'America/St_Thomas': 'US',
  'America/Virgin': 'US',
  'Pacific/Guam': 'US',
  'Pacific/Saipan': 'US',
  'Pacific/Pago_Pago': 'US',
  'Pacific/Samoa': 'US',
  'Pacific/Midway': 'US',
  'Pacific/Johnston': 'US',
  'Pacific/Wake': 'US'
})

export function countryForZone(timezone: string): string | null {
  if (ZONE_COUNTRY[timezone]) return ZONE_COUNTRY[timezone]
  // Old aliases: US/Eastern, US/Pacific, US/Samoa, ...
  if (timezone.startsWith('US/')) return 'US'
  return null
}

const engines: Record<string, any> = {}
const engine = (country: string) =>
  (engines[country] ??= new Holidays(data, country))

const yearCache: Record<string, DataHoliday[]> = {}

/**
 * Today's holiday in the selected timezone's country, if any. UTC and zones
 * outside the covered countries get none: the worldwide days (Christmas,
 * New Year) are handled by the day rules for everyone.
 *
 * A public or bank holiday is a day off (the answer turns to NO). An
 * observance (Valentine's Day, Halloween, ...) only names the day.
 */
export function holidayFor(time: Time | null, locale: string): Holiday | null {
  if (!time) return null
  const country = countryForZone(time.timezone)
  if (!country) return null

  const today = time.getDate()
  const year = today.getFullYear()
  const ymd = `${year}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`

  // The visitor's language when the country publishes names in it (Kiswahili
  // for Kenya, Amharic for Ethiopia), else the country's own English
  // ("Labor Day" in the US, "Labour Day" elsewhere).
  const hd = engine(country)
  const langs: string[] = hd.getLanguages() || []
  const lang = langs.includes(locale)
    ? locale
    : (langs.find((l) => l === 'en' || l.startsWith('en-')) ?? langs[0])

  const key = `${country}:${year}:${lang}`
  const list = (yearCache[key] ??= hd.getHolidays(year, lang) as DataHoliday[])

  // School holidays don't close offices, so they don't count.
  const todays = list.filter((h) => h.date.startsWith(ymd) && h.type !== 'school')
  if (todays.length === 0) return null

  const isDayOff = (h: DataHoliday) => h.type === 'public' || h.type === 'bank'
  const pick = todays.find(isDayOff) ?? todays[0]
  return {
    name: pick.name.replace(/\s*\(substitute day\)\s*$/i, ''),
    dayOff: isDayOff(pick),
    country
  }
}
