import Time from './time'
import { buildReasons } from './reasons'
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

export const makeIDeploy = function (time: Time | null, date?: Date) {
  if (!time) {
    return false
  }

  const currentDate = time.getDate()

  if (date && currentDate.toDateString() !== date.toDateString()) {
    return false
  }

  return (
    !time.naFriday() &&
    !time.naWeekend() &&
    !time.naHolidays() &&
    !time.naAfternoon()
  )
}

export const makeIDeployColorTheme = function (time: Time | null) {
  return makeIDeploy(time) ? '#36a64f' : '#ff4136'
}

export const makeIDeployFontTheme = function (time: Time | null) {
  return makeIDeploy(time) ? '#fff' : '#111'
}

// The page passes no base (a root-relative path is enough for a favicon);
// the Slack response passes the request origin because Slack needs an
// absolute URL.
export const makeIDeployFavIcon = function (time: Time | null, base = '') {
  return makeIDeploy(time) ? `${base}/dots.png` : `${base}/dots-red.png`
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
  reasons?: ReturnType<typeof buildReasons>
) {
  time = time || new Time(time)

  const reasonSet = reasons || pcmReasons

  if (time.naChristmasEve()) {
    return reasonSet.REASONS_FOR_DAY_BEFORE_CHRISTMAS
  }

  if (time.naChristmas()) {
    return reasonSet.REASONS_FOR_CHRISTMAS
  }

  if (time.naNewYear()) {
    return reasonSet.REASONS_NEW_YEAR
  }

  if (time.naBirthdayEve()) {
    return reasonSet.REASONS_FOR_BIRTHDAY_EVE
  }

  if (time.naBirthday()) {
    return reasonSet.REASONS_FOR_BIRTHDAY
  }

  if (time.naFriday22nd()) {
    return reasonSet.REASONS_FOR_FRIDAY_22ND
  }

  if (time.naFridayAfternoon()) {
    return reasonSet.REASONS_FOR_FRIDAY_AFTERNOON
  }

  if (time.naFriday()) {
    return reasonSet.REASONS_TO_NOT_DEPLOY
  }

  if (time.naThursdayAfternoon()) {
    return reasonSet.REASONS_FOR_THURSDAY_AFTERNOON
  }

  if (time.naWeekend()) {
    return reasonSet.REASONS_FOR_WEEKEND
  }

  if (time.naAfternoon()) {
    return reasonSet.REASONS_FOR_AFTERNOON
  }

  return reasonSet.REASONS_TO_DEPLOY
}
