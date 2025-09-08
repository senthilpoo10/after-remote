// frontend/src/types/game.ts
export interface GameResult {
  winner: string;
  player1: string;
  player2: string;
  score: string;
  duration: number;
  gameType: 'pong' | 'keyclash';
}