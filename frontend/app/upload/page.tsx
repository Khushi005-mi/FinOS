
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const router = useRouter();

  // ---------- State for selected files ----------
  const [salesFile, setSalesFile] = useState<File | null>(null);
  const [expensesFile, setExpensesFile] = useState<File | null>(null);
  const [bankFile, setBankFile] = useState<File | null>(null);

  // Processing status and feedback message
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // ---------- Refs to trigger hidden file inputs ----------
  const salesInputRef = useRef<HTMLInputElement>(null);
  const expensesInputRef = useRef<HTMLInputElement>(null);
  const bankInputRef = useRef<HTMLInputElement>(null);

  // ---------- Constants ----------
  const CLIENT_ID = "f1e0c59b-73ff-4a4c-b963-9c62ed68721d";
  const BASE_URL = "http://localhost:8000"  // ---------- Main processing function ----------
  const processData = async () => {
    // 1. Validate that all three files are selected
    if (!salesFile || !expensesFile || !bankFile) {
      setStatus({
        type: "error",
        message: "Please select all three CSV files before processing.",
      });
      return;
    }

    setIsProcessing(true);
    setStatus({ type: null, message: "" });

    try {
      // Helper: upload a single file and return the upload ID
      const uploadFile = async (file: File, type: "sales" | "expenses" | "bank") => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          `${BASE_URL}/upload/${type}?client_id=${CLIENT_ID}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data.id; // the backend returns { id: "..." }
      };

      // 2. Upload all three files in parallel (faster)
      const [salesId, expensesId, bankId] = await Promise.all([
        uploadFile(salesFile, "sales"),
        uploadFile(expensesFile, "expenses"),
        uploadFile(bankFile, "bank"),
      ]);

      // 3. Process each upload through the pipeline (ingest → clean → warehouse)
      // We can do them sequentially to avoid race conditions.
      const processUpload = async (id: string) => {
        await fetch(`${BASE_URL}/ingest/${id}`, { method: "POST" });
        await fetch(`${BASE_URL}/clean/${id}`, { method: "POST" });
        await fetch(`${BASE_URL}/warehouse/${id}`, { method: "POST" });
      };

      await Promise.all([
        processUpload(salesId),
        processUpload(expensesId),
        processUpload(bankId),
      ]);

      // 4. Success! Redirect to dashboard after a short delay
      setStatus({
        type: "success",
        message: "✅ All files processed successfully! Redirecting...",
      });
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "❌ Something went wrong. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  // ---------- JSX: UI ----------
  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #1E1E1E",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "#00D4AA" }}>
          FinOS
        </span>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            backgroundColor: "transparent",
            color: "#888888",
            border: "1px solid #1E1E1E",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Dashboard
        </button>
      </nav>

      {/* Main content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px" }}>
          Upload Financial Data
        </h1>
        <p style={{ color: "#888888", marginBottom: "40px", fontSize: "18px" }}>
          Upload your sales, expenses, and bank statements to get instant
          financial intelligence.
        </p>

        {/* ---- Sales Upload Zone ---- */}
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            cursor: "pointer",
          }}
          onClick={() => salesInputRef.current?.click()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px" }}>
                📊 Sales Data
              </h3>
              <p style={{ color: "#888888", fontSize: "14px" }}>
                {salesFile ? `✅ ${salesFile.name}` : "Click to upload sales CSV"}
              </p>
            </div>
            <span style={{ color: "#00D4AA" }}>{salesFile ? "✓" : "+"}</span>
          </div>
          <input
            ref={salesInputRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) setSalesFile(e.target.files[0]);
            }}
          />
        </div>

        {/* ---- Expenses Upload Zone ---- */}
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            cursor: "pointer",
          }}
          onClick={() => expensesInputRef.current?.click()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px" }}>
                💰 Expenses Data
              </h3>
              <p style={{ color: "#888888", fontSize: "14px" }}>
                {expensesFile ? `✅ ${expensesFile.name}` : "Click to upload expenses CSV"}
              </p>
            </div>
            <span style={{ color: "#00D4AA" }}>{expensesFile ? "✓" : "+"}</span>
          </div>
          <input
            ref={expensesInputRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) setExpensesFile(e.target.files[0]);
            }}
          />
        </div>

        {/* ---- Bank Upload Zone ---- */}
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
            cursor: "pointer",
          }}
          onClick={() => bankInputRef.current?.click()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px" }}>
                🏦 Bank Statement
              </h3>
              <p style={{ color: "#888888", fontSize: "14px" }}>
                {bankFile ? `✅ ${bankFile.name}` : "Click to upload bank CSV"}
              </p>
            </div>
            <span style={{ color: "#00D4AA" }}>{bankFile ? "✓" : "+"}</span>
          </div>
          <input
            ref={bankInputRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) setBankFile(e.target.files[0]);
            }}
          />
        </div>

        {/* ---- Process Button ---- */}
        <button
          onClick={processData}
          disabled={isProcessing || !salesFile || !expensesFile || !bankFile}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor:
              isProcessing || !salesFile || !expensesFile || !bankFile
                ? "#333333"
                : "#00D4AA",
            color:
              isProcessing || !salesFile || !expensesFile || !bankFile
                ? "#666666"
                : "#0A0A0A",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            cursor:
              isProcessing || !salesFile || !expensesFile || !bankFile
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isProcessing ? "⏳ Processing..." : "🚀 Process My Data →"}
        </button>

        {/* ---- Status Message ---- */}
        {status.message && (
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              backgroundColor:
                status.type === "success" ? "#00D4AA20" : "#FF444420",
              border: `1px solid ${status.type === "success" ? "#00D4AA" : "#FF4444"}`,
              borderRadius: "8px",
              color: status.type === "success" ? "#00D4AA" : "#FF4444",
              textAlign: "center",
            }}
          >
            {status.message}
          </div>
        )}

        {/* ---- Instructions ---- */}
        <div
          style={{
            marginTop: "40px",
            padding: "24px",
            backgroundColor: "#111111",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
          }}
        >
          <h4
            style={{
              color: "#888888",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            📋 FILE FORMAT REQUIREMENTS:
          </h4>
          <ul
            style={{
              color: "#888888",
              fontSize: "14px",
              lineHeight: "2",
              paddingLeft: "20px",
            }}
          >
            <li>
              <strong>Sales:</strong> Columns: date, customer_name, product,
              quantity, unit_price, total_amount
            </li>
            <li>
              <strong>Expenses:</strong> Columns: date, category, description,
              amount
            </li>
            <li>
              <strong>Bank:</strong> Columns: date, transaction_type, amount,
              balance, description
            </li>
            <li>Supported format: <strong>CSV</strong> only</li>
            <li>Maximum file size: <strong>10MB</strong> per file</li>
          </ul>
        </div>
      </div>
    </div>
  );
}