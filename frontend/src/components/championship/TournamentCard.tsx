// frontend/src/components/lobby/championship/TournamentCard.tsx
import React from 'react';
import { Tournament } from './types';

interface TournamentCardProps {
  tournament: Tournament;
  onJoin: (tournamentId: string) => void;
  onView: (tournamentId: string) => void;
  currentUserId?: string;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onJoin,
  onView,
  currentUserId
}) => {
  const isRegistered = tournament.participants.some(p => p.userId === currentUserId);
  const canJoin = tournament.status === 'registration_open' && 
                  tournament.currentParticipants < tournament.maxParticipants && 
                  !isRegistered;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'registration_open': return 'bg-green-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getGameIcon = (gameType: string) => {
    return gameType === 'pong' ? '🏓' : '⌨️';
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {getGameIcon(tournament.gameType)}
            {tournament.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{tournament.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(tournament.status)}`}>
          {tournament.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-sm">Participants</p>
          <p className="text-white font-semibold">
            {tournament.currentParticipants}/{tournament.maxParticipants}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Prize Pool</p>
          <p className="text-green-400 font-semibold">${tournament.prizePool}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Entry Fee</p>
          <p className="text-white font-semibold">${tournament.entryFee}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Format</p>
          <p className="text-white font-semibold capitalize">
            {tournament.tournamentType.replace('_', ' ')}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-400 text-sm">Registration Ends</p>
        <p className="text-white">{new Date(tournament.registrationEnd).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-2">
        {canJoin && (
          <button
            onClick={() => onJoin(tournament.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition"
          >
            Join Tournament
          </button>
        )}
        {isRegistered && (
          <div className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-center">
            ✓ Registered
          </div>
        )}
        <button
          onClick={() => onView(tournament.id)}
          className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};