// // frontend/src/components/lobby/QuickmatchBrowser.tsx
// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { useAuth } from "../../contexts/AuthContext";

// // ✨ Clean single import from index.ts
// import { 
//   Player, 
//   PongRoom, 
//   KeyClashRoom, 
//   GameType, 
//   GameMode,
//   IndividualGameCard,
//   OnlinePlayersSection,
//   GameRoomHeader,
// } from "./index";

// export default function QuickmatchBrowser() {
//   const socketRef = useRef<Socket | null>(null);
//   const navigate = useNavigate();
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [pongGames, setPongGames] = useState<PongRoom[]>([]);
//   const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
//   const { user } = useAuth();
//   let name: string | null = null;

//   useEffect(() => {
//     socketRef.current = io("/lobby", {
//       path: "/socket.io",
//       transports: ["websocket"],
//       secure: true
//     });

//     socketRef.current.on("connect", () => {
//       if (user)
//         name = user.name;
//       socketRef.current.emit("name", name);
//     });

//     socketRef.current.on("lobby_update", (data) => {
//       setPlayers(data.players);
//       setPongGames(data.pongGames);
//       setKeyClashGames(data.keyClashGames)
//     });

//     socketRef.current.on("created_game", (gameId, game, mode) => {
//       joinGame(gameId, game, mode);
//     })

//     socketRef.current.on("joined_game", (gameId, game, mode) => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//       navigate(`/${game}/${mode}/${gameId}`, { state: { name: name } });
//     });

//     return () => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//     };
//   }, [user]);

//   const createGame = (gameType: GameType, mode: GameMode) => {
//     socketRef.current?.emit("create_game", gameType, mode);
//   };

//   const joinGame = (gameId: string, game: GameType, mode: GameMode) => {
//     socketRef.current?.emit("join_game", gameId, game, mode, (res: { error: string }) => {
//       if (res.error) alert(res.error);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       <div className="max-w-6xl mx-auto">
//         <GameRoomHeader />

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <IndividualGameCard
//             gameType="pong"
//             games={pongGames}
//             title="Ping Pong"
//             color="bg-green-600"
//             icon="🏓"
//             createGame={createGame}
//             joinGame={joinGame}
//           />
          
//           <IndividualGameCard
//             gameType="keyclash"
//             games={keyClashGames}
//             title="Key Clash"
//             color="bg-purple-600"
//             icon="⌨️"
//             createGame={createGame}
//             joinGame={joinGame}
//           />
//         </div>

//         <OnlinePlayersSection players={players} />
//       </div>
//     </div>
//   );
// }

// // frontend/src/components/quickmatch/QuickmatchBrowser.tsx
// // frontend/src/components/quickmatch/QuickmatchBrowser.tsx
// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { useAuth } from "../../contexts/AuthContext";

// // ✨ Clean single import from index.ts
// import { 
//   Player, 
//   PongRoom, 
//   KeyClashRoom, 
//   GameType, 
//   GameMode,
//   IndividualGameCard,
//   OnlinePlayersSection,
//   GameRoomHeader,
// } from "./index";

// // ✨ Game type
// type GameTab = 'pong' | 'keyclash';

// export default function QuickmatchBrowser() {
//   const socketRef = useRef<Socket | null>(null);
//   const navigate = useNavigate();
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [pongGames, setPongGames] = useState<PongRoom[]>([]);
//   const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
//   const [selectedGame, setSelectedGame] = useState<GameTab>('pong'); // ✨ Radio button state
//   const { user } = useAuth();
//   let name: string | null = null;

//   useEffect(() => {
//     socketRef.current = io("/lobby", {
//       path: "/socket.io",
//       transports: ["websocket"],
//       secure: true
//     });

//     socketRef.current.on("connect", () => {
//       if (user)
//         name = user.name;
//       socketRef.current.emit("name", name);
//     });

//     socketRef.current.on("lobby_update", (data) => {
//       setPlayers(data.players);
//       setPongGames(data.pongGames);
//       setKeyClashGames(data.keyClashGames)
//     });

//     socketRef.current.on("created_game", (gameId, game, mode) => {
//       joinGame(gameId, game, mode);
//     })

//     socketRef.current.on("joined_game", (gameId, game, mode) => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//       navigate(`/${game}/${mode}/${gameId}`, { state: { name: name } });
//     });

//     return () => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//     };
//   }, [user]);

//   const createGame = (gameType: GameType, mode: GameMode) => {
//     socketRef.current?.emit("create_game", gameType, mode);
//   };

