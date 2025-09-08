// // frontend/src/components/lobby/TabNavigation.tsx
// interface TabNavigationProps {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
// }

// export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
//   const tabs = [
//     { id: 'overview', icon: '🏠', label: 'Overview' },
//     { id: 'locker', icon: '🧳', label: 'My Locker' },
//     { id: 'squad', icon: '👥', label: 'Rally Squad' },
//     { id: 'history', icon: '📊', label: 'Match History' }
//   ];

//   return (
//     <div className="flex justify-center mb-6">
//       <div className="bg-gray-800 rounded-lg p-1 inline-flex">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => onTabChange(tab.id)}
//             className={`px-6 py-3 rounded-md transition-all ${
//               activeTab === tab.id 
//                 ? 'bg-blue-600 text-white' 
//                 : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             {tab.icon} {tab.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


// frontend/src/components/lobby/TabNavigation.tsx
interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'overview', icon: '🏠', label: 'Overview' },
    { id: 'locker', icon: '🧳', label: 'My Locker' },
    { id: 'squad', icon: '👥', label: 'Rally Squad' },
    { id: 'history', icon: '📊', label: 'Match History' }
  ];

  return (
    <div className="flex justify-center mb-6">
      <div className="bg-gray-800 rounded-lg p-1 inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 rounded-md transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}