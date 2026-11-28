import React from 'react'
import { I18nContext } from '../pages/_app'

interface ChromeModalProps {
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])'

const REPO_URL = 'https://github.com/IamPrime/makeideploy'
const GUIDE_URL = `${REPO_URL}/blob/master/CHROME_INSTALL.md`

// Drops React nodes into a translated sentence at its {placeholders}, so each
// language keeps its own word order around the link or Chrome label.
const fill = (text: string, parts: Record<string, React.ReactNode>) =>
  text.split(/(\{\w+\})/).map((chunk, i) => {
    const key = chunk.match(/^\{(\w+)\}$/)?.[1]
    return <React.Fragment key={i}>{key && key in parts ? parts[key] : chunk}</React.Fragment>
  })

const ChromeModal: React.FC<ChromeModalProps> = ({ onClose }) => {
  const { t } = React.useContext(I18nContext)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    // Remember what opened the dialog so focus can go back there on close.
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      // Keep Tab inside the dialog while it is open.
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus?.()
    }
  }, [onClose])

  const external = { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chrome-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="chrome-modal-title" className="modal-title">
            {t('chrome_title')}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="modal-close"
            aria-label={t('close')}
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="modal-lead">{t('chrome_unavailable')}</p>

        {/* Chrome's own labels stay in English: they're what the visitor
            looks for on the chrome://extensions page. */}
        <ol className="modal-steps">
          {/* One <span> per step: the <li> is a two-column grid (number,
              text), and loose inline pieces would each take a cell. */}
          <li>
            <span>
              {fill(t('chrome_step_1'), {
                link: (
                  <a href={REPO_URL} {...external}>
                    github.com/IamPrime/makeideploy
                  </a>
                )
              })}
            </span>
          </li>
          <li>
            <span>{fill(t('chrome_step_2'), { url: <code>chrome://extensions</code> })}</span>
          </li>
          <li>
            <span>
              {fill(t('chrome_step_3'), {
                devmode: <strong>Developer mode</strong>,
                unpacked: <strong>Load unpacked</strong>
              })}
            </span>
          </li>
        </ol>

        <p className="modal-foot">
          {fill(t('chrome_guide'), {
            guide: (
              <a href={GUIDE_URL} {...external}>
                {t('chrome_guide_link')}
              </a>
            )
          })}
        </p>
      </div>
    </div>
  )
}

export default ChromeModal
