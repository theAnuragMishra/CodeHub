import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export default function QuestionRatingGraphs({ questionratingdata }) {
  // Filter out data with zero values
  const questionRatingDataFiltered = questionratingdata.filter((data) => data.uv !== 0);

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(145deg, #1e293b, #334155)",
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
        marginBottom: "20px",
      }}
    >
      {/* Title */}
      <h4
        style={{
          textAlign: "center",
          color: "rgb(93, 230, 224)",
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Solved Problems (Rating)
      </h4>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={questionRatingDataFiltered}>
          <CartesianGrid stroke="#475569" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#A5B4FC", fontWeight: "bold", fontSize: 12 }}
            label={{
              value: "Ratings",
              position: "insideBottom",
              offset: -10,
              fill: "#CBD5E1",
            }}
          />
          <YAxis
            tick={{ fill: "#A5B4FC", fontSize: 12 }}
            label={{
              value: "Problems Solved",
              angle: -90,
              position: "insideLeft",
              fill: "#CBD5E1",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#7DD3FC" }}
            formatter={(value) => [`${value} Problems`, "Solved"]}
          />
          <Legend
            wrapperStyle={{ color: "#94A3B8" }}
          />
          <Bar
            name="Number of problems solved"
            dataKey="uv"
            fill="url(#barGradient)"
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* SVG Gradient */}
      <svg>
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
