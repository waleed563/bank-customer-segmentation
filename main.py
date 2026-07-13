from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/kmeans_model.pkl")
scaler = joblib.load("model/scaler.pkl")

CLUSTER_NAMES = {
    0: "Active High Spenders",
    1: "Stretched Customers",
    2: "Inactive Low Spenders",
    3: "Wealthy Underusers",
    4: "Young Moderates"
}

class CustomerInput(BaseModel):
    Customer_Age: int
    Credit_Limit: float
    Total_Trans_Amt: float
    Total_Trans_Ct: int
    Avg_Utilization_Ratio: float
    Months_Inactive_12_mon: int

@app.post("/predict")
def predict(data: CustomerInput):
    features = np.array([[
        data.Customer_Age,
        data.Credit_Limit,
        data.Total_Trans_Amt,
        data.Total_Trans_Ct,
        data.Avg_Utilization_Ratio,
        data.Months_Inactive_12_mon,
    ]])
    scaled = scaler.transform(features)
    cluster = int(model.predict(scaled)[0])
    return {
        "cluster": cluster,
        "segment": CLUSTER_NAMES[cluster]
    }