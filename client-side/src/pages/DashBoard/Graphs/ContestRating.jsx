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

export default function RatingChangesGraph({ ratingdata }) {
  const RatingChangeData = ratingdata.map((elt) => ({
    name: elt.contestName,
    uv: elt.newRating,
    amt: elt.newRating,
  }));

  return (
    <div className="w-full h-[400px] mt-4 mb-20 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 p-4 shadow-lg lg:h-[400px] md:h-[300px] sm:h-[250px] xs:h-[200px] xxs:h-[150px]">
      <h4 className="text-lg md:text-xl font-semibold text-white text-center mb-4">
        Contest Ratings
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={RatingChangeData}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderRadius: '8px',
              color: 'white',
            }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ color: 'white' }} />
          <Line
            name="New Rating"
            type="monotone"
            dataKey="uv"
            stroke="rgb(255,99,132)"
            strokeWidth={3}
            dot={{ stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
