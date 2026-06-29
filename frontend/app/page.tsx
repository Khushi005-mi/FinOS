"use client"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const client_id = "f1e0c59b-73ff-4a4c-b963-9c62ed68721d"

  useEffect(() => {
    fetch(`http://localhost:8000/intelligence/${client_id}`)
      .then(res => res.json())
      .then(json => setData(json))
  }, [])

  if (!data) return <div className="p-8">Loading FinOS...</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1  className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">FinOS</h1>
        <p className="text-xl text-gray-600 mt-1">GreenLeaf Supplies — Financial Intelligence</p>
        <p className="text-sm text-gray-400 mt-1">Manufacturing | Jaipur, India | INR</p>
     
      </h1>
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{data.revenue.total_revenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">
            ₹{data.expenses.total_expense.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Net Cash Position</p>
          <p className="text-2xl font-bold text-purple-600">
            ₹{data.cash.net_cash.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Gross Profit</p>
          <p className="text-2xl font-bold text-blue-600">
            ₹{data.profit.gross_profit.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Top Customer</p>
          <p className="text-2xl font-bold text-yellow-600">
            {data.customers.best_customer}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Profit Margin</p>
          <p className="text-2xl font-bold text-orange-600">
            {data.profit.profit_margin}%
          </p>
        </div>
    </div>
  )
}