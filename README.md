# Windchill Shortcuts

This is a minimal Chrome extension for Windchill pages.

It detects a Windchill tab by checking the hostname and page title for `windchill`, then enables:

- `Alt+Shift+H` to open a Windchill home tab
- `Alt+Shift+S` to open Windchill search in a new tab
- `Alt+Shift+T` to open Windchill tasks in a new tab

## Load unpacked

1. Open `chrome://extensions`
2. Enable Developer mode
3. Choose Load unpacked
4. Select the `WindchillShortcuts` folder

## Notes

If your Windchill deployment uses different page paths, update the target URLs in `service-worker.js`.