// frontend/src/components/lobby/gameroom/OnlineGamesTab.tsx
import React from 'react';
import { PongRoom, KeyClashRoom, GameType } from './types';
import { GameRoomCard } from './GameRoomCard';

interface OnlineGamesTabProps {
  games: (PongRoom | KeyClashRoom)[];
  gameType: GameType;
  color: string;
  joinGame: (gameId: string, game: GameType, mode: "remote") => void;
  createGame: (gameType: GameType, mode: "remote") => void;
}

export const OnlineGamesTab: React.FC<OnlineGamesTabProps> = ({
  games,
  gameType,
  color,
  joinGame,
  createGame
}) => (
  <>
    {games.map(game => (
      <GameRoomCard
        key={game.id}
        game={game}
        gameType={gameType}
        color={color}
        joinGame={joinGame}
      />
    ))}
    {games.length === 0 && (
      <div className="text-center text-gray-400 py-8 bg-gray-700 rounded-lg">
        <div className="text-2xl mb-2">🎮</div>
        <div>No games available</div>
        <div className="text-sm mt-1">Create one to get started!</div>
      </div>
    )}
    <button 
      onClick={() => createGame(gameType, "remote")} 
      className={`w-full ${color} hover:opacity-90 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2`}
    >
      <span>🌐</span>
      Create Online Game
    </button>
  </>
);