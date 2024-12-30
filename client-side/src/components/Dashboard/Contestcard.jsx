import React from "react";
import { Meteors } from "../ui/Meteors";

function ContestCard({ contestID, contestName, contestRank, ratingGain }) {
  const ratingChangeColor = ratingGain >= 0 ? "text-green-400" : "text-red-400";
  const arrow = ratingGain >= 0 ? "▲" : "▼";
  const gainValue = Math.abs(ratingGain);

  return (
    <div className="relative shadow-xl bg-gray-900 border border-gray-800 p-6 min-w-[300px] md:min-w-[350px] overflow-hidden rounded-2xl flex flex-col justify-end items-start transition-transform hover:scale-105">
      <div className="absolute inset-0 transform scale-[0.9] rounded-full blur-2xl" />
      <div className="relative z-10 w-full text-left">
        <h2 className="font-semibold text-lg text-white">
          {contestID}: {contestName}
        </h2>
        <p className="font-light text-base text-slate-300 mt-2">
          Rank: {contestRank}
        </p>
        <p
          className={`font-bold text-lg mt-2 ${ratingChangeColor} flex items-center`}
        >
          {arrow} {gainValue}
        </p>
        <button className="mt-4 bg-teal-500 px-4 py-2 rounded-md text-white text-sm hover:bg-teal-400 transition">
          Explore
        </button>
      </div>
      <Meteors number={3} />
    </div>
  );
}

export default function ContestDetails({ contestData }) {
  return (
    <div className="bg-gray-950 p-8 rounded-lg">
      <h3 className="text-2xl font-bold text-red-400 mb-6">Contests</h3>
      <div className="overflow-x-auto w-full">
        <div className="flex space-x-6">
          {contestData
            .slice()
            .reverse()
            .map((contest, index) => (
              <ContestCard
                key={index}
                contestID={contest.contestId}
                contestName={contest.contestName}
                contestRank={contest.rank}
                ratingGain={contest.newRating - contest.oldRating}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
