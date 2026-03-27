# Make I Deploy Today? - Chrome Extension

A quick-access Chrome extension for the [Make I Deploy Today?](https://makeideploy.today) app. Get instant Pidgin wisdom on whether you should deploy today, right from your browser!

## Features

- 🚀 **One-click deployment decision** - Quick popup with the latest wisdom
- 🌍 **Timezone support** - Check deployment status for any timezone
- 🎨 **Beautiful UI** - Clean, modern design with Pidgin vibes
- ⚡ **Lightning fast** - Minimal overhead, instant results
- 🔄 **Keep checking** - Refresh anytime to get new reasons

## Installation

### For Development

1. Navigate to `chrome://extensions/`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `extension` folder from this repository
5. The extension will appear in your Chrome toolbar

### For Users (Chrome Web Store)

Once published to the Chrome Web Store, users can install directly from:
`https://chromewebstore.google.com/detail/make-i-deploy-today/YOUR_EXTENSION_ID`

The install link will appear on the [main website](https://www.makeideploy.today) in the footer.

## Project Structure

```
extension/
├── manifest.json           # Extension configuration
├── popup.html              # Popup UI structure
├── popup.js                # Popup logic and API calls
├── service-worker.js       # Background service worker
├── icons/                  # Extension icons (16x16, 48x48, 128x128)
└── README.md              # This file
```

## How It Works

1. User clicks the extension icon in the Chrome toolbar
2. A popup window opens showing "checking vibes..."
3. Extension calls the public API: `https://makeideploy.today/api?tz=UTC`
4. Result is displayed with a YES/NO decision and a witty reason
5. Users can optionally change timezone and refresh

## Customization

### Change Timezone in Popup
- The extension allows users to enter any valid IANA timezone name
- Examples: `Africa/Lagos`, `America/Chicago`, `Asia/Tokyo`

### Visit Full Website
- Button in popup opens the full experience at [makeideploy.today](https://makeideploy.today)

## Development

### Building Icons

You'll need to create three PNG icon files for the extension to work properly:

1. **icon-16.png** - 16x16 pixels (toolbar icon)
2. **icon-48.png** - 48x48 pixels (extension management page)
3. **icon-128.png** - 128x128 pixels (Chrome Web Store)

Use any image editor or online tool to create these, or use this Python script:

```python
from PIL import Image, ImageDraw, ImageFont

# Create icon with "MD" text
def create_icon(size, filename):
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Draw text in center
    text = "MD"
    bbox = draw.textbbox((0, 0), text)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - w) // 2
    y = (size - h) // 2
    draw.text((x, y), text, fill='white')
    
    img.save(filename)

for size in [16, 48, 128]:
    create_icon(size, f'icon-{size}.png')
```

### Testing Locally

1. Make changes to popup code
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test the popup

### Debugging

Opening the popup and seeing errors? Check the console:
1. Right-click the extension icon
2. Select **Inspect popup**
3. Check the console for errors

For service worker debugging:
1. Go to `chrome://extensions/`
2. Click **Details** on the extension
3. Click **Service worker** to see logs

## Publishing to Chrome Web Store

1. Create a developer account at [Chrome Web Store](https://chromewebstore.google.com/)
2. Pay the one-time registration fee ($5 USD)
3. Create new app and upload the extension folder
4. Fill in description, screenshots, and privacy policy
5. Submit for review (usually approved within 24 hours)
6. Once approved, share the Web Store link with users

## API Reference

The extension uses the public API endpoint:

```
GET https://makeideploy.today/api?tz={timezone}
```

**Parameters:**
- `tz` (optional) - IANA timezone string (default: UTC)
- `lng` (optional) - Language code: pcm, sw, yo, ig, ha, zu, am
- `date` (optional) - Date in YYYY-MM-DD format

**Response:**
```json
{
  "timezone": "Africa/Lagos",
  "date": "2024-11-18T00:00:00.000Z",
  "lng": "pcm",
  "tagline": "Make I Deploy Today?",
  "makeideploy": true,
  "color": "#51cf66",
  "message": "Go go go! Deploy am! 🚀"
}
```

## Troubleshooting

### Extension not loading?
- Ensure Developer mode is enabled
- Check that all required files are in the extension folder
- Verify manifest.json has valid JSON syntax

### Popup shows error?
- Check internet connection
- Verify API endpoint is reachable
- Check timezone format (should be IANA format like Africa/Lagos)
- Open Developer Tools to see detailed error message

### Icons not showing?
- Create PNG files in `icons/` folder with correct sizes
- Ensure filenames match manifest.json exactly
- Refresh the extension on `chrome://extensions/`

## License

Same as main project (WTFPL)

## Contributing

Found a bug? Want to improve the extension?
- Open an issue on [GitHub](https://github.com/IamPrime/makeideploy)
- Submit a pull request with your improvements
- Join the conversation in Pidgin! 🇳🇬

## Support

- **Website:** [makeideploy.today](https://makeideploy.today)
- **GitHub:** [IamPrime/makeideploy](https://github.com/IamPrime/makeideploy)
- **Twitter:** Share your deploy wisdom!
