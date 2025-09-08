// frontend/src/components/lobby/gameroom/GameRoomCard.tsx
import React from 'react';
import { PongRoom, KeyClashRoom, GameType } from './types';

interface GameRoomCardProps {
  game: PongRoom | KeyClashRoom;
  gameType: GameType;
  color: string;
  joinGame: (gameId: string, game: GameType, mode: "remote") => void;
}

export const GameRoomCard: React.FC<GameRoomCardProps> = ({ 
  game, 
  gameType, 
  color, 
  joinGame 
}) => (
  <div 
    key={game.id}
    className={`p-3 rounded-lg cursor-pointer transition border-l-4 ${
      game.status === "waiting" 
        ? `${color.replace('bg-', 'border-')} bg-gray-700 hover:bg-gray-600` 
        : "border-gray-500 bg-gray-600 cursor-default opacity-60"
    }`}
    onClick={() => game.status === "waiting" && joinGame(game.id, gameType, "remote")}
  >
    <div className="flex justify-between items-center">
      <span className="font-semibold">Room #{game.id}</span>
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        game.status === "waiting" ? "bg-yellow-500 text-yellow-900" : 
        game.status === "in-progress" ? "bg-blue-500 text-blue-900" : "bg-red-500 text-red-900"
      }`}>
        {game.status.toUpperCase()}
      </span>
    </div>
    <div className="text-sm mt-2 flex items-center gap-2">
      <span className="text-gray-400">👥</span>
      <span>
        {gameType === "pong" 
          ? `${(game as PongRoom).players.length}/2 players`
          : `${Object.keys((game as KeyClashRoom).players).length}/2 players`
        }
      </span>
    </div>
    <div className="text-xs text-gray-400 mt-1">
      {gameType === "pong" 
        ? (game as PongRoom).players.map(p => p.name).join(', ')
        : `${(game as KeyClashRoom).p1 || 'Empty'} vs ${(game as KeyClashRoom).p2 || 'Empty'}`
      }
    </div>
  </div>
);