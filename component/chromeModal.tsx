import React from 'react'

interface ChromeModalProps {
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])'

const ChromeModal: React.FC<ChromeModalProps> = ({ onClose }) => {
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

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chrome-modal-title"
        style={{
          background: 'var(--bg)',
          maxWidth: '720px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.25rem',
          borderRadius: '8px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            float: 'right',
            border: 'none',
            background: 'transparent',
            fontSize: '3rem',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
        <h3 id="chrome-modal-title">Install manually from GitHub</h3>
        <hr />
        <p className="modal-text">The Chrome Web Store submission is currently unavailable.</p>

        <ol className='modal-text'>
          <li>
            Download or clone the repository:{' '}
            <a
              href="https://github.com/IamPrime/makeideploy"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/IamPrime/makeideploy
            </a>
          </li>
          <li className='modal-text'>
            Extract the folder (if zipped) and open <span className='highlight'>chrome://extensions</span> in Chrome.
          </li>
          <li className='modal-text'>
            Enable <strong>Developer mode</strong>, click <strong>Load unpacked</strong>, and select the extracted folder.
          </li>
        </ol>

        <p className="modal-text">
          For a guided walkthrough and a downloadable ZIP, see the chrome install guide:{' '}
          <a
            href="https://github.com/IamPrime/makeideploy/blob/main/CHROME_INSTALL.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            CHROME_INSTALL.md
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default ChromeModal
