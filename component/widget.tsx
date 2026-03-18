import React from 'react'
import { getRandom, dayHelper } from '../helpers/constants'
import Time from '../helpers/time'

interface IWidget {
  now: Time
  reason: string
}

import { I18nContext } from '../pages/_app'

const Widget = (props: IWidget) => {
  const { t } = React.useContext(I18nContext)
  const [reason, setReasons] = React.useState<string>(props.reason)
  const [timezone, setTimezone] = React.useState<Time>()

  React.useEffect(() => {
    if (props.now !== timezone) {
      setTimezone(props.now)
      updateReasons()
    }
    document.addEventListener('keydown', onSpacePressOrClick)
    return () => {
      document.removeEventListener('keydown', onSpacePressOrClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * If person press Space, reload reasons
   * @return void
   */
  const onSpacePressOrClick = (event: { type: string; keyCode?: number }) => {
    if (event.type === 'click' || event?.keyCode == 32) {
      updateReasons()
    }
  }

  /**
   * Collect reasons based on wetin time be now
   * @return string[]
   */
  const getReasons = () => {
    return dayHelper(props.now)
  }

  /**
   * Update and collect random reasons
   * @return void
   */
  const updateReasons = () => {
    let reasons = getReasons()
    setReasons(getRandom(reasons))
  }

  /**
   * Show widget for screen
   * @return JSX.Element
   */
  return (
    <div className="item">
      <h3 className="tagline">{t('tagline')}</h3>
      <h2 id="text" className="reason">
        {reason}
      </h2>
      <span id="reload" onClick={onSpacePressOrClick}>
        {t('press')}{' '}
        <span className="space-btn">{t('space')}</span> {t('or')}{' '}
        {t('click')} <span style={{ marginLeft: '0.25rem' }}>👆</span>
      </span>
    </div>
  )
}

export default Widget