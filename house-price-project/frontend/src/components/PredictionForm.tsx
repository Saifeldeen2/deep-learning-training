import React, { useState } from "react";
import locationsData from "../locations.json";
import type { PredictionRequest } from "../types/prediction";

interface Props {
  onSubmit: (data: PredictionRequest) => void;
  loading: boolean;
}

export const PredictionForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<PredictionRequest>({
    location: locationsData[0] || "other",
    carpet_area_sqft: 1000,
    floor_num: 1,
    bathroom: 1,
    balcony: 0,
    furnishing: "Unfurnished",
    transaction: "Resale",
    ownership: "Freehold",
    facing: "North",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.carpet_area_sqft <= 0) {
      setError("Carpet area must be greater than 0");
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #374151",
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    fontSize: "14px",
    outline: "none",
    marginTop: "6px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {error && (
        <div
          style={{
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#ef444420",
            border: "1px solid #ef4444",
            color: "#f87171",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      <label style={labelStyle}>
        Location
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={inputStyle}
        >
          {locationsData.map((loc: string) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </label>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <label style={labelStyle}>
          Carpet Area (sqft)
          <input
            type="number"
            name="carpet_area_sqft"
            value={formData.carpet_area_sqft}
            onChange={handleChange}
            required
            min="1"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Floor Number
          <input
            type="number"
            name="floor_num"
            value={formData.floor_num}
            onChange={handleChange}
            required
            min="0"
            style={inputStyle}
          />
        </label>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <label style={labelStyle}>
          Bathrooms
          <input
            type="number"
            name="bathroom"
            value={formData.bathroom}
            onChange={handleChange}
            required
            min="1"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Balconies
          <input
            type="number"
            name="balcony"
            value={formData.balcony}
            onChange={handleChange}
            required
            min="0"
            style={inputStyle}
          />
        </label>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <label style={labelStyle}>
          Furnishing
          <select
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </label>

        <label style={labelStyle}>
          Transaction
          <select
            name="transaction"
            value={formData.transaction}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Resale">Resale</option>
            <option value="New Property">New Property</option>
          </select>
        </label>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <label style={labelStyle}>
          Ownership
          <select
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
            <option value="Power Of Attorney">Power Of Attorney</option>
            <option value="Co-Operative Society">Co-Operative Society</option>
          </select>
        </label>

        <label style={labelStyle}>
          Facing
          <select
            name="facing"
            value={formData.facing}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North - East">North - East</option>
            <option value="North - West">North - West</option>
            <option value="South - East">South - East</option>
            <option value="South - West">South - West</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          background: loading
            ? "#4b5563"
            : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "15px",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
          transition: "transform 0.1s ease",
        }}
      >
        {loading ? "Calculating Estimate..." : "Predict Property Price"}
      </button>
    </form>
  );
};
