import Time from '../helpers/time'
import { dayRule, makeIDeploy } from '../helpers/constants'
import { RULE_REASON_KEYS } from '../helpers/reasons'
import { lastWorkdayOf, weekendFor } from '../helpers/weekends'

// Week of 23–29 Nov 2026: Mon 23 … Thu 26, Fri 27, Sat 28, Sun 29.
const on = (tz: string, date: string) => new Time(tz, date)
const rule = (tz: string, date: string) => dayRule(on(tz, date))
const deploy = (tz: string, date: string) => makeIDeploy(on(tz, date))

describe('weekendFor / lastWorkdayOf', () => {
  it('defaults to Saturday–Sunday with Friday as the last work day', () => {
    expect(weekendFor('UTC')).toEqual([6, 0])
    expect(lastWorkdayOf(weekendFor('Africa/Lagos'))).toBe(5)
  })

  it('knows the other weekends', () => {
    expect(lastWorkdayOf(weekendFor('Asia/Riyadh'))).toBe(4) // Fri–Sat → Thu
    expect(lastWorkdayOf(weekendFor('Asia/Kabul'))).toBe(3) // Thu–Fri → Wed
    expect(lastWorkdayOf(weekendFor('Asia/Kathmandu'))).toBe(5) // Sat → Fri
    expect(lastWorkdayOf(weekendFor('Africa/Djibouti'))).toBe(4) // Fri → Thu
    expect(lastWorkdayOf(weekendFor('Asia/Brunei'))).toBe(4) // Fri + Sun → Thu
  })
})

describe('Saturday–Sunday stays as it was', () => {
  it('UTC', () => {
    expect(rule('UTC', '2026-11-27')).toBe('friday')
    expect(rule('UTC', '2026-11-28')).toBe('weekend')
    expect(rule('UTC', '2026-11-29')).toBe('weekend')
    expect(deploy('UTC', '2026-11-26')).toBe(true)
  })
})

describe('Friday–Saturday (Riyadh, Cairo, Jerusalem, Dhaka, ...)', () => {
  it.each(['Asia/Riyadh', 'Africa/Cairo', 'Asia/Jerusalem', 'Asia/Dhaka'])('%s', (tz) => {
    expect(rule(tz, '2026-11-26')).toBe('weekend_eve') // Thursday
    expect(deploy(tz, '2026-11-26')).toBe(false)
    expect(rule(tz, '2026-11-27')).toBe('weekend_local') // Friday
    expect(rule(tz, '2026-11-28')).toBe('weekend_local') // Saturday
    expect(rule(tz, '2026-11-29')).toBe('deploy') // Sunday is a work day
    expect(deploy(tz, '2026-11-29')).toBe(true)
  })
})

describe('Thursday–Friday (Kabul, Tehran)', () => {
  it.each(['Asia/Kabul', 'Asia/Tehran'])('%s', (tz) => {
    expect(rule(tz, '2026-11-25')).toBe('weekend_eve') // Wednesday
    expect(rule(tz, '2026-11-26')).toBe('weekend_local') // Thursday
    expect(rule(tz, '2026-11-27')).toBe('weekend_local') // Friday
    expect(rule(tz, '2026-11-28')).toBe('deploy') // Saturday
    expect(rule(tz, '2026-11-29')).toBe('deploy') // Sunday
  })
})

describe('one-day and split weekends', () => {
  it('Nepal rests on Saturday only; Friday keeps its Friday rules', () => {
    expect(rule('Asia/Kathmandu', '2026-11-27')).toBe('friday')
    expect(rule('Asia/Kathmandu', '2026-11-28')).toBe('weekend_local')
    expect(rule('Asia/Kathmandu', '2026-11-29')).toBe('deploy')
  })

  it('Djibouti rests on Friday only', () => {
    expect(rule('Africa/Djibouti', '2026-11-26')).toBe('weekend_eve')
    expect(rule('Africa/Djibouti', '2026-11-27')).toBe('weekend_local')
    expect(rule('Africa/Djibouti', '2026-11-28')).toBe('deploy')
  })

  it('Brunei rests on Friday and Sunday, works Saturday', () => {
    expect(rule('Asia/Brunei', '2026-11-26')).toBe('weekend_eve')
    expect(rule('Asia/Brunei', '2026-11-27')).toBe('weekend_local')
    expect(rule('Asia/Brunei', '2026-11-28')).toBe('deploy')
    expect(rule('Asia/Brunei', '2026-11-29')).toBe('weekend_local')
  })
})

describe('reasons that name a day stay out of other weekends', () => {
  it('drops the Monday/Friday lines', () => {
    expect(RULE_REASON_KEYS.weekend_eve).not.toContain('reason_friday_11')
    expect(RULE_REASON_KEYS.weekend_local).not.toEqual(
      expect.arrayContaining(['reason_weekend_1'])
    )
    expect(RULE_REASON_KEYS.weekend_local).not.toContain('reason_weekend_4')
    expect(RULE_REASON_KEYS.weekend_local).not.toContain('reason_weekend_5')
  })
})
