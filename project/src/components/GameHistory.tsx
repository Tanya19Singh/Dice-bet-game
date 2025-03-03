import React from 'react';
import { GameHistory as GameHistoryType } from '../types';

interface GameHistoryProps {
  history: GameHistoryType[];
  onVerify: (historyItem: GameHistoryType) => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({ history, onVerify }) => {
  if (history.length === 0) {
    return (
      <div className="mt-8 p-4 bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium text-white mb-2">Game History</h3>
        <p className="text-gray-400">No games played yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-md">
      <h3 className="text-lg font-medium text-white mb-4">Game History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Roll</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Bet</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Result</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payout</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {history.slice().reverse().map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">#{item.id}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">${item.betAmount}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.won ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                  }`}>
                    {item.rollValue.toFixed(2)} ({item.won ? 'Win' : 'Loss'})
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">${item.payout}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onVerify(item)}
                    className="text-purple-400 hover:text-purple-300 focus:outline-none"
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameHistory;