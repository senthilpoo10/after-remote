// // frontend/src/components/lobby/gameroom/LocalGamesTab.tsx
// import React from 'react';
// import { GameType } from './types';

// interface LocalGamesTabProps {
//   gameType: GameType;
//   color: string;
//   createGame: (gameType: GameType, mode: "local") => void;
// }

// export const LocalGamesTab: React.FC<LocalGamesTabProps> = ({
//   gameType,
//   color,
//   createGame
// }) => (
//   <div className="space-y-4">
//     <div className="bg-gray-700 rounded-lg p-6 text-center">
//       <div className="text-3xl mb-3">🏠</div>
//       <h3 className="text-lg font-semibold mb-2">Local Multiplayer</h3>
//       <p className="text-gray-400 text-sm mb-4">
//         Play with a friend on the same device
//       </p>
//       <button 
//         onClick={() => createGame(gameType, "local")} 
//         className={`${color} hover:opacity-90 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 mx-auto`}
//       >
//         <span>🎮</span>
//         Start Local Game
//       </button>
//     </div>
//   </div>
// );

// frontend/src/components/quickmatch/LocalGamesTab.tsx
// frontend/src/components/quickmatch/LocalGamesTab.tsx
import React, { useState, useEffect } from 'react';
import { GameType } from './types';
import { useAuth } from '../../contexts/AuthContext';
import validator from 'validator';

interface GameAvatar {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const AVATARS: GameAvatar[] = [
  { id: 'fire', name: 'Fire', emoji: '🔥', color: 'bg-red-500' },
  { id: 'cool', name: 'Cool', emoji: '😎', color: 'bg-blue-500' },
  { id: 'star', name: 'Star', emoji: '⭐', color: 'bg-yellow-500' },
  { id: 'rocket', name: 'Rocket', emoji: '🚀', color: 'bg-purple-500' },
  { id: 'crown', name: 'Crown', emoji: '👑', color: 'bg-yellow-600' },
  { id: 'lightning', name: 'Lightning', emoji: '⚡', color: 'bg-indigo-500' },
  { id: 'diamond', name: 'Diamond', emoji: '💎', color: 'bg-cyan-500' },
  { id: 'robot', name: 'Robot', emoji: '🤖', color: 'bg-gray-500' },
];

interface LocalGamesTabProps {
  gameType: GameType;
  color: string;
  createGame: (gameType: GameType, mode: "local") => void;
}

export const LocalGamesTab: React.FC<LocalGamesTabProps> = ({
  gameType,
  color,
  createGame
}) => {
  const { user } = useAuth();
  
  // ✨ Enhanced state management with localStorage
  const [player1Avatar, setPlayer1Avatar] = useState<GameAvatar | null>(() => {
    const saved = localStorage.getItem(`${gameType}_player1Avatar`);
    return saved ? JSON.parse(saved) : null;
  });
  
  const [player2Avatar, setPlayer2Avatar] = useState<GameAvatar | null>(() => {
    const saved = localStorage.getItem(`${gameType}_player2Avatar`);
    return saved ? JSON.parse(saved) : null;
  });
  
  const [player2Name, setPlayer2Name] = useState(() => {
    return localStorage.getItem(`${gameType}_player2Name`) || '';
  });
  
  const [player1AvatarOpen, setPlayer1AvatarOpen] = useState(false);
  const [player2AvatarOpen, setPlayer2AvatarOpen] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // ✨ Auto-save to localStorage
  useEffect(() => {
    if (player1Avatar) {
      localStorage.setItem(`${gameType}_player1Avatar`, JSON.stringify(player1Avatar));
    }
  }, [player1Avatar, gameType]);

  useEffect(() => {
    if (player2Avatar) {
      localStorage.setItem(`${gameType}_player2Avatar`, JSON.stringify(player2Avatar));
    }
  }, [player2Avatar, gameType]);

  useEffect(() => {
    if (player2Name) {
      localStorage.setItem(`${gameType}_player2Name`, player2Name);
    }
  }, [player2Name, gameType]);

  // ✨ Enhanced validation like your friend's code
  const validateAndStartGame = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate player 2 name
    if (!player2Name.trim()) {
      newErrors.player2Name = 'Player 2 name is required';
    } else if (!validator.isAlphanumeric(player2Name.replace(/\s/g, ''))) {
      newErrors.player2Name = 'Player 2 name must contain only letters and numbers';
    } else if (player2Name.trim() === (user?.name || '').trim()) {
      newErrors.player2Name = 'Player 2 name cannot be the same as Player 1';
    }

    // Validate avatars
    if (!player1Avatar) {
      newErrors.player1Avatar = 'Player 1 must choose an avatar';
    }
    
    if (!player2Avatar) {
      newErrors.player2Avatar = 'Player 2 must choose an avatar';
    }

    if (player1Avatar && player2Avatar && player1Avatar.id === player2Avatar.id) {
      newErrors.avatars = 'Players cannot have the same avatar';
    }

    setErrors(newErrors);

    // If no errors, start the game
    if (Object.keys(newErrors).length === 0) {
      // Store final game setup
      const gameSetup = {
        player1: {
          name: user?.name || 'Player 1',
          avatar: player1Avatar
        },
        player2: {
          name: player2Name.trim(),
          avatar: player2Avatar
        },
        gameType
      };
      
      localStorage.setItem('localGameSetup', JSON.stringify(gameSetup));
      createGame(gameType, "local");
    }
  };

