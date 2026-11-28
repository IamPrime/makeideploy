// Regenerates helpers/holidays-data.json: the public-holiday rules for the
// countries the site covers, cut from the full date-holidays data set so
// only these few ship. Run after upgrading date-holidays:
//
//   node scripts/build-holidays.mjs
//
// Holiday data © date-holidays contributors, CC-BY-SA-4.0
// (https://github.com/commenthol/date-holidays).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Nigeria (Naijá, Yorùbá, Igbo, Hausa), Kenya and Tanzania (Kiswahili),
// South Africa (isiZulu), Ethiopia (Amharic), plus the US and UK.
export const COUNTRIES = ['NG', 'KE', 'TZ', 'ZA', 'ET', 'US', 'GB']

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
// The package doesn't export its data file, so read it from disk.
const full = JSON.parse(
  fs.readFileSync(path.join(root, 'node_modules', 'date-holidays', 'data', 'holidays.json'), 'utf8')
)

const subset = {
  version: full.version,
  license: full.license,
  source: 'https://github.com/commenthol/date-holidays',
  holidays: Object.fromEntries(COUNTRIES.map((c) => [c, full.holidays[c]])),
  names: full.names
}

const out = path.join(root, 'helpers', 'holidays-data.json')
fs.writeFileSync(out, JSON.stringify(subset) + '\n')
console.log(`wrote ${path.relative(root, out)} (${COUNTRIES.join(', ')}), ${fs.statSync(out).size} bytes`)
