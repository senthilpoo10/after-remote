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
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

// ✨ Clean single import from index.ts
import { 
  Player, 
  PongRoom, 
  KeyClashRoom, 
  GameType, 
  GameMode,
  IndividualGameCard,
  OnlinePlayersSection,
  GameRoomHeader,
} from "./gameroom";

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
        <GameRoomHeader />

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

        <OnlinePlayersSection players={players} />
      </div>
    </div>
  );
}