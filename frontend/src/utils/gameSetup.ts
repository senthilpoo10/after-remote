// frontend/src/utils/gameSetup.ts
export interface GameAvatar {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface GamePlayer {
  name: string;
  avatar: GameAvatar | null;
}

export interface LocalGameSetup {
  player1: GamePlayer;
  player2: GamePlayer;
  gameType: 'pong' | 'keyclash';
}

export const getLocalGameSetup = (): LocalGameSetup | null => {
  try {
    const setup = localStorage.getItem('localGameSetup');
    if (setup) {
      const parsed = JSON.parse(setup);
      // Clear it after reading so it doesn't persist
      localStorage.removeItem('localGameSetup');
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to load local game setup:', error);
  }
  return null;
};

// Example of how to use this in your PlayPage component:
/*
// In frontend/src/pages/playPage.tsx, modify the useEffect:

useEffect(() => {
  const name = location.state?.name;
  
  // For local games, try to get the setup from localStorage
  let player1Name = name;
  let player2Name = null;
  
  if (mode === "local") {
    const gameSetup = getLocalGameSetup();
    if (gameSetup) {
      player1Name = gameSetup.player1.name;
      player2Name = gameSetup.player2.name;
      
      // You can also use the avatars here for visual representation
      console.log('Player 1 Avatar:', gameSetup.player1.avatar);
      console.log('Player 2 Avatar:', gameSetup.player2.avatar);
    }
  }
  
  if (containerRef.current && gameId && mode && game === "pong") {
    pongInstance.current = new PingPongClient(
      containerRef.current, 
      gameId, 
      mode, 
      navigate, 
      player1Name
    );
  }
  else if (containerRef.current && gameId && mode && game === "keyclash") {
    const cleanup = KeyClashClient(
      containerRef.current, 
      gameId, 
      mode, 
      navigate, 
      player1Name,
      player2Name // Pass player2 name for local games
    );
    return cleanup;
  }
  
  return () => {
    if (pongInstance.current) {
      pongInstance.current.dispose?.();
      pongInstance.current = null; 
    }
  };
}, [gameId, mode, game, location]);
*/