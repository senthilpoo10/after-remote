// frontend/src/components/lobby/championship/CreateTournamentModal.tsx
import React, { useState } from 'react';
import { Tournament } from './types';

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tournament: Partial<Tournament>) => void;
}

export const CreateTournamentModal: React.FC<CreateTournamentModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxParticipants: 8,
    entryFee: 0,
    gameType: 'pong' as 'pong' | 'keyclash',
    tournamentType: 'single_elimination' as 'single_elimination' | 'double_elimination' | 'round_robin',
    registrationEnd: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      ...formData,
      prizePool: formData.entryFee * formData.maxParticipants * 0.9, // 90% of total entry fees
      status: 'registration_open',
      participants: [],
      currentParticipants: 0,
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Tomorrow
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white mb-6">Create Tournament</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Tournament Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Game Type</label>
              <select
                value={formData.gameType}
                onChange={(e) => setFormData({ ...formData, gameType: e.target.value as 'pong' | 'keyclash' })}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              >
                <option value="pong">🏓 Pong</option>
                <option value="keyclash">⌨️ Key Clash</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Max Players</label>
              <select
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              >
                <option value={4}>4 Players</option>
                <option value={8}>8 Players</option>
                <option value={16}>16 Players</option>
                <option value={32}>32 Players</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Tournament Format</label>
            <select
              value={formData.tournamentType}
              onChange={(e) => setFormData({ ...formData, tournamentType: e.target.value as any })}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
            >
              <option value="single_elimination">Single Elimination</option>
              <option value="double_elimination">Double Elimination</option>
              <option value="round_robin">Round Robin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Entry Fee ($)</label>
            <input
              type="number"
              min="0"
              value={formData.entryFee}
              onChange={(e) => setFormData({ ...formData, entryFee: Number(e.target.value) })}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Registration Deadline</label>
            <input
              type="datetime-local"
              value={formData.registrationEnd}
              onChange={(e) => setFormData({ ...formData, registrationEnd: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};