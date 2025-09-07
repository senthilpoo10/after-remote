// import React, { useEffect, useRef } from 'react';
// import PingPongClient from '../PingPongClient';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import KeyClashClient from '../keyClashClient';

// const PlayPage: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const pongInstance = useRef<PingPongClient>(null);
//   const { gameId } = useParams<{ gameId: string }>();
//   const { mode } = useParams<{ mode: "local" | "remote" }>();
//   const { game } = useParams<{ game: "pong" | "keyclash" }>();
//   const navigate = useNavigate();
//   const location  = useLocation();

//   useEffect(() => {
//     const name = location.state.name;
//     if (containerRef.current && gameId && mode && game === "pong") {
//       pongInstance.current = new PingPongClient(containerRef.current, gameId, mode, navigate, name);
//     }
//     else if (containerRef.current && gameId && mode && game === "keyclash") {
//       const cleanup = KeyClashClient(containerRef.current, gameId, mode, navigate, name);
//       return cleanup;
//     }
//     return () => {
//       if (pongInstance.current) {
//         pongInstance.current.dispose?.(); // fix the game dup
//         pongInstance.current = null; 
//       }
//     };
//   }, [gameId, mode, game, location]);

//   if (game === "pong")
//     return <div ref={containerRef} className="flex-grow relative w-full h-full bg-black" />;
//   else
//     return (
//       <div ref={containerRef} className="game-container">
//         <div className="players-row">
//           <div className="player" id="p1">
//             <div id="prompt1">-</div>
//             <div id="score1">Score: 0</div>
//           </div>
//           <div className="player" id="p2">
//             <div id="prompt2">-</div>
//             <div id="score2">Score: 0</div>
//           </div>
//         </div>
    
//         <div id="timer">Time Left: 20s</div>
//         <div id="start-prompt">Press SPACE to Start</div>
//       </div>
//     );
// };

// export default PlayPage;


// frontend/src/pages/playPage.tsx
// frontend/src/pages/playPage.tsx
import React, { useEffect, useRef } from 'react';
import PingPongClient from '../PingPongClient';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import KeyClashClient from '../keyClashClient';
import { SimpleGameWrapper } from '../components/game';

const PlayPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pongInstance = useRef<PingPongClient>(null);
  const { gameId } = useParams<{ gameId: string }>();
  const { mode } = useParams<{ mode: "local" | "remote" }>();
  const { game } = useParams<{ game: "pong" | "keyclash" }>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = location.state?.name;
    if (containerRef.current && gameId && mode && game === "pong") {
      pongInstance.current = new PingPongClient(containerRef.current, gameId, mode, navigate, name);
    }
    else if (containerRef.current && gameId && mode && game === "keyclash") {
      const cleanup = KeyClashClient(containerRef.current, gameId, mode, navigate, name);
      return cleanup;
    }
    return () => {
      if (pongInstance.current) {
        pongInstance.current.dispose?.();
        pongInstance.current = null; 
      }
    };
  }, [gameId, mode, game, location]);

  if (!gameId || !mode || !game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div>Invalid game parameters</div>
      </div>
    );
  }

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

  return (
    <SimpleGameWrapper 
      gameType={game}
    >
      {gameContent}
    </SimpleGameWrapper>
  );
};

export default PlayPage;