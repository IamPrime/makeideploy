import React from 'react'
import type { AppProps } from 'next/app'
import '../style.css'
import { useRouter } from 'next/router'
import pcmMessages from '../locales/pcm.json'

type Messages = Record<string, string>

export const I18nContext = React.createContext<{
  t: (key: string, vars?: Record<string, string>) => string
  locale: string
  setLocale: (l: string) => void
}>({ t: (k) => k, locale: 'en', setLocale: () => {} })

const AFRICAN_LOCALES = ['sw', 'yo', 'ig', 'ha', 'zu', 'am', 'pcm']

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [locale, setLocaleState] = React.useState<string>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('locale') : null
    if (saved) return saved
    const nav = typeof navigator !== 'undefined' ? navigator.language : 'pcm'
    const base = (nav || 'pcm').split('-')[0]
    return AFRICAN_LOCALES.includes(base) ? base : 'pcm'
  })
  const [messages, setMessages] = React.useState<Messages>(pcmMessages || {})

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

  React.useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const mod = await import(`../locales/${locale}.json`)
        if (!cancelled) setMessages(mod.default || mod)
        return
      } catch (e) {}
      try {
        const mod = await import('../locales/pcm.json')
        if (!cancelled) setMessages(mod.default || mod)
        return
      } catch (e) {}
      try {
        const mod = await import('../locales/en.json')
        if (!cancelled) setMessages(mod.default || mod)
        return
      } catch (err) {
        if (!cancelled) setMessages({})
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [locale])

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
