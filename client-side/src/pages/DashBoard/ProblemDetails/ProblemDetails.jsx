import React, { useEffect, useState } from 'react';

function useCurrentWidth() {
  const getWidth = () => window.innerWidth;
  let [width, setWidth] = useState(getWidth());
  
  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  
  return width;
}

function ProblemCard(props) {
  const verdictData = [
    { name: 'Challenged', value: 'CHALLENGED', fill: '#9E00FF' },
    { name: 'Compilation error', value: 'COMPILATION_ERROR', fill: '#FF4A4A' },
    { name: 'Crashed', value: 'CRASHED', fill: '#005C90' },
    { name: 'Failed', value: 'FAILED', fill: '#630000' },
    { name: 'Accepted', value: 'OK', fill: '#478E00' },
    { name: 'Time limit exceeded', value: 'TIME_LIMIT_EXCEEDED', fill: '#AB7100' },
    { name: 'Wrong answer', value: 'WRONG_ANSWER', fill: '#FF0000' },
    // Add more verdicts if needed...
  ];

  let color = '';
  let name = '';
  for (let i of verdictData) {
    if (props.verdict === i.value) {
      color = i.fill;
      name = i.name;
    }
  }

  let userSubmissionRating = {};
  for (let i = 800; i <= 3500; i += 100) {
    userSubmissionRating[(i / 100) - 8] = '';
  }
  userSubmissionRating[0] = '#323232'; // 800
  userSubmissionRating[1] = '#323232'; // 900
  userSubmissionRating[2] = '#323232'; // 1000
  // Add more levels as needed...

  let colordifficulty = userSubmissionRating[(Number(props.difficulty) / 100) - 8];

  return useCurrentWidth() > 500 ? (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 transition-all hover:shadow-2xl">
      <div className="flex flex-col space-y-3">
        <div className="text-lg font-semibold text-gray-800">
          {props.index}: {props.name}
        </div>
        <div style={{ color }} className="text-sm text-gray-600">
          {name}
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-800">
            <span className="font-medium">Difficulty: </span>
            <span style={{ color: colordifficulty }} className="font-bold">{props.difficulty}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Time: </span>
            <span><b>{props.time}</b> ms</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <div className="text-lg font-semibold text-gray-800 mb-2">
        {props.index}: {props.name}
      </div>
      <div className="text-sm text-gray-600 mb-2" style={{ color }}>
        {name}
      </div>
      <div className="flex justify-between text-sm text-gray-800">
        <div>
          <span className="font-medium">Difficulty: </span>
          <span style={{ color: colordifficulty }} className="font-bold">{props.difficulty}</span>
        </div>
        <div>
          <span className="font-medium">Time: </span>
          <span><b>{props.time}</b> ms</span>
        </div>
      </div>
    </div>
  );
}

export default function ProblemDetails(props) {
  const [index, setIndex] = useState(0);
  const totalPage = Math.ceil(props.problemData.length / 20);
  const st = index * 20;
  const en = st + 20;
  const problemCards = [];

  for (let i = st; i < Math.min(en, props.problemData.length); i++) {
    let curProblem = props.problemData[i];
    problemCards.push(
      <ProblemCard
        key={i}
        index={curProblem.problem.index}
        name={curProblem.problem.name}
        difficulty={curProblem.problem.rating}
        verdict={curProblem.verdict}
        time={curProblem.timeConsumedMillis}
      />
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h4 className="text-2xl font-bold text-red-600 mb-6">Problems Solved</h4>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 focus:outline-none"
          onClick={() => setIndex(index > 0 ? index - 1 : index)}
        >
          Prev
        </button>
        <div className="text-lg">
          Page: <b className="text-blue-600">{index + 1}</b>/{totalPage}
        </div>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 focus:outline-none"
          onClick={() => setIndex(index < totalPage - 1 ? index + 1 : index)}
        >
          Next
        </button>
      </div>

      <div className="overflow-x-auto space-y-4">
        {problemCards}
      </div>
    </div>
  );
}
