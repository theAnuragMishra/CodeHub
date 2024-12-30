import React from "react";
import './Graphs.css';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function LanguageGraph({ languagedata }) {
  const LanguageArr = Object.keys(languagedata.data).map((key) => ({
    name: key,
    value: languagedata.data[key],
  }));

  return (
    <div className="p-6 bg-gradient-to-b from-[#1E293B] to-[#334155] rounded-lg shadow-lg mb-12">
      {/* Title */}
      <h4 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-6">
        Languages Used
      </h4>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={LanguageArr}>
          <PolarGrid
            stroke="#475569"
            strokeOpacity={0.3}
          />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: "#A5B4FC", fontSize: 12, fontWeight: "bold" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, Math.max(...LanguageArr.map((item) => item.value))]}
            tick={{ fill: "#93C5FD", fontSize: 10 }}
            stroke="#475569"
          />
          <Radar
            name="Language Usage"
            dataKey="value"
            stroke="url(#gradientStroke)"
            fill="url(#gradientFill)"
            fillOpacity={0.7}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value) => [`${value}`, "Count"]}
            itemStyle={{ color: "#93C5FD" }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* SVG Gradient */}
      <svg>
        <defs>
          <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
