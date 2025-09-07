// // frontend/src/components/game/SimpleGameWrapper.tsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface SimpleGameWrapperProps {
//   children: React.ReactNode;
//   gameType: 'pong' | 'keyclash';
// }

// export const SimpleGameWrapper: React.FC<SimpleGameWrapperProps> = ({ 
//   children, 
//   gameType 
// }) => {
//   const navigate = useNavigate();
//   const [isGameActive, setIsGameActive] = useState(false);
//   const [showFinishOverlay, setShowFinishOverlay] = useState(false);

//   useEffect(() => {
//     // Add styles to body to prevent scrolling
//     document.body.style.overflow = 'hidden';
//     document.body.style.height = '100vh';
    
//     // Prevent arrow key scrolling during games
//     const preventArrowScroll = (e: KeyboardEvent) => {
//       if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
//         e.preventDefault();
//       }
//     };

//     document.addEventListener('keydown', preventArrowScroll);

//     // Simple game state detection using intervals
//     const detectGameState = () => {
//       // For KeyClash - check timer and start prompt
//       if (gameType === 'keyclash') {
//         const timer = document.getElementById('timer');
//         const startPrompt = document.getElementById('start-prompt');
        
//         if (timer && startPrompt) {
//           const timerText = timer.textContent || '';
//           const promptText = startPrompt.textContent || '';
          
//           // Game is active when timer is counting down
//           if (timerText.includes('Time Left:') && !timerText.includes('20s')) {
//             setIsGameActive(true);
//             setShowFinishOverlay(false);
//           }
//           // Game finished
//           else if (promptText.includes('Press SPACE to Restart') || promptText.includes("Time's Up")) {
//             setIsGameActive(false);
//             setShowFinishOverlay(true);
//           }
//           // Game waiting to start
//           else {
//             setIsGameActive(false);
//             setShowFinishOverlay(false);
//           }
//         }
//       }
      
//       // For Pong - check for game status in score displays
//       if (gameType === 'pong') {
//         // Look for score display or timer elements
//         const scoreElements = document.querySelectorAll('div');
//         let gameInProgress = false;
//         let gameFinished = false;
        
//         scoreElements.forEach(el => {
//           const text = el.textContent || '';
//           if (text.includes('Time Left:') && !text.includes('02:00')) {
//             gameInProgress = true;
//           }
//           if (text.includes('Wins!') || text.includes('Game Over')) {
//             gameFinished = true;
//           }
//         });
        
//         if (gameFinished) {
//           setIsGameActive(false);
//           setShowFinishOverlay(true);
//         } else if (gameInProgress) {
//           setIsGameActive(true);
//           setShowFinishOverlay(false);
//         } else {
//           setIsGameActive(false);
//           setShowFinishOverlay(false);
//         }
//       }
//     };

//     // Check game state every 500ms
//     const interval = setInterval(detectGameState, 500);

//     return () => {
//       // Cleanup
//       document.body.style.overflow = '';
//       document.body.style.height = '';
//       document.removeEventListener('keydown', preventArrowScroll);
//       clearInterval(interval);
//     };
//   }, [gameType]);

//   const handleBackToLobby = () => {
//     navigate('/lobby');
//   };

//   const handleRestart = () => {
//     // Trigger restart by dispatching a space key event
//     const spaceEvent = new KeyboardEvent('keydown', { 
//       key: ' ', 
//       code: 'Space',
//       bubbles: true 
//     });
//     document.dispatchEvent(spaceEvent);
//     setShowFinishOverlay(false);
//   };

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-black">
//       {/* Back to Lobby Button - Hide during active gameplay */}
//       {!isGameActive && (
//         <button 
//           onClick={handleBackToLobby}
//           className="fixed top-4 left-4 z-50 bg-black bg-opacity-80 hover:bg-opacity-100 text-white border-2 border-white hover:border-yellow-400 px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2"
//         >
//           <span>←</span>
//           <span>Back to Lobby</span>
//         </button>
//       )}

