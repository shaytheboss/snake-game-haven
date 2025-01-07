import React from 'react';
import { Button } from "@/components/ui/button";

interface GameControlsProps {
  onStart: () => void;
  isPlaying: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ onStart, isPlaying }) => {
  return (
    <div className="mt-4">
      <Button 
        onClick={onStart}
        className="bg-snake hover:bg-snake/90 text-background font-bold"
      >
        {isPlaying ? 'Restart' : 'Start Game'}
      </Button>
    </div>
  );
};

export default GameControls;