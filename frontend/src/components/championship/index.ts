// frontend/src/components/lobby/championship/index.ts
// Barrel exports for championship components and types

// ===== MAIN COMPONENTS =====
export { default as ChampionshipBrowser } from './ChampionshipBrowser';

// ===== SUB-COMPONENTS =====
export { TournamentCard } from './TournamentCard';
export { TournamentBracket } from './TournamentBracket';
export { CreateTournamentModal } from './CreateTournamentModal';

// ===== TYPES =====
export type {
  Tournament,
  TournamentParticipant,
  TournamentMatch
} from './types';