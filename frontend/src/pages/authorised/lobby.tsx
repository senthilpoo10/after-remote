// // import { useEffect, useState, useRef } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { io, Socket } from "socket.io-client";
// // import { useAuth } from "../../contexts/AuthContext";

// // interface Player {
// //   id: string;
// //   name: string;
// // }
// // interface PongRoom {
// //   id: string;
// //   status: "waiting" | "in-progress" | "finished";  
// //   players: { id: string, name: string }[];
// // }

// // interface KeyClashRoom {
// //   id: string,
// //   status: "waiting" | "in-progress" | "finished";  
// //   players: Record<string, number>;
// //   p1: string,
// //   p2: string
// // }

// // export default function LobbyPage() {
// //   const socketRef = useRef<Socket | null>(null);
// //   const navigate = useNavigate();
// //   const [players, setPlayers] = useState<Player[]>([]);
// //   const [pongGames, setPongGames] = useState<PongRoom[]>([]);
// //   const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
// //   const { user } = useAuth();
// //   let name: string | null = null;

// //   useEffect(() => {
// //     socketRef.current = io("/lobby", {
// //       path: "/socket.io",
// //       transports: ["websocket"],
// //       secure: true
// //     });

// //     socketRef.current.on("connect", () => {
// //       if (user)
// //         name = user.name;
// //       socketRef.current.emit("name", name);
// //     });

// //     socketRef.current.on("lobby_update", (data) => {
// //       setPlayers(data.players);
// //       setPongGames(data.pongGames);
// //       setKeyClashGames(data.keyClashGames)
// //     });

// //     socketRef.current.on("created_game", (gameId, game, mode) => {
// //       joinGame(gameId, game, mode);
// //     })

// //     socketRef.current.on("joined_game", (gameId, game, mode) => {
// //       socketRef.current?.disconnect();
// //       socketRef.current = null;
// //       navigate(`/${game}/${mode}/${gameId}`, { state: { name: name } });
// //     });

// //     return () => {
// //       socketRef.current?.disconnect();
// //       socketRef.current = null;
// //     };
// //   }, [user]);

// //   const createLocalPong = () => {
// //     socketRef.current?.emit("create_game", "pong", "local");
// //   };
// //   const createRemotePong = () => {
// //     socketRef.current?.emit("create_game", "pong", "remote");
// //   };
// //   const createLocalKeyClash = () => {
// //     socketRef.current?.emit("create_game", "keyclash", "local");
// //   };
// //   const createRemoteKeyClash = () => {
// //     socketRef.current?.emit("create_game", "keyclash", "remote");
// //   };


// //   const joinGame = (gameId: string, game: "pong" | "keyclash", mode: "local" | "remote") => {
// //     socketRef.current?.emit("join_game", gameId, game, mode, (res: { error: string }) => {
// //       if (res.error) alert(res.error);
// //     });
// //   };

// //   return (
// //     <div style={{ padding: "1rem" }}>
// //       <h2>Players in Lobby ({players.length})</h2>
// //       <ul>
// //         {players.map(p => <li key={p.id}>{p.name}</li>)}
// //       </ul>

// //       <h2>Pong Games</h2>
// //       <ul>
// //         {pongGames.map(game => (
// //           <li
// //             key={game.id}
// //             style={{
// //               cursor: game.status === "waiting" ? "pointer" : "default",
// //               padding: "0.5rem",
// //               border: "1px solid #ccc",
// //               margin: "0.5rem 0"
// //             }}
// //             onClick={() => {
// //               if (game.status === "waiting") joinGame(game.id, "pong", "remote");
// //             }}
// //           >
// //             <strong>Room-{game.id}</strong> — {game.players.length} players  — {game.status}
// //             <ul>
// //               {game.players.map(p => <li key={p.id}>{p.name}</li>)}
// //             </ul>
// //           </li>
// //         ))}
// //         <ul>
// //           <button onClick={createLocalPong}>Create New Local Pong Game</button>
// //         </ul>
// //         <ul>
// //           <button onClick={createRemotePong}>Create New Remote Pong Game</button> 
// //         </ul>
// //       </ul>

// //       <h2>Key Clash Games</h2>
// //       <ul>
// //         {keyClashGames.map(game => (
// //           <li
// //             key={game.id}
// //             style={{
// //               cursor: game.status === "waiting" ? "pointer" : "default",
// //               padding: "0.5rem",
// //               border: "1px solid #ccc",
// //               margin: "0.5rem 0"
// //             }}
// //             onClick={() => {
// //               if (game.status === "waiting") joinGame(game.id, "keyclash", "remote");
// //             }}
// //           >
// //             <strong>Room-{game.id}</strong> — {Object.keys(game.players).length} players — {game.status}
// //             <ul>
// //               <li>{game.p1}</li>
// //               <li>{game.p2}</li>
// //             </ul>
// //           </li>
// //         ))}      
// //         <ul>
// //         <button onClick={createLocalKeyClash}>Create New Local Key Clash Game</button>
// //         </ul>
// //         <ul>
// //           <button onClick={createRemoteKeyClash}>Create New Remote Key Clash Game</button> 
// //         </ul>                     
// //       </ul>
// //     </div>
// //   );
// // }


// // frontend/src/pages/authorised/lobby.tsx
// import { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import { useAuth } from '../../contexts/AuthContext';
// import api from '../../utils/api';
// import { 
//   getStatusColor, 
//   getStatusText, 
//   getResultColor, 
//   getResultIcon, 
//   formatDuration,
//   calculateWinRate,
//   getRankColor,
//   formatLastSeen,
//   sortFriendsByStatus,
//   getMatchTypeIcon,
//   getMatchTypeText,
//   formatDate,
//   formatXP
// } from '../../utils/lobbyUtils';

// // Types
// interface GameStats {
//   totalMatches: number;
//   wins: number;
//   losses: number;
//   draws: number;
//   winRate: number;
//   currentWinStreak: number;
//   longestWinStreak: number;
//   weeklyWins: number;
//   monthlyWins: number;
//   points?: number;
//   rank?: string;
//   level?: number;
// }

// interface Friend {
//   id: string;
//   name: string;
//   status: 'online' | 'offline' | 'in-game' | 'away';
//   lastActive: string;
//   rank: string;
//   avatarUrl?: string;
// }

// interface Match {
//   id: string;
//   opponent: string;
//   result: 'win' | 'loss' | 'draw';
//   score: string;
//   date: string;
//   duration: number;
//   matchType: 'quick' | 'ranked' | 'tournament' | 'friendly';
// }

// interface FriendRequest {
//   id: string;
//   sender: { id: string; name: string };
//   receiver: { id: string; name: string };
//   status: 'pending' | 'accepted' | 'rejected';
//   createdAt: string;
// }

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: 'INFO' | 'FRIEND_REQUEST' | 'CHALLENGE' | 'MATCH_RESULT' | 'TOURNAMENT' | 'ACHIEVEMENT' | 'SYSTEM';
//   isRead: boolean;
//   data?: string;
//   createdAt: string;
//   readAt?: string;
// }

