from pathlib import Path
import json
import joblib
import pandas as pd
from app.schemas.prediction import PredictionRequest

BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODEL_PATH = BASE_DIR / "models" / "house_price.pkl"
LOCATIONS_PATH = BASE_DIR / "models" / "locations.json"
if not LOCATIONS_PATH.exists():
    LOCATIONS_PATH = BASE_DIR.parent / "notebooks" / "locations.json"

class InferenceService:
    def __init__(self):
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")
        self.model = joblib.load(MODEL_PATH)
        
        self.valid_locations = []
        if LOCATIONS_PATH.exists():
            with open(LOCATIONS_PATH, "r") as f:
                self.valid_locations = json.load(f)

    def predict(self, data: PredictionRequest) -> float:
        loc = data.location
        if self.valid_locations and loc not in self.valid_locations:
            loc = "other"

        input_data = pd.DataFrame([{
            "location_grouped": loc,
            "carpet_area_sqft": data.carpet_area_sqft,
            "floor_num": data.floor_num,
            "bathroom": data.bathroom,
            "balcony": data.balcony,
            "Furnishing": data.furnishing,
            "Transaction": data.transaction,
            "Ownership": data.ownership,
            "facing": data.facing
        }])
        
        prediction = self.model.predict(input_data)[0]
        return float(prediction)

inference_service = InferenceService()