// frontend/src/components/lobby/gameroom/LocalGamesTab.tsx
import React from 'react';
import { GameType } from './types';

interface LocalGamesTabProps {
  gameType: GameType;
  color: string;
  createGame: (gameType: GameType, mode: "local") => void;
}

export const LocalGamesTab: React.FC<LocalGamesTabProps> = ({
  gameType,
  color,
  createGame
}) => (
  <div className="space-y-4">
    <div className="bg-gray-700 rounded-lg p-6 text-center">
      <div className="text-3xl mb-3">🏠</div>
      <h3 className="text-lg font-semibold mb-2">Local Multiplayer</h3>
      <p className="text-gray-400 text-sm mb-4">
        Play with a friend on the same device
      </p>
      <button 
        onClick={() => createGame(gameType, "local")} 
        className={`${color} hover:opacity-90 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 mx-auto`}
      >
        <span>🎮</span>
        Start Local Game
      </button>
    </div>
  </div>
);
