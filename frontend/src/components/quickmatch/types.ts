// frontend/src/components/lobby/gameroom/types.ts
export interface Player {
  id: string;
  name: string;
}

export interface PongRoom {
  id: string;
  status: "waiting" | "in-progress" | "finished";  
  players: { id: string, name: string }[];
}

export interface KeyClashRoom {
  id: string,
  status: "waiting" | "in-progress" | "finished";  
  players: Record<string, number>;
  p1: string,
  p2: string
}

export type GameMode = "local" | "remote";
export type GameType = "pong" | "keyclash";