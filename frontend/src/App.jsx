import { useState } from "react"

export default function App() {
  const [form, setForm] = useState({
    Customer_Age: "",
    Credit_Limit: "",
    Total_Trans_Amt: "",
    Total_Trans_Ct: "",
    Avg_Utilization_Ratio: "",
    Months_Inactive_12_mon: ""
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Customer_Age: parseInt(form.Customer_Age) || 0,
          Credit_Limit: parseFloat(form.Credit_Limit) || 0,
          Total_Trans_Amt: parseFloat(form.Total_Trans_Amt) || 0,
          Total_Trans_Ct: parseInt(form.Total_Trans_Ct) || 0,
          Avg_Utilization_Ratio: parseFloat(form.Avg_Utilization_Ratio) || 0,
          Months_Inactive_12_mon: parseInt(form.Months_Inactive_12_mon) || 0,
        }),
      })
      const data = await response.json()
      setResult(data)
    } catch (err) {
      alert("Error connecting to API")
    }
    setLoading(false)
  }

  const segmentColors = {
    "Active High Spenders": "#4CAF50",
    "Stretched Customers": "#f44336",
    "Inactive Low Spenders": "#FF9800",
    "Wealthy Underusers": "#2196F3",
    "Young Moderates": "#9C27B0"
  }

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Bank Customer Segmentation</h1>
      <p style={{ textAlign: "center", color: "#666" }}>Enter customer details to find their segment</p>

      {Object.keys(form).map((key) => (
        <div key={key} style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>{key.replace(/_/g, " ")}</label>
          <input
            name={key}
            placeholder={`Enter ${key.replace(/_/g, " ")}`}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100%", padding: "12px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
        {loading ? "Analyzing..." : "Find Customer Segment"}
      </button>

      {result && (
        <div style={{ marginTop: "20px", padding: "20px", borderRadius: "8px", backgroundColor: "#f5f5f5", textAlign: "center" }}>
          <h2>Customer Segment</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: segmentColors[result.segment] || "#333" }}>
            {result.segment}
          </p>
          <p style={{ color: "#666" }}>Cluster Group: {result.cluster}</p>
        </div>
      )}
    </div>
  )
}