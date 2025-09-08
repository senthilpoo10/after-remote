// // frontend/src/components/lobby/HistoryTab.tsx
// import { GameStats, Match } from '../../pages/Lobby';

// interface HistoryTabProps {
//   stats: GameStats;
//   recentMatches: Match[];
//   onViewAllMatches: () => void;
// }

// export default function HistoryTab({ stats, recentMatches, onViewAllMatches }: HistoryTabProps) {
//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-gray-800 rounded-xl p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">📊 Match History</h2>
        
//         {/* Stats Charts Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {/* Win/Loss Pie Chart */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4 text-green-300">🥇 Win/Loss Ratio</h3>
//             <div className="relative w-32 h-32 mx-auto mb-4">
//               <svg viewBox="0 0 42 42" className="w-32 h-32 transform -rotate-90">
//                 <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#374151" strokeWidth="3"/>
//                 <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="3"
//                         strokeDasharray={`${stats.winRate} ${100 - stats.winRate}`} strokeDashoffset="0"/>
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-2xl font-bold text-green-400">{stats.winRate}%</span>
//               </div>
//             </div>
//             <p className="text-center text-sm text-gray-400">Win Rate</p>
//           </div>

//           {/* Performance Stats */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4 text-blue-300">📈 Performance</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-green-400">🏆 Wins:</span>
//                 <span className="font-bold text-2xl">{stats.wins}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-red-400">❌ Losses:</span>
//                 <span className="font-bold text-2xl">{stats.losses}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-yellow-400">🤝 Draws:</span>
//                 <span className="font-bold text-2xl">{stats.draws}</span>
//               </div>
//             </div>
//           </div>

//           {/* Recent Performance Trend */}
//           <div className="bg-gray-700 rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4 text-yellow-300">🔥 Recent Form</h3>
//             <div className="flex justify-center items-center gap-2 mb-4">
//               {['W', 'L', 'W', 'W', 'L'].map((result, index) => (
//                 <div key={index} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
//                   result === 'W' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//                 }`}>
//                   {result}
//                 </div>
//               ))}
//             </div>
//             <p className="text-center text-sm text-gray-400">Last 5 matches</p>
//             <div className="mt-3 text-center">
//               <span className="text-green-400 font-bold">3W</span> - <span className="text-red-400 font-bold">2L</span>
//             </div>
//           </div>
//         </div>

//         {/* Detailed Match History */}
//         <div className="bg-gray-700 rounded-lg p-6">
//           <h3 className="text-xl font-bold mb-4 text-indigo-300">📋 Match Details</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-gray-600">
//                   <th className="py-3 px-2">🎯 Opponent</th>
//                   <th className="py-3 px-2">📊 Result</th>
//                   <th className="py-3 px-2">🏓 Score</th>
//                   <th className="py-3 px-2">🎮 Type</th>
//                   <th className="py-3 px-2">📅 Date</th>
//                   <th className="py-3 px-2">⏱️ Duration</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentMatches.map((match) => (
//                   <tr key={match.id} className="border-b border-gray-600 hover:bg-gray-600 transition">
//                     <td className="py-3 px-2 font-medium">{match.opponent}</td>
//                     <td className={`py-3 px-2 font-bold ${
//                       match.result === 'win' ? 'text-green-400' : match.result === 'loss' ? 'text-red-400' : 'text-yellow-400'
//                     }`}>
//                       {match.result === 'win' ? '🏆 WIN' : match.result === 'loss' ? '❌ LOSS' : '🤝 DRAW'}
//                     </td>
//                     <td className="py-3 px-2 font-mono">{match.score}</td>
//                     <td className="py-3 px-2 text-gray-300">{match.matchType}</td>
//                     <td className="py-3 px-2 text-gray-400">{match.date}</td>
//                     <td className="py-3 px-2 text-gray-400">{match.duration}m</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* View All Matches Button */}
//           <div className="mt-4 text-center">
//             <button 
//               className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition"
//               onClick={onViewAllMatches}
//             >
//               📜 View All Matches
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/components/lobby/HistoryTab.tsx
import { GameStats, Match } from '../../types/lobby';
import { 
  getResultColor, 
  getResultIcon, 
  formatDuration,
  getMatchTypeIcon,
  getMatchTypeText,
  formatDate,
  calculateWinRate
} from '../../utils/lobbyUtils';

interface HistoryTabProps {
  stats: GameStats;
  recentMatches: Match[];
  onViewAllMatches: () => void;
}

export default function HistoryTab({ stats, recentMatches, onViewAllMatches }: HistoryTabProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">📊 Match History</h2>
        
        {/* Stats Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Win/Loss Pie Chart */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-green-300">🥇 Win/Loss Ratio</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg viewBox="0 0 42 42" className="w-32 h-32 transform -rotate-90">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#374151" strokeWidth="3"/>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="3"
                        strokeDasharray={`${calculateWinRate(stats.wins, stats.totalMatches)} ${100 - calculateWinRate(stats.wins, stats.totalMatches)}`} strokeDashoffset="0"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-400">
                  {calculateWinRate(stats.wins, stats.totalMatches)}%
                </span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400">Win Rate</p>
          </div>

          {/* Performance Stats */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-300">📈 Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-400">🏆 Wins:</span>
                <span className="font-bold text-2xl">{stats.wins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-400">❌ Losses:</span>
                <span className="font-bold text-2xl">{stats.losses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400">🤝 Draws:</span>
                <span className="font-bold text-2xl">{stats.draws}</span>
              </div>
            </div>
          </div>

          {/* Recent Performance Trend */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">🔥 Recent Form</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
              {['W', 'L', 'W', 'W', 'L'].map((result, index) => (
                <div key={index} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  result === 'W' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {result}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400">Last 5 matches</p>
            <div className="mt-3 text-center">
              <span className="text-green-400 font-bold">3W</span> - <span className="text-red-400 font-bold">2L</span>
            </div>
          </div>
        </div>

        {/* Detailed Match History */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-indigo-300">📋 Match Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-left border-b border-gray-600">
                  <th className="pb-2">🎯 Opponent</th>
                  <th className="pb-2">📊 Result</th>
                  <th className="pb-2">🏓 Score</th>
                  <th className="pb-2">🎮 Type</th>
                  <th className="pb-2">📅 Date</th>
                  <th className="pb-2">⏱️ Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentMatches.map((match) => (
                  <tr key={match.id} className="border-b border-gray-600 hover:bg-gray-600 transition">
                    <td className="py-3 px-2 font-medium">{match.opponent}</td>
                    <td className={`py-3 px-2 font-bold ${getResultColor(match.result)}`}>
                      {getResultIcon(match.result)}
                    </td>
                    <td className="py-3 px-2 font-mono">{match.score}</td>
                    <td className="py-3 px-2 text-gray-300">
                      {getMatchTypeIcon(match.matchType)} {getMatchTypeText(match.matchType)}
                    </td>
                    <td className="py-3 px-2 text-gray-400">{formatDate(match.date)}</td>
                    <td className="py-3 px-2 text-gray-400">{formatDuration(match.duration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* View All Matches Button */}
          <div className="mt-4 text-center">
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition"
              onClick={onViewAllMatches}
            >
              📜 View All Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}