// interface LobbyState {
//   activeTab: 'overview' | 'multiplayer' | 'locker' | 'squad' | 'history';
//   isLoading: boolean;
//   gameStats: GameStats | null;
//   friends: Friend[];
//   recentMatches: Match[];
//   friendRequests: FriendRequest[];
//   notifications: Notification[];
// }

// // Socket.io interfaces
// interface Player {
//   id: string;
//   name: string;
// }

// interface PongRoom {
//   id: string;
//   status: 'waiting' | 'in-progress' | 'finished';  
//   players: { id: string, name: string }[];
//   gameType: 'pong';
//   mode: 'local' | 'remote';
// }

// interface KeyClashRoom {
//   id: string;
//   status: 'waiting' | 'in-progress' | 'finished';  
//   players: Record<string, number>;
//   p1: string;
//   p2: string;
//   gameType: 'keyclash';
//   mode: 'local' | 'remote';
// }

// type GameRoom = PongRoom | KeyClashRoom;

// export default function LobbyPage() {
//   const socketRef = useRef<Socket | null>(null);
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
  
//   const [lobbyState, setLobbyState] = useState<LobbyState>({
//     activeTab: 'overview',
//     isLoading: true,
//     gameStats: null,
//     friends: [],
//     recentMatches: [],
//     friendRequests: [],
//     notifications: []
//   });

//   // Socket.io states
//   const [onlinePlayers, setOnlinePlayers] = useState<Player[]>([]);
//   const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
//   const [socketLoading, setSocketLoading] = useState(false);
//   const [isSocketConnected, setIsSocketConnected] = useState(false);

//   // Mock data for development
//   const mockStats: GameStats = {
//     totalMatches: 25,
//     wins: 15,
//     losses: 8,
//     draws: 2,
//     winRate: 60,
//     currentWinStreak: 3,
//     longestWinStreak: 7,
//     weeklyWins: 4,
//     monthlyWins: 12,
//     points: 1250,
//     rank: 'Silver Elite',
//     level: 12
//   };

//   const mockFriends: Friend[] = [
//     { id: '1', name: 'acepong', status: 'online', lastActive: '', rank: 'Gold Elite' },
//     { id: '2', name: 'topspin', status: 'in-game', lastActive: '', rank: 'Silver Pro' },
//     { id: '3', name: 'smashbro', status: 'offline', lastActive: '2 hours ago', rank: 'Bronze' },
//     { id: '4', name: 'slicemaster', status: 'online', lastActive: '', rank: 'Silver Elite' },
//     { id: '5', name: 'netbuster', status: 'offline', lastActive: '1 day ago', rank: 'Gold' }
//   ];

//   const mockRecentMatches: Match[] = [
//     { id: '1', opponent: 'topspin', result: 'win', score: '11-7', date: '2 hours ago', duration: 8, matchType: 'quick' },
//     { id: '2', opponent: 'smashbro', result: 'loss', score: '8-11', date: '1 day ago', duration: 12, matchType: 'ranked' },
//     { id: '3', opponent: 'acepong', result: 'win', score: '11-9', date: '2 days ago', duration: 15, matchType: 'tournament' },
//     { id: '4', opponent: 'slicemaster', result: 'win', score: '11-6', date: '3 days ago', duration: 6, matchType: 'quick' },
//     { id: '5', opponent: 'netbuster', result: 'loss', score: '9-11', date: '1 week ago', duration: 10, matchType: 'friendly' }
//   ];

//   // Socket.io useEffect
//   useEffect(() => {
//     if (!user) return;

//     socketRef.current = io("/lobby", {
//       path: "/socket.io",
//       transports: ["websocket"],
//       secure: true,
//       auth: {
//         token: localStorage.getItem('authToken')
//       }
//     });

//     socketRef.current.on("connect", () => {
//       setIsSocketConnected(true);
//       socketRef.current?.emit("user_joined", user.id, user.name);
//     });

//     socketRef.current.on("disconnect", () => {
//       setIsSocketConnected(false);
//     });

//     socketRef.current.on("lobby_update", (data: { 
//       players: Player[];
//       pongGames: PongRoom[];
//       keyClashGames: KeyClashRoom[];
//     }) => {
//       setOnlinePlayers(data.players);
//       setGameRooms([...data.pongGames, ...data.keyClashGames]);
//     });

//     socketRef.current.on("created_game", (gameId: string, game: string, mode: string) => {
//       joinGame(gameId, game as 'pong' | 'keyclash', mode as 'local' | 'remote');
//     });

//     socketRef.current.on("joined_game", (gameId: string, game: string, mode: string) => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//       navigate(`/${game}/${mode}/${gameId}`, { state: { name: user.name } });
//     });

//     return () => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//     };
//   }, [user, navigate]);

//   // Lobby data useEffect
//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     loadLobbyData();
//   }, [user, navigate]);

//   const loadLobbyData = async () => {
//     setLobbyState(prev => ({ ...prev, isLoading: true }));
    
//     try {
//       // Using mock data - replace with real API calls
//       setLobbyState(prev => ({
//         ...prev,
//         gameStats: mockStats,
//         friends: mockFriends,
//         recentMatches: mockRecentMatches,
//         friendRequests: [],
//         notifications: []
//       }));
      
//     } catch (error) {
//       console.error('Error loading lobby data:', error);
//     } finally {
//       setLobbyState(prev => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setActiveTab = (tab: LobbyState['activeTab']) => {
//     setLobbyState(prev => ({ ...prev, activeTab: tab }));
//   };

//   // Socket.io functions
//   const createGame = (gameType: 'pong' | 'keyclash', mode: 'local' | 'remote') => {
//     if (!socketRef.current || socketLoading) return;
    
//     setSocketLoading(true);
//     socketRef.current.emit("create_game", gameType, mode, (response: { error?: string }) => {
//       setSocketLoading(false);
//       if (response.error) {
//         alert(response.error);
//       }
//     });
//   };

//   const joinGame = (gameId: string, gameType: 'pong' | 'keyclash', mode: 'local' | 'remote') => {
//     if (!socketRef.current || socketLoading) return;
    
//     setSocketLoading(true);
//     socketRef.current.emit("join_game", gameId, gameType, mode, (response: { error?: string }) => {
//       setSocketLoading(false);
//       if (response.error) {
//         alert(response.error);
//       }
//     });
//   };

//   // Lobby functions
//   const handleQuickMatch = () => {
//     navigate('/play');
//   };

//   const handleChampionship = () => {
//     alert('Championship feature coming soon!');
//   };

