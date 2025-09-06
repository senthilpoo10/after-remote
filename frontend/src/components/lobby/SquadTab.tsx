// // frontend/src/components/lobby/SquadTab.tsx
// import { Friend } from '../../pages/Lobby';

// interface SquadTabProps {
//   friends: Friend[];
//   onChallengeFriend: (friendId: string, friendName: string) => void;
//   onSendMessage: (friendId: string, friendName: string) => void;
//   onAddFriend: () => void;
// }

// export default function SquadTab({ friends, onChallengeFriend, onSendMessage, onAddFriend }: SquadTabProps) {
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
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-gray-800 rounded-xl p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-green-300">👥 Rally Squad</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {friends.map(friend => (
//             <div key={friend.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className={`w-4 h-4 rounded-full ${getStatusColor(friend.status)}`}></div>
//                 <div className="flex-1">
//                   <span className="font-bold text-lg block">{friend.name}</span>
//                   <span className="text-sm text-gray-300">{friend.rank}</span>
//                 </div>
//               </div>
//               <div className="text-sm text-gray-400 mb-3">
//                 {friend.status === 'offline' ? `Last seen: ${friend.lastActive}` : getStatusText(friend.status)}
//               </div>
//               <div className="flex gap-2">
//                 <button 
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition disabled:bg-gray-500 disabled:cursor-not-allowed"
//                   disabled={friend.status === 'offline'}
//                   onClick={() => onChallengeFriend(friend.id, friend.name)}
//                 >
//                   ⚔️ Challenge
//                 </button>
//                 <button 
//                   className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded text-sm transition"
//                   onClick={() => onSendMessage(friend.id, friend.name)}
//                 >
//                   💬 Message
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Add Friend Button */}
//         <div className="mt-6 text-center">
//           <button 
//             className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
//             onClick={onAddFriend}
//           >
//             ➕ Add New Friend
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// frontend/src/components/lobby/SquadTab.tsx
import { Friend } from '../../types/lobby';
import { 
  getStatusColor, 
  getStatusText, 
  sortFriendsByStatus,
  formatLastSeen,
  getRankColor
} from '../../utils/lobbyUtils';

interface SquadTabProps {
  friends: Friend[];
  onChallengeFriend: (friendId: string, friendName: string) => void;
  onSendMessage: (friendId: string, friendName: string) => void;
  onAddFriend: () => void;
}

export default function SquadTab({ friends, onChallengeFriend, onSendMessage, onAddFriend }: SquadTabProps) {
  // Sort friends by status (online first)
  const sortedFriends = sortFriendsByStatus(friends);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-300">👥 Rally Squad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedFriends.map(friend => (
            <div key={friend.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(friend.status)}`}></div>
                <div className="flex-1">
                  <span className="font-bold text-lg block">{friend.name}</span>
                  <span className={`text-sm ${getRankColor(friend.rank)}`}>
                    {friend.rank}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-3">
                {friend.status === 'offline' 
                  ? `Last seen: ${formatLastSeen(friend.lastActive)}` 
                  : getStatusText(friend.status)
                }
              </div>
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                  disabled={friend.status === 'offline'}
                  onClick={() => onChallengeFriend(friend.id, friend.name)}
                >
                  ⚔️ Challenge
                </button>
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded text-sm transition"
                  onClick={() => onSendMessage(friend.id, friend.name)}
                >
                  💬 Message
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Friend Button */}
        <div className="mt-6 text-center">
          <button 
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
            onClick={onAddFriend}
          >
            ➕ Add New Friend
          </button>
        </div>
      </div>
    </div>
  );
}