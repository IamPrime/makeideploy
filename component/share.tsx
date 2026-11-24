import React from 'react'
import { I18nContext } from '../pages/_app'

interface IShare {
  verdict: string
  reason: string
  timezone: string
}

// A quiet round button pinned to the bottom-right corner. It shares the
// verdict the visitor is looking at, in their language: the native share
// sheet where the browser has one, otherwise the link goes on the clipboard
// with a short visible confirmation.
//
// Icon-only is WCAG-conformant here: the button has a translated accessible
// name (1.1.1, 4.1.2), the icon is drawn in the page's text colour (1.4.11),
// and the target is 48px (2.5.8). The title gives sighted mouse users the
// same name on hover.
const Share = ({ verdict, reason, timezone }: IShare) => {
  const { t, locale } = React.useContext(I18nContext)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2500)
    return () => window.clearTimeout(timer)
  }, [copied])

  const onShare = async () => {
    const url = `${window.location.origin}/?lng=${encodeURIComponent(
      locale
    )}&tz=${encodeURIComponent(timezone)}`
    const text = `${t('tagline')} ${verdict}. ${reason}`

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: t('title'), text, url })
        return
      } catch (error) {
        // The visitor closed the sheet: nothing to do.
        if ((error as DOMException)?.name === 'AbortError') return
        // Any other failure falls through to copying the link.
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      setCopied(true)
    } catch (error) {
      // No clipboard access (insecure context, permissions): open a
      // prefilled post instead so sharing still works.
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  const label = t('share_action')

  return (
    <div className="share-dock">
      {/* Always rendered so screen readers announce the change. */}
      <span
        className={copied ? 'share-toast is-visible' : 'share-toast'}
        role="status"
      >
        {copied ? t('share_copied') : ''}
      </span>
      <button
        type="button"
        className="share-fab"
        onClick={onShare}
        aria-label={label}
        title={label}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      </button>
    </div>
  )
}

export default Share
