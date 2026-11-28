import { resolveLocale } from '../helpers/locale'

const req = (
  query: Record<string, string | string[] | undefined> = {},
  cookies: Record<string, string> = {}
) => ({ query, cookies })

describe('resolveLocale', () => {
  it('defaults to Naijá for everyone', () => {
    expect(resolveLocale(req())).toBe('pcm')
  })

  it('never serves English', () => {
    expect(resolveLocale(req({ lng: 'en' }))).toBe('pcm')
    expect(resolveLocale(req({}, { lng: 'en' }))).toBe('pcm')
  })

  it('lets a ?lng= link win for this visit', () => {
    expect(resolveLocale(req({ lng: 'ig' }, { lng: 'sw' }))).toBe('ig')
  })

  it('uses the first value of a repeated ?lng=', () => {
    expect(resolveLocale(req({ lng: ['zu', 'am'] }))).toBe('zu')
  })

  it('falls back to the language picked from the menu', () => {
    expect(resolveLocale(req({ lng: 'xx' }, { lng: 'sw' }))).toBe('sw')
  })

  it('ignores an unknown saved language', () => {
    expect(resolveLocale(req({}, { lng: 'nope' }))).toBe('pcm')
  })
})
