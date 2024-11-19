import Time from '../helpers/time'

describe('Time class', () => {
  // Helper function to mock the Date class
  function mockDate(dateString: string) {
    const date = new Date(dateString)
    jest.spyOn(global, 'Date').mockImplementation(() => date)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('naThursday', () => {
    mockDate('2024-11-21T00:00:00') // Thursday, November 21st, 2024
    const time = new Time('UTC')
    expect(time.naThursday()).toBe(true)
  })

  it('naFriday', () => {
    mockDate('2024-11-22T00:00:00') // Friday, November 22nd, 2024
    const time = new Time('UTC')
    expect(time.naFriday()).toBe(true)
  })
  it('na22nd', () => {
    mockDate('2024-11-22T00:00:00') // November 22nd, 2024
    const time = new Time('UTC')
    expect(time.na22nd()).toBe(true)
  })

  it('naAfternoon', () => {
    mockDate('2024-11-21T17:00:00') // November 21st, 2024, 17:00 (5 PM)
    const time = new Time('UTC')
    expect(time.naAfternoon()).toBe(true)
  })

  it('naThursdayAfternoon', () => {
    mockDate('2024-11-21T17:00:00') // Thursday, November 21st, 2024, 17:00 (5 PM)
    const time = new Time('UTC')
    expect(time.naThursdayAfternoon()).toBe(true)
  })

  it('naFridayAfternoon', () => {
    mockDate('2024-11-22T17:00:00') // Friday, November 22nd, 2024, 17:00 (5 PM)
    const time = new Time('UTC')
    expect(time.naFridayAfternoon()).toBe(true)
  })

  it('naFriday22nd', () => {
    mockDate('2024-11-22T00:00:00') // Friday, November 22nd, 2024
    const time = new Time('UTC')
    expect(time.naFriday22nd()).toBe(true)
  })

  it('naWeekend should return true for Saturday and Sunday', () => {
    const saturdayTime = new Time('UTC', '2024-11-23')
    const sundayTime = new Time('UTC', '2024-11-24')
    expect(saturdayTime.naWeekend()).toBe(true)
    expect(sundayTime.naWeekend()).toBe(true)
  })

  it('naChristmasEve', () => {
    mockDate('2024-12-24T17:00:00') // December 24th, 2024, 17:00 (5 PM)
    const time = new Time('UTC')
    expect(time.naChristmasEve()).toBe(true)
  })

  it('naChristmas', () => {
    mockDate('2024-12-25T00:00:00') // December 25th, 2024
    const time = new Time('UTC')
    expect(time.naChristmas()).toBe(true)
  })

  it('naNewYear', () => {
    mockDate('2024-12-31T17:00:00') // December 31st, 2024, 17:00 (5 PM)
    const time = new Time('UTC')
    expect(time.naNewYear()).toBe(true)

    mockDate('2025-01-01T00:00:00') // January 1st, 2025
    const time2 = new Time('UTC')
    expect(time2.naNewYear()).toBe(true)
  })

  it('naHolidays', () => {
    mockDate('2024-12-24T17:00:00') // December 24th, 2024, 17:00 (5 PM)
    const time = new Time('UTC')
    expect(time.naHolidays()).toBe(true)

    mockDate('2024-12-25T00:00:00') // December 25th, 2024
    const time2 = new Time('UTC')
    expect(time2.naHolidays()).toBe(true)

    mockDate('2024-12-31T17:00:00') // December 31st, 2024, 17:00 (5 PM)
    const time3 = new Time('UTC')
    expect(time3.naHolidays()).toBe(true)

    mockDate('2025-01-01T00:00:00') // January 1st, 2025
    const time4 = new Time('UTC')
    expect(time4.naHolidays()).toBe(true)
  })
  it('setTimezone - valid timezone', () => {
    const time = new Time('UTC')
    time.setTimezone('Africa/Lagos')
    expect(time.timezone).toBe('Africa/Lagos')
  })

  it('setTimezone - invalid timezone', () => {
    const time = new Time('UTC')
    time.setTimezone('Invalid/Timezone')
    expect(time.timezone).toBe('UTC') // should remain unchanged
  })

  it('validOrNull - valid timezone', () => {
    const time = Time.validOrNull('Africa/Lagos')
    expect(time).not.toBeNull()
    expect(time?.timezone).toBe('Africa/Lagos')
  })

  it('validOrNull - invalid timezone', () => {
    const time = Time.validOrNull('Invalid/Timezone')
    expect(time).toBeNull()
  })

  it('validOrNull - null timezone', () => {
    const time = Time.validOrNull(null)
    expect(time).not.toBeNull()
    expect(time?.timezone).toBe(Time.DEFAULT_TIMEZONE)
  })

  it('naAfternoon - exactly 16:00', () => {
    mockDate('2024-11-21T16:00:00') // November 21st, 2024, 16:00 (4 PM)
    const time = new Time('UTC')
    expect(time.naAfternoon()).toBe(true)
  })

  it('naThursdayAfternoon - exactly 16:00', () => {
    mockDate('2024-11-21T16:00:00') // Thursday, November 21st, 2024, 16:00 (4 PM)
    const time = new Time('UTC')
    expect(time.naThursdayAfternoon()).toBe(true)
  })

  it('naFridayAfternoon - exactly 16:00', () => {
    mockDate('2024-11-22T16:00:00') // Friday, November 22nd, 2024, 16:00 (4 PM)
    const time = new Time('UTC')
    expect(time.naFridayAfternoon()).toBe(true)
  })

  it('naNewYear - exactly 16:00 on Dec 31st', () => {
    mockDate('2024-12-31T16:00:00') // December 31st, 2024, 16:00 (4 PM)
    const time = new Time('UTC')
    expect(time.naNewYear()).toBe(true)
  })

  it('naNewYear - exactly midnight on Jan 1st', () => {
    mockDate('2025-01-01T00:00:00') // January 1st, 2025, 00:00 (midnight)
    const time = new Time('UTC')
    expect(time.naNewYear()).toBe(true)
  })

  it('toObject should return correct object', () => {
    const time = new Time('UTC', '2024-01-01')
    const obj = time.toObject()
    expect(obj).toEqual({
      timezone: 'UTC',
      customDate: expect.any(Date)
    })
  })

  it('now should return current date for custom date', () => {
    const customDate = '2024-01-01'
    const time = new Time('UTC', customDate)
    expect(time.now()).toEqual(time.getDate())
  })

  it('should use default timezone when not provided', () => {
    const time = new Time()
    expect(time.timezone).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone)
  })
})
