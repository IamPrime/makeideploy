import Time from './time'
import { buildReasons } from './reasons'
import pcmMessages from '../locales/pcm.json'

const pcmReasons = buildReasons((key) => (pcmMessages as Record<string, string>)[key] || key)

export function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NODE_ENV === 'production')
    return 'https://makeideploy.today'
  return `http://localhost:${process.env.PORT ?? 3001}`
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

export const makeIDeployFavIcon = function (time: Time | null) {
  return makeIDeploy(time)
    ? `${getBaseUrl()}/dots.png`
    : `${getBaseUrl()}/dots-red.png`
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
