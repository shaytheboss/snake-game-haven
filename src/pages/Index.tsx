import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import GameControls from '../components/GameControls';
import { useToast } from "@/components/ui/use-toast";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const SPEED = 150;

const Index = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { toast } = useToast();

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setScore(0);
    setIsPlaying(true);
  }, []);

  const checkCollision = useCallback((head: { x: number; y: number }) => {
    return (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
    );
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (!isPlaying) return;

    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
      }
      toast({
        title: "Game Over!",
        description: `Final Score: ${score}`,
      });
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore((prev) => prev + 1);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }, [snake, direction, food, isPlaying, score, highScore, checkCollision, generateFood, toast]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (isPlaying) {
      const gameLoop = setInterval(moveSnake, SPEED);
      return () => clearInterval(gameLoop);
    }
  }, [isPlaying, moveSnake]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Snake Game</h1>
      <ScoreBoard score={score} highScore={highScore} />
      <GameBoard snake={snake} food={food} gridSize={GRID_SIZE} />
      <GameControls onStart={resetGame} isPlaying={isPlaying} />
      {!isPlaying && score === 0 && (
        <p className="text-gray-400 mt-4">Use arrow keys to control the snake</p>
      )}
    </div>
  );
};

export default Index;