// frontend/src/components/lobby/QuickmatchBrowser.tsx
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

export default function QuickmatchBrowser() {
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