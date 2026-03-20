// index.tsx
import React, { useEffect, useState, useMemo } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import {
  makeIDeploy,
  makeIDeployFavIcon,
  getBaseUrl,
  getRandom,
  dayHelper
} from '../helpers/constants'
import Time from '../helpers/time'
import Widget from '../component/widget'
import Footer from '../component/footer'
import { I18nContext } from './_app'
import Router from 'next/router'
import { buildReasons } from '../helpers/reasons'

interface IPage {
  tz: string
  now: { timezone: string; customDate: string }
  initialReason: string
}

const Page: React.FC<IPage> = ({ tz, now: initialNow, initialReason }) => {
  const [timezone, setTimezone] = useState<string>(tz)
  const [now, setNow] = useState<any>(
    new Time(initialNow.timezone, initialNow.customDate)
  )
  const [reason, setReason] = useState<string>(initialReason)

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

  // Memoized localized reasons - only rebuild when translation function changes
  const localizedReasons = useMemo(() => {
    return t ? buildReasons(t) : null
  }, [t])

  // Update title when locale changes
  React.useEffect(() => {
    const title = t ? t('title') : 'Make I Deploy Today?'
    document.title = title
  }, [locale, t])

  const pickNewReason = React.useCallback(() => {
    if (!localizedReasons) return
    setReason(getRandom(dayHelper(now, localizedReasons)))
  }, [localizedReasons, now])

  // Update reason when locale or time changes
  React.useEffect(() => {
    pickNewReason()
  }, [pickNewReason])

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href={makeIDeployFavIcon(now)}
          sizes="32x32"
        />
        <meta property="og:image" content={`${getBaseUrl()}/api/og?lng=${locale}`} />
      </Head>
      <div className={`wrapper ${!makeIDeploy(now) && 'its-friday'}`}>
        <Widget key={now.timezone} reason={reason} now={now} onNewReason={pickNewReason} />
        <div className="meta">
          <Footer timezone={timezone} changeTimezone={changeTimezone} />
        </div>
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

  return {
    props: {
      tz: timezone,
      now: time ? time.toObject() : null,
      initialReason: time ? getRandom(dayHelper(time)) : 'Invalid timezone'
    }
  }
}

export default Page