//       {/* Game Content */}
//       <div className="w-full h-full">
//         {children}
//       </div>

//       {/* Game Finished Overlay */}
//       {showFinishOverlay && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-40">
//           <div className="text-center text-white">
//             <h2 className="text-4xl font-bold mb-8 text-yellow-400">
//               🎮 Game Finished!
//             </h2>
//             <div className="flex gap-4">
//               <button 
//                 onClick={handleRestart}
//                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
//               >
//                 <span>🔄</span>
//                 <span>Restart Game</span>
//               </button>
//               <button 
//                 onClick={handleBackToLobby}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
//               >
//                 <span>🏠</span>
//                 <span>Back to Lobby</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// frontend/src/components/game/SimpleGameWrapper.tsx
// frontend/src/components/game/SimpleGameWrapper.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SimpleGameWrapperProps {
  children: React.ReactNode;
  gameType: 'pong' | 'keyclash';
}

export const SimpleGameWrapper: React.FC<SimpleGameWrapperProps> = ({ 
  children, 
  gameType 
}) => {
  const navigate = useNavigate();
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    // Add styles to body to prevent scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    // Prevent arrow key scrolling during games
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', preventArrowScroll);

    // Much simpler detection - look for specific active game indicators
    const detectGameState = () => {
      // Default to not active (show button)
      let gameActive = false;
      
      // Get all text content on the page
      const allText = document.body.innerText || '';
      
      // For KeyClash - very specific active game indicators
      if (gameType === 'keyclash') {
        // Game is active when we see countdown numbers (not 20 or 0)
        if (allText.includes('Time Left:')) {
          const matches = allText.match(/Time Left: (\d+)s/);
          if (matches) {
            const seconds = parseInt(matches[1]);
            // Active only when timer is between 1-19 seconds
            if (seconds > 0 && seconds < 20) {
              gameActive = true;
            }
          }
        }
        
        // Force inactive if game finished indicators are present
        if (allText.includes('Press SPACE to Restart') || 
            allText.includes("Time's Up") ||
            allText.includes('Final Score') ||
            allText.includes('Restart')) {
          gameActive = false;
        }
      }
      
      // For Pong - look for active game indicators  
      if (gameType === 'pong') {
        // Game is active when we see timer counting down (not 02:00 or 00:00)
        if (allText.includes('Time Left:') || allText.match(/\d+:\d+/)) {
          const timeMatches = allText.match(/(\d+):(\d+)/);
          if (timeMatches) {
            const minutes = parseInt(timeMatches[1]);
            const seconds = parseInt(timeMatches[2]);
            // Active when timer is counting down (not at start or end)
            if (!(minutes === 2 && seconds === 0) && !(minutes === 0 && seconds === 0)) {
              gameActive = true;
            }
          }
        }
        
        // Also check for "Good Luck!" message which means game just started
        if (allText.includes('Good Luck!')) {
          gameActive = true;
        }
        
        // Force inactive if game finished indicators are present
        if (allText.includes('Wins!') || 
            allText.includes('Game Over') ||
            allText.includes('Restart') ||
            allText.includes('PAUSED') ||
            allText.includes('finished')) {
          gameActive = false;
        }
      }
      
      console.log(`Game: ${gameType}, Active: ${gameActive}, Text sample: ${allText.substring(0, 200)}`);
      setIsGameActive(gameActive);
    };

    // Check game state every 500ms
    const interval = setInterval(detectGameState, 500);

    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.removeEventListener('keydown', preventArrowScroll);
      clearInterval(interval);
    };
  }, [gameType]);

  const handleBackToLobby = () => {
    navigate('/lobby');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* ONLY Back to Lobby Button - Hide during active gameplay */}
      {!isGameActive && (
        <button 
          onClick={handleBackToLobby}
          className="fixed top-4 left-4 z-50 bg-black bg-opacity-80 hover:bg-opacity-100 text-white border-2 border-white hover:border-yellow-400 px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Lobby</span>
        </button>
      )}

      {/* Game Content - No overlays */}
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};