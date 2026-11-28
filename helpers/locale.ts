import { buildReasons } from './reasons'
import pcmMessages from '../locales/pcm.json'
import swMessages from '../locales/sw.json'
import yoMessages from '../locales/yo.json'
import igMessages from '../locales/ig.json'
import haMessages from '../locales/ha.json'
import zuMessages from '../locales/zu.json'
import amMessages from '../locales/am.json'

type Messages = Record<string, string>

const localeMap: Record<string, Messages> = {
  pcm: pcmMessages,
  sw: swMessages,
  yo: yoMessages,
  ig: igMessages,
  ha: haMessages,
  zu: zuMessages,
  am: amMessages
}

export const SUPPORTED_LOCALES = Object.keys(localeMap)

export function getMessages(lng: string): Messages {
  return localeMap[lng] || pcmMessages
}

export const DEFAULT_LOCALE = 'pcm'
export const LOCALE_COOKIE = 'lng'

const supported = (value: unknown): value is string =>
  typeof value === 'string' && SUPPORTED_LOCALES.includes(value)

type LocaleRequest = {
  query: Record<string, string | string[] | undefined>
  cookies?: Partial<Record<string, string>>
}

/**
 * The page's language, decided on the server so the first paint is already
 * right. Naijá is the default for everyone, whatever their region, browser
 * language or location; there is no English. Another language shows only
 * when someone chooses it: a ?lng= link (for this visit only), else the
 * language the visitor picked from the menu before (cookie).
 */
export function resolveLocale(req: LocaleRequest): string {
  const query = Array.isArray(req.query.lng) ? req.query.lng[0] : req.query.lng
  if (supported(query)) return query
  const cookie = req.cookies?.[LOCALE_COOKIE]
  if (supported(cookie)) return cookie
  return DEFAULT_LOCALE
}

export function getLocalizedReasons(lng: string) {
  const messages = getMessages(lng)
  return buildReasons((key) => messages[key] || key)
}
