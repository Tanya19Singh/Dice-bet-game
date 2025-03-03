import React, { useState } from 'react';
import { verifyRoll } from '../utils/gameLogic';

interface FairnessInfoProps {
  serverSeed: string;
  clientSeed: string;
  nonce: number;
  previousServerSeed: string;
  previousClientSeed: string;
  previousNonce: number;
  onChangeClientSeed: () => void;
}

const FairnessInfo: React.FC<FairnessInfoProps> = ({
  serverSeed,
  clientSeed,
  nonce,
  previousServerSeed,
  previousClientSeed,
  previousNonce,
  onChangeClientSeed,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-md">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium text-white">Provably Fair System</h3>
        <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          <p className="text-gray-300 mb-4">
            Our dice game uses a provably fair system that ensures the outcome of each roll cannot be manipulated.
            You can verify any roll using the server seed, client seed, and nonce.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">Current Round</h4>
              <div className="bg-gray-900 p-3 rounded-md">
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Server Seed (hashed):</span>
                  <p className="text-xs text-gray-300 break-all">{serverSeed}</p>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Client Seed:</span>
                  <p className="text-xs text-gray-300 break-all">{clientSeed}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Nonce:</span>
                  <p className="text-xs text-gray-300">{nonce}</p>
                </div>
              </div>
            </div>
            
            {previousServerSeed && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Previous Round</h4>
                <div className="bg-gray-900 p-3 rounded-md">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">Server Seed:</span>
                    <p className="text-xs text-gray-300 break-all">{previousServerSeed}</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">Client Seed:</span>
                    <p className="text-xs text-gray-300 break-all">{previousClientSeed}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Nonce:</span>
                    <p className="text-xs text-gray-300">{previousNonce}</p>
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChangeClientSeed();
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Change Client Seed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FairnessInfo;