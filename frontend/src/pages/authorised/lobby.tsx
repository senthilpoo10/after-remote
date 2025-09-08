// frontend/src/pages/authorised/lobby.tsx - SIMPLIFIED VERSION
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import { useOnlineUsers } from '../../hooks/useOnlineUsers';
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
  const { onlineUsers, isLoading: usersLoading } = useOnlineUsers(); // 🎯 Simple online users
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);
  
  // Socket states (only for game rooms, not users)
  const [pongGames, setPongGames] = useState<PongRoom[]>([]);
  const [keyClashGames, setKeyClashGames] = useState<KeyClashRoom[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  
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
    { id: '3', name: 'smashbro', status: 'offline', lastActive: '2 hours ago', rank: 'Bronze' }
  ];

  const mockRecentMatches: Match[] = [
    { id: '1', opponent: 'topspin', result: 'win', score: '11-7', date: '2 hours ago', duration: 8, matchType: 'quick' },
    { id: '2', opponent: 'smashbro', result: 'loss', score: '8-11', date: '1 day ago', duration: 12, matchType: 'ranked' }
  ];

  // 🎯 SIMPLIFIED: Only socket for game rooms, not users
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Create socket only for game management
    socketRef.current = io("/lobby", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true
    });

    socketRef.current.on("connect", () => {
      setIsSocketConnected(true);
      console.log("Connected for game management:", socketRef.current?.id);
    });

    socketRef.current.on("disconnect", () => {
      setIsSocketConnected(false);
    });

    // Only listen for game updates, not user updates
    socketRef.current.on("lobby_update", (data) => {
      setPongGames(data.pongGames || []);
      setKeyClashGames(data.keyClashGames || []);
    });

    socketRef.current.on("created_game", (gameId, game, mode) => {
      if (mode === "remote") {
        joinGame(gameId, game, mode);
      }
    });

    socketRef.current.on("joined_game", (gameId, game, mode) => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      navigate(`/${game}/${mode}/${gameId}`, { state: { name: user.name } });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, navigate]);

  useEffect(() => {
    loadLobbyData();
  }, []);

  const loadLobbyData = async () => {
    setLobbyState(prev => ({ ...prev, isLoading: true }));
    
    try {
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

  const setActiveTab = (tab: LobbyState['activeTab']) => {
    setLobbyState(prev => ({ ...prev, activeTab: tab }));
  };

  const createGame = (gameType: "pong" | "keyclash", mode: "local" | "remote") => {
    if (mode === "local") {
      const localGameId = `local-${gameType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      navigate(`/${gameType}/${mode}/${localGameId}`, { 
        state: { name: user?.name, isLocal: true } 
      });
    } else {
      socketRef.current?.emit("create_game", gameType, mode);
    }
  };

  const joinGame = (gameId: string, game: "pong" | "keyclash", mode: "local" | "remote") => {
    if (mode === "local") {
      navigate(`/${game}/${mode}/${gameId}`, { 
        state: { name: user?.name, isLocal: true } 
      });
    } else {
      socketRef.current?.emit("join_game", gameId, game, mode, (res: { error?: string }) => {
        if (res.error) alert(res.error);
      });
    }
  };

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

  if (!user) return null;

  if (lobbyState.isLoading || usersLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading lobby...</div>
      </div>
    );
  }

  if (showChampionship) {
    return <ChampionshipBrowser onBack={handleBackToLobby} />;
  }

  if (showQuickMatch) {
    return (
      <QuickmatchBrowser 
        pongGames={pongGames}
        keyClashGames={keyClashGames}
        players={onlineUsers} // 🎯 Use DB users
        onCreateGame={createGame}
        onJoinGame={joinGame}
        onBack={handleBackToLobby}
      />
    );
  }

  const displayStats = lobbyState.gameStats || mockStats;
  const onlineFriends = lobbyState.friends.filter(f => f.status === 'online' || f.status === 'in-game');


  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <LobbyHeader user={user} />
        
        <ActionButtons 
          onQuickMatch={handleQuickMatch}
          onChampionship={handleChampionship}
        />

        {!isSocketConnected && (
          <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-3 mb-6 text-center">
            <div className="text-yellow-400">Connecting to game server...</div>
          </div>
        )}

        <TabNavigation 
          activeTab={lobbyState.activeTab} 
          onTabChange={setActiveTab} 
        />

        {lobbyState.activeTab === 'overview' && (
          <OverviewTab 
            stats={displayStats}
            onlineFriends={onlineFriends}
            recentMatches={lobbyState.recentMatches.slice(0, 3)}
            totalPlayers={onlineUsers.length} // 🎯 Real count from DB
          />
        )}

        {lobbyState.activeTab === 'locker' && (
          <LockerTab 
            user={user}
            onUpdateProfile={() => alert('Profile update coming soon!')}
            onGameSettings={() => alert('Game settings coming soon!')}
            onLogout={logout}
          />
        )}

        {lobbyState.activeTab === 'squad' && (
          <SquadTab 
            friends={lobbyState.friends}
            onChallengeFriend={(id, name) => alert(`Challenge ${name}!`)}
            onSendMessage={(id, name) => alert(`Message ${name}!`)}
            onAddFriend={() => alert('Add friend!')}
          />
        )}

        {lobbyState.activeTab === 'history' && (
          <HistoryTab 
            stats={displayStats}
            recentMatches={lobbyState.recentMatches}
            onViewAllMatches={() => alert('View all matches!')}
          />
        )}
      </div>
    </div>
  );
}