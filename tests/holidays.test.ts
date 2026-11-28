import Time from '../helpers/time'
import { countryForZone, holidayFor } from '../helpers/holidays'
import { dayRule, makeIDeploy } from '../helpers/constants'

const on = (tz: string, date: string) => new Time(tz, date)

describe('countryForZone', () => {
  it('maps each covered city to its own country', () => {
    expect(countryForZone('Africa/Lagos')).toBe('NG')
    expect(countryForZone('Africa/Nairobi')).toBe('KE')
    expect(countryForZone('Africa/Dar_es_Salaam')).toBe('TZ')
    expect(countryForZone('Africa/Addis_Ababa')).toBe('ET')
    expect(countryForZone('Africa/Johannesburg')).toBe('ZA')
    expect(countryForZone('Europe/London')).toBe('GB')
    expect(countryForZone('America/Chicago')).toBe('US')
    expect(countryForZone('US/Eastern')).toBe('US')
  })

  // Every zone in the picker that is US time: the 29 main zones, their old
  // alternative names, and the territories that keep federal holidays.
  const US_ZONES = [
    'America/New_York', 'America/Detroit', 'America/Kentucky/Louisville',
    'America/Kentucky/Monticello', 'America/Indiana/Indianapolis',
    'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indiana/Marengo',
    'America/Indiana/Petersburg', 'America/Indiana/Vevay', 'America/Chicago',
    'America/Indiana/Tell_City', 'America/Indiana/Knox', 'America/Menominee',
    'America/North_Dakota/Center', 'America/North_Dakota/New_Salem',
    'America/North_Dakota/Beulah', 'America/Denver', 'America/Boise', 'America/Phoenix',
    'America/Los_Angeles', 'America/Anchorage', 'America/Juneau', 'America/Sitka',
    'America/Metlakatla', 'America/Yakutat', 'America/Nome', 'America/Adak',
    'Pacific/Honolulu',
    // old names
    'America/Indianapolis', 'America/Fort_Wayne', 'America/Knox_IN',
    'America/Louisville', 'America/Atka', 'America/Shiprock', 'Navajo',
    'US/Eastern', 'US/Central', 'US/Mountain', 'US/Pacific', 'US/Alaska',
    'US/Hawaii', 'US/Arizona', 'US/Aleutian', 'US/East-Indiana', 'US/Indiana-Starke',
    'US/Michigan', 'US/Samoa',
    // territories
    'America/Puerto_Rico', 'America/St_Thomas', 'America/Virgin', 'Pacific/Guam',
    'Pacific/Saipan', 'Pacific/Pago_Pago', 'Pacific/Samoa', 'Pacific/Midway'
  ]

  it.each(US_ZONES)('%s is US time', (zone) => {
    expect(countryForZone(zone)).toBe('US')
  })

  it('every US zone sees Thanksgiving 2026', () => {
    for (const zone of US_ZONES) {
      expect(holidayFor(on(zone, '2026-11-26'), 'pcm')?.name).toBe('Thanksgiving Day')
    }
  })

  it('keeps US neighbours out', () => {
    for (const zone of ['America/Toronto', 'America/Mexico_City', 'America/Havana', 'America/Nassau']) {
      expect(countryForZone(zone)).toBeNull()
    }
  })

  it('has no country for UTC or uncovered zones', () => {
    expect(countryForZone('UTC')).toBeNull()
    expect(countryForZone('Asia/Tokyo')).toBeNull()
  })
})

describe('holidayFor', () => {
  it('finds US Thanksgiving and makes it a day off', () => {
    const time = on('America/New_York', '2026-11-26')
    const holiday = holidayFor(time, 'pcm')
    expect(holiday).toEqual({ name: 'Thanksgiving Day', dayOff: true, country: 'US' })
    expect(makeIDeploy(time, undefined, holiday)).toBe(false)
    expect(dayRule(time, holiday)).toBe('holiday')
  })

  it('gives UTC no regional holiday, even on Thanksgiving', () => {
    expect(holidayFor(on('UTC', '2026-11-26'), 'pcm')).toBeNull()
  })

  it('finds Labour Day across countries', () => {
    expect(holidayFor(on('Africa/Lagos', '2026-05-01'), 'pcm')?.name).toBe('Worker’s Day')
    expect(holidayFor(on('Africa/Johannesburg', '2026-05-01'), 'zu')?.name).toBe('Workers’ Day')
    expect(holidayFor(on('America/Chicago', '2026-09-07'), 'pcm')?.name).toBe('Labor Day')
  })

  it("uses the visitor's language when the country publishes it", () => {
    const nairobi = on('Africa/Nairobi', '2026-12-12')
    expect(holidayFor(nairobi, 'sw')?.name).toBe('Siku ya Jamhuri')
    const addis = on('Africa/Addis_Ababa', '2026-09-11')
    expect(holidayFor(addis, 'am')?.name).toBe('እንቁጣጣሽ')
    // Otherwise the official English name.
    expect(holidayFor(addis, 'pcm')?.name).not.toBe('እንቁጣጣሽ')
  })

  it('keeps Tanzania apart from Kenya despite sharing a clock', () => {
    expect(holidayFor(on('Africa/Dar_es_Salaam', '2026-12-09'), 'sw')?.country).toBe('TZ')
    expect(holidayFor(on('Africa/Nairobi', '2026-12-09'), 'sw')).toBeNull()
  })

  it('lunar holidays: Eid al-Fitr in Nigeria', () => {
    expect(holidayFor(on('Africa/Lagos', '2026-03-20'), 'ha')).toMatchObject({ dayOff: true })
  })

  it('prefers the day off when two fall together, and skips school holidays', () => {
    // 27 May 2026: Id el Kabir (public) and Children's Day (school).
    expect(holidayFor(on('Africa/Lagos', '2026-05-27'), 'pcm')?.name).toBe('Id el Kabir')
  })

  it('drops the "(substitute day)" suffix', () => {
    expect(holidayFor(on('Europe/London', '2026-12-28'), 'pcm')?.name).toBe('Boxing Day')
  })

  it('treats observances as named days, not days off', () => {
    // Tax Day, a Wednesday: still a normal working morning.
    const time = on('America/New_York', '2026-04-15')
    const holiday = holidayFor(time, 'pcm')
    expect(holiday).toMatchObject({ name: 'Tax Day', dayOff: false })
    expect(makeIDeploy(time, undefined, holiday)).toBe(true)
    expect(dayRule(time, holiday)).toBe('deploy')
  })

  it('has nothing on an ordinary day', () => {
    expect(holidayFor(on('Africa/Lagos', '2026-11-24'), 'pcm')).toBeNull()
  })
})
