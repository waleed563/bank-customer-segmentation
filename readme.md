# Bank Customer Segmentation

## What is this project?
A machine learning web app that segments bank customers into 5 groups
based on their spending behavior, credit usage, and activity level.

Built with K-Means Clustering, FastAPI, and React.

---

## The Business Problem
Banks have thousands of customers with different spending habits.
Instead of treating all customers the same, banks can group similar
customers together and offer each group a tailored product or service.

This model takes customer financial data and assigns them to a segment
so the bank can make smarter decisions.

---

## Dataset
- Source: Kaggle — Bank Churners Dataset
- Rows: 10,127 bank customers
- Columns: 23 features
- No target column — unsupervised learning

---

## Algorithm — K-Means Clustering
K-Means is an unsupervised machine learning algorithm.
Unlike regression or classification, there is no target column.
The algorithm finds hidden groups (clusters) in the data by itself.

How it works:
1. Pick K number of clusters (we chose K=5)
2. Randomly place K center points
3. Assign each customer to the nearest center
4. Move centers to the average of their group
5. Repeat until centers stop moving

We used the Elbow Method to find the best K value.
The elbow chart showed the curve flattening around K=5.

---

## Features Used
| Feature | Description |
|---------|-------------|
| Customer_Age | Age of the customer |
| Credit_Limit | Maximum credit allowed |
| Total_Trans_Amt | Total transaction amount |
| Total_Trans_Ct | Total number of transactions |
| Avg_Utilization_Ratio | % of credit limit used |
| Months_Inactive_12_mon | Months inactive in last year |

---

## Customer Segments Found

| Cluster | Segment Name | Description |
|---------|-------------|-------------|
| 0 | Active High Spenders | High credit, highest spend, moderate utilization |
| 1 | Stretched Customers | Low credit, maxing out their card (65% utilization) |
| 2 | Inactive Low Spenders | Older, low spend, most inactive — churn risk |
| 3 | Wealthy Underusers | Highest credit but barely spends — untapped potential |
| 4 | Young Moderates | Youngest customers, moderate credit and spend |

---

## Why No Train/Test Split?
In supervised learning we split data to test if predictions are correct.
In clustering there are no correct answers — no labels to check against.
So we use ALL the data for training.

---

## Why We Scaled the Data
K-Means measures distance between data points.
If Credit_Limit (0-34,000) and Age (20-70) are on different scales,
credit limit dominates every calculation just because its numbers are bigger.

StandardScaler puts all columns on the same scale so every feature
has equal influence on the clustering.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Model | Python, Scikit-learn, K-Means |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Vite |
| Storage | Joblib (.pkl model files) |

---

## How to Run Locally

### Backend
```bash
source new_venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

API runs on: http://127.0.0.1:8000
UI runs on: http://localhost:5173