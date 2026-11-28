import React from 'react'
import Time from '../helpers/time'
import Share from './share'
import { DayRule } from '../helpers/reasons'
import type { Holiday } from '../helpers/constants'
import { isDefaultWeekend, weekendFor, weekendInWeekOrder } from '../helpers/weekends'

interface IWidget {
  now: Time
  reason: string
  deploy: boolean
  rule: DayRule
  holiday: Holiday | null
  timezone: string
  onUseTimezone: (timezone: string) => void
  onNewReason: () => void
}

import { I18nContext } from '../pages/_app'

// "Africa/Lagos" -> "Lagos", "America/Argentina/Buenos_Aires" -> "Buenos Aires"
const placeName = (timezone: string) =>
  timezone.split('/').pop()!.replace(/_/g, ' ')

// Two zones count as the same when their wall clocks agree right now, so
// aliases (UTC and Etc/UTC) don't trigger the cue.
const sameWallClock = (a: string, b: string) => {
  try {
    const at = (tz: string) =>
      new Date().toLocaleString('en-US', { timeZone: tz, hour12: false })
    return at(a) === at(b)
  } catch (e) {
    return true
  }
}

// The worldwide days that name themselves in the pill, for every timezone.
const NAMED_RULES: DayRule[] = ['christmas', 'newyear']

// "Fri–Sat", "Thu–Fri", "Fri, Sun": the zone's weekend in the page's
// language. Naijá uses the English day names its labels already use.
const weekendLabel = (weekend: number[], locale: string) => {
  const fmt = new Intl.DateTimeFormat(locale === 'pcm' ? 'en' : locale, {
    weekday: 'short',
    timeZone: 'UTC'
  })
  // 4 Jan 2026 is a Sunday, so 4 + n is weekday n.
  const name = (day: number) => fmt.format(new Date(Date.UTC(2026, 0, 4 + day)))
  const days = weekendInWeekOrder(weekend)
  const consecutive = days.length === 2 && (days[0] + 1) % 7 === days[1]
  return days.map(name).join(consecutive ? '–' : ', ')
}

const Widget = (props: IWidget) => {
  const { t, locale } = React.useContext(I18nContext)

  // Where the weekend isn't Saturday–Sunday, say so: it changes which days
  // are red.
  const weekend = weekendFor(props.timezone)
  const weekendNote = isDefaultWeekend(weekend)
    ? null
    : t('weekend_days', { days: weekendLabel(weekend, locale) })

  // On a holiday the pill names the day instead of saying YES/NO; the page
  // colour still carries the answer (red when it's a day off). Screen
  // readers hear the answer first, since the name alone doesn't say it.
  const verdict = t(props.deploy ? 'verdict_yes' : 'verdict_no')
  const observance = !!props.holiday && !props.holiday.dayOff
  const dayName = props.holiday
    ? props.holiday.name
    : NAMED_RULES.includes(props.rule)
      ? t(`rule_${props.rule}`)
      : null

  // The visitor's own timezone, read after mount (the server can't know it).
  // It only decides whether to offer "Use <city> time"; the answer keeps
  // following the selected timezone until the visitor taps that.
  const [localZone, setLocalZone] = React.useState<string | null>(null)
  React.useEffect(() => {
    try {
      setLocalZone(Intl.DateTimeFormat().resolvedOptions().timeZone || null)
    } catch (e) {}
  }, [])
  const offerLocalZone =
    !!localZone &&
    Time.zoneExists(localZone) &&
    !sameWallClock(localZone, props.timezone)

  const focusTimezonePicker = () => {
    const select = document.getElementById('timezone-select')
    if (!select) return
    select.scrollIntoView({ block: 'nearest' })
    select.focus()
  }

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
    <main className="item">
      <div className="question">
        <h1 className="tagline" suppressHydrationWarning>
          {t('tagline')}
        </h1>
        <p
          className={`verdict ${props.deploy ? 'verdict-yes' : 'verdict-no'}${
            dayName ? ' verdict-day' : ''
          }`}
          suppressHydrationWarning
        >
          {dayName ? (
            <>
              <span className="sr-only">{verdict}: </span>
              {/* The name replaces YES/NO, so a drawn tick or cross carries
                  the answer for anyone who can't tell the green from the
                  red (WCAG 1.4.1). */}
              <svg
                className="verdict-mark"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {props.deploy ? <path d="M3 8.5l3.2 3.2L13 4.8" /> : <path d="M4 4l8 8M12 4l-8 8" />}
              </svg>
              {dayName}
            </>
          ) : (
            verdict
          )}
        </p>
      </div>
      <h2 id="text" className="reason" aria-live="polite">
        {props.reason}
      </h2>
      {/* Why the answer is what it is, and for which timezone. The zone is a
          button to the picker; a second button offers the visitor's own
          zone when it differs. */}
      <p className="reason-why" suppressHydrationWarning>
        {/* An observance (Valentine's Day, Tax Day, ...) isn't a day off, so
            it names the day instead of "Work day, before 4pm". If another
            rule is deciding (weekend, after 4pm), that stays beside it so a
            red page still says why. */}
        {observance && (
          <>
            <span>{t('rule_observance')}</span>
            {props.rule !== 'deploy' && (
              <span className="why-sep" aria-hidden="true">
                ·
              </span>
            )}
          </>
        )}
        {!(observance && props.rule === 'deploy') && (
          <span>
            {t(`rule_${props.rule}`)}
          </span>
        )}
        <span className="why-sep" aria-hidden="true">
          ·
        </span>
        <button
          type="button"
          className="tz-link"
          onClick={focusTimezonePicker}
          aria-label={`${t('timezone_label')}: ${placeName(props.timezone)}`}
        >
          {placeName(props.timezone)}
        </button>
        {weekendNote && (
          <>
            <span className="why-sep" aria-hidden="true">
              ·
            </span>
            <span>{weekendNote}</span>
          </>
        )}
        {offerLocalZone && (
          <button
            type="button"
            className="tz-use"
            onClick={() => props.onUseTimezone(localZone!)}
          >
            {t('tz_use', { city: placeName(localZone!) })}
          </button>
        )}
      </p>
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
        verdict={dayName ? `${verdict} (${dayName})` : verdict}
        reason={props.reason}
        timezone={props.now.timezone}
      />
    </main>
  )
}

export default Widget