# Chrome Extension - Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Load in Chrome (1 minute)
1. Open `chrome://extensions/` in Chrome
2. Toggle **Developer mode** (top right)
3. Click **Load unpacked** → Select the `extension` folder
4. Done! You should see the "MD" icon in your toolbar

### Step 2: Test It (1 minute)
1. Click the extension icon
2. See the deployment wisdom
3. Try changing the timezone
4. Click "Visit Site" to see full app

### Step 3: Share It (1 minute)
Want to publish to Chrome Web Store?

1. Update the link in `component/footer.tsx`:
```tsx
href="https://chromewebstore.google.com/detail/make-i-deploy-today/YOUR_EXTENSION_ID"
```

2. Create release package:
```bash
npm run build:extension
```

3. Go to [Chrome Web Store Developer Console](https://chromewebstore.google.com/webstore/devconsole)
4. Upload the ZIP file
5. Fill in details and submit for review

---

## File Reference

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration |
| `popup.html` | Popup UI |
| `popup.js` | Popup logic |
| `service-worker.js` | Background worker |
| `icons/` | Pre-generated extension icons |

---

## Available Commands

```bash
# Create ZIP file for Chrome Web Store
npm run build:extension

# Main app development (in project root)
npm run dev       # Start dev server
npm run build     # Build app
npm run test      # Run tests
```

---

## What Users See

**In Chrome Toolbar:**
- Split red/green icon (dots pattern)
- Shows "Make I Deploy Today?" on hover

**Popup (220x400px):**
- Tagline: "Pidgin Wisdom for Developers"
- Big YES or NO decision
- Witty reason why
- Optional timezone selector
- "Check Again" & "Visit Site" buttons

---

## Common Issues

| Problem | Solution |
|---------|----------|
| "Could not load extension" | Check manifest.json syntax |
| Popup is blank | Right-click → Inspect popup → Check console |
| API not responding | Verify https://makeideploy.today/api is accessible |

---

## Next Steps

- ✅ Icons generated
- ✅ Extension loaded in Chrome
- ✅ Tested locally
- 📝 Ready to customize UI/styling
- 🚀 Ready to publish

See full docs in `extension/README.md` and `extension/SETUP.md`
