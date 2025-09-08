// // frontend/src/components/lobby/OverviewTab.tsx
// import { GameStats, Friend, Match } from '../../pages/Lobby';

// interface OverviewTabProps {
//   stats: GameStats;
//   onlineFriends: Friend[];
//   recentMatches: Match[];
// }

// export default function OverviewTab({ stats, onlineFriends, recentMatches }: OverviewTabProps) {
//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'online': return 'bg-green-500';
//       case 'in-game': return 'bg-yellow-500';
//       case 'offline': return 'bg-gray-500';
//       case 'away': return 'bg-orange-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch(status) {
//       case 'online': return 'Online';
//       case 'in-game': return 'In Game';
//       case 'offline': return 'Offline';
//       case 'away': return 'Away';
//       default: return 'Unknown';
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Quick Stats */}
//       <div className="bg-gray-800 rounded-xl p-6">
//         <h3 className="text-xl font-bold mb-4 text-blue-300">⚡ Quick Stats</h3>
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <span>Total Matches:</span>
//             <span className="font-bold">{stats.totalMatches}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Win Rate:</span>
//             <span className="font-bold text-green-400">{stats.winRate}%</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Win Streak:</span>
//             <span className="font-bold text-yellow-400">{stats.currentWinStreak}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>This Month:</span>
//             <span className="font-bold text-purple-400">{stats.monthlyWins}W</span>
//           </div>
//         </div>
//       </div>

//       {/* Online Friends */}
//       <div className="bg-gray-800 rounded-xl p-6">
//         <h3 className="text-xl font-bold mb-4 text-green-300">🟢 Online Squad</h3>
//         <div className="space-y-2">
//           {onlineFriends.length > 0 ? (
//             onlineFriends.map(friend => (
//               <div key={friend.id} className="flex items-center gap-3">
//                 <div className={`w-3 h-3 rounded-full ${getStatusColor(friend.status)}`}></div>
//                 <span className="flex-1">{friend.name}</span>
//                 <span className="text-xs text-gray-400">{getStatusText(friend.status)}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400 text-sm">No friends online</p>
//           )}
//         </div>
//       </div>

//       {/* Recent Matches */}
//       <div className="bg-gray-800 rounded-xl p-6">
//         <h3 className="text-xl font-bold mb-4 text-purple-300">🎯 Recent Matches</h3>
//         <div className="space-y-2">
//           {recentMatches.map((match) => (
//             <div key={match.id} className="flex items-center justify-between text-sm">
//               <span>vs {match.opponent}</span>
//               <div className="text-right">
//                 <div className={`font-bold ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
//                   {match.result.toUpperCase()}
//                 </div>
//                 <div className="text-xs text-gray-400">{match.score}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/components/lobby/OverviewTab.tsx
import { GameStats, Friend, Match } from '../../types/lobby';
import { 
  getStatusColor, 
  getStatusText, 
  getResultColor,
  calculateWinRate 
} from '../../utils/lobbyUtils';

interface OverviewTabProps {
  stats: GameStats;
  onlineFriends: Friend[];
  recentMatches: Match[];
}

export default function OverviewTab({ stats, onlineFriends, recentMatches }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Stats */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-300">⚡ Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Total Matches:</span>
            <span className="font-bold">{stats.totalMatches}</span>
          </div>
          <div className="flex justify-between">
            <span>Win Rate:</span>
            <span className="font-bold text-green-400">
              {calculateWinRate(stats.wins, stats.totalMatches)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Win Streak:</span>
            <span className="font-bold text-yellow-400">{stats.currentWinStreak}</span>
          </div>
          <div className="flex justify-between">
            <span>This Month:</span>
            <span className="font-bold text-purple-400">{stats.monthlyWins}W</span>
          </div>
        </div>
      </div>

      {/* Online Friends */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-green-300">🟢 Online Squad</h3>
        <div className="space-y-2">
          {onlineFriends.length > 0 ? (
            onlineFriends.map(friend => (
              <div key={friend.id} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(friend.status)}`}></div>
                <span className="flex-1">{friend.name}</span>
                <span className="text-xs text-gray-400">{getStatusText(friend.status)}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No friends online</p>
          )}
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-purple-300">🎯 Recent Matches</h3>
        <div className="space-y-2">
          {recentMatches.map((match) => (
            <div key={match.id} className="flex items-center justify-between text-sm">
              <span>vs {match.opponent}</span>
              <div className="text-right">
                <div className={`font-bold ${getResultColor(match.result)}`}>
                  {match.result.toUpperCase()}
                </div>
                <div className="text-xs text-gray-400">{match.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}