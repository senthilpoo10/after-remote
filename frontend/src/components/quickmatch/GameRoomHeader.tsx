// // frontend/src/components/lobby/gameroom/GameRoomHeader.tsx
// import React from 'react';

// export const GameRoomHeader: React.FC = () => (
//   <header className="text-center mb-8">
//     <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//       🎮 Available Games
//     </h1>
//     <p className="text-gray-300">Choose your game and start playing!</p>
//   </header>
// );

// frontend/src/components/lobby/gameroom/GameRoomHeader.tsx
import React from 'react';

interface GameRoomHeaderProps {
  type?: 'quick' | 'championship' | null;
  onBack: () => void;
}

export const GameRoomHeader: React.FC<GameRoomHeaderProps> = ({ type, onBack }) => (
  <div className="mb-8">
    {/* Back Button */}
    <button 
      onClick={onBack} 
      className="mb-6 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center gap-2 transition-colors"
    >
      <span>←</span>
      Back to Lobby
    </button>

    {/* Dynamic Header Based on Type */}
    <header className="text-center">
      {type === 'quick' ? (
        <>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            ⚡ Quick Match
          </h1>
          <p className="text-gray-300">Jump into a game instantly! Choose your preferred game type.</p>
        </>
      ) : type === 'championship' ? (
        <>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🏆 Championship
          </h1>
          <p className="text-gray-300">Compete in tournaments and climb the leaderboards!</p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            ⚡ Quick Match Arena
          </h1>
          <p className="text-gray-300">Choose your game and start playing!</p>
        </>
      )}
    </header>
  </div>
);