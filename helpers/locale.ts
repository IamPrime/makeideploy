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

export function getLocalizedReasons(lng: string) {
  const messages = getMessages(lng)
  return buildReasons((key) => messages[key] || key)
}
