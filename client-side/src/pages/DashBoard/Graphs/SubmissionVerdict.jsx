import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

export default function VerdictGraph({ verdictdata }) {
  const verdictData = [
    { name: 'Challenged', value: verdictdata.CHALLENGED, fill: '#845EC2' },
    { name: 'Compilation Error', value: verdictdata.COMPILATION_ERROR, fill: '#FF6F91' },
    { name: 'Crashed', value: verdictdata.CRASHED, fill: '#FFC75F' },
    { name: 'Failed', value: verdictdata.FAILED, fill: '#D65DB1' },
    { name: 'Idleness Limit Exceeded [ILE]', value: verdictdata.IDLENESS_LIMIT_EXCEEDED, fill: '#FF9671' },
    { name: 'Input Preparation Crashed', value: verdictdata.INPUT_PREPARATION_CRASHED, fill: '#FFC75F' },
    { name: 'Memory Limit Exceeded [MLE]', value: verdictdata.MEMORY_LIMIT_EXCEEDED, fill: '#F9F871' },
    { name: 'Accepted [AC]', value: verdictdata.OK, fill: '#00C9A7' },
    { name: 'Partial', value: verdictdata.PARTIAL, fill: '#008E9B' },
    { name: 'Presentation Error', value: verdictdata.PRESENTATION_ERROR, fill: '#008F7A' },
    { name: 'Rejected', value: verdictdata.REJECTED, fill: '#B39CD0' },
    { name: 'Runtime Error [RE]', value: verdictdata.RUNTIME_ERROR, fill: '#6A0572' },
    { name: 'Security Violated', value: verdictdata.SECURITY_VIOLATED, fill: '#FF5E78' },
    { name: 'Skipped', value: verdictdata.SKIPPED, fill: '#6A1B4D' },
    { name: 'Testing', value: verdictdata.TESTING, fill: '#FFC75F' },
    { name: 'Time Limit Exceeded [TLE]', value: verdictdata.TIME_LIMIT_EXCEEDED, fill: '#FF9671' },
    { name: 'Wrong Answer [WA]', value: verdictdata.WRONG_ANSWER, fill: '#FF4B5C' },
  ];

  const totalValue = verdictData.reduce((sum, verdict) => sum + (verdict.value || 0), 0);

  return (
    <div className="mb-12 bg-gradient-to-b from-[#1E2A38] to-[#3E5060] p-6 rounded-lg shadow-2xl">
      {/* Title */}
      <h4 className="text-center text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
        Submission Verdicts
      </h4>

      {/* Container */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Legend */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md max-w-xs">
          <h5 className="text-lg font-semibold text-white text-center mb-4">Verdict Summary</h5>
          {verdictData.map(
            (verdict, index) =>
              verdict.value > 0 && (
                <div key={index} className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: verdict.fill }}
                    ></span>
                    <span className="text-sm text-white">{verdict.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {verdict.value}
                  </span>
                </div>
              )
          )}
        </div>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={verdictData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#82ca9d"
              label={(entry) => `${((entry.value / totalValue) * 100).toFixed(1)}%`}
              labelLine={false}
            />
            <Tooltip
              formatter={(value) => `${((value / totalValue) * 100).toFixed(1)}%`}
              contentStyle={{
                backgroundColor: '#2B3743',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
              }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
