// // frontend/src/components/lobby/gameroom/OnlineGamesTab.tsx
// import React from 'react';
// import { PongRoom, KeyClashRoom, GameType } from './types';
// import { GameRoomCard } from './GameRoomCard';

// interface OnlineGamesTabProps {
//   games: (PongRoom | KeyClashRoom)[];
//   gameType: GameType;
//   color: string;
//   joinGame: (gameId: string, game: GameType, mode: "remote") => void;
//   createGame: (gameType: GameType, mode: "remote") => void;
// }

// export const OnlineGamesTab: React.FC<OnlineGamesTabProps> = ({
//   games,
//   gameType,
//   color,
//   joinGame,
//   createGame
// }) => (
//   <>
//     {games.map(game => (
//       <GameRoomCard
//         key={game.id}
//         game={game}
//         gameType={gameType}
//         color={color}
//         joinGame={joinGame}
//       />
//     ))}
//     {games.length === 0 && (
//       <div className="text-center text-gray-400 py-8 bg-gray-700 rounded-lg">
//         <div className="text-2xl mb-2">🎮</div>
//         <div>No games available</div>
//         <div className="text-sm mt-1">Create one to get started!</div>
//       </div>
//     )}
//     <button 
//       onClick={() => createGame(gameType, "remote")} 
//       className={`w-full ${color} hover:opacity-90 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2`}
//     >
//       <span>🌐</span>
//       Create Online Game
//     </button>
//   </>
// );


// frontend/src/components/quickmatch/OnlineGamesTab.tsx
// frontend/src/components/quickmatch/OnlineGamesTab.tsx
import React, { useState, useEffect } from 'react';
import { PongRoom, KeyClashRoom, GameType } from './types';
import { useAuth } from '../../contexts/AuthContext';

// ✨ Define Player interface locally to ensure compatibility
interface OnlinePlayer {
  id: string;
  name: string;
  status?: string;
}

interface OnlineGamesTabProps {
  games: (PongRoom | KeyClashRoom)[];
  gameType: GameType;
  color: string;
  joinGame: (gameId: string, game: GameType, mode: "remote") => void;
  createGame: (gameType: GameType, mode: "remote") => void;
  availablePlayers?: OnlinePlayer[]; // ✨ Use local interface
}

// ✨ Challenge states
type ChallengeStatus = 'idle' | 'sending' | 'waiting' | 'accepted' | 'declined' | 'expired';

