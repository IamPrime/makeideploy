// index.tsx
import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import {
  makeIDeploy,
  makeIDeployFavIcon,
  getBaseUrl,
  dayRule,
  STAGE_COLORS,
  Holiday
} from '../helpers/constants'
import Time from '../helpers/time'
import Widget from '../component/widget'
import Footer from '../component/footer'
import { I18nContext } from './_app'
import Router from 'next/router'
import { pickReasonKey } from '../helpers/reasons'
import {
  DEFAULT_LOCALE,
  getMessages,
  resolveLocale,
  SUPPORTED_LOCALES
} from '../helpers/locale'
import { holidayFor } from '../helpers/holidays'

// Today's holiday with its name in every language, so a language switch on
// the page renames it without asking the server again.
type PageHoliday = Omit<Holiday, 'name'> & { names: Record<string, string> }

interface IPage {
  tz: string
  now: { timezone: string; customDate: string }
  initialReasonKey: string
  origin: string
  holiday: PageHoliday | null
}

const Page: React.FC<IPage> = ({
  tz,
  now: initialNow,
  initialReasonKey,
  origin,
  holiday: serverHoliday
}) => {
  const [timezone, setTimezone] = useState<string>(tz)
  const [now, setNow] = useState<any>(
    new Time(initialNow.timezone, initialNow.customDate)
  )
  // The reason is stored as a locale key, not text: the server's pick stays
  // on screen after load, and a language switch translates the same reason.
  const [reasonKey, setReasonKey] = useState<string>(initialReasonKey)

  const changeTimezone = (newTimezone: string) => {
    if (!Time.zoneExists(newTimezone)) {
      return
    }

    let newUrl = new URL(window.location.toString())
    newUrl.searchParams.set('tz', newTimezone)
    Router.push(newUrl.pathname + newUrl.search)

    setTimezone(newTimezone)
    setNow(new Time(newTimezone))
  }

  const { t, locale } = React.useContext(I18nContext)

  // The server works out holidays for the timezone it was asked about. Right
  // after a timezone change the page is ahead of the server, so ignore the
  // old zone's holiday until the new one arrives.
  const holiday: Holiday | null =
    serverHoliday && tz === timezone
      ? {
          name: serverHoliday.names[locale] || serverHoliday.names[DEFAULT_LOCALE],
          dayOff: serverHoliday.dayOff,
          country: serverHoliday.country
        }
      : null
  const dayOff = !!holiday?.dayOff

  const rule = dayRule(now, holiday)

  const pickNewReason = React.useCallback(() => {
    setReasonKey((current) =>
      pickReasonKey(dayRule(now, dayOff ? holiday : null), current)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, dayOff])

  // A new timezone can change the rule, so pick a fitting reason then.
  // Skip the first run: the server's reason is already right.
  const isFirstTime = React.useRef(true)
  React.useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false
      return
    }
    pickNewReason()
  }, [now, pickNewReason])

  const deploy = makeIDeploy(now, undefined, holiday)

  return (
    <>
      <Head>
        {/* In the page's language, so a shared ?lng= link previews in it too. */}
        <title>{t('title')}</title>
        <meta key="og:title" property="og:title" content={t('title')} />
        <meta key="twitter:title" name="twitter:title" content={t('title')} />
        <meta key="itemprop-name" itemProp="name" content={t('title')} />
        <link
          rel="icon"
          type="image/png"
          href={makeIDeployFavIcon(now, '', holiday)}
          sizes="32x32"
        />
        <meta property="og:image" content={`${origin}/api/og?lng=${locale}`} />
        <meta name="twitter:image" content={`${origin}/api/og?lng=${locale}`} />
        {/* Browser chrome takes the stage colour: green on a yes day, red on
            a no day, deeper in a dark system theme. Distinct keys: next/head
            otherwise keeps only one meta per name. */}
        <meta
          key="theme-color-light"
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content={STAGE_COLORS[deploy ? 'yes' : 'no'].light}
        />
        <meta
          key="theme-color-dark"
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content={STAGE_COLORS[deploy ? 'yes' : 'no'].dark}
        />
      </Head>
      <div className={`wrapper ${deploy ? 'stage-yes' : 'stage-no'}`}>
        <Widget
          key={now.timezone}
          reason={t(reasonKey)}
          now={now}
          deploy={deploy}
          rule={rule}
          holiday={holiday}
          timezone={timezone}
          onUseTimezone={changeTimezone}
          onNewReason={pickNewReason}
        />
        <footer className="meta">
          <Footer timezone={timezone} changeTimezone={changeTimezone} />
        </footer>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let timezone = Array.isArray(context.query.tz)
    ? (context.query.tz[0] ?? Time.DEFAULT_TIMEZONE)
    : context.query.tz || Time.DEFAULT_TIMEZONE

  if (!Time.zoneExists(timezone)) {
    timezone = Time.DEFAULT_TIMEZONE
  }

  const time = Time.validOrNull(timezone)

  // Naijá is always in the bundle. Any other active language travels with
  // the page; the rest load on demand if the visitor switches (see _app).
  const locale = resolveLocale({
    query: context.query,
    cookies: context.req.cookies
  })
  context.res.setHeader('Vary', 'Cookie')

  const today = holidayFor(time, locale)
  const holiday: PageHoliday | null = today
    ? {
        dayOff: today.dayOff,
        country: today.country,
        names: Object.fromEntries(
          SUPPORTED_LOCALES.map((l) => [l, holidayFor(time, l)!.name])
        )
      }
    : null

  return {
    props: {
      locale,
      messages: locale === DEFAULT_LOCALE ? null : getMessages(locale),
      tz: timezone,
      now: time ? time.toObject() : null,
      holiday,
      initialReasonKey: pickReasonKey(time ? dayRule(time, today) : 'deploy'),
      // Resolved from the request, so it is right on any port or domain.
      origin: getBaseUrl(context.req)
    }
  }
}

export default Page
