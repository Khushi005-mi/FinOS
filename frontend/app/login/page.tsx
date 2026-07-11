"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Connect to backend API
    console.log("Login attempt:", { email, password })
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div style={{
      backgroundColor: "#0A0A0A",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    }}>
      <div style={{
        backgroundColor: "#111111",
        border: "1px solid #1E1E1E",
        borderRadius: "16px",
        padding: "48px",
        maxWidth: "420px",
        width: "100%"
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#00D4AA" }}>FinOS</div>
          <div style={{ color: "#888888", fontSize: "14px", marginTop: "8px" }}>
            Sign in to your financial intelligence dashboard
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              color: "#888888", 
              fontSize: "12px", 
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "8px"
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "#0A0A0A",
                border: "1px solid #1E1E1E",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#00D4AA"}
              onBlur={(e) => e.target.style.borderColor = "#1E1E1E"}
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ 
              display: "block", 
              color: "#888888", 
              fontSize: "12px", 
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "8px"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "#0A0A0A",
                border: "1px solid #1E1E1E",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#00D4AA"}
              onBlur={(e) => e.target.style.borderColor = "#1E1E1E"}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#00D4AA",
              color: "#0A0A0A",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1,
              transition: "opacity 0.2s"
            }}
          >
            {isLoading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        {/* Sign up link */}
        <div style={{ 
          textAlign: "center", 
          marginTop: "24px",
          color: "#888888",
          fontSize: "14px"
        }}>
          Don't have an account?{" "}
          <a 
            href="#" 
            style={{ 
              color: "#00D4AA", 
              textDecoration: "none",
              fontWeight: "600"
            }}
            onClick={(e) => {
              e.preventDefault()
              router.push("/signup")
            }}
          >
            Sign up free
          </a>
        </div>
      </div>
    </div>
  )
}
