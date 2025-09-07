// frontend/src/components/lobby/championship/ChampionshipBrowser.tsx
import React, { useState, useEffect } from 'react';
import { Tournament } from './types';
import { TournamentCard } from './TournamentCard';
import { CreateTournamentModal } from './CreateTournamentModal';
import { useAuth } from '../../../contexts/AuthContext';

export default function ChampionshipBrowser() {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'my_tournaments' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for development
  useEffect(() => {
    const mockTournaments: Tournament[] = [
      {
        id: '1',
        name: 'Friday Night Pong Championship',
        description: 'Weekly championship for pong enthusiasts',
        maxParticipants: 16,
        currentParticipants: 12,
        entryFee: 10,
        prizePool: 144,
        status: 'registration_open',
        tournamentType: 'single_elimination',
        gameType: 'pong',
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        registrationEnd: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        participants: [],
        createdBy: 'admin'
      },
      {
        id: '2',
        name: 'KeyClash Lightning Tournament',
        description: 'Fast-paced typing competition',
        maxParticipants: 8,
        currentParticipants: 6,
        entryFee: 5,
        prizePool: 36,
        status: 'registration_open',
        tournamentType: 'double_elimination',
        gameType: 'keyclash',
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        registrationEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        participants: [],
        createdBy: 'admin'
      }
    ];
    setTournaments(mockTournaments);
  }, []);

  const handleJoinTournament = (tournamentId: string) => {
    // TODO: Implement tournament joining logic
    alert(`Joining tournament ${tournamentId}`);
  };

  const handleViewTournament = (tournamentId: string) => {
    // TODO: Navigate to tournament details page
    alert(`Viewing tournament ${tournamentId}`);
  };

  const handleCreateTournament = (tournamentData: Partial<Tournament>) => {
    // TODO: Implement tournament creation logic
    console.log('Creating tournament:', tournamentData);
    alert('Tournament created successfully!');
  };

  const filteredTournaments = tournaments.filter(tournament => {
    switch (activeTab) {
      case 'my_tournaments':
        return tournament.participants.some(p => p.userId === user?.id) || tournament.createdBy === user?.id;
      case 'completed':
        return tournament.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🏆 Championship Arena
          </h1>
          <p className="text-gray-300">Compete in tournaments and climb the leaderboards!</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-lg p-1 inline-flex">
            {[
              { id: 'all', label: 'All Tournaments', icon: '🎯' },
              { id: 'my_tournaments', label: 'My Tournaments', icon: '👤' },
              { id: 'completed', label: 'Completed', icon: '🏅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === tab.id 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Create Tournament Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl"
          >
            <span className="text-xl mr-2">🎪</span>
            Create Tournament
          </button>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map(tournament => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onJoin={handleJoinTournament}
              onView={handleViewTournament}
              currentUserId={user?.id}
            />
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="text-2xl font-bold mb-2">No Tournaments Found</h3>
            <p className="text-gray-400 mb-6">
              {activeTab === 'all' 
                ? "No tournaments are currently available. Create one to get started!"
                : "You haven't joined any tournaments yet."
              }
            </p>
            {activeTab === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg"
              >
                Create First Tournament
              </button>
            )}
          </div>
        )}

        {/* Create Tournament Modal */}
        <CreateTournamentModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTournament}
        />
      </div>
    </div>
  );
}