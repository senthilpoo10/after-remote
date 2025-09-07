// frontend/src/components/lobby/championship/types.ts
export interface Tournament {
  id: string;
  name: string;
  description?: string;
  maxParticipants: number;
  currentParticipants: number;
  entryFee: number;
  prizePool: number;
  status: 'upcoming' | 'registration_open' | 'in_progress' | 'completed' | 'cancelled';
  tournamentType: 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss';
  gameType: 'pong' | 'keyclash';
  startDate: string;
  registrationEnd: string;
  participants: TournamentParticipant[];
  winner?: TournamentParticipant;
  createdBy: string;
}

export interface TournamentParticipant {
  id: string;
  userId: string;
  userName: string;
  registeredAt: string;
  eliminated: boolean;
  finalRank?: number;
}

export interface TournamentMatch {
  id: string;
  tournamentId: string;
  round: number;
  player1: TournamentParticipant;
  player2: TournamentParticipant;
  winner?: TournamentParticipant;
  status: 'scheduled' | 'in_progress' | 'completed';
  matchDate?: string;
}