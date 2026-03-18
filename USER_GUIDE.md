# Make I Deploy Today? — User Guide Wey Be Pidgin Proper 🚀

## Wetin Be Dis Koko? 🚀

**Make I Deploy Today?** na tool wey go yan you whether you suppose deploy code now or make you wait small. E yarn pure Pidgin and e dey give reason based on day, time, and your timezone.

We dey check:
- **Which day be today** (Friday? e no too good 😅)
- **Wetin time be** (Afternoon dey risky pass)
- **Holidays** (Christmas, New Year, all dat)
- **Special dates** (Friday wey be 22nd, na special koko)
- **Your timezone** (Wetin time dey for your side?)

---

## For People Wey Dey Use Website 🌐

### Quick Quick Start

1. Comot phone or laptop, open https://makeideploy.today
2. You go see question: **"Make I Deploy Today?"**
3. E go show you Pidgin reason say yes or no

### How You Go Use Am

#### **Change Your Timezone**

For bottom of page you go see dropdown wey say "Timezone". Select your timezone so the message go follow your location proper:
- Pick from list (e.g. `Africa/Lagos`, `America/New_York`, `Asia/Tokyo`)
- The reason and color go change quick quick
- URL go add `?tz=Your/Timezone` so you fit share am with your people
- Share link make your bros see wetin their timezone get

#### **Get New Reason**

Press **Space** key or click somewhere for page to get another random reason. E fit show same thing again (na random ini), so keep trying.

#### **Color Meaning**

- 🟢 **Green** = You fit deploy go ahead (e dey fine)
- 🔴 **Red** = No be today o (wait make you breathe reach ten)

#### **Share Your Result**

For bottom of page you get Share section with Facebook, Twitter, API and Slack links. Use am to share your decision or integrate am.

---

### When E Go Say "Yes"?

E go tell you "Yes, deploy na" if:
- ✔️ Na Monday to Thursday (not Friday o)
- ✔️ No be Saturday or Sunday
- ✔️ No be Christmas, New Year, or any holiday
- ✔️ Time no pass 4PM (16:00)
- ✔️ No be 22nd of any month (especially Friday 22nd wey be cursed 🧿)

### When E Go Say "No"?

E go give you "No be today" reason if ANY of these happen:
- Na **Friday** (always Friday get wahala)
- Na **weekend** (Saturday or Sunday)
- Na **holiday** or holiday eve day
- Time don pass **4PM** (afternoon danger zone dey there)
- Na **Thursday late afternoon** (time run close to Friday)
- Na **22nd day** (especially if Friday 22nd)

### Example Reasons

**Good reasons** (deploy fit work):
- "I no see why you no go do am"
- "Carry go my guy!"
- "Gbosa! Do am"
- "Ship am! 🚢"

**Bad reasons** (better you wait):
- "Ah ah, today na Friday o"
- "Why you no wait till Monday?"
- "You don run test? I no think so"
- "Bugs dey wait for you"

---

## For Developers 📡

### REST API

You fit use API make you add this tool for your CI/CD, bots or tools wey you dey build.

#### **Base URL**
```
https://makeideploy.today/api
```

#### **Query Parameters**

| Parameter | Required | Example | Default |
|-----------|----------|---------|---------|
| `tz` | No | `Africa/Lagos` | `UTC` |
| `date` | No | `2024-11-18` | Today |

#### **Examples**

**1) Default one (UTC, today)**
```
GET https://makeideploy.today/api
```

**2) Use your timezone**
```
GET https://makeideploy.today/api?tz=Africa/Lagos
```

**3) Check specific date**
```
GET https://makeideploy.today/api?date=2024-11-18
```

**4) Specific date plus your timezone**
```
GET https://makeideploy.today/api?tz=America/Chicago&date=2024-11-18
```

#### **Response JSON Format**

API go return you JSON wey look like dis:

```json
{
  "timezone": "Africa/Lagos",
  "date": "2024-11-18T00:00:00.000Z",
  "makeideploy": true,
  "message": "I no see why you no go do am"
}
```

**Field Explanations:**
- `timezone` — Timezone wey you ask for
- `date` — The date/time for ISO format
- `makeideploy` — true mean safe, false mean no
- `message` — Random Pidgin reason wey API pick

#### **cURL Example**

```bash
# Check if you fit deploy for Friday for America timezone
curl "https://makeideploy.today/api?tz=America/New_York&date=2024-11-22"
```

**Response na:**
```json
{
  "timezone": "America/New_York",
  "date": "2024-11-22T00:00:00.000Z",
  "makeideploy": false,
  "message": "Guy, seriously? Today na Friday 22nd!"
}
```

---

### Slack Integration 🤖

