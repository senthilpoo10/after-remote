// // frontend/src/components/lobby/LockerTab.tsx
// import { User } from '../../contexts/AuthContext';

// interface LockerTabProps {
//   user: User;
//   onUpdateProfile: () => void;
//   onGameSettings: () => void;
//   onLogout: () => void;
// }

// export default function LockerTab({ user, onUpdateProfile, onGameSettings, onLogout }: LockerTabProps) {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-gray-800 rounded-xl p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">🧳 My Locker</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4 text-purple-300">📋 Profile Information</h3>
//             <div className="space-y-3 text-lg">
//               <div><span className="text-gray-400">Username:</span> <span className="font-bold">{user.name}</span></div>
//               <div><span className="text-gray-400">Email:</span> <span className="font-bold">{user.email}</span></div>
//               <div><span className="text-gray-400">Rank:</span> <span className="font-bold text-yellow-400">Silver Elite</span></div>
//               <div><span className="text-gray-400">Level:</span> <span className="font-bold text-blue-400">12</span></div>
//               <div><span className="text-gray-400">Total XP:</span> <span className="font-bold text-green-400">2,450</span></div>
//               <div><span className="text-gray-400">Joined:</span> <span className="font-bold">January 2024</span></div>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4 text-green-300">⚙️ Account Settings</h3>
//             <div className="space-y-3">
//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
//                 🖼️ Change Avatar
//               </button>
//               <button 
//                 onClick={onUpdateProfile}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
//               >
//                 ✏️ Update Profile
//               </button>
//               <button 
//                 onClick={onGameSettings}
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
//               >
//                 🎮 Game Settings
//               </button>
//               <button 
//                 onClick={onLogout}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/components/lobby/LockerTab.tsx
import { User } from '../../contexts/AuthContext';
import { formatXP, getRankColor } from '../../utils/lobbyUtils';

interface LockerTabProps {
  user: User;
  onUpdateProfile: () => void;
  onGameSettings: () => void;
  onLogout: () => void;
}

export default function LockerTab({ user, onUpdateProfile, onGameSettings, onLogout }: LockerTabProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">🧳 My Locker</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-300">📋 Profile Information</h3>
            <div className="space-y-3 text-lg">
              <div><span className="text-gray-400">Username:</span> <span className="font-bold">{user.name}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="font-bold">{user.email}</span></div>
              <div>
                <span className="text-gray-400">Rank:</span> 
                <span className={`font-bold ${getRankColor('Silver Elite')}`}>
                  Silver Elite
                </span>
              </div>
              <div><span className="text-gray-400">Level:</span> <span className="font-bold text-blue-400">12</span></div>
              <div>
                <span className="text-gray-400">Total XP:</span> 
                <span className="font-bold text-green-400">
                  {formatXP(2450)}
                </span>
              </div>
              <div><span className="text-gray-400">Joined:</span> <span className="font-bold">January 2024</span></div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-300">⚙️ Account Settings</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                🖼️ Change Avatar
              </button>
              <button 
                onClick={onUpdateProfile}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
              >
                ✏️ Update Profile
              </button>
              <button 
                onClick={onGameSettings}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
              >
                🎮 Game Settings
              </button>
              <button 
                onClick={onLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}