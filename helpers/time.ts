export default class Time {
  static DEFAULT_TIMEZONE = 'UTC'
  timezone: string
  customDate: Date | null

  constructor(timezone: string | null = null, customDate?: string) {
    this.timezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    if (customDate) {
      const utcDate = new Date(customDate + 'T00:00:00Z')
      const offset = utcDate.getTimezoneOffset() * 60 * 1000
      this.customDate = new Date(utcDate.getTime() + offset)
    } else {
      this.customDate = null
    }
  }

  toObject() {
    return {
      timezone: this.timezone,
      customDate: this.customDate
    }
  }

  setTimezone(timezone: string) {
    if (Time.zoneExists(timezone)) {
      this.timezone = timezone
    }
  }

  getDate(): Date {
    if (this.customDate) {
      return this.customDate
    }
    let timeZoneDate = new Date().toLocaleString('en-US', {
      timeZone: this.timezone
    })
    return new Date(timeZoneDate)
  }

  /**
   * Check if timezone dey exist
   * @param {string} timeZone
   * @return {bool}
   */
  static zoneExists(timeZone: string): boolean {
    try {
      Intl.DateTimeFormat('en-US', { timeZone }).format(Date.now())
      return true
    } catch (error) {
      return false
    }
  }

  static validOrNull(timezone: string | null) {
    if (!timezone) {
      timezone = Time.DEFAULT_TIMEZONE
    }

    return this.zoneExists(timezone) ? new Time(timezone) : null
  }

  /**
   * Return the date wey dey now
   * @return {Date}
   */
  now(): Date {
    if (this.customDate) {
      return this.customDate
    }
    let timeZoneDate = new Date().toLocaleString('en-US', {
      timeZone: this.timezone
    })
    return new Date(timeZoneDate)
  }

  /**
   * Today na Thursday?
   * @return boolean
   */
  naThursday(): boolean {
    return this.getDate().getDay() === 4
  }

  /**
   * Today na Friday?
   * @return boolean
   */
  naFriday(): boolean {
    return this.getDate().getDay() === 5
  }

  /**
   * Today na day 22nd?
   * @return boolean
   */
  na22nd(): boolean {
    return this.getDate().getDate() === 22
  }

  /**
   * We dey for afternoon?
   * @return boolean
   */
  naAfternoon(): boolean {
    return this.getDate().getHours() >= 16
  }

  /**
   * We dey Thursday afternoon?
   * @return boolean
   */
  naThursdayAfternoon(): boolean {
    return this.naThursday() && this.naAfternoon()
  }

  /**
   * We dey Friday afternoon?
   * @return boolean
   */
  naFridayAfternoon(): boolean {
    return this.naFriday() && this.naAfternoon()
  }

  /**
   * Today na Friday wey be 22nd?
   * @return boolean
   */
  naFriday22nd(): boolean {
    return this.naFriday() && this.na22nd()
  }

  /**
   * We dey weekend (Saturday or Sunday)?
   * @return boolean
   */
  naWeekend(): boolean {
    const day = this.getDate().getDay()
    return day === 6 || day === 0
  }

  /**
   * Today na Christmas eve?
   * @returns boolean
   */
  naChristmasEve(): boolean {
    const d = this.getDate()
    return d.getMonth() === 11 && d.getDate() === 24 && d.getHours() >= 16
  }

  /**
   * Today na Christmas?
   * @returns boolean
   */
  naChristmas(): boolean {
    const d = this.getDate()
    return d.getMonth() === 11 && d.getDate() === 25
  }

  /**
   * We dey New Year's eve or New Year?
   * @returns boolean
   */
  naNewYear(): boolean {
    const d = this.getDate()
    return (
      (d.getMonth() === 11 && d.getDate() === 31 && d.getHours() >= 16) ||
      (d.getMonth() === 0 && d.getDate() === 1)
    )
  }

  /**
   * Check if na any holiday
   * @returns boolean
   */
  naHolidays(): boolean {
    return this.naChristmasEve() || this.naChristmas() || this.naNewYear()
  }
}