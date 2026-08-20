import type {
  PredictionRequest,
  PredictionResponse,
} from "../types/prediction";

export async function predictPrice(
  data: PredictionRequest,
): Promise<PredictionResponse> {
  const response = await fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `Prediction request failed with status: ${response.status}`,
    );
  }

  return response.json();
}
