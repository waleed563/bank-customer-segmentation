# Bank Customer Segmentation

## Live Demo
- **Frontend:** https://bank-customer-segmentation.vercel.app/
- **Backend API:** https://bank-customer-segmentation-door.onrender.com/docs

---

## What is this project?
A machine learning web app that segments bank customers into 5 groups
based on their spending behavior, credit usage, and activity level.

Built with K-Means Clustering, FastAPI, and React.

---

## The Business Problem
Banks have thousands of customers with different spending habits.
Instead of treating all customers the same, banks can group similar
customers together and offer each group a tailored product or service.

---

## Dataset
- Source: Kaggle — Bank Churners Dataset
- Rows: 10,127 bank customers
- Columns: 23 features
- No target column — unsupervised learning

---

## Test the Model

### Active High Spender
| Field | Value |
|-------|-------|
| Customer Age | 42 |
| Credit Limit | 14000 |
| Total Trans Amt | 14000 |
| Total Trans Ct | 110 |
| Avg Utilization Ratio | 0.18 |
| Months Inactive | 2 |

Expected: **Active High Spenders**

---

### Stretched Customer
| Field | Value |
|-------|-------|
| Customer Age | 46 |
| Credit Limit | 2500 |
| Total Trans Amt | 3800 |
| Total Trans Ct | 66 |
| Avg Utilization Ratio | 0.65 |
| Months Inactive | 2 |

Expected: **Stretched Customers**

---

### Wealthy Underuser
| Field | Value |
|-------|-------|
| Customer Age | 42 |
| Credit Limit | 30000 |
| Total Trans Amt | 7000 |
| Total Trans Ct | 80 |
| Avg Utilization Ratio | 0.05 |
| Months Inactive | 2 |

Expected: **Wealthy Underusers**

---

## Customer Segments

| Cluster | Segment | Description |
|---------|---------|-------------|
| 0 | Active High Spenders | High credit, highest spend |
| 1 | Stretched Customers | Low credit, maxing out card |
| 2 | Inactive Low Spenders | Older, low spend, churn risk |
| 3 | Wealthy Underusers | High credit, barely spends |
| 4 | Young Moderates | Youngest, moderate everything |

---

## Algorithm — K-Means Clustering
K-Means is unsupervised — no target column, no train/test split.
It finds hidden groups in data by itself.

We used the Elbow Method to find K=5 as the optimal number of clusters.
Data was scaled with StandardScaler before clustering so no single
feature dominates the distance calculation.

---

## Evaluation
K-Means has no accuracy score like supervised models.
We evaluated clusters by interpreting their average values:
- Credit limit per cluster
- Spending amount per cluster  
- Utilization ratio per cluster

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Model | Python, Scikit-learn, K-Means |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Vite |
| Deployment | Render (backend), Vercel (frontend) |

---

## Features Used
| Feature | Description |
|---------|-------------|
| Customer_Age | Age of the customer |
| Credit_Limit | Maximum credit allowed |
| Total_Trans_Amt | Total transaction amount |
| Total_Trans_Ct | Total number of transactions |
| Avg_Utilization_Ratio | % of credit limit used (0.0 to 1.0) |
| Months_Inactive_12_mon | Months inactive in last year |
