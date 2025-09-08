

// // frontend/src/components/lobby/LockerTab.tsx
// import { User } from '../../contexts/AuthContext';
// import { formatXP, getRankColor } from '../../utils/lobbyUtils';

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
//               <div>
//                 <span className="text-gray-400">Rank:</span> 
//                 <span className={`font-bold ${getRankColor('Silver Elite')}`}>
//                   Silver Elite
//                 </span>
//               </div>
//               <div><span className="text-gray-400">Level:</span> <span className="font-bold text-blue-400">12</span></div>
//               <div>
//                 <span className="text-gray-400">Total XP:</span> 
//                 <span className="font-bold text-green-400">
//                   {formatXP(2450)}
//                 </span>
//               </div>
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
// frontend/src/components/lobby/LockerTab.tsx
import React, { useState } from 'react';
import { User } from '../../contexts/AuthContext';
import { formatXP, getRankColor } from '../../utils/lobbyUtils';

interface LockerTabProps {
  user: User;
  onUpdateProfile: () => void;
}

interface Avatar {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const AVATARS: Avatar[] = [
  { id: 'fire', name: 'Fire', emoji: '🔥', color: 'bg-red-500' },
  { id: 'cool', name: 'Cool', emoji: '😎', color: 'bg-blue-500' },
  { id: 'star', name: 'Star', emoji: '⭐', color: 'bg-yellow-500' },
  { id: 'rocket', name: 'Rocket', emoji: '🚀', color: 'bg-purple-500' },
  { id: 'crown', name: 'Crown', emoji: '👑', color: 'bg-yellow-600' },
  { id: 'lightning', name: 'Lightning', emoji: '⚡', color: 'bg-indigo-500' },
  { id: 'diamond', name: 'Diamond', emoji: '💎', color: 'bg-cyan-500' },
  { id: 'robot', name: 'Robot', emoji: '🤖', color: 'bg-gray-500' },
];

const calculateRank = (totalXP: number): number => {
  if (totalXP >= 10000) return 1;
  if (totalXP >= 5000) return 2;
  if (totalXP >= 2000) return 3;
  if (totalXP >= 1000) return 4;
  if (totalXP >= 500) return 5;
  if (totalXP >= 250) return 6;
  if (totalXP >= 100) return 7;
  if (totalXP >= 50) return 8;
  if (totalXP >= 25) return 9;
  return 10;
};

const AvatarSelector = ({ selectedAvatar, onSelect, isOpen, onToggle }) => (
  <div className="relative">
    {!selectedAvatar ? (
      <button
        onClick={onToggle}
        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all"
      >
        Choose Favorite Avatar
      </button>
    ) : (
      <button 
        onClick={() => onSelect(null)}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all"
      >
        Clear Favorite Avatar
      </button>
    )}
    
    {isOpen && (
      <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-lg shadow-xl p-4 z-10 min-w-64">
        <div className="grid grid-cols-4 gap-2">
          {AVATARS.map(avatar => (
            <button
              key={avatar.id}
              onClick={() => {
                onSelect(avatar);
                onToggle();
              }}
              className={`p-3 rounded-lg transition-all ${avatar.color} ${
                selectedAvatar?.id === avatar.id
                  ? 'ring-2 ring-white' 
                  : 'cursor-pointer hover:scale-105'
              }`}
              title={avatar.name}
            >
              <span className="text-2xl">{avatar.emoji}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-2 text-xs text-gray-400 text-center">
          Choose your favorite avatar
        </div>
      </div>
    )}
  </div>
);

export default function LockerTab({ user, onUpdateProfile }) {
  const totalXP = 2450;
  const userRank = calculateRank(totalXP);
  
  const [profileImage, setProfileImage] = useState(null);
  const [favoriteAvatar, setFavoriteAvatar] = useState(null);
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleImageEdit = () => {
    document.getElementById('profile-upload')?.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">🧳 My Locker</h2>
        
        {/* Top section: Profile Image (left) and Profile Information (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-4xl">👤</span>
                  )}
                </div>
                
                <button
                  onClick={profileImage ? handleImageEdit : () => document.getElementById('profile-upload')?.click()}
                  className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
                  title={profileImage ? "Edit profile picture" : "Add profile picture"}
                >
                  {profileImage ? (
                    <span className="text-white text-lg">✏️</span>
                  ) : (
                    <span className="text-white text-lg">📷</span>
                  )}
                </button>
                
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="space-y-3 text-lg text-left">
              <div><span className="text-gray-400">Username:</span> <span className="font-bold">{user.name}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="font-bold">{user.email}</span></div>
              <div><span className="text-gray-400">Wins:</span> <span className="font-bold text-green-400">0</span></div>
              <div><span className="text-gray-400">Losses:</span> <span className="font-bold text-red-400">0</span></div>
            </div>
          </div>
        </div>

        {/* Form Fields Grid - 2 columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-white bg-gray-900 border-gray-300 focus:ring-blue-200 transition"
            />
          </div>

          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-white bg-gray-900 border-gray-300 focus:ring-blue-200 transition"
            />
          </div>

          <div>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-white bg-gray-900 border-gray-300 focus:ring-blue-200 transition"
            />
          </div>

          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 placeholder-gray-400 text-white bg-gray-900 border-gray-300 focus:ring-blue-200 transition"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Last row: Avatar selector and Update button in same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <div className="flex items-center gap-3">
              {favoriteAvatar && (
                <div className={`w-10 h-10 ${favoriteAvatar.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xl">{favoriteAvatar.emoji}</span>
                </div>
              )}
              <div className="flex-1">
                <AvatarSelector
                  selectedAvatar={favoriteAvatar}
                  onSelect={setFavoriteAvatar}
                  isOpen={isAvatarSelectorOpen}
                  onToggle={() => setIsAvatarSelectorOpen(!isAvatarSelectorOpen)}
                />
              </div>
            </div>
          </div>
          
          <div>
            <button 
              onClick={onUpdateProfile}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
            >
              ✏️ Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}