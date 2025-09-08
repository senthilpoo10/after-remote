// // frontend/src/components/lobby/gameroom/TabButton.tsx
// import React from 'react';
// import { GameMode } from './types';

// interface TabButtonProps {
//   mode: GameMode;
//   children: React.ReactNode;
//   icon: string;
//   activeTab: GameMode;
//   setActiveTab: (mode: GameMode) => void;
// }

// export const TabButton: React.FC<TabButtonProps> = ({ 
//   mode, 
//   children, 
//   icon, 
//   activeTab, 
//   setActiveTab 
// }) => (
//   <button
//     onClick={() => setActiveTab(mode)}
//     className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
//       activeTab === mode
//         ? "bg-blue-600 text-white shadow-lg"
//         : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//     }`}
//   >
//     <span>{icon}</span>
//     {children}
//   </button>
// );

// frontend/src/components/quickmatch/TabButton.tsx
// frontend/src/components/quickmatch/TabButton.tsx
import React from 'react';
import { GameMode } from './types';

interface TabButtonProps {
  mode: GameMode;
  children: React.ReactNode;
  icon: string;
  activeTab: GameMode;
  setActiveTab: (mode: GameMode) => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ 
  mode, 
  children, 
  icon, 
  activeTab, 
  setActiveTab 
}) => (
  <button
    onClick={() => setActiveTab(mode)}
    className={`flex-1 px-6 py-3 rounded-md transition-all flex items-center justify-center gap-2 ${
      activeTab === mode
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-400 hover:text-white hover:bg-gray-700'
    }`}
  >
    <span>{icon}</span>
    {children}
  </button>
);