// // frontend/src/components/lobby/LobbyHeader.tsx
// import { User } from '../../contexts/AuthContext';

// interface LobbyHeaderProps {
//   user: User;
// }

// export default function LobbyHeader({ user }: LobbyHeaderProps) {
//   return (
//     <div className="text-center mb-8">
//       <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
//         🏓 Ping Pong Lobby
//       </h1>
//       <div className="flex items-center justify-center gap-4 mb-6">
//         <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
//           {user.name?.charAt(0).toUpperCase() || 'P'}
//         </div>
//         <div className="text-left">
//           <p className="text-2xl font-bold text-white">Welcome, {user.name}!</p>
//           <p className="text-blue-300 text-lg">Rank: Silver Elite</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/components/lobby/LobbyHeader.tsx
import { User } from '../../contexts/AuthContext';

interface LobbyHeaderProps {
  user: User;
}

export default function LobbyHeader({ user }: LobbyHeaderProps) {
  return (
    <div className="text-center mb-8">
      
      {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            🏓 Welcome to the Arena
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Ready to dominate the table? Choose your game mode below.
          </p>
        </div>
    </div>
  );
}