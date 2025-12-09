# capital-circuit-dashboard
A dashboard showcasing real-time data/investment from Investment Funds, PE and VC Firms Worldwide in the Tech Sector

## Previewing the dashboard (step by step)

### Option 1: Open the file directly
1. Locate `index.html` in the project folder.
2. Double-click it (or right-click and choose your browser) to open it in any modern browser.
3. Use the theme toggle in the top-right corner of the page to switch between light and dark modes.
4. Click the "PE" or "VC" pills to focus on one firm type, and use the region pills to filter by geography.

### Option 2: Serve locally for a more realistic preview
1. Open a terminal in the project root.
2. Start a simple server:
   - With Python 3: `python -m http.server 8000`
3. In your browser, visit `http://localhost:8000/index.html`.
4. Interact with the same controls (theme, firm type, region, sort) to see live updates and chart changes.

### Troubleshooting
- If you do not see data after clicking filters, click one of the firm-type pills ("PE" or "VC") to re-apply a selection.
- Refresh the page to reset the sample data and filters.
