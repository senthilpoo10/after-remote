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
import React, { useState } from 'react';
import { GameType } from './types';
import { useAuth } from '../../contexts/AuthContext';

interface LocalGamesTabProps {
  gameType: GameType;
  color: string;
  createGame: (gameType: GameType, mode: "local") => void;
}

interface Avatar {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const AVATARS: Avatar[] = [
  { id: 'fire', name: 'Fire', emoji: '🔥', color: 'bg-red-500' },
  { id: 'cool', name: 'Cool', emoji: '😎', color: 'bg-blue-500' },
  { id: 'star', name: 'Star', emoji: '⭐', color: 'bg-yellow-500' },
  { id: 'rocket', name: 'Rocket', emoji: '🚀', color: 'bg-purple-500' },
  { id: 'crown', name: 'Crown', emoji: '👑', color: 'bg-yellow-600' },
  { id: 'lightning', name: 'Lightning', emoji: '⚡', color: 'bg-indigo-500' },
  { id: 'diamond', name: 'Diamond', emoji: '💎', color: 'bg-cyan-500' },
  { id: 'robot', name: 'Robot', emoji: '🤖', color: 'bg-gray-500' },
];

interface AvatarSelectorProps {
  selectedAvatar: Avatar | null;
  onSelect: (avatar: Avatar) => void;
  isOpen: boolean;
  onToggle: () => void;
  excludeAvatarId?: string | null;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  selectedAvatar, 
  onSelect, 
  isOpen, 
  onToggle,
  excludeAvatarId 
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all"
    >
      Choose Avatar
    </button>
    
