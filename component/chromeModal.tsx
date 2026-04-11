import React from 'react'

interface ChromeModalProps {
  onClose: () => void
}

const ChromeModal: React.FC<ChromeModalProps> = ({ onClose }) => {
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
        role="dialog"
        aria-modal="true"
        style={{
          background: 'var(--bg)',
          maxWidth: '720px',
          width: '90%',
          padding: '1.25rem',
          borderRadius: '8px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
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
        <h3>Install manually from GitHub</h3>
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
          <li>
            Extract the folder (if zipped) and open <code>chrome://extensions</code> in Chrome.
          </li>
          <li>
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
