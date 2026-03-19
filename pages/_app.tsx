import React from 'react'
import type { AppProps } from 'next/app'
import '../style.css'
import { useRouter } from 'next/router'
import pcmMessages from '../locales/pcm.json'
import swMessages from '../locales/sw.json'
import yoMessages from '../locales/yo.json'
import igMessages from '../locales/ig.json'
import haMessages from '../locales/ha.json'
import zuMessages from '../locales/zu.json'
import amMessages from '../locales/am.json'

type Messages = Record<string, string>

export const I18nContext = React.createContext<{
  t: (key: string, vars?: Record<string, string>) => string
  locale: string
  setLocale: (l: string) => void
}>({ t: (k) => k, locale: 'en', setLocale: () => {} })

const AFRICAN_LOCALES = ['sw', 'yo', 'ig', 'ha', 'zu', 'am', 'pcm']

const localeMap: Record<string, Messages> = {
  pcm: pcmMessages,
  sw: swMessages,
  yo: yoMessages,
  ig: igMessages,
  ha: haMessages,
  zu: zuMessages,
  am: amMessages
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [locale, setLocaleState] = React.useState<string>('pcm')

  // After hydration, restore locale from localStorage (can't read it on server)
  React.useEffect(() => {
    const saved = localStorage.getItem('locale')
    if (saved && AFRICAN_LOCALES.includes(saved)) {
      setLocaleState(saved)
      return
    }
    const base = navigator.language.split('-')[0]
    if (AFRICAN_LOCALES.includes(base)) {
      setLocaleState(base)
    }
  }, [])

  React.useEffect(() => {
    const q = (router && router.query && (router.query.lng as string)) || undefined
    if (q && AFRICAN_LOCALES.includes(q)) {
      setLocale(q)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const setLocale = (l: string) => {
    if (!AFRICAN_LOCALES.includes(l)) return
    setLocaleState(l)
    try {
      localStorage.setItem('locale', l)
    } catch (e) {}
  }

  const messages = localeMap[locale] || pcmMessages

  const t = (key: string, vars?: Record<string, string>) => {
    const raw = messages[key] || key
    if (!vars) return raw
    return Object.keys(vars).reduce((s, k) => s.replace(new RegExp(`{${k}}`, 'g'), vars[k]), raw)
  }

  return (
    <I18nContext.Provider value={{ t, locale, setLocale }}>
      <Component {...pageProps} />
    </I18nContext.Provider>
  )
}

export default App
