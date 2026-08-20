import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PredictionForm } from "../components/PredictionForm";
import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePredict = async (data: PredictionRequest) => {
    setLoading(true);
    setApiError(null);
    try {
      const result = await predictPrice(data);
      navigate("/result", { state: { price: result.predicted_price } });
    } catch (err: any) {
      setApiError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "480px",
        padding: "32px",
        borderRadius: "16px",
        backgroundColor: "rgba(17, 24, 39, 0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#f9fafb",
            letterSpacing: "-0.5px",
          }}
        >
          House Price Estimator
        </h1>
        <p style={{ fontSize: "14px", color: "#9ca3af", marginTop: "6px" }}>
          AI-driven valuation model
        </p>
      </div>

      {apiError && (
        <div
          style={{
            marginBottom: "16px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#ef444420",
            border: "1px solid #ef4444",
            color: "#f87171",
            fontSize: "13px",
          }}
        >
          {apiError}
        </div>
      )}

      <PredictionForm onSubmit={handlePredict} loading={loading} />
    </div>
  );
};
