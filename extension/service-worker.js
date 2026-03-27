// Service Worker for Make I Deploy Today Chrome Extension

chrome.runtime.onInstalled.addListener(() => {
    console.log('Make I Deploy Today extension installed!');
    // Open extension options or welcome page if needed
});

// Handle any background tasks or alarms if needed in the future
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'dailyCheck') {
        // Can be used for daily notifications in the future
        console.log('Daily deployment check reminder');
    }
});