    {isOpen && (
      <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-lg shadow-xl p-4 z-10 min-w-64">
        <div className="grid grid-cols-4 gap-2">
          {AVATARS.map(avatar => {
            const isExcluded = excludeAvatarId && avatar.id === excludeAvatarId;
            const isSelected = selectedAvatar?.id === avatar.id;
            
            return (
              <button
                key={avatar.id}
                onClick={() => {
                  if (!isExcluded) {
                    onSelect(avatar);
                    onToggle();
                  }
                }}
                disabled={isExcluded}
                className={`relative p-3 rounded-lg transition-all ${
                  isSelected
                    ? `${avatar.color} ring-2 ring-white` 
                    : isExcluded
                    ? `${avatar.color} cursor-not-allowed`
                    : `${avatar.color} opacity-75 hover:opacity-100 hover:scale-110`
                }`}
                title={isExcluded ? `${avatar.name} (taken by other player)` : avatar.name}
              >
                <span className="text-2xl relative z-10">{avatar.emoji}</span>
                {isExcluded && (
                  <div className="absolute inset-0 bg-white bg-opacity-40 rounded-lg backdrop-blur-sm"></div>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="mt-2 text-xs text-gray-400 text-center">
          {excludeAvatarId ? 'Foggy avatars are taken by other player' : 'Choose your avatar'}
        </div>
      </div>
    )}
  </div>
);

interface PlayerCardProps {
  playerName: string;
  playerLabel: string;
  avatar: Avatar | null;
  onAvatarSelect: (avatar: Avatar) => void;
  isAvatarSelectorOpen: boolean;
  onToggleAvatarSelector: () => void;
  onClearAvatar: () => void;
  excludeAvatarId?: string | null;
  isNameEditable?: boolean;
  onNameChange?: (name: string) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  playerName,
  playerLabel,
  avatar,
  onAvatarSelect,
  isAvatarSelectorOpen,
  onToggleAvatarSelector,
  onClearAvatar,
  excludeAvatarId,
  isNameEditable = false,
  onNameChange
}) => (
  <div className="bg-gray-700 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-blue-400 text-xl">👥</span>
      <h3 className="text-xl font-bold text-white">{playerLabel}</h3>
    </div>
    
    <div className="text-center">
      {isNameEditable ? (
        <input
          type="text"
          value={playerName}
          onChange={(e) => onNameChange?.(e.target.value)}
          placeholder="Enter name..."
          className="w-full bg-gray-600 text-pink-400 font-bold text-lg mb-4  rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400"
          maxLength={20}
          autoComplete="off"
        />
      ) : (
        <div className="text-pink-400 font-bold text-lg mb-4">{playerName}</div>
      )}
      
      {avatar ? (
        <div className="mb-4">
          <div className={`w-16 h-16 ${avatar.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
            <span className="text-3xl">{avatar.emoji}</span>
          </div>
          <div className="text-sm text-gray-300">{avatar.name}</div>
        </div>
      ) : (
        <div className="mb-4">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-gray-400 text-2xl">?</span>
          </div>
          <div className="text-sm text-gray-400">No avatar selected</div>
        </div>
      )}
      
      <div className="space-y-2">
        {!avatar ? (
          <AvatarSelector
            selectedAvatar={avatar}
            onSelect={onAvatarSelect}
            isOpen={isAvatarSelectorOpen}
            onToggle={onToggleAvatarSelector}
            excludeAvatarId={excludeAvatarId}
          />
        ) : (
          <button 
            onClick={onClearAvatar}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all"
          >
            Clear Avatar
          </button>
        )}
      </div>
    </div>
  </div>
);

export const LocalGamesTab: React.FC<LocalGamesTabProps> = ({
  gameType,
  color,
  createGame
}) => {
  const { user } = useAuth();
  
  // Avatar states
  const [player1Avatar, setPlayer1Avatar] = useState<Avatar | null>(null);
  const [player2Avatar, setPlayer2Avatar] = useState<Avatar | null>(null);
  const [player1AvatarOpen, setPlayer1AvatarOpen] = useState(false);
  const [player2AvatarOpen, setPlayer2AvatarOpen] = useState(false);
  
  // Player 2 name state (editable)
  const [player2Name, setPlayer2Name] = useState('');

  // Clear avatar functions
  const clearPlayer1Avatar = () => setPlayer1Avatar(null);
  const clearPlayer2Avatar = () => setPlayer2Avatar(null);

  // Check if we can start the game (require both name and avatars)
  const canStartGame = player2Name.trim().length > 0 && player1Avatar && player2Avatar;

  const handleStartGame = () => {
    // Validation for both name and avatars
    if (!player2Name.trim()) {
      alert('Please enter Player 2 name');
      return;
    }
    
    if (!player1Avatar) {
      alert('Player 1 must choose an avatar');
      return;
    }
    
    if (!player2Avatar) {
      alert('Player 2 must choose an avatar');
      return;
    }
    
    // Store game setup in localStorage for the game to use
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
    
    // Start the game
    createGame(gameType, "local");
  };

  return (
    <div className="space-y-4">
      {/* Player Setup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player 1 - Logged in User */}
        <PlayerCard
          playerName={user?.name || 'Player 1'}
          playerLabel="Player 1"
          avatar={player1Avatar}
          onAvatarSelect={setPlayer1Avatar}
          isAvatarSelectorOpen={player1AvatarOpen}
          onToggleAvatarSelector={() => {
            setPlayer1AvatarOpen(!player1AvatarOpen);
            setPlayer2AvatarOpen(false);
          }}
          onClearAvatar={clearPlayer1Avatar}
          excludeAvatarId={player2Avatar?.id}
          isNameEditable={false}
        />

        {/* Player 2 - Guest with editable name */}
        <PlayerCard
          playerName={player2Name}
          playerLabel="Player 2"
          avatar={player2Avatar}
          onAvatarSelect={setPlayer2Avatar}
          isAvatarSelectorOpen={player2AvatarOpen}
          onToggleAvatarSelector={() => {
            setPlayer2AvatarOpen(!player2AvatarOpen);
            setPlayer1AvatarOpen(false);
          }}
          onClearAvatar={clearPlayer2Avatar}
          excludeAvatarId={player1Avatar?.id}
          isNameEditable={true}
          onNameChange={setPlayer2Name}
        />
      </div>

      {/* Start Game Button - always shows "Start Local Game" */}
      <div className="text-center pt-4">
        <button 
          onClick={handleStartGame}
          disabled={!canStartGame}
          className={`${
            canStartGame 
              ? `${color} hover:opacity-90 transform hover:scale-105` 
              : 'bg-gray-600 cursor-not-allowed'
          } text-white py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 mx-auto`}
        >
          <span className="text-2xl">🎮</span>
          Start Local Game
        </button>
      </div>

      {/* Game setup summary */}
      {canStartGame && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
          <h4 className="text-lg font-bold text-center text-green-400 mb-2">Ready to Start!</h4>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              {player1Avatar ? (
                <span className={`w-8 h-8 ${player1Avatar.color} rounded-full flex items-center justify-center text-lg`}>
                  {player1Avatar.emoji}
                </span>
              ) : (
                <span className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400">?</span>
              )}
              <span className="text-white font-medium">{user?.name || 'Player 1'}</span>
            </div>
            
            <span className="text-gray-400 font-bold">VS</span>
            
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{player2Name}</span>
              {player2Avatar ? (
                <span className={`w-8 h-8 ${player2Avatar.color} rounded-full flex items-center justify-center text-lg`}>
                  {player2Avatar.emoji}
                </span>
              ) : (
                <span className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400">?</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};