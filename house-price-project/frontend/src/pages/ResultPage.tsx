import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const price = location.state?.price;

  const formatPrice = (val: number) => {
    if (val >= 1e7) return `₹ ${(val / 1e7).toFixed(2)} Cr`;
    if (val >= 1e5) return `₹ ${(val / 1e5).toFixed(2)} Lac`;
    return `₹ ${val.toLocaleString()}`;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "440px",
        padding: "36px",
        borderRadius: "16px",
        backgroundColor: "rgba(17, 24, 39, 0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#10b98120",
          border: "1px solid #10b981",
          color: "#10b981",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          margin: "0 auto 16px auto",
        }}
      >
        ✓
      </div>

      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#9ca3af",
          marginBottom: "8px",
        }}
      >
        Estimated Market Valuation
      </h2>

      {price !== undefined ? (
        <div style={{ margin: "20px 0" }}>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#34d399",
              letterSpacing: "-0.5px",
            }}
          >
            {formatPrice(price)}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px" }}>
            Raw: ₹ {Math.round(price).toLocaleString()}
          </div>
        </div>
      ) : (
        <p style={{ color: "#ef4444", margin: "20px 0" }}>
          No valuation available.
        </p>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
        }}
      >
        Make Another Prediction
      </button>
    </div>
  );
};
