import React from 'react'
import Time from '../helpers/time'

interface IWidget {
  now: Time
  reason: string
  onNewReason: () => void
}

import { I18nContext } from '../pages/_app'

const Widget = (props: IWidget) => {
  const { t } = React.useContext(I18nContext)

  React.useEffect(() => {
    const onSpacePressOrClick = (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        props.onNewReason()
      }
    }
    document.addEventListener('keydown', onSpacePressOrClick)
    return () => {
      document.removeEventListener('keydown', onSpacePressOrClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onNewReason])

  return (
    <div className="item">
      <h3 className="tagline" suppressHydrationWarning>
        {t('tagline')}
      </h3>
      <h2 id="text" className="reason">
        {props.reason}
      </h2>
      <span id="reload" onClick={props.onNewReason} suppressHydrationWarning>
        {t('press')}{' '}
        <span className="space-btn" suppressHydrationWarning>{t('space')}</span> {t('or')}{' '}
        {t('click')} <span style={{ marginLeft: '0.25rem' }}>👆</span>
      </span>
    </div>
  )
}

export default Widget