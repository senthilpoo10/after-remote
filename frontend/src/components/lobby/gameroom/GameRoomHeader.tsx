// frontend/src/components/lobby/gameroom/GameRoomHeader.tsx
import React from 'react';

export const GameRoomHeader: React.FC = () => (
  <header className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      🎮 Available Games
    </h1>
    <p className="text-gray-300">Choose your game and start playing!</p>
  </header>
);