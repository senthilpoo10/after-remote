// // frontend/src/components/lobby/gameroom/IndividualGameCard.tsx
// import React, { useState } from 'react';
// import { PongRoom, KeyClashRoom, GameType, GameMode } from './types';
// import { TabButton } from './TabButton';
// import { OnlineGamesTab } from './OnlineGamesTab';
// import { LocalGamesTab } from './LocalGamesTab';

// interface IndividualGameCardProps {
//   gameType: GameType;
//   games: (PongRoom | KeyClashRoom)[];
//   title: string;
//   color: string;
//   icon: string;
//   createGame: (gameType: GameType, mode: GameMode) => void;
//   joinGame: (gameId: string, game: GameType, mode: GameMode) => void;
// }

// export const IndividualGameCard: React.FC<IndividualGameCardProps> = ({ 
//   gameType, 
//   games, 
//   title, 
//   color, 
//   icon,
//   createGame,
//   joinGame
// }) => {
//   // Each card has its own independent tab state
//   const [activeTab, setActiveTab] = useState<GameMode>("remote");

//   return (
//     <div className="bg-gray-800 rounded-xl overflow-hidden">
//       <div className={`${color} p-4`}>
//         <h2 className="text-xl font-bold text-white flex items-center gap-2">
//           <span>{icon}</span>
//           {title}
//         </h2>
//       </div>
      
//       <div className="p-4">
//         {/* Tab Navigation */}
//         <div className="flex gap-2 mb-4">
//           <TabButton 
//             mode="remote" 
//             icon="🌐" 
//             activeTab={activeTab} 
//             setActiveTab={setActiveTab}
//           >
//             Online Games
//           </TabButton>
//           <TabButton 
//             mode="local" 
//             icon="🏠" 
//             activeTab={activeTab} 
//             setActiveTab={setActiveTab}
//           >
//             Local Games
//           </TabButton>
//         </div>

//         {/* Game Content */}
//         <div className="space-y-3">
//           {activeTab === "remote" ? (
//             <OnlineGamesTab
//               games={games}
//               gameType={gameType}
//               color={color}
//               joinGame={joinGame}
//               createGame={createGame}
//             />
//           ) : (
//             <LocalGamesTab
//               gameType={gameType}
//               color={color}
//               createGame={createGame}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// frontend/src/components/quickmatch/IndividualGameCard.tsx
// frontend/src/components/quickmatch/IndividualGameCard.tsx
import React, { useState } from 'react';
import { PongRoom, KeyClashRoom, GameType, GameMode } from './types';
import { TabButton } from './TabButton';
import { OnlineGamesTab } from './OnlineGamesTab';
import { LocalGamesTab } from './LocalGamesTab';

interface IndividualGameCardProps {
  gameType: GameType;
  games: (PongRoom | KeyClashRoom)[];
  title: string;
  color: string;
  icon: string;
  createGame: (gameType: GameType, mode: GameMode) => void;
  joinGame: (gameId: string, game: GameType, mode: GameMode) => void;
}

export const IndividualGameCard: React.FC<IndividualGameCardProps> = ({ 
  gameType, 
  games, 
  title, 
  color, 
  icon,
  createGame,
  joinGame
}) => {
  // Each card has its own independent tab state
  const [activeTab, setActiveTab] = useState<GameMode>("remote");

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className={`${color} p-4`}>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
      </div>
      
      <div className="p-4">
        {/* Tab Navigation - Full Width Stretched Buttons */}
        <div className="mb-4">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <TabButton 
              mode="remote" 
              icon="🌐" 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            >
              Online Games
            </TabButton>
            <TabButton 
              mode="local" 
              icon="🏠" 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            >
              Local Games
            </TabButton>
          </div>
        </div>

        {/* Game Content */}
        <div className="space-y-3">
          {activeTab === "remote" ? (
            <OnlineGamesTab
              games={games}
              gameType={gameType}
              color={color}
              joinGame={joinGame}
              createGame={createGame}
            />
          ) : (
            <LocalGamesTab
              gameType={gameType}
              color={color}
              createGame={createGame}
            />
          )}
        </div>
      </div>
    </div>
  );
};