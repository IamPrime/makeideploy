import Time from './time'
import { buildReasons, DayRule } from './reasons'
import { isDefaultWeekend, lastWorkdayOf } from './weekends'
import pcmMessages from '../locales/pcm.json'

const pcmReasons = buildReasons((key) => (pcmMessages as Record<string, string>)[key] || key)

type RequestLike = {
  headers: Record<string, string | string[] | undefined>
}

const firstHeader = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value)?.split(',')[0].trim()

/**
 * Absolute origin for links that leave the page (OG images, Slack icons).
 * No port is hard-coded: an explicit NEXT_PUBLIC_SITE_URL wins, then the
 * address the request actually arrived on (so a dev server on any port,
 * a preview deploy or the custom domain all get their own origin), then
 * Vercel's deployment URL, then localhost on PORT or Next's default 3000.
 */
export function getBaseUrl(req?: RequestLike) {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  const host = firstHeader(req?.headers['x-forwarded-host']) || firstHeader(req?.headers.host)
  if (host) {
    const proto =
      firstHeader(req?.headers['x-forwarded-proto']) ||
      (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https')
    return `${proto}://${host}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

// Today's regional holiday for the selected timezone (see helpers/holidays,
// server side). Kept here so the page can use the type without the engine.
export type Holiday = {
  name: string
  // Public or bank holiday: offices close, so the answer is NO.
  dayOff: boolean
  country: string
}

export const makeIDeploy = function (
  time: Time | null,
  date?: Date,
  holiday?: Holiday | null
) {
  if (!time) {
    return false
  }

  if (holiday?.dayOff) {
    return false
  }

  const currentDate = time.getDate()

  if (date && currentDate.toDateString() !== date.toDateString()) {
    return false
  }

  return (
    // The last work day before the weekend: Friday in most places.
    !time.naLastWorkday() &&
    !time.naWeekend() &&
    !time.naHolidays() &&
    !time.naAfternoon()
  )
}

// The page's stage colours, shared with style.css, the browser theme-color,
// the share image and the API. White text measures 6.49:1 on the green and
// 6.59:1 on the red; the dark-theme stages are deeper so the page dims at
// night without losing the answer.
export const STAGE_COLORS = {
  yes: { light: '#146c3a', dark: '#0e4429' },
  no: { light: '#b4221b', dark: '#7a1712' }
} as const

export const makeIDeployColorTheme = function (
  time: Time | null,
  holiday?: Holiday | null
) {
  return makeIDeploy(time, undefined, holiday)
    ? STAGE_COLORS.yes.light
    : STAGE_COLORS.no.light
}

export const makeIDeployFontTheme = function (_time: Time | null) {
  return '#ffffff'
}

// The page passes no base (a root-relative path is enough for a favicon);
// the Slack response passes the request origin because Slack needs an
// absolute URL.
export const makeIDeployFavIcon = function (
  time: Time | null,
  base = '',
  holiday?: Holiday | null
) {
  return makeIDeploy(time, undefined, holiday) ? `${base}/dots.png` : `${base}/dots-red.png`
}

export const getRandom = function ranDay(list: string | string[]) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Return a list of reasons according of time parameter
 * @param string[]
 */
export function dayHelper(
  time: Time,
  reasons?: ReturnType<typeof buildReasons>,
  holiday?: Holiday | null
) {
  time = time || new Time(time)

  const reasonSet = reasons || pcmReasons

  const byRule: Record<DayRule, string[]> = {
    christmas_eve: reasonSet.REASONS_FOR_DAY_BEFORE_CHRISTMAS,
    holiday: reasonSet.REASONS_FOR_HOLIDAY,
    weekend_eve: reasonSet.REASONS_FOR_WEEKEND_EVE,
    weekend_local: reasonSet.REASONS_FOR_LOCAL_WEEKEND,
    christmas: reasonSet.REASONS_FOR_CHRISTMAS,
    newyear: reasonSet.REASONS_NEW_YEAR,
    birthday_eve: reasonSet.REASONS_FOR_BIRTHDAY_EVE,
    birthday: reasonSet.REASONS_FOR_BIRTHDAY,
    friday22: reasonSet.REASONS_FOR_FRIDAY_22ND,
    friday_afternoon: reasonSet.REASONS_FOR_FRIDAY_AFTERNOON,
    friday: reasonSet.REASONS_TO_NOT_DEPLOY,
    thursday_afternoon: reasonSet.REASONS_FOR_THURSDAY_AFTERNOON,
    weekend: reasonSet.REASONS_FOR_WEEKEND,
    afternoon: reasonSet.REASONS_FOR_AFTERNOON,
    deploy: reasonSet.REASONS_TO_DEPLOY
  }

  return byRule[dayRule(time, holiday)]
}

/**
 * Which rule decides the answer for this moment. Order matters: the first
 * match wins (holidays, then birthdays, then Friday 22nd, and so on).
 */
export function dayRule(time: Time, holiday?: Holiday | null): DayRule {
  if (time.naChristmasEve()) return 'christmas_eve'
  if (time.naChristmas()) return 'christmas'
  if (time.naNewYear()) return 'newyear'
  // A regional day off beats the weekday rules (and the weekend: the
  // holiday is the better reason).
  if (holiday?.dayOff) return 'holiday'
  if (time.naBirthdayEve()) return 'birthday_eve'
  if (time.naBirthday()) return 'birthday'

  const weekend = time.weekend()
  if (lastWorkdayOf(weekend) === 5) {
    // Friday is the last work day (Saturday–Sunday weekends, and Nepal's
    // Saturday): the Friday rules and their Friday-named reasons apply.
    if (time.naFriday22nd()) return 'friday22'
    if (time.naFridayAfternoon()) return 'friday_afternoon'
    if (time.naFriday()) return 'friday'
    if (time.naThursdayAfternoon()) return 'thursday_afternoon'
  } else if (time.naLastWorkday()) {
    // Elsewhere the same caution lands on the local last work day
    // (Thursday in Riyadh, Wednesday in Kabul).
    return 'weekend_eve'
  }
  if (time.naWeekend()) return isDefaultWeekend(weekend) ? 'weekend' : 'weekend_local'
  if (time.naAfternoon()) return 'afternoon'
  return 'deploy'
}