//   const handleChallengeFriend = async (friendId: string, friendName: string) => {
//     try {
//       alert(`Challenge sent to ${friendName}!`);
//     } catch (error) {
//       console.error('Error sending challenge:', error);
//     }
//   };

//   const handleSendMessage = (friendId: string, friendName: string) => {
//     alert(`Opening chat with ${friendName}`);
//   };

//   const handleAddFriend = async () => {
//     const username = prompt('Enter username to add as friend:');
//     if (username) {
//       try {
//         alert(`Friend request sent to ${username}!`);
//       } catch (error) {
//         console.error('Error sending friend request:', error);
//       }
//     }
//   };

//   const handleUpdateProfile = () => {
//     alert('Profile update feature coming soon!');
//   };

//   const handleGameSettings = () => {
//     alert('Game settings feature coming soon!');
//   };

//   const handleViewAllMatches = () => {
//     alert('Detailed match history page coming soon!');
//   };

//   if (!user) {
//     return null;
//   }

//   if (lobbyState.isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading lobby...</div>
//       </div>
//     );
//   }

//   const displayStats = lobbyState.gameStats || mockStats;
//   const onlineFriends = lobbyState.friends.filter(f => f.status === 'online' || f.status === 'in-game');
//   const sortedFriends = sortFriendsByStatus(lobbyState.friends);

//   // Tab Components
//   const OverviewTab = () => (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Quick Stats */}
//       <div className="bg-gray-800 rounded-xl p-6">
//         <h3 className="text-xl font-bold mb-4 text-blue-300">⚡ Quick Stats</h3>
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <span>Total Matches:</span>
//             <span className="font-bold">{displayStats.totalMatches}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Win Rate:</span>
//             <span className="font-bold text-green-400">{calculateWinRate(displayStats.wins, displayStats.totalMatches)}%</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Win Streak:</span>
//             <span className="font-bold text-yellow-400">{displayStats.currentWinStreak}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>This Month:</span>
//             <span className="font-bold text-purple-400">{displayStats.monthlyWins}W</span>
//           </div>
//         </div>
//       </div>

//       {/* Online Friends */}
//       <div className="bg-gray-800 rounded-xl p-6">
//         <h3 className="text-xl font-bold mb-4 text-green-300">🟢 Online Squad</h3>
//         <div className="space-y-2">
//           {onlineFriends.length > 0 ? (
//             onlineFriends.map(friend => (
//               <div key={friend.id} className="flex items-center gap-3">
//                 <div className={`w-3 h-3 rounded-full ${getStatusColor(friend.status)}`}></div>
//                 <span className="flex-1">{friend.name}</span>
//                 <span className="text-xs text-gray-400">{getStatusText(friend.status)}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400 text-sm">No friends online</p>
//           )}
//         </div>
//       </div>

//       {/* Recent Matches */}
//       <div className="bg-gray-800 rounded-xl p-6">
//         <h3 className="text-xl font-bold mb-4 text-purple-300">🎯 Recent Matches</h3>
//         <div className="space-y-2">
//           {lobbyState.recentMatches.slice(0, 3).map((match) => (
//             <div key={match.id} className="flex items-center justify-between text-sm">
//               <span>vs {match.opponent}</span>
//               <div className="text-right">
//                 <div className={`font-bold ${getResultColor(match.result)}`}>
//                   {match.result.toUpperCase()}
//                 </div>
//                 <div className="text-xs text-gray-400">{match.score}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const MultiplayerTab = () => (
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-gray-800 rounded-xl p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">🎮 Multiplayer Games</h2>
        
//         {!isSocketConnected && (
//           <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 mb-6 text-center">
//             <div className="text-yellow-400 mb-2">Connecting to multiplayer server...</div>
//             <div className="h-2 w-24 bg-yellow-700 rounded-full mx-auto overflow-hidden">
//               <div className="h-full bg-yellow-500 animate-pulse"></div>
//             </div>
//           </div>
//         )}

