Install Make I Deploy extension on Chrome (manual)
=================================================

This document walks users through installing the Make I Deploy browser extension in Google Chrome using the developer "Load unpacked" workflow or a downloadable ZIP from the project's Releases.

Quick note
----------

- The Chrome Web Store submission is currently unavailable. For most users the recommended option is to download the ZIP for the packaged extension from the Releases page.
- For developers or testers, you can install the extension unpacked using `chrome://extensions` → Developer mode → Load unpacked.

Download (recommended)
----------------------

1. Visit the latest release assets: https://github.com/IamPrime/makeideploy/releases/latest
2. Download the ZIP attached to the release (look for `makeideploy-extension-*.zip` or a similarly named asset).
3. Unzip the downloaded archive to a folder on your machine.

Manual / Unpacked install (developer mode)
-----------------------------------------

1. Open Google Chrome.
2. Navigate to `chrome://extensions`.
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the folder that contains the extension manifest (the unzipped folder from step 3).
5. The extension should appear in your toolbar. If you make changes to the source, click **Reload** on the extension card to pick up updates.

Warnings and considerations
---------------------------

- Chrome will display a developer-mode warning for unpacked extensions. This is expected.
- Unpacked installs do not auto-update. Consider using GitHub Releases + a versioned ZIP for users who want a packaged download.
- Do not distribute CRX files for consumer installs — Chrome restricts off-store CRX installation for regular users.

Enterprise / managed installs
----------------------------

If you're deploying to an organization, consider using Chrome enterprise policies to host and auto-install the extension. See Chrome's enterprise docs for guidance.
