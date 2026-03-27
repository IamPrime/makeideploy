# Privacy Policy

## Overview

Make I Deploy Today? is committed to protecting your privacy. This Privacy Policy explains our data practices for the Chrome extension, mobile app, and web application at makeideploy.today.

## Data Collection

### What We Collect

**Make I Deploy Today? collects NO personal user data.**

Both the Chrome extension and web application only make requests to our public API endpoint (`https://makeideploy.today/api`) with the following optional parameters:

- `tz` - Timezone string (e.g., "Africa/Lagos")
- `lng` - Language preference (e.g., "pcm", "sw")
- `date` - Date string in YYYY-MM-DD format (optional)

### What We Do NOT Collect

Make I Deploy Today? does **not** collect, store, or transmit:
- ✓ Personal identification information (name, email, address, etc.)
- ✓ Browsing history
- ✓ Location data
- ✓ Authentication credentials
- ✓ Health or financial information
- ✓ Cookies or tracking data
- ✓ Device identifiers

## How Your Data Is Used

The parameters you send to the API are used solely to:
1. Determine the correct timezone for deployment decision logic
2. Return deployment advice in your preferred language
3. Calculate the decision based on the date you specify

**API requests are stateless.** We do not store, log, or retain the parameters you send.

## External Services

### API Calls

Both the Chrome extension and web application make requests to:
- **Endpoint:** `https://makeideploy.today/api`
- **Purpose:** Fetch deployment decision and advice
- **Data Sent:** Only the parameters you explicitly enter (timezone, language)

## Data Sharing & Third Parties

We **do not:**
- Sell user data
- Share user data with third parties
- Use data for advertising or tracking
- Transfer data for credit evaluation or lending purposes
- Use data for any purpose unrelated to providing Make I Deploy Today?'s functionality

## Security

Your data is only transmitted over HTTPS to our secure API endpoint. We recommend:
- Keep your browser updated
- Use the latest Chrome version
- Report security issues to the repository maintainers

## User Rights

You have the right to:
- Not use our service (web application, Chrome extension, or mobile app)
- Stop using our service at any time
- Know what data is being collected (answer: none for personal info)
- Request clarification about our data practices

## Open Source

Make I Deploy Today? is open-source under the WTFPL license. You can:
- Review the complete source code
- Verify we don't collect personal data
- Contribute improvements
- Fork for personal use

**Repository:** [MakeIDeploy](https://github.com/IamPrime/makeideploy)

## Contact

For privacy-related questions or concerns:
- Open an issue on [GitHub](https://github.com/IamPrime/makeideploy/issues)
- Check the [README](https://github.com/IamPrime/makeideploy)

## Changes to This Policy

We may update this Privacy Policy from time to time. Major changes will be documented in the repository. Your continued use of any Make I Deploy Today? service constitutes acceptance of the updated policy.

## GDPR Compliance

Since Make I Deploy Today? collects **no personal data**, GDPR data subject rights (access, deletion, portability) do not apply. If you have concerns, please contact us via the GitHub repository.

## California Privacy Rights

Make I Deploy Today? does not collect personal information as defined by CCPA, so its requirements do not apply.

---

**Summary:** Make I Deploy Today? is privacy-respecting software. We collect zero personal data. The only information sent to our servers are the optional timezone and language preferences you explicitly choose to submit.
