import React from 'react'
import type { AppProps } from 'next/app'
import '../style.css'
import Router from 'next/router'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/next'
// Naijá is the app's own voice: always in the bundle, the default, and the
// fallback for any string another language is missing.
import pcmMessages from '../locales/pcm.json'

type Messages = Record<string, string>

export const I18nContext = React.createContext<{
  t: (key: string, vars?: Record<string, string>) => string
  locale: string
  setLocale: (l: string) => void
}>({ t: (k) => k, locale: 'pcm', setLocale: () => {} })

// Keep in step with helpers/locale.ts (server side).
const LOCALE_COOKIE = 'lng'

// The other languages are each their own chunk, fetched only when the
// visitor switches to one. A page in one of them arrives with its messages
// already in pageProps.
const loaders: Record<string, () => Promise<{ default: Messages }>> = {
  pcm: async () => ({ default: pcmMessages }),
  sw: () => import('../locales/sw.json'),
  yo: () => import('../locales/yo.json'),
  ig: () => import('../locales/ig.json'),
  ha: () => import('../locales/ha.json'),
  zu: () => import('../locales/zu.json'),
  am: () => import('../locales/am.json')
}

const readCookie = (name: string) =>
  document.cookie
    .split('; ')
    .find((c) => c.startsWith(name + '='))
    ?.slice(name.length + 1)

function App({ Component, pageProps }: AppProps) {
  const serverLocale: string = pageProps.locale || 'pcm'
  const serverMessages: Messages | undefined = pageProps.messages

  const [locale, setLocaleState] = React.useState<string>(serverLocale)
  const [catalog, setCatalog] = React.useState<Record<string, Messages>>(() =>
    serverMessages
      ? { pcm: pcmMessages, [serverLocale]: serverMessages }
      : { pcm: pcmMessages }
  )

  // A server navigation (e.g. a timezone change) resolves the language again;
  // follow it so page and server agree.
  const hasServerLocale = !!pageProps.locale
  React.useEffect(() => {
    if (!hasServerLocale) return
    if (serverMessages) {
      setCatalog((c) => (c[serverLocale] ? c : { ...c, [serverLocale]: serverMessages }))
    }
    setLocaleState(serverLocale)
  }, [hasServerLocale, serverLocale, serverMessages])

  // The newest request wins if the visitor switches twice before a chunk lands.
  const requested = React.useRef(locale)

  const setLocale = React.useCallback(
    (l: string) => {
      if (!loaders[l]) return
      requested.current = l

      // An explicit pick is remembered for later visits (cookie, so the
      // server can render it), and it replaces any ?lng= in the address so
      // the link no longer overrides it.
      document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`
      try {
        localStorage.removeItem('locale')
      } catch (e) {}
      const url = new URL(window.location.href)
      if (url.searchParams.has('lng')) {
        url.searchParams.delete('lng')
        Router.replace(url.pathname + url.search, undefined, { shallow: true })
      }

      if (catalog[l]) {
        setLocaleState(l)
        return
      }
      loaders[l]()
        .then((mod) => {
          setCatalog((c) => ({ ...c, [l]: mod.default }))
          if (requested.current === l) setLocaleState(l)
        })
        .catch(() => {
          // Offline or the chunk failed: stay on the current language; the
          // select snaps back to it, and the next pick tries again.
          if (requested.current === l) requested.current = locale
        })
    },
    [catalog, locale]
  )

  // One-time move from the old storage: a language saved in localStorage
  // before the server could read it becomes the cookie. A ?lng= link still
  // wins for this visit.
  React.useEffect(() => {
    try {
      const legacy = localStorage.getItem('locale')
      const hasQuery = new URL(window.location.href).searchParams.has('lng')
      if (legacy && loaders[legacy] && !readCookie(LOCALE_COOKIE) && !hasQuery) {
        setLocale(legacy)
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The server already set <html lang> (see _document); keep it in step
  // after a switch, for screen readers and the script-aware fonts.
  React.useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const messages = catalog[locale] || pcmMessages

  const t = React.useCallback(
    (key: string, vars?: Record<string, string>) => {
      const raw =
        messages[key] || (pcmMessages as Messages)[key] || key
      if (!vars) return raw
      return Object.keys(vars).reduce(
        (s, k) => s.replace(new RegExp(`{${k}}`, 'g'), vars[k]),
        raw
      )
    },
    [messages]
  )

  return (
    <I18nContext.Provider value={{ t, locale, setLocale }}>
      <Head>
        {/* Next.js expects the viewport tag here, not in _document.
            viewport-fit=cover lets the footer use the safe-area insets. */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </I18nContext.Provider>
  )
}

export default App
