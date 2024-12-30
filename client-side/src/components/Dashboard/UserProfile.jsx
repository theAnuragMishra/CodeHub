import React from 'react';

export default function UserProfile({ name, rank, image, userDetail }) {
  const rankStyles = {
    newbie: {
      bg: 'bg-gray-200',
      text: 'text-gray-600',
      title: 'Newbie',
    },
    pupil: {
      bg: 'bg-green-200',
      text: 'text-green-700',
      title: 'Pupil',
    },
    specialist: {
      bg: 'bg-blue-200',
      text: 'text-blue-700',
      title: 'Specialist',
    },
    expert: {
      bg: 'bg-purple-200',
      text: 'text-purple-700',
      title: 'Expert',
    },
    'candidate master': {
      bg: 'bg-red-200',
      text: 'text-red-700',
      title: 'Candidate Master',
    },
    master: {
      bg: 'bg-yellow-200',
      text: 'text-yellow-700',
      title: 'Master',
    },
    'international master': {
      bg: 'bg-orange-200',
      text: 'text-orange-700',
      title: 'International Master',
    },
    grandmaster: {
      bg: 'bg-pink-200',
      text: 'text-pink-700',
      title: 'Grandmaster',
    },
    'international grandmaster': {
      bg: 'bg-indigo-200',
      text: 'text-indigo-700',
      title: 'International Grandmaster',
    },
    'legendary grandmaster': {
      bg: 'bg-rose-200',
      text: 'text-rose-700',
      title: 'Legendary Grandmaster',
    },
    unrated: {
      bg: 'bg-gray-100',
      text: 'text-gray-500',
      title: 'Unrated',
    },
  };

  const style = rankStyles[rank] || rankStyles.unrated;

  const details = [
    { label: 'Name', data: userDetail.name },
    { label: 'Handle', data: userDetail.handle },
    { label: 'Rating', data: userDetail.rating },
    { label: 'Contributions', data: userDetail.contributions },
    { label: 'Contests Given', data: userDetail.contestGiven },
    { label: 'Problems Solved', data: userDetail.problemSolved },
    { label: 'Total Submissions Made', data: userDetail.submissionsMade },
    { label: 'Best Rank', data: userDetail.bestRank },
    { label: 'Highest Rating Gain', data: userDetail.HighestRatingGain },
  ];

  return (
    <div className="max-w-6xl bg-black mx-auto py-12 px-6">
      {/* Profile Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">

        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center items-center">
          <img
            className="rounded-full w-32 h-32 object-cover shadow-lg"
            src={image}
            alt={`${name}'s profile`}
          />
        </div>

        {/* Name and Rank */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
          <div
            className={`py-2 px-4 text-sm font-semibold rounded-md inline-block ${style.bg} ${style.text}`}
          >
            {style.title}
          </div>
        </div>

      </div>

      {/* Details Section */}
      <div className="mt-12 space-y-8">
        {/* Highest Rank */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Highest Rank</div>
          <div
            className={`py-1 px-4 text-sm font-medium rounded-md inline-block ${style.bg} ${style.text}`}
          >
            {userDetail.bestRank || 'Not Ranked'}
          </div>
        </div>

        {/* User Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {details.map((detail, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center"
            >
              <span className="text-gray-500 font-medium">{detail.label}</span>
              <span className="text-gray-800 font-semibold">{detail.data}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
