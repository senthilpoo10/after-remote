// // frontend/src/components/lobby/GameRoomBrowser.tsx
// import { PongRoom, KeyClashRoom, Player } from '../../types/lobby';

// interface GameRoomBrowserProps {
//   type: 'quick' | 'championship' | null;
//   pongGames: PongRoom[];
//   keyClashGames: KeyClashRoom[];
//   players: Player[];
//   onCreateLocalPong: () => void;
//   onCreateRemotePong: () => void;
//   onCreateLocalKeyClash: () => void;
//   onCreateRemoteKeyClash: () => void;
//   onJoinGame: (gameId: string, game: "pong" | "keyclash", mode: "local" | "remote") => void;
//   onBack: () => void;
// }

// export default function GameRoomBrowser({
//   type,
//   pongGames,
//   keyClashGames,
//   players,
//   onCreateLocalPong,
//   onCreateRemotePong,
//   onCreateLocalKeyClash,
//   onCreateRemoteKeyClash,
//   onJoinGame,
//   onBack
// }: GameRoomBrowserProps) {
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
//       <div className="max-w-6xl mx-auto">
//         <button onClick={onBack} className="mb-6 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
//           ← Back to Lobby
//         </button>

//         <h1 className="text-3xl font-bold mb-6 text-center">
//           {type === 'quick' ? '⚡ Quick Match' : '🏆 Championship'} - Available Games
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Pong Games Section */}
//           <div className="bg-gray-800 rounded-xl p-6">
//             <h2 className="text-2xl font-bold mb-4 text-green-300">🏓 Pong Games</h2>
//             <div className="space-y-3">
//               {pongGames.map(game => (
//                 <div 
//                   key={game.id}
//                   className={`p-3 rounded cursor-pointer transition ${
//                     game.status === "waiting" 
//                       ? "bg-green-800 hover:bg-green-700" 
//                       : "bg-gray-600 cursor-default"
//                   }`}
//                   onClick={() => game.status === "waiting" && onJoinGame(game.id, "pong", "remote")}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold">Room-{game.id}</span>
//                     <span className={`px-2 py-1 rounded text-xs ${
//                       game.status === "waiting" ? "bg-yellow-500" : 
//                       game.status === "in-progress" ? "bg-blue-500" : "bg-red-500"
//                     }`}>
//                       {game.status}
//                     </span>
//                   </div>
//                   <div className="text-sm mt-1">
//                     {game.players.length} player{game.players.length !== 1 ? 's' : ''} • {game.mode}
//                   </div>
//                   <div className="text-xs text-gray-400 mt-1">
//                     {game.players.map(p => p.name).join(', ')}
//                   </div>
//                 </div>
//               ))}
//               <div className="flex gap-2 mt-4">
//                 <button 
//                   onClick={onCreateLocalPong}
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
//                 >
//                   Create Local
//                 </button>
//                 <button 
//                   onClick={onCreateRemotePong}
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm"
//                 >
//                   Create Remote
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Key Clash Games Section */}
//           <div className="bg-gray-800 rounded-xl p-6">
//             <h2 className="text-2xl font-bold mb-4 text-purple-300">⌨️ Key Clash Games</h2>
//             <div className="space-y-3">
//               {keyClashGames.map(game => (
//                 <div 
//                   key={game.id}
//                   className={`p-3 rounded cursor-pointer transition ${
//                     game.status === "waiting" 
//                       ? "bg-purple-800 hover:bg-purple-700" 
//                       : "bg-gray-600 cursor-default"
//                   }`}
//                   onClick={() => game.status === "waiting" && onJoinGame(game.id, "keyclash", "remote")}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold">Room-{game.id}</span>
//                     <span className={`px-2 py-1 rounded text-xs ${
//                       game.status === "waiting" ? "bg-yellow-500" : 
//                       game.status === "in-progress" ? "bg-blue-500" : "bg-red-500"
//                     }`}>
//                       {game.status}
//                     </span>
//                   </div>
//                   <div className="text-sm mt-1">
//                     {Object.keys(game.players).length} player{Object.keys(game.players).length !== 1 ? 's' : ''} • {game.mode}
//                   </div>
//                   <div className="text-xs text-gray-400 mt-1">
//                     {game.p1 && `${game.p1}`}{game.p2 && ` vs ${game.p2}`}
//                   </div>
//                 </div>
//               ))}
//               <div className="flex gap-2 mt-4">
//                 <button 
//                   onClick={onCreateLocalKeyClash}
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
//                 >
//                   Create Local
//                 </button>
//                 <button 
//                   onClick={onCreateRemoteKeyClash}
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm"
//                 >
//                   Create Remote
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Online Players */}
//         <div className="bg-gray-800 rounded-xl p-6 mt-6">
//           <h3 className="text-xl font-bold mb-4 text-blue-300">👥 Players Online ({players.length})</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//             {players.map(player => (
//               <div key={player.id} className="bg-gray-700 rounded p-3 text-center">
//                 <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-2"></div>
//                 <div className="text-sm truncate">{player.name}</div>
//               </div>
//             ))}
//             {players.length === 0 && (
//               <div className="col-span-full text-center text-gray-400 py-4">
//                 No players online
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/components/lobby/GameRoomBrowser.tsx
// frontend/src/components/lobby/GameRoomBrowser.tsx
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

