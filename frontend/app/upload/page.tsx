"use client"
import { useRouter } from "next/navigation"

export default function Upload() {
  const router = useRouter()
  return (
    <div style={{backgroundColor: "#0A0A0A", minHeight: "100vh", color: "white", padding: "60px"}}>
      
      {/* Header */}
      <div style={{textAlign: "center", marginBottom: "60px"}}>
        <span style={{fontSize: "24px", fontWeight: "bold", color: "#00D4AA"}}>FinOS</span>
        <h1 style={{fontSize: "40px", fontWeight: "800", marginTop: "24px", marginBottom: "12px"}}>
          Upload Your Business Data
        </h1>
        <p style={{color: "#888888", fontSize: "18px"}}>
          We'll turn it into financial intelligence in seconds
        </p>
      </div>

      {/* Upload Zones */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "900px", margin: "0 auto 48px"}}>
        
        {/* Sales */}
        <div style={{backgroundColor: "#111111", border: "2px dashed #1E1E1E", borderRadius: "16px", padding: "40px", textAlign: "center", cursor: "pointer"}}>
          <div style={{fontSize: "40px", marginBottom: "16px"}}>📊</div>
          <h3 style={{color: "#FFFFFF", marginBottom: "8px", fontSize: "18px"}}>Sales Data</h3>
          <p style={{color: "#888888", fontSize: "13px", marginBottom: "20px"}}>Invoices, customers, products, revenue</p>
          <div style={{backgroundColor: "#1E1E1E", borderRadius: "8px", padding: "10px 16px", color: "#00D4AA", fontSize: "13px"}}>
            Choose sales.csv
          </div>
        </div>

        {/* Expenses */}
        <div style={{backgroundColor: "#111111", border: "2px dashed #1E1E1E", borderRadius: "16px", padding: "40px", textAlign: "center", cursor: "pointer"}}>
          <div style={{fontSize: "40px", marginBottom: "16px"}}>💰</div>
          <h3 style={{color: "#FFFFFF", marginBottom: "8px", fontSize: "18px"}}>Expense Data</h3>
          <p style={{color: "#888888", fontSize: "13px", marginBottom: "20px"}}>Categories, vendors, amounts</p>
          <div style={{backgroundColor: "#1E1E1E", borderRadius: "8px", padding: "10px 16px", color: "#00D4AA", fontSize: "13px"}}>
            Choose expenses.csv
          </div>
        </div>

        {/* Bank */}
        <div style={{backgroundColor: "#111111", border: "2px dashed #1E1E1E", borderRadius: "16px", padding: "40px", textAlign: "center", cursor: "pointer"}}>
          <div style={{fontSize: "40px", marginBottom: "16px"}}>🏦</div>
          <h3 style={{color: "#FFFFFF", marginBottom: "8px", fontSize: "18px"}}>Bank Transactions</h3>
          <p style={{color: "#888888", fontSize: "13px", marginBottom: "20px"}}>Credits, debits, balance</p>
          <div style={{backgroundColor: "#1E1E1E", borderRadius: "8px", padding: "10px 16px", color: "#00D4AA", fontSize: "13px"}}>
            Choose bank.csv
          </div>
        </div>

      </div>

      {/* Process Button */}
      <div style={{textAlign: "center"}}>
        <button
          onClick={() => router.push("/dashboard")}
          style={{backgroundColor: "#00D4AA", color: "#0A0A0A", border: "none", padding: "16px 48px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "18px"}}>
          Process My Data →
        </button>
        <p style={{color: "#888888", marginTop: "16px", fontSize: "13px"}}>
          Your data is processed securely and never shared
        </p>
      </div>

    </div>
  )
}
