1. Client logs into FinOS dashboard
        ↓
2. Client clicks "Upload Sales Data"
        ↓
3. Client selects sales.csv from their computer
   (exported from their Excel/Tally)
        ↓
4. Browser sends file to:
   POST /upload/sales
        ↓
5. FinOS saves the file + creates upload_log
   (status: "pending")
        ↓
6. FRONTEND AUTOMATICALLY calls:
   POST /ingest/{upload_id}
   (the client never sees this happen —
    it's an automatic next step,
    not a separate button they click)
        ↓
7. Dashboard shows:
   "sales.csv uploaded successfully — 5 rows received"
        ↓
8. Client repeats for expenses.csv and bank.csv
        ↓
9. Once all 3 are ingested, Layer 3 (Cleaning)
   automatically processes them
        ↓
10. Eventually: Dashboard shows real KPIs