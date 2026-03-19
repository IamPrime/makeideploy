// Helper to dynamically build reasons from locale translations
export const buildReasons = (t: (key: string) => string) => {
  const REASONS_TO_DEPLOY = [
    t('reason_deploy_0'),
    t('reason_deploy_1'),
    t('reason_deploy_2'),
    t('reason_deploy_3'),
    t('reason_deploy_4'),
    t('reason_deploy_5'),
    t('reason_deploy_6'),
    t('reason_deploy_7'),
    t('reason_deploy_8'),
    t('reason_deploy_9'),
    t('reason_deploy_10'),
    t('reason_deploy_11'),
    t('reason_deploy_12'),
    t('reason_deploy_13')
  ]

  const REASONS_TO_NOT_DEPLOY = [
    t('reason_no_deploy_0'),
    t('reason_no_deploy_1'),
    t('reason_no_deploy_2'),
    t('reason_no_deploy_3'),
    t('reason_no_deploy_4'),
    t('reason_no_deploy_5'),
    t('reason_no_deploy_6'),
    t('reason_no_deploy_7'),
    t('reason_no_deploy_8'),
    t('reason_no_deploy_9'),
    t('reason_no_deploy_10'),
    t('reason_no_deploy_11'),
    t('reason_no_deploy_12'),
    t('reason_no_deploy_13'),
    t('reason_no_deploy_14')
  ]

  const REASONS_FOR_THURSDAY_AFTERNOON = [
    t('reason_thursday_0'),
    t('reason_thursday_1'),
    t('reason_thursday_2'),
    t('reason_thursday_3'),
    t('reason_thursday_4'),
    t('reason_thursday_5'),
    t('reason_thursday_6'),
    t('reason_thursday_7'),
    t('reason_thursday_8')
  ]

  const REASONS_FOR_FRIDAY_AFTERNOON = [
    t('reason_friday_0'),
    t('reason_friday_1'),
    t('reason_friday_2'),
    t('reason_friday_3'),
    t('reason_friday_4'),
    t('reason_friday_5'),
    t('reason_friday_6'),
    t('reason_friday_7'),
    t('reason_friday_8'),
    t('reason_friday_9'),
    t('reason_friday_10'),
    t('reason_friday_11'),
    t('reason_friday_12'),
    t('reason_friday_13')
  ]

  const REASONS_FOR_FRIDAY_22ND = [
    t('reason_friday22_0'),
    t('reason_friday22_1'),
    t('reason_friday22_2'),
    t('reason_friday22_3'),
    t('reason_friday22_4'),
    t('reason_friday22_5'),
    t('reason_friday22_6'),
    t('reason_friday22_7')
  ]

  const REASONS_FOR_AFTERNOON = [
    t('reason_afternoon_0'),
    t('reason_afternoon_1'),
    t('reason_afternoon_2'),
    t('reason_afternoon_3'),
    t('reason_afternoon_4'),
    t('reason_afternoon_5'),
    t('reason_afternoon_6'),
    t('reason_afternoon_7'),
    t('reason_afternoon_8')
  ]

  const REASONS_FOR_WEEKEND = [
    t('reason_weekend_0'),
    t('reason_weekend_1'),
    t('reason_weekend_2'),
    t('reason_weekend_3'),
    t('reason_weekend_4'),
    t('reason_weekend_5'),
    t('reason_weekend_6')
  ]

  const REASONS_FOR_DAY_BEFORE_CHRISTMAS = [
    t('reason_christmas_eve_0'),
    t('reason_christmas_eve_1'),
    t('reason_christmas_eve_2'),
    t('reason_christmas_eve_3'),
    t('reason_christmas_eve_4'),
    t('reason_christmas_eve_5')
  ]

  const REASONS_FOR_CHRISTMAS = [
    ...REASONS_FOR_DAY_BEFORE_CHRISTMAS,
    t('reason_christmas_6'),
    t('reason_christmas_7'),
    t('reason_christmas_8')
  ]

  const REASONS_NEW_YEAR = [
    t('reason_newyear_0'),
    t('reason_newyear_1'),
    t('reason_newyear_2'),
    t('reason_newyear_3')
  ]

  const REASONS_FOR_BIRTHDAY_EVE = [
    t('reason_birthday_eve_0'),
    t('reason_birthday_eve_1'),
    t('reason_birthday_eve_2'),
    t('reason_birthday_eve_3')
  ]

  const REASONS_FOR_BIRTHDAY = [
    t('reason_birthday_0'),
    t('reason_birthday_1'),
    t('reason_birthday_2'),
    t('reason_birthday_3')
  ]

  return {
    REASONS_TO_DEPLOY,
    REASONS_TO_NOT_DEPLOY,
    REASONS_FOR_THURSDAY_AFTERNOON,
    REASONS_FOR_FRIDAY_AFTERNOON,
    REASONS_FOR_FRIDAY_22ND,
    REASONS_FOR_AFTERNOON,
    REASONS_FOR_WEEKEND,
    REASONS_FOR_DAY_BEFORE_CHRISTMAS,
    REASONS_FOR_CHRISTMAS,
    REASONS_NEW_YEAR,
    REASONS_FOR_BIRTHDAY_EVE,
    REASONS_FOR_BIRTHDAY
  }
}

