import React from 'react';
import { cn } from "@/lib/utils";

interface GameBoardProps {
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  gridSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize }) => {
  const grid = Array(gridSize).fill(Array(gridSize).fill(0));

  return (
    <div className="inline-grid gap-[1px] bg-gray-700 p-4 rounded-lg">
      {grid.map((row, y) =>
        row.map((_, x) => {
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={`${x}-${y}`}
              className={cn(
                "w-5 h-5 rounded-sm",
                isSnake && "bg-snake animate-snake-move",
                isFood && "bg-food",
                !isSnake && !isFood && "bg-background"
              )}
            />
          );
        })
      )}
    </div>
  );
};

export default GameBoard;