You fit use Slack slash command make your team check before dem dey deploy.

#### **Slack API Endpoint**
```
https://makeideploy.today/api/slack
```

#### **How to Set Am Up**

1. Go Slack API Dashboard and create app from scratch
2. Add Slash Command na `/deploy` (or wetin you wan)
3. Request URL: `https://makeideploy.today/api/slack`
4. Short Description: `Should I deploy today?`
5. Save and install app for your workspace

#### **How to Use Am for Slack**

Just type this for Slack:
```
/deploy Africa/Lagos
```

E go show you something like dis:

```
Make I Deploy Today?
═══════════════════════════════════════════════
I no see why you no go do am

makeideploy.today | Africa/Lagos
```

If timezone valid, everybody for channel go see am. If he invalid, only you go see message.

---

### Open Graph Image API 🖼️

When you share link for Facebook, Twitter or anywhere, e get preview image. Our OG API dey generate am fresh-fresh.

#### **OG Image Endpoint**
```
https://makeideploy.today/api/og
```

#### **Query Parameters**

| Parameter | Example | Wetin He Do |
|-----------|---------|------------|
| `tz` | `Africa/Lagos` | Show reason for that timezone |
| `date` | `2024-11-18` | Show reason for that date |

#### **Examples How You Fit Use Am**

**Default preview**
```
https://makeideploy.today/api/og
```
Show current UTC moment reason.

**Share with your timezone**
```
https://makeideploy.today/api/og?tz=America/Los_Angeles
```
When you share for Twitter, e go show LA timezone reason.

**Check specific date**
```
https://makeideploy.today/api/og?date=2024-12-25
```
Show what Friday 22nd na Christmas dey look like.

**Both timezone and date**
```
https://makeideploy.today/api/og?tz=Asia/Tokyo&date=2024-12-25
```
Show Tokyo timezone on Christmas day.

---

## Advanced Usage 🛠️

### Shell Script: Check Before Deploy

```bash
#!/bin/bash

# First check if safe to deploy for your timezone before you run CI
RESPONSE=$(curl -s "https://makeideploy.today/api?tz=America/New_York")
IS_SAFE=$(echo $RESPONSE | jq -r '.makeideploy')

if [ "$IS_SAFE" = "true" ]; then
  # Ehn, go ahead and deploy
  echo "✅ Safe to deploy! Carry go!"
  npm run deploy
else
  # No be today, show person the reason
  echo "❌ Not recommended today, my guy."
  echo $(echo $RESPONSE | jq -r '.message')
  exit 1
fi
```

### GitHub Actions Workflow

```yaml
name: Deploy Check Before Push

# Run this na pull request time
on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check if safe to deploy
        run: |
          # Call API to check deployment status
          RESPONSE=$(curl -s "https://makeideploy.today/api?tz=Africa/Lagos")
          IS_SAFE=$(echo $RESPONSE | jq -r '.makeideploy')
          MESSAGE=$(echo $RESPONSE | jq -r '.message')
          
          # Show the result for your team
          echo "Deploy Check Result"
          echo "==================="
          echo $MESSAGE
          
          # If no be safe, fail the check
          if [ "$IS_SAFE" = "false" ]; then
            exit 1
          fi
```

### JavaScript/Node.js Code

```javascript
// Function wey go check if you fit deploy
async function shouldDeploy(timezone = 'UTC') {
  // Send request to API
  const response = await fetch(
    `https://makeideploy.today/api?tz=${timezone}`
  );
  const data = await response.json();
  
  // Show the result
  console.log(`Deploy: ${data.makeideploy ? '✅ YES' : '❌ NO'}`);
  console.log(`Reason: ${data.message}`);
  
  return data.makeideploy;
}

// Use this function
shouldDeploy('America/Chicago').then(safe => {
  if (safe) {
    console.log('Let us ship am! Deploy start now...');
  } else {
    console.log('Better you wait, no force am.');
  }
});
```

### Python Script

```python
import requests

# Function wey go check before deploy
def check_deploy(timezone='UTC'):
    # Call API endpoint
    url = f"https://makeideploy.today/api?tz={timezone}"
    response = requests.get(url)
    data = response.json()
    
    # Show result
    print(f"Deploy: {'✅ YES' if data['makeideploy'] else '❌ NO'}")
    print(f"Reason: {data['message']}")
    
    # Return true or false
    return data['makeideploy']

# Call am
if __name__ == "__main__":
    result = check_deploy('Africa/Lagos')
    if not result:
        print("No be now o, wait small...")
