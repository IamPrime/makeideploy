import React from 'react'
import Time from '../helpers/time'
import Share from './share'

interface IWidget {
  now: Time
  reason: string
  deploy: boolean
  onNewReason: () => void
}

import { I18nContext } from '../pages/_app'

const Widget = (props: IWidget) => {
  const { t } = React.useContext(I18nContext)

  React.useEffect(() => {
    const onSpacePress = (event: KeyboardEvent) => {
      if (event.key !== ' ' || event.repeat) return
      if (event.altKey || event.ctrlKey || event.metaKey) return
      // Space on a focused control belongs to that control: it opens a
      // select, presses a button (the reload button handles its own click),
      // or follows a link. Only a page-level Space asks for a new reason.
      const target = event.target as HTMLElement | null
      if (
        target &&
        target.closest('button, select, input, textarea, a, [contenteditable="true"]')
      ) {
        return
      }
      event.preventDefault()
      props.onNewReason()
    }
    document.addEventListener('keydown', onSpacePress)
    return () => {
      document.removeEventListener('keydown', onSpacePress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onNewReason])

  return (
    <div className="item">
      <div className="question">
        <h1 className="tagline" suppressHydrationWarning>
          {t('tagline')}
        </h1>
        <p
          className={`verdict ${props.deploy ? 'verdict-yes' : 'verdict-no'}`}
          suppressHydrationWarning
        >
          {t(props.deploy ? 'verdict_yes' : 'verdict_no')}
        </p>
      </div>
      <h2 id="text" className="reason" aria-live="polite">
        {props.reason}
      </h2>
      <div className="actions">
        <button
          type="button"
          id="reload"
          onClick={props.onNewReason}
          suppressHydrationWarning
        >
          <span className="hint-pointer">
            {t('press')}{' '}
            <span className="space-btn" suppressHydrationWarning>{t('space')}</span> {t('or')}{' '}
            {t('click')}
          </span>
          <span className="hint-touch">{t('tap_hint')}</span>
        </button>
      </div>
      <Share
        verdict={t(props.deploy ? 'verdict_yes' : 'verdict_no')}
        reason={props.reason}
        timezone={props.now.timezone}
      />
    </div>
  )
}

export default Widget