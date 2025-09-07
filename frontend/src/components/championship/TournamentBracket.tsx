// frontend/src/components/lobby/championship/TournamentBracket.tsx
import React from 'react';
import { Tournament, TournamentMatch } from './types';

interface TournamentBracketProps {
  tournament: Tournament;
  matches: TournamentMatch[];
}

export const TournamentBracket: React.FC<TournamentBracketProps> = ({
  tournament,
  matches
}) => {
  // Group matches by round
  const matchesByRound = matches.reduce((acc, match) => {
    if (!acc[match.round]) acc[match.round] = [];
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, TournamentMatch[]>);

  const rounds = Object.keys(matchesByRound).map(Number).sort();

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Tournament Bracket
      </h3>
      
      <div className="flex gap-8 overflow-x-auto pb-4">
        {rounds.map(round => (
          <div key={round} className="min-w-64">
            <h4 className="text-lg font-semibold text-center mb-4 text-blue-300">
              {round === rounds.length ? 'Final' : 
               round === rounds.length - 1 ? 'Semi-Final' : 
               `Round ${round}`}
            </h4>
            <div className="space-y-4">
              {matchesByRound[round].map(match => (
                <div
                  key={match.id}
                  className={`bg-gray-700 rounded-lg p-3 border-l-4 ${
                    match.status === 'completed' ? 'border-green-500' :
                    match.status === 'in_progress' ? 'border-yellow-500' : 'border-gray-500'
                  }`}
                >
                  <div className="space-y-2">
                    <div className={`flex justify-between items-center p-2 rounded ${
                      match.winner?.id === match.player1.id ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      <span className="font-medium">{match.player1.userName}</span>
                      {match.status === 'completed' && match.winner?.id === match.player1.id && (
                        <span className="text-green-300">👑</span>
                      )}
                    </div>
                    <div className="text-center text-gray-400 text-sm">vs</div>
                    <div className={`flex justify-between items-center p-2 rounded ${
                      match.winner?.id === match.player2.id ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      <span className="font-medium">{match.player2.userName}</span>
                      {match.status === 'completed' && match.winner?.id === match.player2.id && (
                        <span className="text-green-300">👑</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      match.status === 'completed' ? 'bg-green-500' :
                      match.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}>
                      {match.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};