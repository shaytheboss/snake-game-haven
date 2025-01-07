import React from 'react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="flex justify-between w-full max-w-md mb-4 px-4">
      <div className="text-white">
        <span className="text-gray-400">Score: </span>
        {score}
      </div>
      <div className="text-white">
        <span className="text-gray-400">High Score: </span>
        {highScore}
      </div>
    </div>
  );
};

export default ScoreBoard;