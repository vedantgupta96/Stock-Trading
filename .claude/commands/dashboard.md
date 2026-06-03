---
description: Start the local trading dashboard web app and open it in the browser at http://localhost:5050
---

# /dashboard — Launch Trading Dashboard

## STEP 1 — Install dependencies (first run only)

```bash
cd dashboard && pip install -r requirements.txt
```

## STEP 2 — Start the Flask server

```bash
cd dashboard && python server.py &
echo "Dashboard starting at http://localhost:5050"
```

Wait 2 seconds for the server to initialize, then:

## STEP 3 — Open in browser

```bash
open http://localhost:5050
```

## Notes

- The dashboard loads a snapshot from memory files immediately (no API calls on load)
- Use the **Refresh Live Data** button in the browser to fetch fresh quotes from Alpaca
- The server reads `.env` for credentials (same as other local commands)
- To stop the server: `kill $(lsof -ti:5050)`
- Server logs appear in `dashboard/server.log`