interface Player {
  id: string;
  name: string;
}
interface PongRoom {
  id: string;
  status: "waiting" | "in-progress" | "finished";  
  players: { id: string, name: string }[];
}

interface KeyClashRoom {
  id: string,
  status: "waiting" | "in-progress" | "finished";  
  players: Record<string, number>;
  p1: string,
  p2: string
}

type GameMode = "local" | "remote";
type GameType = "pong" | "keyclash";

// Separate component for individual game card
const IndividualGameCard = ({ 
  gameType, 
  games, 
  title, 
  color, 
  icon,
  createGame,
  joinGame
}: { 
  gameType: GameType;
  games: (PongRoom | KeyClashRoom)[];
  title: string;
  color: string;
  icon: string;
  createGame: (gameType: GameType, mode: GameMode) => void;
  joinGame: (gameId: string, game: GameType, mode: GameMode) => void;
}) => {
  // Each card has its own independent tab state
  const [activeTab, setActiveTab] = useState<GameMode>("remote");

  const TabButton = ({ mode, children, icon }: { mode: GameMode, children: React.ReactNode, icon: string }) => (
    <button
      onClick={() => setActiveTab(mode)}
      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
        activeTab === mode
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      <span>{icon}</span>
      {children}
    </button>
  );

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className={`${color} p-4`}>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
      </div>
      
      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <TabButton mode="remote" icon="🌐">
            Online Games
          </TabButton>
          <TabButton mode="local" icon="🏠">
            Local Games
          </TabButton>
        </div>

        {/* Game Content */}
        <div className="space-y-3">
          {activeTab === "remote" ? (
            <>
              {games.map(game => (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default function GameRoomBrowser() {
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [pongGames, setPongGames] = useState<PongRoom[]>([]);
  const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
  const { user } = useAuth();
  let name: string | null = null;

  useEffect(() => {
    socketRef.current = io("/lobby", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true
    });

    socketRef.current.on("connect", () => {
      if (user)
        name = user.name;
      socketRef.current.emit("name", name);
    });

    socketRef.current.on("lobby_update", (data) => {
      setPlayers(data.players);
      setPongGames(data.pongGames);
      setKeyClashGames(data.keyClashGames)
    });

    socketRef.current.on("created_game", (gameId, game, mode) => {
      joinGame(gameId, game, mode);
    })

    socketRef.current.on("joined_game", (gameId, game, mode) => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      navigate(`/${game}/${mode}/${gameId}`, { state: { name: name } });
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  const createGame = (gameType: GameType, mode: GameMode) => {
    socketRef.current?.emit("create_game", gameType, mode);
  };

  const joinGame = (gameId: string, game: GameType, mode: GameMode) => {
    socketRef.current?.emit("join_game", gameId, game, mode, (res: { error: string }) => {
      if (res.error) alert(res.error);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎮 Available Games
          </h1>
          <p className="text-gray-300">Choose your game and start playing!</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IndividualGameCard
            gameType="pong"
            games={pongGames}
            title="Ping Pong"
            color="bg-green-600"
            icon="🏓"
            createGame={createGame}
            joinGame={joinGame}
          />
          
          <IndividualGameCard
            gameType="keyclash"
            games={keyClashGames}
            title="Key Clash"
            color="bg-purple-600"
            icon="⌨️"
            createGame={createGame}
            joinGame={joinGame}
          />
        </div>

        {/* Online Players */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="bg-blue-600 p-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>👥</span>
              Players Online ({players.length})
            </h3>
          </div>
          <div className="p-4">
            {players.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {players.map(player => (
                  <div key={player.id} className="bg-gray-700 rounded-lg p-3 text-center hover:bg-gray-600 transition">
                    <div className="w-3 h-3 rounded-full bg-green-400 mx-auto mb-2 animate-pulse"></div>
                    <div className="text-sm truncate font-medium">{player.name}</div>
                    <div className="text-xs text-gray-400">Online</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <div className="text-3xl mb-2">😴</div>
                <div>No players online</div>
                <div className="text-sm mt-1">Be the first to join!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}