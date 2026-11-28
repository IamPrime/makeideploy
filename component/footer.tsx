import React from 'react'
import Timezone from './timezone'
import ChromeModal from './chromeModal'
import { I18nContext } from '../pages/_app'

interface IFooter {
  changeTimezone: (timezone: string) => void
  timezone: string
}

const Footer = (props: IFooter) => {
  const { t, locale, setLocale } = React.useContext(I18nContext)

  const [theme, setTheme] = React.useState<string>('light')
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  const [showChromeModal, setShowChromeModal] = React.useState<boolean>(false)

  // Becomes true once the visitor toggles the theme; until then the page
  // follows the system setting and nothing is saved.
  const [chosen, setChosen] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Same rule as the pre-paint script in _document: the saved choice,
    // else the system setting.
    let initial = 'light'
    try {
      const stored = localStorage.getItem('theme')
      if (stored) {
        initial = stored
        setChosen(true)
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initial = 'dark'
      }
    } catch (e) {}
    setTheme(initial)
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    // Wait for the initial theme first. Running with the default 'light'
    // would strip the dark class the pre-paint script set and flash.
    if (!isMounted) return
    document.body.classList.toggle('dark', theme === 'dark')
    if (!chosen) return
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme, isMounted, chosen])

  const closeChromeModal = React.useCallback(() => setShowChromeModal(false), [])

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value)
  }

  const toggleTheme = () => {
    setChosen(true)
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      {/* Page settings: what changes the answer or how it reads. */}
      <ul className="footer-list footer-settings" suppressHydrationWarning>
        <li>
          <label className="footer-label" htmlFor="timezone-select">
            {t('timezone_label')}:
          </label>{' '}
          <Timezone
            onChange={props.changeTimezone}
            timezone={props.timezone}
            label={t('timezone_label')}
            otherLabel={t('tz_other')}
          />
        </li>
        <li suppressHydrationWarning>
          <span className="footer-label">{t('dark_label')}:</span>{' '}
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            // The word on the button is the current theme, so the name says
            // "Theme: Dark" rather than also toggling aria-pressed (which
            // read as "Dark, pressed"). The title says what a press does.
            aria-label={`${t('dark_label')}: ${
              isMounted && theme === 'dark' ? t('dark') : t('light')
            }`}
            title={t('toggle_theme')}
          >
            {isMounted ? (theme === 'dark' ? t('dark') : t('light')) : t('light')}
          </button>
        </li>
        <li suppressHydrationWarning>
          <label className="footer-label" htmlFor="language-select">
            {t('lang_label')}:
          </label>{' '}
          <select
            id="language-select"
            className="language-select"
            value={locale}
            onChange={handleLocaleChange}
          >
            {/* Each language in its own name, so a reader can find theirs
                without knowing the code. */}
            <option value="pcm" lang="pcm">Naijá</option>
            <option value="sw" lang="sw">Kiswahili</option>
            <option value="yo" lang="yo">Yorùbá</option>
            <option value="ig" lang="ig">Igbo</option>
            <option value="ha" lang="ha">Hausa</option>
            <option value="zu" lang="zu">isiZulu</option>
            <option value="am" lang="am">አማርኛ</option>
          </select>
        </li>
      </ul>
      {/* Developer links: useful, but not what most visitors came for. */}
      <details className="footer-dev">
        <summary className="footer-label">{t('dev_links')}</summary>
        <ul className="footer-list footer-api">
          <li>
            <span className="footer-label">{t('source')}:</span>{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/IamPrime/makeideploy"
            >
              GitHub
            </a>
          </li>
          <li>
            <span className="footer-label">{t('api_label')}</span>{' '}
            <a href={`/api?tz=${props.timezone}&lng=${locale}`}>REST</a>
            {' | '}
            <a href={`/api/slack?tz=${props.timezone}&lng=${locale}`}>Slack</a>
          </li>
          <li>
            <span className="footer-label">{t('extensions_label')}</span>{' '}
            <button
              type="button"
              className="link-as-button"
              onClick={() => setShowChromeModal(true)}
            >
              Chrome
            </button>
            {' | '}
            <a
              href="https://microsoftedge.microsoft.com/addons/detail/fbblnmmdgndkkgbkhmpjnjandodbgigp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edge
            </a>
          </li>
        </ul>
      </details>
      {showChromeModal && <ChromeModal onClose={closeChromeModal} />}
    </>
  )
}

export default Footer
