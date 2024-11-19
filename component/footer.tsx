import React from 'react'
import Timezone from './timezone'

interface IFooter {
  changeTimezone: (timezone: string) => void
  timezone: string
}

const Footer = (props: IFooter) => {
  return (
    <>
      <ul className="footer-list">
        <li>Share:</li>
        <li>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmakeideploy.today%2F&t=Make%20I%20Deploy%20Today%3F"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fmakeideploy.today%2F&text=Make%20I%20Deploy%20Today%3F:%20https%3A%2F%2Fmakeideploy.today"
            target="_blank"
            rel="noopener noreferrer"
            title="Tweet"
          >
            Twitter
          </a>
        </li>
        <li>
          Source:{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/IamPrime/makeideploy"
          >
            Github
          </a>
        </li>
        <li>
          Timezone:{' '}
          <Timezone onChange={props.changeTimezone} timezone={props.timezone} />
        </li>
      </ul>

      <ul className="footer-list">
        <li>
          <a href={'/api?tz=' + props.timezone}>
            <mark>API</mark>
          </a>
        </li>
        <li>
          <a href={'/api/slack?tz=' + props.timezone}>
            <mark>Slack API</mark>
          </a>
        </li>
      </ul>
    </>
  )
}

export default Footer
