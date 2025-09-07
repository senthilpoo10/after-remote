// frontend/src/types/lobby.ts
export interface GameStats {
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  currentWinStreak: number;
  longestWinStreak: number;
  weeklyWins: number;
  monthlyWins: number;
  points?: number;
  rank?: string;
  level?: number;
}

export interface Friend {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'in-game' | 'away';
  lastActive: string;
  rank: string;
  avatarUrl?: string;
  isFavorite?: boolean;
}

export interface Match {
  id: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  score: string;
  date: string;
  duration: number;
  matchType: 'quick' | 'ranked' | 'tournament' | 'friendly';
  pointsChange?: number;
}

export interface FriendRequest {
  id: string;
  sender: { id: string; name: string; avatarUrl?: string };
  receiver: { id: string; name: string; avatarUrl?: string };
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  message?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'FRIEND_REQUEST' | 'CHALLENGE' | 'MATCH_RESULT' | 'TOURNAMENT' | 'ACHIEVEMENT' | 'SYSTEM';
  isRead: boolean;
  data?: string;
  createdAt: string;
  readAt?: string;
}

export interface LobbyState {
  activeTab: 'overview' | 'locker' | 'squad' | 'history';
  isLoading: boolean;
  gameStats: GameStats | null;
  friends: Friend[];
  recentMatches: Match[];
  friendRequests: FriendRequest[];
  notifications: Notification[];
}