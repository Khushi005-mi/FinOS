"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Upload() {
  const router = useRouter()
  const [salesFile, setSalesFile] = useState<File | null>(null)
  const [expensesFile, setExpensesFile] = useState<File | null>(null)
  const [bankFile, setBankFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''})
  const client_id = "f1e0c59b-73ff-4a4c-b963-9c62ed68721d"

  const handleFileChange = (type: 'sales' | 'expenses' | 'bank', file: File | null) => {
    if (type === 'sales') setSalesFile(file)
    else if (type === 'expenses') setExpensesFile(file)
    else if (type === 'bank') setBankFile(file)
  }

  const handleUpload = async () => {
    if (!salesFile && !expensesFile && !bankFile) {
      setUploadStatus({type: 'error', message: 'Please select at least one file to upload'})
      return
    }

    setUploading(true)
    setUploadStatus({type: null, message: ''})

    try {
      const formData = new FormData()
      
      // Always include client_id with every file
      if (salesFile) {
        formData.append('sales_file', salesFile)
        formData.append('sales_client_id', client_id)
      }
      if (expensesFile) {
        formData.append('expenses_file', expensesFile)
        formData.append('expenses_client_id', client_id)
      }
      if (bankFile) {
        formData.append('bank_file', bankFile)
        formData.append('bank_client_id', client_id)
      }

      // Add client_id as a general parameter
      formData.append('client_id', client_id)

      const response = await fetch(`https://finos-backend.vercel.app/upload`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      setUploadStatus({type: 'success', message: '✅ Files uploaded successfully! Your data is being processed.'})
      
      // Clear files after successful upload
      setSalesFile(null)
      setExpensesFile(null)
      setBankFile(null)
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      setUploadStatus({type: 'error', message: '❌ Upload failed. Please try again.'})
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{backgroundColor: "#0A0A0A", minHeight: "100vh", color: "white"}}>
      <nav style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #1E1E1E"}}>
        <span style={{fontSize: "20px", fontWeight: "bold", color: "#00D4AA"}}>FinOS</span>
        <button onClick={() => router.push("/dashboard")} style={{backgroundColor: "transparent", color: "#888888", border: "1px solid #1E1E1E", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px"}}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{maxWidth: "800px", margin: "0 auto", padding: "60px 20px"}}>
        <h1 style={{fontSize: "36px", fontWeight: "800", marginBottom: "8px"}}>Upload Financial Data</h1>
        <p style={{color: "#888888", marginBottom: "40px", fontSize: "18px"}}>
          Upload your sales, expenses, and bank statements to get instant financial intelligence.
        </p>

        {/* Sales Upload */}
        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "24px", marginBottom: "16px"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>
              <h3 style={{fontSize: "18px", fontWeight: "bold", marginBottom: "4px"}}>📊 Sales Data</h3>
              <p style={{color: "#888888", fontSize: "14px"}}>Upload your sales transactions (CSV or Excel)</p>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFileChange('sales', e.target.files?.[0] || null)}
              style={{color: "#888888", fontSize: "14px", cursor: "pointer"}}
            />
          </div>
          {salesFile && (
            <div style={{color: "#00D4AA", fontSize: "14px", marginTop: "8px"}}>
              ✅ {salesFile.name} ({(salesFile.size / 1024).toFixed(1)} KB)
            </div>
          )}
        </div>

        {/* Expenses Upload */}
        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "24px", marginBottom: "16px"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>
              <h3 style={{fontSize: "18px", fontWeight: "bold", marginBottom: "4px"}}>💰 Expenses Data</h3>
              <p style={{color: "#888888", fontSize: "14px"}}>Upload your expense transactions (CSV or Excel)</p>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFileChange('expenses', e.target.files?.[0] || null)}
              style={{color: "#888888", fontSize: "14px", cursor: "pointer"}}
            />
          </div>
          {expensesFile && (
            <div style={{color: "#00D4AA", fontSize: "14px", marginTop: "8px"}}>
              ✅ {expensesFile.name} ({(expensesFile.size / 1024).toFixed(1)} KB)
            </div>
          )}
        </div>

        {/* Bank Upload */}
        <div style={{backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px", padding: "24px", marginBottom: "32px"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>
              <h3 style={{fontSize: "18px", fontWeight: "bold", marginBottom: "4px"}}>🏦 Bank Statement</h3>
              <p style={{color: "#888888", fontSize: "14px"}}>Upload your bank statement (CSV or Excel)</p>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFileChange('bank', e.target.files?.[0] || null)}
              style={{color: "#888888", fontSize: "14px", cursor: "pointer"}}
            />
          </div>
          {bankFile && (
            <div style={{color: "#00D4AA", fontSize: "14px", marginTop: "8px"}}>
              ✅ {bankFile.name} ({(bankFile.size / 1024).toFixed(1)} KB)
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || (!salesFile && !expensesFile && !bankFile)}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: (uploading || (!salesFile && !expensesFile && !bankFile)) ? "#333333" : "#00D4AA",
            color: (uploading || (!salesFile && !expensesFile && !bankFile)) ? "#666666" : "#0A0A0A",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: (uploading || (!salesFile && !expensesFile && !bankFile)) ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          {uploading ? "⏳ Uploading..." : "🚀 Upload & Analyze Data"}
        </button>

        {/* Status Message */}
        {uploadStatus.message && (
          <div style={{
            marginTop: "16px",
            padding: "16px",
            backgroundColor: uploadStatus.type === 'success' ? "#00D4AA20" : "#FF444420",
            border: `1px solid ${uploadStatus.type === 'success' ? '#00D4AA' : '#FF4444'}`,
            borderRadius: "8px",
            color: uploadStatus.type === 'success' ? "#00D4AA" : "#FF4444",
            textAlign: "center"
          }}>
            {uploadStatus.message}
          </div>
        )}

        {/* Instructions */}
        <div style={{marginTop: "40px", padding: "24px", backgroundColor: "#111111", border: "1px solid #1E1E1E", borderRadius: "16px"}}>
          <h4 style={{color: "#888888", fontSize: "14px", fontWeight: "600", marginBottom: "12px"}}>📋 FILE FORMAT REQUIREMENTS:</h4>
          <ul style={{color: "#888888", fontSize: "14px", lineHeight: "2", paddingLeft: "20px"}}>
            <li><strong>Sales:</strong> Columns: date, customer_name, product, quantity, unit_price, total_amount</li>
            <li><strong>Expenses:</strong> Columns: date, category, description, amount</li>
            <li><strong>Bank:</strong> Columns: date, transaction_type, amount, balance, description</li>
            <li>Supported formats: <strong>CSV</strong> or <strong>Excel (.xlsx, .xls)</strong></li>
            <li>Maximum file size: <strong>10MB</strong> per file</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