export const OnlineGamesTab: React.FC<OnlineGamesTabProps> = ({
  games,
  gameType,
  color,
  joinGame,
  createGame,
  availablePlayers = []
}) => {
  const { user } = useAuth();
  const [selectedPlayer, setSelectedPlayer] = useState<OnlinePlayer | null>(null);
  const [challengeStatus, setChallengeStatus] = useState<ChallengeStatus>('idle');

  // ✨ Debug logging to see what we're receiving
  useEffect(() => {
    console.log('OnlineGamesTab - availablePlayers:', availablePlayers);
    console.log('OnlineGamesTab - user:', user);
  }, [availablePlayers, user]);

  // ✨ Send challenge to selected player
  const sendChallenge = async () => {
    if (!selectedPlayer || !user) return;

    setChallengeStatus('sending');

    try {
      // TODO: Replace with your actual API call
      // await api.post('/lobby/challenge', { 
      //   opponentId: selectedPlayer.id,
      //   gameType: gameType 
      // });

      // Simulate API call
      setTimeout(() => {
        setChallengeStatus('waiting');

        // Simulate response after 3 seconds (for demo)
        setTimeout(() => {
          const responses = ['accepted', 'declined'];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          setChallengeStatus(randomResponse as ChallengeStatus);

          // If accepted, start the game (simulate)
          if (randomResponse === 'accepted') {
            setTimeout(() => {
              alert(`${selectedPlayer.name} accepted! Starting game...`);
              // Here you would call your actual game start logic
              // createGame(gameType, "remote");
            }, 1000);
          }
        }, 3000);
      }, 1000);

    } catch (error) {
      setChallengeStatus('idle');
      console.error('Failed to send challenge:', error);
    }
  };

  // ✨ Reset challenge
  const resetChallenge = () => {
    setChallengeStatus('idle');
    setSelectedPlayer(null);
  };

  // ✨ Get status color for players
  const getStatusColor = (status?: string) => {
    switch(status?.toLowerCase()) {
      case 'online': return 'bg-green-500';
      case 'in-game': return 'bg-yellow-500';
      case 'away': return 'bg-orange-500';
      default: return 'bg-green-500'; // Default to online
    }
  };

  // ✨ Get status text
  const getStatusText = (status?: string) => {
    switch(status?.toLowerCase()) {
      case 'online': return 'Online';
      case 'in-game': return 'In Game';
      case 'away': return 'Away';
      default: return 'Online'; // Default to online
    }
  };

  // ✨ Filter available players (exclude self) - More flexible filtering
  const challengeablePlayers = availablePlayers.filter(player => {
    // Multiple ways to exclude self
    return player.id !== user?.id && 
           player.name !== user?.name &&
           player.name?.toLowerCase() !== user?.name?.toLowerCase();
  });

  // ✨ Debug the filtering
  useEffect(() => {
    console.log('User ID:', user?.id, 'User Name:', user?.name);
    console.log('Available players:', availablePlayers);
    console.log('Filtered challengeable players:', challengeablePlayers);
  }, [availablePlayers, user, challengeablePlayers]);

  // ✨ Get challenge button props
  const getChallengeButtonProps = () => {
    switch (challengeStatus) {
      case 'sending':
        return {
          text: 'Sending Challenge...',
          className: 'bg-gray-500 cursor-not-allowed',
          disabled: true,
          onClick: () => {}
        };
      case 'waiting':
        return {
          text: '⏳ Waiting for Response...',
          className: 'bg-yellow-500 hover:bg-yellow-600',
          disabled: false,
          onClick: resetChallenge
        };
      case 'accepted':
        return {
          text: '✅ Challenge Accepted!',
          className: 'bg-green-500',
          disabled: true,
          onClick: () => {}
        };
      case 'declined':
        return {
          text: '❌ Challenge Declined',
          className: 'bg-red-500 hover:bg-red-600',
          disabled: false,
          onClick: resetChallenge
        };
      default:
        return {
          text: 'Send Challenge',
          className: `${color} hover:opacity-90`,
          disabled: !selectedPlayer,
          onClick: sendChallenge
        };
    }
  };

  const buttonProps = getChallengeButtonProps();

  return (
    <div className="space-y-6">
      {/* ✨ Debug Info (Remove this in production) */}
      <div className="bg-blue-900 rounded p-2 text-xs">
        <div>Debug: Available Players Count: {availablePlayers.length}</div>
        <div>Debug: Challengeable Players Count: {challengeablePlayers.length}</div>
        <div>Debug: Current User: {user?.name || 'Unknown'}</div>
      </div>

      {/* ✨ Two Card Layout - Same as LocalGamesTab */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* ✨ Player 1 Card - Logged in User */}
        <div className="bg-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-400 text-xl">👤</span>
            <h3 className="text-xl font-bold text-white">Player 1 (You)</h3>
          </div>
          
          <div className="text-center">
            <div className="text-blue-400 font-bold text-lg mb-4">
              {user?.name || 'Player 1'}
            </div>
            
            {/* User Avatar - TODO: Add avatar selection like LocalGamesTab */}
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'P'}
                </span>
              </div>
              <div className="text-sm text-gray-300">Ready to play</div>
              <div className="text-xs text-gray-400 mt-1">
                Avatar selection coming soon
              </div>
            </div>

            {/* Online Status */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>
        </div>

        {/* ✨ Player 2 Card - Online Players List */}
        <div className="bg-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-pink-400 text-xl">🌐</span>
            <h3 className="text-xl font-bold text-white">Select Opponent</h3>
          </div>
          
          <div className="space-y-3">
            {challengeablePlayers.length > 0 ? (
              <>
                <div className="text-sm text-gray-300 mb-3">
                  Choose a player to challenge ({challengeablePlayers.length} available):
                </div>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {challengeablePlayers.map(player => (
                    <div
                      key={player.id}
                      onClick={() => setSelectedPlayer(player)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-600 ${
                        selectedPlayer?.id === player.id
                          ? 'border-pink-500 bg-gray-600'
                          : 'border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm">
                            {player.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">
                              {player.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(player.status)}`}></div>
                              <span className="text-xs text-gray-400">
                                {getStatusText(player.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {selectedPlayer?.id === player.id && (
                          <span className="text-pink-400">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-sm">
                  <div className="text-2xl mb-2">😴</div>
                  <div>No other players online</div>
                  <div className="text-xs mt-1">
                    Total players: {availablePlayers.length}, You: {user?.name}
                  </div>
                  <div className="text-xs mt-1">Try creating a game room instead!</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✨ Selected Player Summary & Challenge Button */}
      {selectedPlayer && (
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-gray-300">Selected opponent:</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-xs">
                  {selectedPlayer.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-medium">{selectedPlayer.name}</span>
              </div>
            </div>
            
            <button
              onClick={buttonProps.onClick}
              disabled={buttonProps.disabled}
              className={`${buttonProps.className} px-4 py-2 rounded-lg text-white font-medium transition-all disabled:cursor-not-allowed`}
            >
              {buttonProps.text}
            </button>
          </div>
        </div>
      )}

      {/* ✨ Alternative: Create Game Room */}
      <div className="text-center pt-4 border-t border-gray-600">
        <p className="text-gray-400 text-sm mb-3">
          Or create a game room for others to join:
        </p>
        <button 
          onClick={() => createGame(gameType, "remote")} 
          className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded-lg font-medium transition-all"
        >
          Create Game Room
        </button>
      </div>
    </div>
  );
};