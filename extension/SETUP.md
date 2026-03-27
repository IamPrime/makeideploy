# Chrome Extension Setup Guide

## Quick Start

### 1. Load Extension in Chrome (Development)
1. Open `chrome://extensions/` in your Chrome browser
2. Enable **Developer mode** (toggle in top right corner)
3. Click **Load unpacked** button
4. Navigate to and select the `extension` folder in this project
5. The extension will appear in your Chrome toolbar!

### 2. Test the Extension
1. Click the extension icon in the toolbar (should be purple with "MD")
2. You should see a popup showing deployment wisdom
3. Try changing the timezone at the bottom
4. Test the "Check Again" and "Visit Site" buttons

## Publishing to Chrome Web Store

1. **Create Developer Account:**
   - Go to [Chrome Web Store Developer Console](https://chromewebstore.google.com/webstore/devconsole)
   - Sign in with Google account
   - Pay $5 USD registration fee (one-time)

2. **Create New Item:**
   - Click "New Item"
   - Upload the `extension` folder as a ZIP file
   - Fill in all required fields:
     - Short description
     - Detailed description
     - Screenshots / promotional images
     - Category
     - Language
   - Upload 128x128 and 440x280 promotional images
   - Accept Google Play's developer policies

3. **Submit for Review:**
   - Review publishing data
   - Submit for review
   - Typically approved within 24 hours

4. **Share the Link:**
   - Once approved, you get a Chrome Web Store link
   - Update the footer link in `component/footer.tsx`
   - Share with users!

## File Structure

```
extension/
├── manifest.json          ← Extension configuration (DO NOT EDIT unless you know what you're doing)
├── popup.html             ← Popup UI template
├── popup.js               ← Popup logic and API calls
├── service-worker.js      ← Background service worker (Manifest V3)
├── icons/                 ← Pre-generated extension icon files
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── README.md              ← Full documentation
└── .gitignore             ← Git ignore rules
```

## Troubleshooting

### "Could not load extension" error?
- Check manifest.json syntax (must be valid JSON)
- Ensure all referenced files exist
- Check browser console for detailed error message

### Popup shows blank?
- Right-click extension icon → "Inspect popup"
- Check console for JavaScript errors
- Verify API endpoint is reachable: https://makeideploy.today/api

### Extension not appearing in toolbar?
- Check `chrome://extensions/` - extension should be listed
- Click pin icon next to extension name to show in toolbar
- If not listed, check that manifest.json is valid

## Next Steps

1. ✅ Load extension on `chrome://extensions/` (see step 1 above)
2. ✅ Test the popup functionality
3. ✅ Customize styling in `popup.html` if desired
4. 📝 Update Chrome Web Store link in `component/footer.tsx` (after publishing)
5. 🚀 Submit to Chrome Web Store for review

## Questions?

See the full documentation in `extension/README.md` or open an issue on GitHub!
