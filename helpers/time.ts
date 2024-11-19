export default class Time {
  static DEFAULT_TIMEZONE = 'UTC'
  timezone: string
  customDate: Date | null

  constructor(timezone: string | null = null, customDate?: string) {
    this.timezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    this.customDate = new Date(customDate + 'T00:00:00Z')
    if (customDate) {
      const utcDate = new Date(customDate + 'T00:00:00Z')
      const offset = utcDate.getTimezoneOffset() * 60 * 1000
      const adjustedDate = new Date(utcDate.getTime() + offset)
      this.customDate = adjustedDate
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
    return this.getDate().getDay() === 6 || this.getDate().getDay() === 0
  }

  /**
   * Today na Christmas eve?
   * @returns boolean
   */
  naChristmasEve(): boolean {
    return (
      this.getDate().getMonth() === 11 &&
      this.getDate().getDate() === 24 &&
      this.getDate().getHours() >= 16
    )
  }

  /**
   * Today na Christmas?
   * @returns boolean
   */
  naChristmas(): boolean {
    return this.getDate().getMonth() === 11 && this.getDate().getDate() === 25
  }

  /**
   * We dey New Year's eve or New Year?
   * @returns boolean
   */
  naNewYear(): boolean {
    return (
      (this.now().getMonth() === 11 &&
        this.now().getDate() === 31 &&
        this.now().getHours() >= 16) ||
      (this.now().getMonth() === 0 && this.now().getDate() === 1)
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