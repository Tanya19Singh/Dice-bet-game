import React, { useState } from 'react';
import { GameHistory } from '../types';
import { verifyRoll } from '../utils/gameLogic';

interface VerifyModalProps {
  historyItem: GameHistory | null;
  onClose: () => void;
}

const VerifyModal: React.FC<VerifyModalProps> = ({ historyItem, onClose }) => {
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  if (!historyItem) return null;

  const handleVerify = () => {
    const result = verifyRoll(
      historyItem.serverSeed,
      historyItem.clientSeed,
      historyItem.nonce,
      historyItem.rollValue
    );
    setVerificationResult(result);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-medium text-white mb-4">Verify Roll #{historyItem.id}</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400">Server Seed</label>
            <input 
              type="text" 
              value={historyItem.serverSeed} 
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400">Client Seed</label>
            <input 
              type="text" 
              value={historyItem.clientSeed} 
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400">Nonce</label>
            <input 
              type="text" 
              value={historyItem.nonce} 
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400">Roll Value</label>
            <input 
              type="text" 
              value={historyItem.rollValue.toFixed(2)} 
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400">Dice Value</label>
            <input 
              type="text" 
              value={historyItem.diceValue} 
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
            />
          </div>
        </div>
        
        {verificationResult !== null && (
          <div className={`p-3 rounded-md mb-4 ${verificationResult ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
            {verificationResult 
              ? 'Verification successful! The roll was fair.' 
              : 'Verification failed! The roll does not match the expected result.'}
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Verify
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;