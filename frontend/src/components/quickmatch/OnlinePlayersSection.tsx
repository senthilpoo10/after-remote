// // frontend/src/components/lobby/gameroom/OnlinePlayersSection.tsx
// import React from 'react';
// import { Player } from './types';

// interface OnlinePlayersSectionProps {
//   players: Player[];
// }

// export const OnlinePlayersSection: React.FC<OnlinePlayersSectionProps> = ({ players }) => (
//   <div className="bg-gray-800 rounded-xl overflow-hidden">
//     <div className="bg-blue-600 p-4">
//       <h3 className="text-xl font-bold text-white flex items-center gap-2">
//         <span>👥</span>
//         Players Online ({players.length})
//       </h3>
//     </div>
//     <div className="p-4">
//       {players.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
//           {players.map(player => (
//             <div key={player.id} className="bg-gray-700 rounded-lg p-3 text-center hover:bg-gray-600 transition">
//               <div className="w-3 h-3 rounded-full bg-green-400 mx-auto mb-2 animate-pulse"></div>
//               <div className="text-sm truncate font-medium">{player.name}</div>
//               <div className="text-xs text-gray-400">Online</div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-400 py-8">
//           <div className="text-3xl mb-2">😴</div>
//           <div>No players online</div>
//           <div className="text-sm mt-1">Be the first to join!</div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// frontend/src/components/quickmatch/OnlinePlayersSection.tsx
import React from 'react';
import { Player } from './types';

interface OnlinePlayersSectionProps {
  players: Player[];
}

export const OnlinePlayersSection: React.FC<OnlinePlayersSectionProps> = ({ players }) => (
  <div className="bg-gray-800 rounded-xl overflow-hidden h-fit">
    <div className="bg-gray-700 p-4">
      <h3 className="text-l font-bold text-white flex items-center gap-2">
        👥  Players Online ({players.length})
      </h3>
    </div>
    <div className="p-4 max-h-96 overflow-y-auto">
      {players.length > 0 ? (
        <div className="space-y-3">
          {players.map(player => (
            <div key={player.id} >
              <div className="flex items-center gap-3 hover:bg-gray-600 transition">
                <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0 animate-pulse"></div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-white truncate">
                    {player.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <div className="text-3xl mb-2">😴</div>
          <div className="text-sm">No players online</div>
          <div className="text-xs mt-1 text-gray-500">Be the first to join!</div>
        </div>
      )}
    </div>
  </div>
);