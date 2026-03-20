import React from 'react'
import Timezone from './timezone'
import { I18nContext } from '../pages/_app'

interface IFooter {
  changeTimezone: (timezone: string) => void
  timezone: string
}

const Footer = (props: IFooter) => {
  const { t, locale, setLocale } = React.useContext(I18nContext)

  const [theme, setTheme] = React.useState<string>('light')
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Load theme from localStorage after hydration
    try {
      const storedTheme = localStorage.getItem('theme') || 'light'
      setTheme(storedTheme)
    } catch (e) {
      setTheme('light')
    }
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme])

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value)
  }

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <ul className="footer-list" suppressHydrationWarning>
        <span className="footer-label">{t('share')}</span>{' '}
        <li>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmakeideploy.today%2F&t=Make%20I%20Deploy%20Today%3F"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fmakeideploy.today%2F&text=Make%20I%20Deploy%20Today%3F:%20https%3A%2F%2Fmakeideploy.today"
            target="_blank"
            rel="noopener noreferrer"
            title="Tweet"
          >
            Twitter
          </a>
        </li>
        <li>
          <span className="footer-label">{t('source')}:</span>{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/IamPrime/makeideploy"
          >
            Github
          </a>
        </li>
        <li>
          <span className="footer-label">{t('timezone_label')}:</span>{' '}
          <Timezone onChange={props.changeTimezone} timezone={props.timezone} />
        </li>
        <li
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          suppressHydrationWarning
        >
          <span className="footer-label">
            {isMounted ? (theme === 'dark' ? t('dark') : t('light')) : t('light')}:
          </span>{' '}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={t('toggle_theme')}
          >
            {isMounted ? (theme === 'dark' ? '🌙' : '🌞') : '🌞'}
          </button>
        </li>
        <li suppressHydrationWarning>
          <label className="footer-label" style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }}>
            {t('lang_label')}:
          </label>
          <select
            value={locale}
            onChange={handleLocaleChange}
            aria-label={t('lang_label')}
          >
            <option value="pcm">PCM</option>
            <option value="sw">SW</option>
            <option value="yo">YO</option>
            <option value="ig">IG</option>
            <option value="ha">HA</option>
            <option value="zu">ZU</option>
            <option value="am">AM</option>
          </select>
        </li>
      </ul>
      <ul className="footer-list footer-api">
        <li>
          <a href={`/api?tz=${props.timezone}&lng=${locale}`}>API</a>
        </li>
        <li>
          <a href={`/api/slack?tz=${props.timezone}&lng=${locale}`}>Slack API</a>
        </li>
      </ul>
    </>
  )
}

export default Footer
