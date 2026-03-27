// Fetch deployment decision from API
async function fetchDeploymentDecision() {
    const contentDiv = document.getElementById('content');
    const timezoneInput = document.getElementById('timezone');
    const timezone = timezoneInput.value || 'UTC';

    contentDiv.innerHTML = '<div class="loading">⏳ Checking the vibes...</div>';

    try {
        const apiUrl = `https://makeideploy.today/api?tz=${encodeURIComponent(timezone)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch deployment decision');
        }

        const data = await response.json();
        displayResult(data);
    } catch (error) {
        contentDiv.innerHTML = `
            <div class="error">
                ❌ Oops! Error checking vibes: ${error.message}
            </div>
        `;
    }
}

// Display the decision result
function displayResult(data) {
    const contentDiv = document.getElementById('content');
    const decision = data.makeideploy ? '✨ YES! DEPLOY! ✨' : '🛑 HOLD UP! NOT TODAY 🛑';
    const decisionClass = data.makeideploy ? 'green' : 'red';

    contentDiv.innerHTML = `
        <div class="decision ${decisionClass}">${decision}</div>
        <div class="message">${data.message}</div>
        <div class="metadata">
            📍 ${data.timezone} | 🌍 ${data.lng.toUpperCase()}
        </div>
    `;
}

// Event listeners
document.getElementById('refreshBtn').addEventListener('click', fetchDeploymentDecision);
document.getElementById('websiteBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://makeideploy.today' });
});

document.getElementById('timezone').addEventListener('change', fetchDeploymentDecision);

// Load decision on popup open
fetchDeploymentDecision();