//   const joinGame = (gameId: string, game: GameType, mode: GameMode) => {
//     socketRef.current?.emit("join_game", gameId, game, mode, (res: { error: string }) => {
//       if (res.error) alert(res.error);
//     });
//   };

//   const handleBackToLobby = () => {
//     navigate('/lobby');
//   };

//   // ✨ Game options for radio buttons
//   const gameOptions = [
//     { 
//       id: 'pong' as GameTab, 
//       icon: '🏓', 
//       label: 'Ping Pong',
//       color: 'bg-green-600',
//       games: pongGames
//     },
//     { 
//       id: 'keyclash' as GameTab, 
//       icon: '⌨️', 
//       label: 'Key Clash',
//       color: 'bg-purple-600',
//       games: keyClashGames
//     }
//   ];

//   const activeGame = gameOptions.find(game => game.id === selectedGame);

//   return (
//     <div className="min-h-screen  bg-gray-900 text-white p-4">
//       <div className="max-w-6xl mx-auto">
//         <GameRoomHeader onBack={handleBackToLobby} />

//         {/* ✨ Game Selection Radio Buttons */}
//         <div className="flex justify-center mb-6">
//           <div className="rounded-lg p-4">
//             <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">Select Game Type</h3>
//             <div className="flex gap-6">
//               {gameOptions.map((game) => (
//                 <label
//                   key={game.id}
//                   className="flex items-center gap-3 cursor-pointer group"
//                 >
//                   <input
//                     type="radio"
//                     name="gameType"
//                     value={game.id}
//                     checked={selectedGame === game.id}
//                     onChange={(e) => setSelectedGame(e.target.value as GameTab)}
//                     className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
//                   />
//                   <div className="flex items-center gap-2 group-hover:text-white transition-colors">
//                     <span className="text-xl">{game.icon}</span>
//                     <span className="font-medium">{game.label}</span>
//                   </div>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ✨ Main Content Layout - 5 Column Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           {/* ✨ Active Game Card Display - Takes 4 columns (80% width) */}
//           <div className="lg:col-span-4">
//             {activeGame && (
//               <IndividualGameCard
//                 gameType={activeGame.id}
//                 games={activeGame.games}
//                 title={activeGame.label}
//                 color={activeGame.color}
//                 icon={activeGame.icon}
//                 createGame={createGame}
//                 joinGame={joinGame}
//               />
//             )}
//           </div>

//           {/* ✨ Online Players Section - Takes 1 column (20% width) */}
//           <div className="lg:col-span-1">
//             <OnlinePlayersSection players={players} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/components/quickmatch/QuickmatchBrowser.tsx
// frontend/src/components/quickmatch/QuickmatchBrowser.tsx
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
} from "./index";

// ✨ Game type
type GameTab = 'pong' | 'keyclash';

export default function QuickmatchBrowser() {
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [pongGames, setPongGames] = useState<PongRoom[]>([]);
  const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameTab>('pong'); // ✨ Radio button state
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

  const handleBackToLobby = () => {
    navigate('/lobby');
  };

  // ✨ Game options for radio buttons
  const gameOptions = [
    { 
      id: 'pong' as GameTab, 
      icon: '🏓', 
      label: 'Ping Pong',
      color: 'bg-green-600',
      games: pongGames
    },
    { 
      id: 'keyclash' as GameTab, 
      icon: '⌨️', 
      label: 'Key Clash',
      color: 'bg-purple-600',
      games: keyClashGames
    }
  ];

  const activeGame = gameOptions.find(game => game.id === selectedGame);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <GameRoomHeader type="quick" onBack={handleBackToLobby} />

        {/* ✨ Game Selection Radio Buttons */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">Select Game Type</h3>
            <div className="flex gap-6">
              {gameOptions.map((game) => (
                <label
                  key={game.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="gameType"
                    value={game.id}
                    checked={selectedGame === game.id}
                    onChange={(e) => setSelectedGame(e.target.value as GameTab)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                    <span className="text-xl">{game.icon}</span>
                    <span className="font-medium">{game.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ✨ Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ✨ Single Active Game Card Display - Takes 4 columns */}
          <div className="lg:col-span-4">
            {activeGame && (
              <IndividualGameCard
                gameType={activeGame.id}
                games={activeGame.games}
                title={activeGame.label}
                color={activeGame.color}
                icon={activeGame.icon}
                createGame={createGame}
                joinGame={joinGame}
              />
            )}
          </div>

          {/* ✨ Online Players Section - Takes 1 column */}
          <div className="lg:col-span-1">
            <OnlinePlayersSection players={players} />
          </div>
        </div>
      </div>
    </div>
  );
}