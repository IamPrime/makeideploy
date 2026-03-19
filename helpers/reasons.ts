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
    REASONS_NEW_YEAR
  }
}

// Keep original exports for backward compatibility
export const REASONS_TO_DEPLOY = [
  "I no see why you no go do am",
  "Na free country we dey",
  'Carry go my guy!',
  'Gbosa! Do am',
  'Waka waka waka!',
  "Make we do am!",
  'Ship am! 🚢',
  'Follow flow 🌊',
  'Do am well well',
  'Joor!',
  'Make me proud',
  'No fear!',
  'Na so e suppose be',
  'Attack first, Attack strong, No mercy!'
]

export const REASONS_TO_NOT_DEPLOY = [
  "I no go advise make you do am",
  "Ah ah, today na Friday o",
  'Why you no wait till Monday?',
  'No be today',
  'Mba',
  'Wetin dey worry you?',
  'You don run test? I no think so',
  '¯\\_(ツ)_/¯',
  '😹',
  'Tufiakwa',
  'No o. Breathe well, count reach 10, come back',
  "I go prefer to chop ice-cream 🍦",
  'How you go do this kind thing? 🥺',
  'Some people just wan see as world dey burn 🔥',
  "You like wahala abi?",
  'Bugs dey wait for you'
]

export const REASONS_FOR_THURSDAY_AFTERNOON = [
  'You still wan sleep?',
  'Call your babe!',
  'You wan do overtime?',
  'Tell your oga say you see wahala, make you comot',
  'Why you no wait till Monday?',
  "I no go advise make you do am",
  'No be today',
  'Mba',
  'No o. Breathe well, count reach 10, come back'
]

export const REASONS_FOR_FRIDAY_AFTERNOON = [
  'E no go work at all',
  'You dey craze?',
  'Wetin you dey think?',
  'Mba mba mba mba mba mba mba mba',
  'You ready to work for night and weekend?',
  '🔥 🚒 🚨 ⛔️ 🔥 🚒 🚨 ⛔️ 🔥 🚒 🚨 ⛔️',
  'Tufiakwa! Abeg! No!',
  'Mba mba mba mba mba mba mba!',
  'Continue to dey dream',
  'Why why Bros why?',
  'But but but... wetin happen?',
  'Na Monday we dey deploy, so you fit fix am till Friday.',
  'YOLO ! You only live once !',
  "Error for line NaN Col -2 unexpected 'ↇ'"
]

export const REASONS_FOR_FRIDAY_22ND = [
  "Guy, seriously? Today na Friday 22nd!",
  'You believe for bad luck?',
  'T-Pain dey watch you',
  'If you wan spend your weekend for Crystal Lake, carry go',
  'Even if you pray, e no go help if you take this bad decision',
  'You don check calendar today?',
  '📅 Friday 22nd. Wetin you think?',
  'Just no!',
  'But but but... why?'
]

export const REASONS_FOR_AFTERNOON = [
  'You still wan sleep?',
  'Call your babe!',
  'You wan do overtime?',
  'Tomorrow?',
  'Mba',
  'Tell your oga say you see wahala, make you comot',
  'You get full day tomorrow!',
  "Trust me, dem go happy pass if e no spoil for night",
  'How much you trust your logging tools?'
]

export const REASONS_FOR_WEEKEND = [
  "Go house, you don high",
  'How about Monday?',
  'Beer abi Club?',
  'To code when you high no good o!',
  'I see say you deploy on Friday',
  'I tell you say Monday for better!',
  'E get like 2^1000 other ideas.'
]

export const REASONS_FOR_DAY_BEFORE_CHRISTMAS = [
  'You be Father Christmas 🧑‍🎄 or wetin?',
  '🎶🎵 You better watch out 🎵🎶',
  '🎄 Enjoy Christmas season! 🎄 ',
  'Just drink another cup of Palmwine 🍷',
  "You no fit wait make dem share gift finish?",
  'Sure, deploy... \n your family go like am as you dey fix things for your phone during dinner'
]

export const REASONS_FOR_CHRISTMAS = [
  ...REASONS_FOR_DAY_BEFORE_CHRISTMAS,
  'No, Rudolf go hunt you down 🦌 ',
  'Just watch Home Alone today',
  "You no suppose dey prepare Christmas food?"
]

export const REASONS_NEW_YEAR = [
  'Happy New Year! \n deploy for January 2',
  "Hangover never catch you?",
  'Take another glass of Nkwu enu 🥂',
  'Celebrate today, deploy tomorrow 🎇'
]