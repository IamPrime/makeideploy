// Which rule decided today's answer. One list, used by the page (to pick a
// reason key and to say *why*) and by the APIs (through dayHelper).
export type DayRule =
  | 'christmas_eve'
  | 'christmas'
  | 'newyear'
  | 'holiday'
  | 'weekend_eve'
  | 'weekend_local'
  | 'birthday_eve'
  | 'birthday'
  | 'friday22'
  | 'friday_afternoon'
  | 'friday'
  | 'thursday_afternoon'
  | 'weekend'
  | 'afternoon'
  | 'deploy'

const keys = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${prefix}${i}`)

const CHRISTMAS_EVE_KEYS = keys('reason_christmas_eve_', 6)

// Locale keys for each rule's reasons. The page stores a key, not the text,
// so the reason the server rendered stays put on load, and switching
// language translates the same reason instead of picking a new one.
export const RULE_REASON_KEYS: Record<DayRule, string[]> = {
  deploy: keys('reason_deploy_', 14),
  friday: keys('reason_no_deploy_', 15),
  thursday_afternoon: keys('reason_thursday_', 9),
  friday_afternoon: keys('reason_friday_', 14),
  friday22: keys('reason_friday22_', 8),
  afternoon: keys('reason_afternoon_', 9),
  weekend: keys('reason_weekend_', 7),
  christmas_eve: CHRISTMAS_EVE_KEYS,
  christmas: [
    ...CHRISTMAS_EVE_KEYS,
    'reason_christmas_6',
    'reason_christmas_7',
    'reason_christmas_8'
  ],
  newyear: keys('reason_newyear_', 4),
  holiday: keys('reason_holiday_', 6),
  // Where the weekend isn't Saturday–Sunday, the Friday and weekend pools
  // apply without the reasons that name a day ("Why you no wait till
  // Monday?", "today na Friday o"), which would be wrong there.
  weekend_eve: keys('reason_friday_', 14).filter((k) => k !== 'reason_friday_11'),
  weekend_local: keys('reason_weekend_', 7).filter(
    (k) => !['reason_weekend_1', 'reason_weekend_4', 'reason_weekend_5'].includes(k)
  ),
  birthday_eve: keys('reason_birthday_eve_', 4),
  birthday: keys('reason_birthday_', 4)
}

/** Pick a reason key for the rule, avoiding `current` when there is a choice. */
export const pickReasonKey = (rule: DayRule, current?: string) => {
  const pool = RULE_REASON_KEYS[rule]
  const choices = pool.length > 1 ? pool.filter((k) => k !== current) : pool
  return choices[Math.floor(Math.random() * choices.length)]
}

// Helper to dynamically build reasons from locale translations
export const buildReasons = (t: (key: string) => string) => {
  const translate = (rule: DayRule) => RULE_REASON_KEYS[rule].map((k) => t(k))

  return {
    REASONS_TO_DEPLOY: translate('deploy'),
    REASONS_TO_NOT_DEPLOY: translate('friday'),
    REASONS_FOR_THURSDAY_AFTERNOON: translate('thursday_afternoon'),
    REASONS_FOR_FRIDAY_AFTERNOON: translate('friday_afternoon'),
    REASONS_FOR_FRIDAY_22ND: translate('friday22'),
    REASONS_FOR_AFTERNOON: translate('afternoon'),
    REASONS_FOR_WEEKEND: translate('weekend'),
    REASONS_FOR_DAY_BEFORE_CHRISTMAS: translate('christmas_eve'),
    REASONS_FOR_CHRISTMAS: translate('christmas'),
    REASONS_NEW_YEAR: translate('newyear'),
    REASONS_FOR_HOLIDAY: translate('holiday'),
    REASONS_FOR_WEEKEND_EVE: translate('weekend_eve'),
    REASONS_FOR_LOCAL_WEEKEND: translate('weekend_local'),
    REASONS_FOR_BIRTHDAY_EVE: translate('birthday_eve'),
    REASONS_FOR_BIRTHDAY: translate('birthday')
  }
}