//         {/* Online Players */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4 text-green-300">
//             👥 Online Players ({onlinePlayers.length})
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//             {onlinePlayers.map(player => (
//               <div key={player.id} className="bg-gray-700 p-3 rounded text-center">
//                 <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
//                 <span className="text-sm">{player.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Game Creation Buttons */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h4 className="text-lg font-bold mb-4 text-yellow-300">🏓 Pong Games</h4>
//             <div className="space-y-3">
//               <button
//                 onClick={() => createGame('pong', 'local')}
//                 disabled={socketLoading || !isSocketConnected}
//                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition"
//               >
//                 {socketLoading ? 'Creating...' : 'Create Local Game'}
//               </button>
//               <button
//                 onClick={() => createGame('pong', 'remote')}
//                 disabled={socketLoading || !isSocketConnected}
//                 className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition"
//               >
//                 {socketLoading ? 'Creating...' : 'Create Online Game'}
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-700 rounded-lg p-6">
//             <h4 className="text-lg font-bold mb-4 text-red-300">⚔️ Key Clash Games</h4>
//             <div className="space-y-3">
//               <button
//                 onClick={() => createGame('keyclash', 'local')}
//                 disabled={socketLoading || !isSocketConnected}
//                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition"
//               >
//                 {socketLoading ? 'Creating...' : 'Create Local Game'}
//               </button>
//               <button
//                 onClick={() => createGame('keyclash', 'remote')}
//                 disabled={socketLoading || !isSocketConnected}
//                 className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition"
//               >
//                 {socketLoading ? 'Creating...' : 'Create Online Game'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Available Game Rooms */}
//         <div>
//           <h3 className="text-xl font-bold mb-4 text-purple-300">🎯 Available Game Rooms</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {gameRooms.map(room => (
//               <div
//                 key={room.id}
//                 className={`bg-gray-700 p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-600 ${
//                   room.status !== 'waiting' ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 onClick={() => room.status === 'waiting' && joinGame(room.id, room.gameType, room.mode)}
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-bold">{room.gameType.toUpperCase()} - {room.mode}</span>
//                   <span className={`px-2 py-1 rounded text-xs ${
//                     room.status === 'waiting' ? 'bg-green-500' : 
//                     room.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
//                   }`}>
//                     {room.status}
//                   </span>
//                 </div>
//                 <div className="text-sm text-gray-300">
//                   Players: {'players' in room ? room.players.length : Object.keys(room.players).length}
//                   {'players' in room && Array.isArray(room.players) ? (
//                     room.players.map(player => (
//                       <div key={player.id} className="ml-2">• {player.name}</div>
//                     ))
//                   ) : (
//                     <>
//                       <div className="ml-2">• {room.p1}</div>
//                       <div className="ml-2">• {room.p2}</div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {gameRooms.length === 0 && (
//               <div className="col-span-2 text-center text-gray-400 py-8">
//                 No active game rooms. Create one to get started!
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const LockerTab = () => (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-gray-800 rounded-xl p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">🧳 My Locker</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4 text-purple-300">📋 Profile Information</h3>
//             <div className="space-y-3 text-lg">
//               <div><span className="text-gray-400">Username:</span> <span className="font-bold">{user.name}</span></div>
//               <div><span className="text-gray-400">Email:</span> <span className="font-bold">{user.email}</span></div>
//               <div>
//                 <span className="text-gray-400">Rank:</span> 
//                 <span className={`font-bold ${getRankColor('Silver Elite')}`}>
//                   Silver Elite
//                 </span>
//               </div>
//               <div><span className="text-gray-400">Level:</span> <span className="font-bold text-blue-400">12</span></div>
//               <div>
//                 <span className="text-gray-400">Total XP:</span> 
//                 <span className="font-bold text-green-400">
//                   {formatXP(2450)}
//                 </span>
//               </div>
//               <div><span className="text-gray-400">Joined:</span> <span className="font-bold">January 2024</span></div>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4 text-green-300">⚙️ Account Settings</h3>
//             <div className="space-y-3">
//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
//                 🖼️ Change Avatar
//               </button>
//               <button 
//                 onClick={handleUpdateProfile}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
//               >
//                 ✏️ Update Profile
//               </button>
//               <button 
//                 onClick={handleGameSettings}
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
//               >
//                 🎮 Game Settings
//               </button>
//               <button 
//                 onClick={() => logout()}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const SquadTab = () => (
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-gray-800 rounded-xl p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-green-300">👥 Rally Squad</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {sortedFriends.map(friend => (
//             <div key={friend.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className={`w-4 h-4 rounded-full ${getStatusColor(friend.status)}`}></div>
//                 <div className="flex-1">
//                   <span className="font-bold text-lg block">{friend.name}</span>
//                   <span className={`text-sm ${getRankColor(friend.rank)}`}>
//                     {friend.rank}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-sm text-gray-400 mb-3">
//                 {friend.status === 'offline' 
//                   ? `Last seen: ${formatLastSeen(friend.lastActive)}` 
//                   : getStatusText(friend.status)
//                 }
//               </div>
//               <div className="flex gap-2">
//                 <button 
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition disabled:bg-gray-500 disabled:cursor-not-allowed"
//                   disabled={friend.status === 'offline'}
//                   onClick={() => handleChallengeFriend(friend.id, friend.name)}
//                 >
//                   ⚔️ Challenge
//                 </button>
//                 <button 
//                   className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded text-sm transition"
//                   onClick={() => handleSendMessage(friend.id, friend.name)}
//                 >
//                   💬 Message
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Add Friend Button */}
//         <div className="mt-6 text-center">
//           <button 
//             className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
//             onClick={handleAddFriend}
//           >
//             ➕ Add New Friend
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const HistoryTab = () => (
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-gray-800 rounded-xl p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">📊 Match History</h2>
        
//         {/* Stats Charts Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {/* Win/Loss Pie Chart */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4 text-green-300">🥇 Win/Loss Ratio</h3>
//             <div className="relative w-32 h-32 mx-auto mb-4">
//               <svg viewBox="0 0 42 42" className="w-32 h-32 transform -rotate-90">
//                 <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#374151" strokeWidth="3"/>
//                 <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="3"
//                         strokeDasharray={`${calculateWinRate(displayStats.wins, displayStats.totalMatches)} ${100 - calculateWinRate(displayStats.wins, displayStats.totalMatches)}`} strokeDashoffset="0"/>
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-2xl font-bold text-green-400">
//                   {calculateWinRate(displayStats.wins, displayStats.totalMatches)}%
//                 </span>
//               </div>
//             </div>
//             <p className="text-center text-sm text-gray-400">Win Rate</p>
//           </div>

//           {/* Performance Stats */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4 text-blue-300">📈 Performance</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-green-400">🏆 Wins:</span>
//                 <span className="font-bold text-2xl">{displayStats.wins}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-red-400">❌ Losses:</span>
//                 <span className="font-bold text-2xl">{displayStats.losses}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-yellow-400">🤝 Draws:</span>
//                 <span className="font-bold text-2xl">{displayStats.draws}</span>
//               </div>
//             </div>
//           </div>

//           {/* Recent Performance Trend */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4 text-yellow-300">🔥 Recent Form</h3>
//             <div className="flex justify-center items-center gap-2 mb-4">
//               {['W', 'L', 'W', 'W', 'L'].map((result, index) => (
//                 <div key={index} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
//                   result === 'W' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//                 }`}>
//                   {result}
//                 </div>
//               ))}
//             </div>
//             <p className="text-center text-sm text-gray-400">Last 5 matches</p>
//             <div className="mt-3 text-center">
//               <span className="text-green-400 font-bold">3W</span> - <span className="text-red-400 font-bold">2L</span>
//             </div>
//           </div>
//         </div>

//         {/* Detailed Match History */}
//         <div className="bg-gray-700 rounded-lg p-6">
//           <h3 className="text-xl font-bold mb-4 text-indigo-300">📋 Match Details</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-gray-600">
//                   <th className="py-3 px-2">🎯 Opponent</th>
//                   <th className="py-3 px-2">📊 Result</th>
//                   <th className="py-3 px-2">🏓 Score</th>
//                   <th className="py-3 px-2">🎮 Type</th>
//                   <th className="py-3 px-2">📅 Date</th>
//                   <th className="py-3 px-2">⏱️ Duration</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {lobbyState.recentMatches.map((match) => (
//                   <tr key={match.id} className="border-b border-gray-600 hover:bg-gray-600 transition">
//                     <td className="py-3 px-2 font-medium">{match.opponent}</td>
//                     <td className={`py-3 px-2 font-bold ${getResultColor(match.result)}`}>
//                       {getResultIcon(match.result)}
//                     </td>
//                     <td className="py-3 px-2 font-mono">{match.score}</td>
//                     <td className="py-3 px-2 text-gray-300">
//                       {getMatchTypeIcon(match.matchType)} {getMatchTypeText(match.matchType)}
//                     </td>
//                     <td className="py-3 px-2 text-gray-400">{formatDate(match.date)}</td>
//                     <td className="py-3 px-2 text-gray-400">{formatDuration(match.duration)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* View All Matches Button */}
//           <div className="mt-4 text-center">
//             <button 
//               className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition"
//               onClick={handleViewAllMatches}
//             >
//               📜 View All Matches
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
//       <div className="max-w-7xl mx-auto">
//       {/* Welcome Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
//             🏓 Welcome to the Arena
//           </h1>
//           <p className="text-gray-300 text-lg mb-6">
//             Ready to dominate the table? Choose your game mode below.
//           </p>
//         </div>
        

//         {/* Main Action Buttons */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
//           <button
//             onClick={handleQuickMatch}
//             className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl"
//           >
//             <div className="text-4xl mb-2">⚡</div>
//             <div className="text-xl">Quick Match</div>
//             <div className="text-sm opacity-80">Fast 1v1 game</div>
//           </button>
          
//           <button
//             onClick={handleChampionship}
//             className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-6 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl"
//           >
//             <div className="text-4xl mb-2">🏆</div>
//             <div className="text-xl">Championship</div>
//             <div className="text-sm opacity-80">Tournament mode</div>
//           </button>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-gray-800 rounded-lg p-1 inline-flex">
//             {[
//               { id: 'overview', icon: '🏠', label: 'Overview' },
//               { id: 'multiplayer', icon: '🎮', label: 'Multiplayer' },
//               { id: 'locker', icon: '🧳', label: 'My Locker' },
//               { id: 'squad', icon: '👥', label: 'Rally Squad' },
//               { id: 'history', icon: '📊', label: 'Match History' }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 rounded-md transition-all ${
//                   lobbyState.activeTab === tab.id 
//                     ? 'bg-blue-600 text-white' 
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {tab.icon} {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content */}
//         {lobbyState.activeTab === 'overview' && <OverviewTab />}
//         {lobbyState.activeTab === 'multiplayer' && <MultiplayerTab />}
//         {lobbyState.activeTab === 'locker' && <LockerTab />}
//         {lobbyState.activeTab === 'squad' && <SquadTab />}
//         {lobbyState.activeTab === 'history' && <HistoryTab />}
//       </div>
//     </div>
//   );
// }

// // frontend/src/pages/authorised/lobby.tsx
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { GameStats, Friend, Match, LobbyState } from '../../types/lobby';
// import ActionButtons from '../../components/lobby/ActionButtons';
// import TabNavigation from '../../components/lobby/TabNavigation';
// import OverviewTab from '../../components/lobby/OverviewTab';
// import LockerTab from '../../components/lobby/LockerTab';
// import SquadTab from '../../components/lobby/SquadTab';
// import HistoryTab from '../../components/lobby/HistoryTab';
// import LobbyHeader from '../../components/lobby/LobbyHeader';

// export default function LobbyPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
  
//   const [lobbyState, setLobbyState] = useState<LobbyState>({
//     activeTab: 'overview',
//     isLoading: true,
//     gameStats: null,
//     friends: [],
//     recentMatches: [],
//     friendRequests: [],
//     notifications: []
//   });

//   // Mock data
//   const mockStats: GameStats = {
//     totalMatches: 25,
//     wins: 15,
//     losses: 8,
//     draws: 2,
//     winRate: 60,
//     currentWinStreak: 3,
//     longestWinStreak: 7,
//     weeklyWins: 4,
//     monthlyWins: 12,
//     points: 1250,
//     rank: 'Silver Elite',
//     level: 12
//   };

//   const mockFriends: Friend[] = [
//     { id: '1', name: 'acepong', status: 'online', lastActive: '', rank: 'Gold Elite' },
//     { id: '2', name: 'topspin', status: 'in-game', lastActive: '', rank: 'Silver Pro' },
//     { id: '3', name: 'smashbro', status: 'offline', lastActive: '2 hours ago', rank: 'Bronze' },
//     { id: '4', name: 'slicemaster', status: 'online', lastActive: '', rank: 'Silver Elite' },
//     { id: '5', name: 'netbuster', status: 'offline', lastActive: '1 day ago', rank: 'Gold' }
//   ];

//   const mockRecentMatches: Match[] = [
//     { id: '1', opponent: 'topspin', result: 'win', score: '11-7', date: '2 hours ago', duration: 8, matchType: 'quick' },
//     { id: '2', opponent: 'smashbro', result: 'loss', score: '8-11', date: '1 day ago', duration: 12, matchType: 'ranked' },
//     { id: '3', opponent: 'acepong', result: 'win', score: '11-9', date: '2 days ago', duration: 15, matchType: 'tournament' }
//   ];

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     loadLobbyData();
//   }, [user, navigate]);

//   const loadLobbyData = async () => {
//     setLobbyState(prev => ({ ...prev, isLoading: true }));
    
//     try {
//       // Using mock data - replace with API calls
//       setLobbyState(prev => ({
//         ...prev,
//         gameStats: mockStats,
//         friends: mockFriends,
//         recentMatches: mockRecentMatches,
//         friendRequests: [],
//         notifications: []
//       }));
      
//     } catch (error) {
//       console.error('Error loading lobby data:', error);
//     } finally {
//       setLobbyState(prev => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setActiveTab = (tab: LobbyState['activeTab']) => {
//     setLobbyState(prev => ({ ...prev, activeTab: tab }));
//   };

//   // Handler functions...
//   const handleQuickMatch = () => navigate('/play');
//   const handleChampionship = () => alert('Championship feature coming soon!');

//   if (!user) return null;

//   if (lobbyState.isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading lobby...</div>
//       </div>
//     );
//   }

//   const displayStats = lobbyState.gameStats || mockStats;
//   const onlineFriends = lobbyState.friends.filter(f => f.status === 'online' || f.status === 'in-game');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
//       <div className="max-w-7xl mx-auto">

// <LobbyHeader user={user} />        
//         <ActionButtons 
//           onQuickMatch={handleQuickMatch}
//           onChampionship={handleChampionship}
//         />

//         <TabNavigation 
//           activeTab={lobbyState.activeTab} 
//           onTabChange={setActiveTab} 
//         />

//         {/* Tab Content */}
//         {lobbyState.activeTab === 'overview' && (
//           <OverviewTab 
//             stats={displayStats}
//             onlineFriends={onlineFriends}
//             recentMatches={lobbyState.recentMatches.slice(0, 3)}
//           />
//         )}

//         {lobbyState.activeTab === 'locker' && (
//           <LockerTab 
//             user={user}
//             onUpdateProfile={() => alert('Profile update coming soon!')}
//             onGameSettings={() => alert('Game settings coming soon!')}
//             onLogout={() => logout()}
//           />
//         )}

//         {lobbyState.activeTab === 'squad' && (
//           <SquadTab 
//             friends={lobbyState.friends}
//             onChallengeFriend={(id, name) => alert(`Challenge ${name}!`)}
//             onSendMessage={(id, name) => alert(`Message ${name}!`)}
//             onAddFriend={() => alert('Add friend!')}
//           />
//         )}

//         {lobbyState.activeTab === 'history' && (
//           <HistoryTab 
//             stats={displayStats}
//             recentMatches={lobbyState.recentMatches}
//             onViewAllMatches={() => alert('View all matches!')}
//           />
//         )}
//       </div>
//     </div>
//   );
// }


// // frontend/src/pages/authorised/lobby.tsx
// import { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import { useAuth } from '../../contexts/AuthContext';
// import { GameStats, Friend, Match, LobbyState } from '../../types/lobby';
// import ActionButtons from '../../components/lobby/ActionButtons';
// import TabNavigation from '../../components/lobby/TabNavigation';
// import OverviewTab from '../../components/lobby/OverviewTab';
// import LockerTab from '../../components/lobby/LockerTab';
// import SquadTab from '../../components/lobby/SquadTab';
// import HistoryTab from '../../components/lobby/HistoryTab';
// import LobbyHeader from '../../components/lobby/LobbyHeader';

// interface Player {
//   id: string;
//   name: string;
// }

// interface PongRoom {
//   id: string;
//   status: "waiting" | "in-progress" | "finished";  
//   players: { id: string, name: string }[];
//   mode: "local" | "remote";
// }

// interface KeyClashRoom {
//   id: string;
//   status: "waiting" | "in-progress" | "finished";  
//   players: Record<string, number>;
//   p1: string;
//   p2: string;
//   mode: "local" | "remote";
// }

// export default function LobbyPage() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const socketRef = useRef<Socket | null>(null);
  
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [pongGames, setPongGames] = useState<PongRoom[]>([]);
//   const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
  
//   const [lobbyState, setLobbyState] = useState<LobbyState>({
//     activeTab: 'overview',
//     isLoading: true,
//     gameStats: null,
//     friends: [],
//     recentMatches: [],
//     friendRequests: [],
//     notifications: []
//   });

//   // Mock data
//   const mockStats: GameStats = {
//     totalMatches: 25,
//     wins: 15,
//     losses: 8,
//     draws: 2,
//     winRate: 60,
//     currentWinStreak: 3,
//     longestWinStreak: 7,
//     weeklyWins: 4,
//     monthlyWins: 12,
//     points: 1250,
//     rank: 'Silver Elite',
//     level: 12
//   };

//   const mockFriends: Friend[] = [
//     { id: '1', name: 'acepong', status: 'online', lastActive: '', rank: 'Gold Elite' },
//     { id: '2', name: 'topspin', status: 'in-game', lastActive: '', rank: 'Silver Pro' },
//     { id: '3', name: 'smashbro', status: 'offline', lastActive: '2 hours ago', rank: 'Bronze' },
//     { id: '4', name: 'slicemaster', status: 'online', lastActive: '', rank: 'Silver Elite' },
//     { id: '5', name: 'netbuster', status: 'offline', lastActive: '1 day ago', rank: 'Gold' }
//   ];

//   const mockRecentMatches: Match[] = [
//     { id: '1', opponent: 'topspin', result: 'win', score: '11-7', date: '2 hours ago', duration: 8, matchType: 'quick' },
//     { id: '2', opponent: 'smashbro', result: 'loss', score: '8-11', date: '1 day ago', duration: 12, matchType: 'ranked' },
//     { id: '3', opponent: 'acepong', result: 'win', score: '11-9', date: '2 days ago', duration: 15, matchType: 'tournament' }
//   ];

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     // Setup socket connection
//     socketRef.current = io("/lobby", {
//       path: "/socket.io",
//       transports: ["websocket"],
//       secure: true
//     });

//     socketRef.current.on("connect", () => {
//       socketRef.current?.emit("name", user.name);
//     });

//     socketRef.current.on("lobby_update", (data) => {
//       setPlayers(data.players);
//       setPongGames(data.pongGames);
//       setKeyClashGames(data.keyClashGames);
//     });

//     socketRef.current.on("created_game", (gameId, game, mode) => {
//       joinGame(gameId, game, mode);
//     });

//     socketRef.current.on("joined_game", (gameId, game, mode) => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//       navigate(`/${game}/${mode}/${gameId}`, { state: { name: user.name } });
//     });

//     // Load lobby data
//     loadLobbyData();

//     return () => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//     };
//   }, [user, navigate]);

//   const loadLobbyData = async () => {
//     setLobbyState(prev => ({ ...prev, isLoading: true }));
    
//     try {
//       // Using mock data - replace with API calls
//       setLobbyState(prev => ({
//         ...prev,
//         gameStats: mockStats,
//         friends: mockFriends,
//         recentMatches: mockRecentMatches,
//         friendRequests: [],
//         notifications: []
//       }));
      
//     } catch (error) {
//       console.error('Error loading lobby data:', error);
//     } finally {
//       setLobbyState(prev => ({ ...prev, isLoading: false }));
//     }
//   };

//   const setActiveTab = (tab: LobbyState['activeTab']) => {
//     setLobbyState(prev => ({ ...prev, activeTab: tab }));
//   };

//   const createLocalPong = () => {
//     socketRef.current?.emit("create_game", "pong", "local");
//   };

//   const createRemotePong = () => {
//     socketRef.current?.emit("create_game", "pong", "remote");
//   };

//   const createLocalKeyClash = () => {
//     socketRef.current?.emit("create_game", "keyclash", "local");
//   };

//   const createRemoteKeyClash = () => {
//     socketRef.current?.emit("create_game", "keyclash", "remote");
//   };

//   const joinGame = (gameId: string, game: "pong" | "keyclash", mode: "local" | "remote") => {
//     socketRef.current?.emit("join_game", gameId, game, mode, (res: { error: string }) => {
//       if (res.error) alert(res.error);
//     });
//   };

//   const handleQuickMatch = () => {
//     // Navigate to play page or create a quick match
//     navigate('/play');
//   };

//   const handleChampionship = () => {
//     alert('Championship feature coming soon!');
//   };

//   if (!user) return null;

//   if (lobbyState.isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading lobby...</div>
//       </div>
//     );
//   }

//   const displayStats = lobbyState.gameStats || mockStats;
//   const onlineFriends = lobbyState.friends.filter(f => f.status === 'online' || f.status === 'in-game');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
//       <div className="max-w-7xl mx-auto">
//         <LobbyHeader user={user} />
        
//         <ActionButtons 
//           onQuickMatch={handleQuickMatch}
//           onChampionship={handleChampionship}
//         />

//         <TabNavigation 
//           activeTab={lobbyState.activeTab} 
//           onTabChange={setActiveTab} 
//         />

//         {/* Tab Content */}
//         {lobbyState.activeTab === 'overview' && (
//           <div className="space-y-6">
//             <OverviewTab 
//               stats={displayStats}
//               onlineFriends={onlineFriends}
//               recentMatches={lobbyState.recentMatches.slice(0, 3)}
//             />
            
//             {/* Game Rooms Section */}
//             <div className="bg-gray-800 rounded-xl p-6">
//               <h3 className="text-xl font-bold mb-4 text-yellow-300">🎮 Active Game Rooms</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Pong Games */}
//                 <div className="bg-gray-700 rounded-lg p-4">
//                   <h4 className="text-lg font-bold mb-3 text-green-300">🏓 Pong Games</h4>
//                   <div className="space-y-2">
//                     {pongGames.map(game => (
//                       <div 
//                         key={game.id}
//                         className={`p-3 rounded cursor-pointer transition ${
//                           game.status === "waiting" 
//                             ? "bg-green-800 hover:bg-green-700" 
//                             : "bg-gray-600 cursor-default"
//                         }`}
//                         onClick={() => game.status === "waiting" && joinGame(game.id, "pong", "remote")}
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-bold">Room-{game.id}</span>
//                           <span className={`px-2 py-1 rounded text-xs ${
//                             game.status === "waiting" ? "bg-yellow-500" : 
//                             game.status === "in-progress" ? "bg-blue-500" : "bg-red-500"
//                           }`}>
//                             {game.status}
//                           </span>
//                         </div>
//                         <div className="text-sm mt-1">
//                           {game.players.length} player{game.players.length !== 1 ? 's' : ''} • {game.mode}
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           {game.players.map(p => p.name).join(', ')}
//                         </div>
//                       </div>
//                     ))}
//                     <div className="flex gap-2 mt-3">
//                       <button 
//                         onClick={createLocalPong}
//                         className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
//                       >
//                         Create Local
//                       </button>
//                       <button 
//                         onClick={createRemotePong}
//                         className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm"
//                       >
//                         Create Remote
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Key Clash Games */}
//                 <div className="bg-gray-700 rounded-lg p-4">
//                   <h4 className="text-lg font-bold mb-3 text-purple-300">⌨️ Key Clash Games</h4>
//                   <div className="space-y-2">
//                     {keyClashGames.map(game => (
//                       <div 
//                         key={game.id}
//                         className={`p-3 rounded cursor-pointer transition ${
//                           game.status === "waiting" 
//                             ? "bg-purple-800 hover:bg-purple-700" 
//                             : "bg-gray-600 cursor-default"
//                         }`}
//                         onClick={() => game.status === "waiting" && joinGame(game.id, "keyclash", "remote")}
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-bold">Room-{game.id}</span>
//                           <span className={`px-2 py-1 rounded text-xs ${
//                             game.status === "waiting" ? "bg-yellow-500" : 
//                             game.status === "in-progress" ? "bg-blue-500" : "bg-red-500"
//                           }`}>
//                             {game.status}
//                           </span>
//                         </div>
//                         <div className="text-sm mt-1">
//                           {Object.keys(game.players).length} player{Object.keys(game.players).length !== 1 ? 's' : ''} • {game.mode}
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           {game.p1 && `${game.p1}`}{game.p2 && ` vs ${game.p2}`}
//                         </div>
//                       </div>
//                     ))}
//                     <div className="flex gap-2 mt-3">
//                       <button 
//                         onClick={createLocalKeyClash}
//                         className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
//                       >
//                         Create Local
//                       </button>
//                       <button 
//                         onClick={createRemoteKeyClash}
//                         className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm"
//                       >
//                         Create Remote
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Online Players */}
//             <div className="bg-gray-800 rounded-xl p-6">
//               <h3 className="text-xl font-bold mb-4 text-blue-300">👥 Players Online ({players.length})</h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {players.map(player => (
//                   <div key={player.id} className="bg-gray-700 rounded p-3 text-center">
//                     <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-2"></div>
//                     <div className="text-sm truncate">{player.name}</div>
//                   </div>
//                 ))}
//                 {players.length === 0 && (
//                   <div className="col-span-full text-center text-gray-400 py-4">
//                     No players online
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {lobbyState.activeTab === 'locker' && (
//           <LockerTab 
//             user={user}
//             onUpdateProfile={() => alert('Profile update coming soon!')}
//             onGameSettings={() => alert('Game settings coming soon!')}
//             onLogout={logout}
//           />
//         )}

//         {lobbyState.activeTab === 'squad' && (
//           <SquadTab 
//             friends={lobbyState.friends}
//             onChallengeFriend={(id, name) => alert(`Challenge ${name}!`)}
//             onSendMessage={(id, name) => alert(`Message ${name}!`)}
//             onAddFriend={() => alert('Add friend!')}
//           />
//         )}

//         {lobbyState.activeTab === 'history' && (
//           <HistoryTab 
//             stats={displayStats}
//             recentMatches={lobbyState.recentMatches}
//             onViewAllMatches={() => alert('View all matches!')}
//           />
//         )}
//       </div>
//     </div>
//   );
// }


// frontend/src/pages/authorised/lobby.tsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import { GameStats, Friend, Match, LobbyState } from '../../types/lobby';
import ActionButtons from '../../components/lobby/ActionButtons';
import TabNavigation from '../../components/lobby/TabNavigation';
import OverviewTab from '../../components/lobby/OverviewTab';
import LockerTab from '../../components/lobby/LockerTab';
import SquadTab from '../../components/lobby/SquadTab';
import HistoryTab from '../../components/lobby/HistoryTab';
import LobbyHeader from '../../components/lobby/LobbyHeader';
import { QuickmatchBrowser } from '../../components/quickmatch';
import { ChampionshipBrowser } from '../../components/championship'; 


interface Player {
  id: string;
  name: string;
}

interface PongRoom {
  id: string;
  status: "waiting" | "in-progress" | "finished";  
  players: { id: string, name: string }[];
  mode: "local" | "remote";
}

interface KeyClashRoom {
  id: string;
  status: "waiting" | "in-progress" | "finished";  
  players: Record<string, number>;
  p1: string;
  p2: string;
  mode: "local" | "remote";
}

export default function LobbyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);
  
  // Socket states
  const [players, setPlayers] = useState<Player[]>([]);
  const [pongGames, setPongGames] = useState<PongRoom[]>([]);
  const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
  
  // Navigation states
  const [showQuickMatch, setShowQuickMatch] = useState(false);
  const [showChampionship, setShowChampionship] = useState(false);
  const [browserType, setBrowserType] = useState<'quick' | 'championship' | null>(null);
  
  // Lobby states
  const [lobbyState, setLobbyState] = useState<LobbyState>({
    activeTab: 'overview',
    isLoading: true,
    gameStats: null,
    friends: [],
    recentMatches: [],
    friendRequests: [],
    notifications: []
  });

  // Mock data for lobby functionality
  const mockStats: GameStats = {
    totalMatches: 25,
    wins: 15,
    losses: 8,
    draws: 2,
    winRate: 60,
    currentWinStreak: 3,
    longestWinStreak: 7,
    weeklyWins: 4,
    monthlyWins: 12,
    points: 1250,
    rank: 'Silver Elite',
    level: 12
  };

  const mockFriends: Friend[] = [
    { id: '1', name: 'acepong', status: 'online', lastActive: '', rank: 'Gold Elite' },
    { id: '2', name: 'topspin', status: 'in-game', lastActive: '', rank: 'Silver Pro' },
    { id: '3', name: 'smashbro', status: 'offline', lastActive: '2 hours ago', rank: 'Bronze' },
    { id: '4', name: 'slicemaster', status: 'online', lastActive: '', rank: 'Silver Elite' },
    { id: '5', name: 'netbuster', status: 'offline', lastActive: '1 day ago', rank: 'Gold' }
  ];

  const mockRecentMatches: Match[] = [
    { id: '1', opponent: 'topspin', result: 'win', score: '11-7', date: '2 hours ago', duration: 8, matchType: 'quick' },
    { id: '2', opponent: 'smashbro', result: 'loss', score: '8-11', date: '1 day ago', duration: 12, matchType: 'ranked' },
    { id: '3', opponent: 'acepong', result: 'win', score: '11-9', date: '2 days ago', duration: 15, matchType: 'tournament' }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Setup socket connection
    socketRef.current = io("/lobby", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to lobby:", socketRef.current?.id);
      socketRef.current?.emit("name", user.name);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Lobby connection error:", error);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Disconnected from lobby:", reason);
    });

    socketRef.current.on("lobby_update", (data) => {
      setPlayers(data.players);
      setPongGames(data.pongGames);
      setKeyClashGames(data.keyClashGames);
    });

    socketRef.current.on("created_game", (gameId, game, mode) => {
      if (mode === "remote") {
        joinGame(gameId, game, mode);
      }
    });

    socketRef.current.on("joined_game", (gameId, game, mode) => {
      // Clean disconnect
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      navigate(`/${game}/${mode}/${gameId}`, { state: { name: user.name } });
    });

    // Load lobby data
    loadLobbyData();

    return () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, navigate]);

  const loadLobbyData = async () => {
    setLobbyState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Using mock data - replace with API calls when backend is ready
      setLobbyState(prev => ({
        ...prev,
        gameStats: mockStats,
        friends: mockFriends,
        recentMatches: mockRecentMatches,
        friendRequests: [],
        notifications: []
      }));
      
    } catch (error) {
      console.error('Error loading lobby data:', error);
    } finally {
      setLobbyState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Tab management
  const setActiveTab = (tab: LobbyState['activeTab']) => {
    setLobbyState(prev => ({ ...prev, activeTab: tab }));
  };

  // Game creation functions
  const createLocalPong = () => {
    const localGameId = `local-pong-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    navigate(`/pong/local/${localGameId}`, { 
      state: { 
        name: user?.name,
        isLocal: true 
      } 
    });
  };

  const createLocalKeyClash = () => {
    const localGameId = `local-keyclash-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    navigate(`/keyclash/local/${localGameId}`, { 
      state: { 
        name: user?.name,
        isLocal: true 
      } 
    });
  };

  const createRemotePong = () => {
    socketRef.current?.emit("create_game", "pong", "remote");
  };

  const createRemoteKeyClash = () => {
    socketRef.current?.emit("create_game", "keyclash", "remote");
  };

  // Game joining function
  const joinGame = (gameId: string, game: "pong" | "keyclash", mode: "local" | "remote") => {
    if (mode === "local") {
      // For local games, navigate directly without socket emission
      navigate(`/${game}/${mode}/${gameId}`, { 
        state: { 
          name: user?.name,
          isLocal: true 
        } 
      });
    } else {
      // For remote games, use socket
      socketRef.current?.emit("join_game", gameId, game, mode, (res: { error?: string }) => {
        if (res.error) alert(res.error);
      });
    }
  };

  // Navigation handlers
  const handleQuickMatch = () => {
    setBrowserType('quick');
    setShowQuickMatch(true);
  };

  const handleChampionship = () => {
    setShowChampionship(true);
  };

  const handleBackToLobby = () => {
    setShowQuickMatch(false);
    setShowChampionship(false);
    setBrowserType(null);
  };

  // Lobby action handlers
  const handleChallengeFriend = async (friendId: string, friendName: string) => {
    try {
      alert(`Challenge sent to ${friendName}!`);
    } catch (error) {
      console.error('Error sending challenge:', error);
    }
  };

  const handleSendMessage = (friendId: string, friendName: string) => {
    alert(`Opening chat with ${friendName}`);
  };

  const handleAddFriend = async () => {
    const username = prompt('Enter username to add as friend:');
    if (username) {
      try {
        alert(`Friend request sent to ${username}!`);
      } catch (error) {
        console.error('Error sending friend request:', error);
      }
    }
  };

  const handleUpdateProfile = () => {
    alert('Profile update feature coming soon!');
  };

  const handleGameSettings = () => {
    alert('Game settings feature coming soon!');
  };

  const handleViewAllMatches = () => {
    alert('Detailed match history page coming soon!');
  };

  if (!user) return null;

  if (lobbyState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading lobby...</div>
      </div>
    );
  }

  // Show Championship Browser when Championship is clicked
  if (showChampionship) {
    return <ChampionshipBrowser onBack={handleBackToLobby} />;
  }

  // Show Game Browser when Quick Match is clicked
  if (showQuickMatch) {
    return (
      <QuickmatchBrowser 
        type={browserType}
        pongGames={pongGames}
        keyClashGames={keyClashGames}
        players={players}
        onCreateLocalPong={createLocalPong}
        onCreateRemotePong={createRemotePong}
        onCreateLocalKeyClash={createLocalKeyClash}
        onCreateRemoteKeyClash={createRemoteKeyClash}
        onJoinGame={joinGame}
        onBack={handleBackToLobby}
      />
    );
  }

  const displayStats = lobbyState.gameStats || mockStats;
  const onlineFriends = lobbyState.friends.filter(f => f.status === 'online' || f.status === 'in-game');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <LobbyHeader user={user} />
        
        <ActionButtons 
          onQuickMatch={handleQuickMatch}
          onChampionship={handleChampionship}
        />

        <TabNavigation 
          activeTab={lobbyState.activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Tab Content */}
        {lobbyState.activeTab === 'overview' && (
          <OverviewTab 
            stats={displayStats}
            onlineFriends={onlineFriends}
            recentMatches={lobbyState.recentMatches.slice(0, 3)}
            totalPlayers={players.length}
          />
        )}

        {lobbyState.activeTab === 'locker' && (
          <LockerTab 
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onGameSettings={handleGameSettings}
            onLogout={logout}
          />
        )}

        {lobbyState.activeTab === 'squad' && (
          <SquadTab 
            friends={lobbyState.friends}
            onChallengeFriend={handleChallengeFriend}
            onSendMessage={handleSendMessage}
            onAddFriend={handleAddFriend}
          />
        )}

        {lobbyState.activeTab === 'history' && (
          <HistoryTab 
            stats={displayStats}
            recentMatches={lobbyState.recentMatches}
            onViewAllMatches={handleViewAllMatches}
          />
        )}
      </div>
    </div>
  );
}