"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [data, setData] = useState<any>(null)
  const router = useRouter()
  const client_id = "f1e0c59b-73ff-4a4c-b963-9c62ed68721d"

  useEffect(() => {
    fetch(`https://finos-backend.vercel.app/intelligence/${client_id}`)
      .then(res => res.json())
      .then(json => setData(json))
  }, [])

  if (!data) return (
    <div style={{backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{textAlign: "center"}}>
        <div style={{color: "#00D4AA", fontSize: "24px", marginBottom: "16px"}}>⟳</div>
        <p style={{color: "#888888", fontSize: "18px"}}>Processing your financial data...</p>
      </div>
    </div>
  )

  return (
    <div style={{backgroundColor: "#0A0A0A", minHeight: "100vh", color: "white"}}>
      
      {/* Nav */}
      <nav style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #1E1E1E"}}>
        <span style={{fontSize: "20px", fontWeight: "bold", color: "#00D4AA"}}>FinOS</span>
        <button onClick={() => router.push("/upload")} style={{backgroundColor: "transparent", color: "#888888", border: "1px solid #1E1E1E", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px"}}>
          Upload New Data
        </button>
      </nav>

      {/* Header */}
      <div style={{padding: "40px 40px 20px"}}>
        <h1 style={{fontSize: "32px", fontWeight: "800", marginBottom: "4px"}}>GreenLeaf Supplies</h1>
        <p style={{color: "#888888", fontSize: "14px"}}>Manufacturing · Jaipur, India · INR</p>
      </div>

      {/* KPI Grid */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "20px 40px"}}>
        
        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "28px"}}>
          <p style={{color: "#888888", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px"}}>TOTAL REVENUE</p>
          <p style={{fontSize: "28px", fontWeight: "800", color: "#00D4AA"}}>₹{data.revenue.total_revenue.toLocaleString()}</p>
        </div>

        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "28px"}}>
          <p style={{color: "#888888", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px"}}>TOTAL EXPENSES</p>
          <p style={{fontSize: "28px", fontWeight: "800", color: "#FF4444"}}>₹{data.expenses.total_expense.toLocaleString()}</p>
        </div>

        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "28px"}}>
          <p style={{color: "#888888", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px"}}>GROSS PROFIT</p>
          <p style={{fontSize: "28px", fontWeight: "800", color: "#4CAF50"}}>₹{data.profit.gross_profit.toLocaleString()}</p>
        </div>

        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "28px"}}>
          <p style={{color: "#888888", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px"}}>NET CASH POSITION</p>
          <p style={{fontSize: "28px", fontWeight: "800", color: "#7C3AED"}}>₹{data.cash.net_cash.toLocaleString()}</p>
        </div>

        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "28px"}}>
          <p style={{color: "#888888", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px"}}>TOP CUSTOMER</p>
          <p style={{fontSize: "28px", fontWeight: "800", color: "#F59E0B"}}>{data.customers.best_customer || "—"}</p>
        </div>

        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "28px"}}>
          <p style={{color: "#888888", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px"}}>PROFIT MARGIN</p>
          <p style={{fontSize: "28px", fontWeight: "800", color: "#F97316"}}>{data.profit.profit_margin}%</p>
        </div>

      </div>

      {/* Download Button */}
      <div style={{padding: "20px 40px"}}>
        <button style={{backgroundColor: "#111111", color: "#00D4AA", border: "1px solid #00D4AA", padding: "12px 28px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "bold"}}>
          ↓ Download PDF Report
        </button>
      </div>

    </div>
  )
}