  // ✨ Clear error when user fixes issue
  const handlePlayer2NameChange = (value: string) => {
    setPlayer2Name(value);
    if (errors.player2Name) {
      setErrors(prev => ({ ...prev, player2Name: '' }));
    }
  };

  const handleAvatarSelect = (avatar: GameAvatar, player: 'player1' | 'player2') => {
    if (player === 'player1') {
      setPlayer1Avatar(avatar);
      setPlayer1AvatarOpen(false);
      if (errors.player1Avatar) {
        setErrors(prev => ({ ...prev, player1Avatar: '' }));
      }
    } else {
      setPlayer2Avatar(avatar);
      setPlayer2AvatarOpen(false);
      if (errors.player2Avatar) {
        setErrors(prev => ({ ...prev, player2Avatar: '' }));
      }
    }
    
    // Clear avatar conflict error if it exists
    if (errors.avatars) {
      setErrors(prev => ({ ...prev, avatars: '' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-900 border border-red-500 rounded-lg p-3">
          <h4 className="font-bold text-red-200 mb-2">Please fix the following:</h4>
          <ul className="text-red-300 text-sm space-y-1">
            {Object.values(errors).map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Player Setup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player 1 - Similar to your friend's structure */}
        <div className="bg-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-400 text-xl">👤</span>
            <h3 className="text-xl font-bold text-white">Player 1</h3>
          </div>
          
          <div className="text-center">
            <div className="text-blue-400 font-bold text-lg mb-4">
              {user?.name || 'Player 1'}
            </div>
            
            {/* Avatar Display */}
            {player1Avatar ? (
              <div className="mb-4">
                <div className={`w-16 h-16 ${player1Avatar.color} rounded-full flex items-center justify-center mx-auto mb-2 ${errors.player1Avatar ? 'ring-2 ring-red-500' : ''}`}>
                  <span className="text-3xl">{player1Avatar.emoji}</span>
                </div>
                <div className="text-sm text-gray-300">{player1Avatar.name}</div>
              </div>
            ) : (
              <div className="mb-4">
                <div className={`w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2 ${errors.player1Avatar ? 'ring-2 ring-red-500' : ''}`}>
                  <span className="text-gray-400 text-2xl">?</span>
                </div>
                <div className="text-sm text-gray-400">No avatar selected</div>
              </div>
            )}
            
            {/* Avatar Selection */}
            <div className="relative">
              <button
                onClick={() => {
                  setPlayer1AvatarOpen(!player1AvatarOpen);
                  setPlayer2AvatarOpen(false);
                }}
                className={`${!player1Avatar ? 'bg-pink-600 hover:bg-pink-700' : 'bg-red-600 hover:bg-red-700'} text-white py-2 px-4 rounded-lg font-medium transition-all`}
              >
                {!player1Avatar ? 'Choose Avatar' : 'Change Avatar'}
              </button>
              
              {/* Avatar Dropdown */}
              {player1AvatarOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 rounded-lg shadow-xl p-4 z-10 min-w-64">
                  <div className="grid grid-cols-4 gap-2">
                    {AVATARS.map(avatar => (
                      <button
                        key={avatar.id}
                        onClick={() => handleAvatarSelect(avatar, 'player1')}
                        disabled={player2Avatar?.id === avatar.id}
                        className={`p-3 rounded-lg transition-all ${
                          player2Avatar?.id === avatar.id
                            ? `${avatar.color} cursor-not-allowed opacity-50`
                            : `${avatar.color} hover:scale-105 cursor-pointer`
                        }`}
                        title={player2Avatar?.id === avatar.id ? `${avatar.name} (taken by Player 2)` : avatar.name}
                      >
                        <span className="text-2xl">{avatar.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Player 2 - Similar structure */}
        <div className="bg-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-pink-400 text-xl">👥</span>
            <h3 className="text-xl font-bold text-white">Player 2</h3>
          </div>
          
          <div className="text-center">
            {/* Player 2 Name Input */}
            <input
              type="text"
              value={player2Name}
              onChange={(e) => handlePlayer2NameChange(e.target.value)}
              placeholder="Enter Player 2 name..."
              className={`w-full bg-gray-600 text-pink-400 font-bold text-lg mb-4 p-2 rounded-lg text-center focus:outline-none focus:ring-2 placeholder-gray-400 ${
                errors.player2Name ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-pink-500'
              }`}
              maxLength={20}
              autoComplete="off"
            />
            
            {/* Rest similar to Player 1... */}
            {player2Avatar ? (
              <div className="mb-4">
                <div className={`w-16 h-16 ${player2Avatar.color} rounded-full flex items-center justify-center mx-auto mb-2 ${errors.player2Avatar ? 'ring-2 ring-red-500' : ''}`}>
                  <span className="text-3xl">{player2Avatar.emoji}</span>
                </div>
                <div className="text-sm text-gray-300">{player2Avatar.name}</div>
              </div>
            ) : (
              <div className="mb-4">
                <div className={`w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2 ${errors.player2Avatar ? 'ring-2 ring-red-500' : ''}`}>
                  <span className="text-gray-400 text-2xl">?</span>
                </div>
                <div className="text-sm text-gray-400">No avatar selected</div>
              </div>
            )}
            
            <div className="relative">
              <button
                onClick={() => {
                  setPlayer2AvatarOpen(!player2AvatarOpen);
                  setPlayer1AvatarOpen(false);
                }}
                className={`${!player2Avatar ? 'bg-pink-600 hover:bg-pink-700' : 'bg-red-600 hover:bg-red-700'} text-white py-2 px-4 rounded-lg font-medium transition-all`}
              >
                {!player2Avatar ? 'Choose Avatar' : 'Change Avatar'}
              </button>
              
              {player2AvatarOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 rounded-lg shadow-xl p-4 z-10 min-w-64">
                  <div className="grid grid-cols-4 gap-2">
                    {AVATARS.map(avatar => (
                      <button
                        key={avatar.id}
                        onClick={() => handleAvatarSelect(avatar, 'player2')}
                        disabled={player1Avatar?.id === avatar.id}
                        className={`p-3 rounded-lg transition-all ${
                          player1Avatar?.id === avatar.id
                            ? `${avatar.color} cursor-not-allowed opacity-50`
                            : `${avatar.color} hover:scale-105 cursor-pointer`
                        }`}
                        title={player1Avatar?.id === avatar.id ? `${avatar.name} (taken by Player 1)` : avatar.name}
                      >
                        <span className="text-2xl">{avatar.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Start Game Button */}
      <div className="text-center pt-4">
        <button 
          onClick={validateAndStartGame}
          className={`${color} hover:opacity-90 transform hover:scale-105 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 mx-auto`}
        >
          <span className="text-2xl">🎮</span>
          Start Local Game
        </button>
      </div>
    </div>
  );
};