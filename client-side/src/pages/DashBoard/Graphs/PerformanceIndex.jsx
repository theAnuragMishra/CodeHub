import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

export default function ContestRankGraph({ ratingdata }) {
  const RatingChangeData = ratingdata.map((elt) => ({
    name: elt.contestName,
    uv: Math.max((10001 - elt.rank) / 10000, 0),
    amt: elt.newRating,
  }));

  return (
    <div className="w-full h-[400px] mt-4 mb-20 rounded-2xl bg-gradient-to-br from-blue-300/50 via-white/20 to-blue-600/30 backdrop-blur-md p-6 shadow-lg lg:h-[400px] md:h-[300px] sm:h-[250px] xs:h-[200px] xxs:h-[150px]">
      <h4 className="text-lg md:text-xl font-bold text-blue-700 text-center mb-6">
        Contest Performance Index
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={RatingChangeData}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 255, 0.2)" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'rgba(0,0,255,0.7)', fontWeight: 'bold' }}
          />
          <YAxis
            tick={{ fill: 'rgba(0,0,255,0.7)', fontWeight: 'bold' }}
            domain={[0, 1]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              color: 'black',
              border: '1px solid rgba(0,0,255,0.2)',
            }}
            labelStyle={{ color: 'blue', fontWeight: 'bold' }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ color: 'blue' }} />
          <Line
            name="Performance Index (PI for first rank is 1)"
            type="monotone"
            dataKey="uv"
            stroke="blue"
            strokeWidth={3}
            dot={{ stroke: 'blue', strokeWidth: 2, fill: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