```

---

## Timezone Guide 🌍

Timezone format we dey use IANA format (you know, proper way):

### Common Timezones

- **Africa:** `Africa/Lagos`, `Africa/Johannesburg`, `Africa/Cairo`
- **Americas:** `America/New_York`, `America/Chicago`, `America/Los_Angeles`, `America/Toronto`
- **Asia:** `Asia/Tokyo`, `Asia/Singapore`, `Asia/Dubai`, `Asia/Kolkata`
- **Europe:** `Europe/London`, `Europe/Paris`, `Europe/Berlin`
- **Oceania:** `Australia/Sydney`, `Pacific/Auckland`

### Find Your Timezone

Open dropdown for website, you go see all ~400 timezones we support. Or check IANA database for your exact one.

---

## Troubleshooting 🔧

### API Return Error "Invalid timezone"

**Wetin Happen:** You get error message about timezone.

**How to Fix:** Check timezone name well:
- ❌ `EST` (no work for IANA)
- ✅ `America/New_York` (correct one)
- ❌ `Lagos` (incomplete)
- ✅ `Africa/Lagos` (correct one)

Use full `Region/City` format always.

### Reason No Change When You Click

**Wetin Happen:** Same reason show twice after click.

**How to Fix:** Na just probability — sometimes algorithm pick same message twice. Keep clicking or press Space, you go get different one.

### Website Show Green But API Show False

**Wetin Happen:** Website say yes but API say no.

**How to Fix:** Check timezone well. Website no follow API timezone. Verify URL to see wetin timezone na.

### Slack Bot No Respond

**Wetin Happen:** `/deploy` command take long or no show nothing.

**How to Fix:**
- Check Request URL na exactly: `https://makeideploy.today/api/slack`
- Make sure timezone parameter valid IANA (like `Africa/Lagos`)
- Check your Slack workspace fit access API

---

## FAQ 📚

**Q: Na serious work or just joke?**  
A: Ehhh, 50/50. Logic dey real (we check day, time, timezone, holidays) but reasons na laugh. Use am as reminder, no replace test abeg.

**Q: I fit add my own reasons?**  
A: Yessir! Go edit `helpers/reasons.ts` make you add your own Pidgin magic. Fork repo, send PR, we go review am.

**Q: E fit predict if deployment go fail?**  
A: No na. E na entertainment plus friendly advice. Always run tests first, make you no blame make-i-deploy.

**Q: Why Friday 22nd get special treatment?**  
A: Na superstition mixed with jokes ini. Friday 13th folklore met deploy curses, we created Friday 22nd. E no get deep meaning o.

**Q: Fit use this for real production?**  
A: You fit try am, but make it gentle reminder, no make am be law. Use am for CI/CD but person still suppose override am if necessary.

**Q: My timezone no dey list wey I see**  
A: We support ~400 IANA timezones. If yours no dey, pick closest one or report issue on [GitHub](https://github.com/IamPrime/makeideploy/issues).

---

## Contribute & Community 🤝

Find bug? You get better reason? You want add feature?

1. Fork repo: https://github.com/IamPrime/makeideploy
2. Create branch: `git checkout -b my-feature`
3. Add your Pidgin magic (make am fun and person no go struggle understand)
4. Push and open PR
5. Come laugh at code reviews with us 😄

**License:** WTFPL — Do wetin you want with code!

---

## System Architecture (For Developers Wey Dey Code)

### Frontend
- **Framework:** Next.js (React)
- **UI:** Simple design wey fit all screen sizes
- **Timezone Support:** Browser `Intl` API + IANA database

### Backend
- **API:** Next.js API routes (no server needed)
- **OG Images:** Vercel/OG (dynamic image generation)
- **Time Logic:** Custom `Time` class (understand all timezone)
- **Deployed:** Vercel (fast fast)

### Core Files
- `helpers/time.ts` — Time and timezone logic
- `helpers/reasons.ts` — 300+ Pidgin messages
- `helpers/constants.ts` — Deploy rules (the logic)
- `components/widget.tsx` — UI component wey you see

### How Data Flow

```
User Input (pick timezone) 
    ↓
Time class (calculate time for that timezone)
    ↓
Decision Rules (check day/time/holidays)
    ↓
Reason Pool (select correct message pool)
    ↓
Random Pick (pick one random message)
    ↓
Display (show on screen + color)
```

---

## Version History

- **v2.0.0** — Pidgin English rewrite with timezone support complete
- `initialReason` — Server compute reason before page load (better)
- OG image params — Share timezone-specific preview

---

## Support & Links

- **Website:** [makeideploy.today](https://makeideploy.today)
- **GitHub Repo:** [github.com/IamPrime/makeideploy](https://github.com/IamPrime/makeideploy)
- **Report Issue:** [GitHub Issues](https://github.com/IamPrime/makeideploy/issues)

---

**Enjoy am! Abeg test before you deploy! 🚀**
