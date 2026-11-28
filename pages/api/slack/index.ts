import { NextApiRequest, NextApiResponse } from 'next'
import {
  getRandom,
  dayHelper,
  getBaseUrl,
  makeIDeployColorTheme,
  makeIDeployFavIcon
} from '../../../helpers/constants'
import Time from '../../../helpers/time'
import { getLocalizedReasons, getMessages, SUPPORTED_LOCALES } from '../../../helpers/locale'
import { holidayFor } from '../../../helpers/holidays'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const timezone = req.body?.text || req.query.tz || Time.DEFAULT_TIMEZONE
  const lng = SUPPORTED_LOCALES.includes(req.query.lng as string)
    ? (req.query.lng as string)
    : 'pcm'
  const time = Time.validOrNull(timezone)
  const reasons = getLocalizedReasons(lng)
  const messages = getMessages(lng)
  const holiday = holidayFor(time, lng)
  const base = getBaseUrl(req)
  const thumb_url = `${base}/api/og?lng=${lng}`

  res.status(200).json({
    response_type: time ? 'in_channel' : 'ephemeral',
    attachments: [
      {
        text: time
          ? getRandom(dayHelper(time, reasons, holiday))
          : `Invalid time zone: '${timezone}'`,
        color: makeIDeployColorTheme(time, holiday),
        thumb_url,
        footer_icon: makeIDeployFavIcon(time, base, holiday),
        footer:
          messages['tagline'] +
          (time ? ` | ${timezone}` : '') +
          (holiday ? ` | ${holiday.name}` : '')
      }
    ]
  })
}
