// frontend/src/utils/lobbyUtils.ts
export const getStatusColor = (status: string): string => {
  switch(status) {
    case 'online': return 'bg-green-500';
    case 'in-game': return 'bg-yellow-500';
    case 'offline': return 'bg-gray-500';
    case 'away': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

export const getStatusText = (status: string): string => {
  switch(status) {
    case 'online': return 'Online';
    case 'in-game': return 'In Game';
    case 'offline': return 'Offline';
    case 'away': return 'Away';
    default: return 'Unknown';
  }
};

export const getResultColor = (result: string): string => {
  switch(result) {
    case 'win': return 'text-green-400';
    case 'loss': return 'text-red-400';
    case 'draw': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
};

export const getResultIcon = (result: string): string => {
  switch(result) {
    case 'win': return '🏆 WIN';
    case 'loss': return '❌ LOSS';
    case 'draw': return '🤝 DRAW';
    default: return '❓ UNKNOWN';
  }
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const formatXP = (xp: number): string => {
  return xp.toLocaleString();
};

export const calculateWinRate = (wins: number, totalMatches: number): number => {
  return totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
};

export const getRankColor = (rank: string): string => {
  const rankLower = rank.toLowerCase();
  if (rankLower.includes('bronze')) return 'text-orange-600';
  if (rankLower.includes('silver')) return 'text-gray-400';
  if (rankLower.includes('gold')) return 'text-yellow-500';
  if (rankLower.includes('platinum')) return 'text-cyan-400';
  if (rankLower.includes('diamond')) return 'text-blue-400';
  if (rankLower.includes('master')) return 'text-purple-400';
  if (rankLower.includes('grandmaster')) return 'text-red-400';
  return 'text-gray-300';
};

export const formatLastSeen = (lastActive: string): string => {
  // This would normally parse a date and format it
  // For now, return as-is since mock data already has formatted strings
  return lastActive;
};

export const sortFriendsByStatus = (friends: Array<{status: string}>): Array<{status: string}> => {
  const statusOrder = { 'online': 0, 'in-game': 1, 'away': 2, 'offline': 3 };
  return [...friends].sort((a, b) => {
    const aOrder = statusOrder[a.status as keyof typeof statusOrder] ?? 4;
    const bOrder = statusOrder[b.status as keyof typeof statusOrder] ?? 4;
    return aOrder - bOrder;
  });
};

// New utility functions for lobby
export const getMatchTypeIcon = (matchType: string): string => {
  switch(matchType) {
    case 'quick': return '⚡';
    case 'ranked': return '🏅';
    case 'tournament': return '🏆';
    case 'friendly': return '🤝';
    default: return '🎮';
  }
};

export const getMatchTypeText = (matchType: string): string => {
  switch(matchType) {
    case 'quick': return 'Quick Match';
    case 'ranked': return 'Ranked';
    case 'tournament': return 'Tournament';
    case 'friendly': return 'Friendly';
    default: return matchType;
  }
};

export const formatDate = (dateString: string): string => {
  // Simple formatting - you could use date-fns or similar for more complex formatting
  return dateString;
};