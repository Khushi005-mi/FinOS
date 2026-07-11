"use client"

export default function Home() {
  return (
    <div style={{backgroundColor: "#0A0A0A", minHeight: "100vh", color: "white"}}>
    {/* Navigation */}
    <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        borderBottom: "1px solid #1E1E1E"
      }}>
        <span style={{fontSize: "24px", fontWeight: "bold", color: "#00D4AA"}}>
          FinOS
        </span>
        <button style={{
          backgroundColor: "#00D4AA",
          color: "#0A0A0A",
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "14px"
        }}>
          Get Started
        </button>
      </nav>
      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        padding: "120px 60px 80px",
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "inline-block",
          backgroundColor: "#111111",
          border: "1px solid #1E1E1E",
          borderRadius: "20px",
          padding: "6px 16px",
          fontSize: "12px",
          color: "#00D4AA",
          marginBottom: "32px",
          letterSpacing: "1px"
        }}>
          FINANCIAL INTELLIGENCE FOR INDIAN BUSINESSES
        </div>

        <h1 style={{
          fontSize: "56px",
          fontWeight: "800",
          lineHeight: "1.1",
          marginBottom: "24px",
          background: "linear-gradient(135deg, #FFFFFF 0%, #888888 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Understand where your money comes from, where it goes, and how your business performs.
        </h1>

        <p style={{
          fontSize: "18px",
          color: "#888888",
          marginBottom: "40px",
          lineHeight: "1.6"
        }}>
          Upload your sales, expenses and bank data. Get instant financial intelligence. No accountant needed.
        </p>

        <div style={{display: "flex", gap: "16px", justifyContent: "center"}}>
          <button style={{
            backgroundColor: "#00D4AA",
            color: "#0A0A0A",
            border: "none",
            padding: "14px 32px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px"
          }}>
            Start Free → 
          </button>
          <button style={{
            backgroundColor: "transparent",
            color: "#FFFFFF",
            border: "1px solid #1E1E1E",
            padding: "14px 32px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}>
            See how it works
          </button>
        </div>
      </div>
      {/* Features Section */}
      <div style={{
        padding: "80px 60px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px"
        }}>

          {/* Feature 1 */}
          <div style={{
            backgroundColor: "#111111",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
            padding: "32px"
          }}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>📊</div>
            <h3 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "#FFFFFF"}}>
              Revenue Intelligence
            </h3>
            <p style={{color: "#888888", lineHeight: "1.6", fontSize: "14px"}}>
              Know your total revenue, top customers, and best-performing products instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{
            backgroundColor: "#111111",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
            padding: "32px"
          }}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>💰</div>
            <h3 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "#FFFFFF"}}>
              Profit Visibility
            </h3>
            <p style={{color: "#888888", lineHeight: "1.6", fontSize: "14px"}}>
              See your gross profit, net profit, and profit margin without waiting for your accountant.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{
            backgroundColor: "#111111",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
            padding: "32px"
          }}>
            <div style={{fontSize: "32px", marginBottom: "16px"}}>🏦</div>
            <h3 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "#FFFFFF"}}>
              Cash Flow Alerts
            </h3>
            <p style={{color: "#888888", lineHeight: "1.6", fontSize: "14px"}}>
              Get warned before your cash runs low. Never be surprised by your bank balance again.
            </p>
          </div>

        </div>
      </div>
      {/* Stats Section */}
      <div style={{
        padding: "60px",
        borderTop: "1px solid #1E1E1E",
        borderBottom: "1px solid #1E1E1E",
        display: "flex",
        justifyContent: "center",
        gap: "80px",
        textAlign: "center"
      }}>
        <div>
          <div style={{fontSize: "40px", fontWeight: "800", color: "#00D4AA"}}>6 Days</div>
          <div style={{color: "#888888", marginTop: "8px"}}>Saved per month on reporting</div>
        </div>
        <div>
          <div style={{fontSize: "40px", fontWeight: "800", color: "#00D4AA"}}>100%</div>
          <div style={{color: "#888888", marginTop: "8px"}}>Accurate financial data</div>
        </div>
        <div>
          <div style={{fontSize: "40px", fontWeight: "800", color: "#00D4AA"}}>Real-time</div>
          <div style={{color: "#888888", marginTop: "8px"}}>Financial intelligence</div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: "center",
        padding: "100px 60px"
      }}>
        <h2 style={{
          fontSize: "40px",
          fontWeight: "800",
          marginBottom: "16px",
          color: "#FFFFFF"
        }}>
          Ready to understand your business?
        </h2>
        <p style={{color: "#888888", marginBottom: "40px", fontSize: "18px"}}>
          Upload your data today. Get insights in minutes.
        </p>
        <button style={{
          backgroundColor: "#00D4AA",
          color: "#0A0A0A",
          border: "none",
          padding: "16px 40px",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "18px"
        }}>
          Start Free Today →
        </button>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1E1E1E",
        padding: "32px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{color: "#00D4AA", fontWeight: "bold", fontSize: "20px"}}>FinOS</span>
        <span style={{color: "#888888", fontSize: "14px"}}>
          Financial Intelligence for Indian Businesses
        </span>
      </div>
    </div>
  )
  
}