const DEFAULTS = `{
  "settings": "open",
  "instructions": "open",
  "level": 3
}`;

window.__settings__ = JSON.parse(localStorage.getItem('user-settings') || DEFAULTS);

function saveSettings() {
  localStorage.setItem('user-settings', JSON.stringify(window.__settings__));
}