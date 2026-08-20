# House Price Prediction (End-to-End ML Web App)

An end-to-end Machine Learning web application to predict property prices in India based on listings features.

## Architecture

- **Data & Modeling:** Python, Pandas, Scikit-learn, Random Forest Regressor Pipeline.
- **Backend:** FastAPI, Pydantic, Uvicorn (REST API).
- **Frontend:** React, TypeScript, Vite.

## Dataset

- **Source:** [Kaggle House Price Dataset by Juhi Bhojani](https://www.kaggle.com/datasets/juhibhojani/house-price)
- Place `house_prices.csv` inside `notebooks/data/`.

## Setup & Running

### 1. Backend

```bash
cd backend
python -m venv .venv
# Activate venv (.venv\Scripts\activate on Windows)
pip install -r requirements.txt
python -m pytest
python -m uvicorn app.main:app --reload
```
### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```
## Team Members

* **Eslam Mohamed Nabil Mohamed**
* **Seif Eldeen Ahmed Hamed**

