// // import React, { useEffect, useRef } from 'react';
// // import PingPongClient from '../PingPongClient';
// // import { useParams, useNavigate, useLocation } from 'react-router-dom';
// // import KeyClashClient from '../keyClashClient';

// // const PlayPage: React.FC = () => {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const pongInstance = useRef<PingPongClient>(null);
// //   const { gameId } = useParams<{ gameId: string }>();
// //   const { mode } = useParams<{ mode: "local" | "remote" }>();
// //   const { game } = useParams<{ game: "pong" | "keyclash" }>();
// //   const navigate = useNavigate();
// //   const location  = useLocation();

// //   useEffect(() => {
// //     const name = location.state.name;
// //     if (containerRef.current && gameId && mode && game === "pong") {
// //       pongInstance.current = new PingPongClient(containerRef.current, gameId, mode, navigate, name);
// //     }
// //     else if (containerRef.current && gameId && mode && game === "keyclash") {
// //       const cleanup = KeyClashClient(containerRef.current, gameId, mode, navigate, name);
// //       return cleanup;
// //     }
// //     return () => {
// //       if (pongInstance.current) {
// //         pongInstance.current.dispose?.(); // fix the game dup
// //         pongInstance.current = null; 
// //       }
// //     };
// //   }, [gameId, mode, game, location]);

// //   if (game === "pong")
// //     return <div ref={containerRef} className="flex-grow relative w-full h-full bg-black" />;
// //   else
// //     return (
// //       <div ref={containerRef} className="game-container">
// //         <div className="players-row">
// //           <div className="player" id="p1">
// //             <div id="prompt1">-</div>
// //             <div id="score1">Score: 0</div>
// //           </div>
// //           <div className="player" id="p2">
// //             <div id="prompt2">-</div>
// //             <div id="score2">Score: 0</div>
// //           </div>
// //         </div>
    
// //         <div id="timer">Time Left: 20s</div>
// //         <div id="start-prompt">Press SPACE to Start</div>
// //       </div>
// //     );
// // };

// // export default PlayPage;


// // frontend/src/pages/playPage.tsx
// // frontend/src/pages/playPage.tsx
// import React, { useEffect, useRef } from 'react';
// import PingPongClient from '../PingPongClient';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import KeyClashClient from '../keyClashClient';
// import { SimpleGameWrapper } from '../components/game';

// const PlayPage: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const pongInstance = useRef<PingPongClient>(null);
//   const { gameId } = useParams<{ gameId: string }>();
//   const { mode } = useParams<{ mode: "local" | "remote" }>();
//   const { game } = useParams<{ game: "pong" | "keyclash" }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const name = location.state?.name;
//     if (containerRef.current && gameId && mode && game === "pong") {
//       pongInstance.current = new PingPongClient(containerRef.current, gameId, mode, navigate, name);
//     }
//     else if (containerRef.current && gameId && mode && game === "keyclash") {
//       const cleanup = KeyClashClient(containerRef.current, gameId, mode, navigate, name);
//       return cleanup;
//     }
//     return () => {
//       if (pongInstance.current) {
//         pongInstance.current.dispose?.();
//         pongInstance.current = null; 
//       }
//     };
//   }, [gameId, mode, game, location]);

//   if (!gameId || !mode || !game) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-white">
//         <div>Invalid game parameters</div>
//       </div>
//     );
//   }

//   const gameContent = game === "pong" ? (
//     <div ref={containerRef} className="flex-grow relative w-full h-full bg-black" />
//   ) : (
//     <div ref={containerRef} className="game-container">
//       <div className="players-row">
//         <div className="player" id="p1">
//           <div id="prompt1">-</div>
//           <div id="score1">Score: 0</div>
//         </div>
//         <div className="player" id="p2">
//           <div id="prompt2">-</div>
//           <div id="score2">Score: 0</div>
//         </div>
//       </div>
  
//       <div id="timer">Time Left: 20s</div>
//       <div id="start-prompt">Press SPACE to Start</div>
//     </div>
//   );

//   return (
//     <SimpleGameWrapper 
//       gameType={game}
//     >
//       {gameContent}
//     </SimpleGameWrapper>
//   );
// };

// export default PlayPage;


// frontend/src/pages/playPage.tsx
import React, { useEffect, useRef } from 'react';
import PingPongClient from '../PingPongClient';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import KeyClashClient from '../keyClashClient';
import { SimpleGameWrapper } from '../components/game';

// 🎯 LOCAL GAME SETUP TYPES
interface GameAvatar {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface GamePlayer {
  name: string;
  avatar: GameAvatar | null;
}

interface LocalGameSetup {
  player1: GamePlayer;
  player2: GamePlayer;
  gameType: 'pong' | 'keyclash';
}

// 🎯 UTILITY FUNCTION TO GET LOCAL GAME SETUP
const getLocalGameSetup = (): LocalGameSetup | null => {
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

const PlayPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pongInstance = useRef<PingPongClient>(null);
  const { gameId } = useParams<{ gameId: string }>();
  const { mode } = useParams<{ mode: "local" | "remote" }>();
  const { game } = useParams<{ game: "pong" | "keyclash" }>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 🎯 EXISTING LOGIC: Get name from location state
    let name = location.state?.name;
    let player2Name = null;
    
    // 🎯 NEW LOGIC: For local games, try to get setup from localStorage
    if (mode === "local") {
      const gameSetup = getLocalGameSetup();
      if (gameSetup) {
        name = gameSetup.player1.name;
        player2Name = gameSetup.player2.name;
        
        // 🎯 OPTIONAL: You can access avatars here if needed for future features
        // console.log('Player 1 Avatar:', gameSetup.player1.avatar);
        // console.log('Player 2 Avatar:', gameSetup.player2.avatar);
      }
    }
    
    // 🎯 EXISTING LOGIC: Initialize games (unchanged)
    if (containerRef.current && gameId && mode && game === "pong") {
      pongInstance.current = new PingPongClient(containerRef.current, gameId, mode, navigate, name);
    }
    else if (containerRef.current && gameId && mode && game === "keyclash") {
      // 🎯 ENHANCED: Pass player2Name for local games (your KeyClashClient might already handle this)
      const cleanup = KeyClashClient(containerRef.current, gameId, mode, navigate, name, player2Name);
      return cleanup;
    }
    
    // 🎯 EXISTING CLEANUP LOGIC (unchanged)
    return () => {
      if (pongInstance.current) {
        pongInstance.current.dispose?.();
        pongInstance.current = null; 
      }
    };
  }, [gameId, mode, game, location]);

  // 🎯 EXISTING VALIDATION LOGIC (unchanged)
  if (!gameId || !mode || !game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div>Invalid game parameters</div>
      </div>
    );
  }

  // 🎯 EXISTING GAME CONTENT LOGIC (unchanged)
  const gameContent = game === "pong" ? (
    <div ref={containerRef} className="flex-grow relative w-full h-full bg-black" />
  ) : (
    <div ref={containerRef} className="game-container">
      <div className="players-row">
        <div className="player" id="p1">
          <div id="prompt1">-</div>
          <div id="score1">Score: 0</div>
        </div>
        <div className="player" id="p2">
          <div id="prompt2">-</div>
          <div id="score2">Score: 0</div>
        </div>
      </div>
  
      <div id="timer">Time Left: 20s</div>
      <div id="start-prompt">Press SPACE to Start</div>
    </div>
  );

  // 🎯 EXISTING RETURN LOGIC (unchanged)
  return (
    <SimpleGameWrapper 
      gameType={game}
    >
      {gameContent}
    </SimpleGameWrapper>
  );
};

export default PlayPage;