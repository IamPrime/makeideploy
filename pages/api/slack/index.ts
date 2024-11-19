import {
  getRandom,
  dayHelper,
  getBaseUrl,
  makeIDeployColorTheme,
  makeIDeployFavIcon
} from '../../../helpers/constants'
import Time from '../../../helpers/time'

export default (
  req: { body: { text: string }; query: { tz: string } },
  res: {
    status: (response: number) => {
      json: {
        (response: {
          response_type: string
          attachments: {
            text: string
            color: string
            thumb_url: string
            footer_icon: string
            footer: string
          }[]
        }): void
      }
    }
  }
) => {
  let timezone = req.body.text || req.query.tz || Time.DEFAULT_TIMEZONE
  let time = Time.validOrNull(timezone)
  const thumb_url = `${getBaseUrl()}/api/og`

  res.status(200).json({
    response_type: time ? 'in_channel' : 'ephemeral',
    attachments: [
      {
        text: time
          ? getRandom(dayHelper(time))
          : `Invalid time zone: '${timezone}'`,
        color: makeIDeployColorTheme(time),
        thumb_url,
        footer_icon: makeIDeployFavIcon(time),
        footer: 'Make I deploy today' + (time ? ` | ${timezone}` : '')
      }
    ]
  })
}
