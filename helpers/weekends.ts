// Weekends that aren't Saturday–Sunday, by timezone. Most of the world rests
// on Saturday and Sunday; these countries don't, so in them Sunday can be a
// work day and the "don't deploy before the weekend" day isn't Friday.
//
// Days use Date.getDay(): 0 Sunday … 6 Saturday. Sources (checked Nov 2026):
// en.wikipedia.org/wiki/Workweek_and_weekend; Iran's 2025 law keeps a
// Thursday–Friday weekend for government offices. Malaysian states with a
// Friday–Saturday weekend share Kuala Lumpur's clock, so they can't be told
// apart and stay on the default.

export const DEFAULT_WEEKEND = [6, 0]

const FRI_SAT = [5, 6]
const THU_FRI = [4, 5]

const WEEKEND_BY_ZONE: Record<string, number[]> = {
  // Friday–Saturday
  'Africa/Algiers': FRI_SAT, // Algeria
  'Asia/Bahrain': FRI_SAT,
  'Asia/Dhaka': FRI_SAT, // Bangladesh
  'Asia/Dacca': FRI_SAT,
  'Africa/Cairo': FRI_SAT, // Egypt
  Egypt: FRI_SAT,
  'Asia/Baghdad': FRI_SAT, // Iraq
  'Asia/Jerusalem': FRI_SAT, // Israel
  'Asia/Tel_Aviv': FRI_SAT,
  Israel: FRI_SAT,
  'Asia/Amman': FRI_SAT, // Jordan
  'Asia/Kuwait': FRI_SAT,
  'Africa/Tripoli': FRI_SAT, // Libya
  Libya: FRI_SAT,
  'Indian/Maldives': FRI_SAT,
  'Asia/Muscat': FRI_SAT, // Oman
  'Asia/Qatar': FRI_SAT,
  'Asia/Riyadh': FRI_SAT, // Saudi Arabia
  'Africa/Khartoum': FRI_SAT, // Sudan
  'Asia/Damascus': FRI_SAT, // Syria
  'Asia/Aden': FRI_SAT, // Yemen
  'Asia/Gaza': FRI_SAT, // Palestine
  'Asia/Hebron': FRI_SAT,
  // Thursday–Friday
  'Asia/Kabul': THU_FRI, // Afghanistan
  'Asia/Tehran': THU_FRI, // Iran
  Iran: THU_FRI,
  // One day
  'Africa/Djibouti': [5], // Friday
  'Asia/Kathmandu': [6], // Nepal: Saturday
  'Asia/Katmandu': [6],
  // Split: Friday and Sunday
  'Asia/Brunei': [5, 0]
}

export function weekendFor(timezone: string): number[] {
  return WEEKEND_BY_ZONE[timezone] ?? DEFAULT_WEEKEND
}

export function isDefaultWeekend(weekend: number[]): boolean {
  return weekend.length === 2 && weekend.includes(6) && weekend.includes(0)
}

/**
 * The last work day before the weekend starts, counting the week from
 * Monday: Friday for Saturday–Sunday (and Nepal's Saturday), Thursday for
 * Friday–Saturday, Wednesday for Thursday–Friday.
 */
export function lastWorkdayOf(weekend: number[]): number {
  for (const day of [1, 2, 3, 4, 5, 6, 0]) {
    if (weekend.includes(day)) return (day + 6) % 7
  }
  return 5
}

// Weekend days in week order from Monday, so Brunei reads "Fri, Sun".
export function weekendInWeekOrder(weekend: number[]): number[] {
  return [1, 2, 3, 4, 5, 6, 0].filter((d) => weekend.includes(d))
}
