from fastapi import APIRouter
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.inference import inference_service

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
def predict(payload: PredictionRequest):
    price = inference_service.predict(payload)
    return PredictionResponse(predicted_price=price)