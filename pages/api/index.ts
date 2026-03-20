import { NextApiRequest, NextApiResponse } from 'next'
import Time from '../../helpers/time'
import { getRandom, dayHelper, makeIDeploy, makeIDeployColorTheme } from '../../helpers/constants'
import { getLocalizedReasons, getMessages, SUPPORTED_LOCALES } from '../../helpers/locale'

type ApiResponse = {
  error?: { message: string; type: string; code: number }
  timezone?: string
  date?: string
  lng?: string
  tagline?: string
  makeideploy?: boolean | null
  color?: string
  message?: string
}

const allowCors =
  (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    return await fn(req, res)
  }

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  const timezone = (req.query.tz as string) || Time.DEFAULT_TIMEZONE
  const customDate = req.query.date as string
  const lng = SUPPORTED_LOCALES.includes(req.query.lng as string)
    ? (req.query.lng as string)
    : 'pcm'

  if (!Time.zoneExists(timezone)) {
    return res.status(400).json({
      error: {
        message: `Timezone \`${timezone}\` does not exist`,
        type: 'Bad Request',
        code: 400
      }
    })
  }

  const date = customDate ? new Date(customDate) : null
  const time = date
    ? new Time(timezone, date.toISOString().split('T')[0])
    : new Time(timezone)
  const reasons = getLocalizedReasons(lng)
  const messages = getMessages(lng)

  res.status(200).json({
    timezone,
    date: (date ?? time.getDate()).toISOString(),
    lng,
    tagline: messages['tagline'],
    makeideploy: makeIDeploy(time),
    color: makeIDeployColorTheme(time),
    message: getRandom(dayHelper(time, reasons))
  })
}

export default allowCors(handler)
