import React, { useState, useEffect } from 'react';
import Dice from './components/Dice';
import BetControls from './components/BetControls';
import GameHistory from './components/GameHistory';
import FairnessInfo from './components/FairnessInfo';
import VerifyModal from './components/VerifyModal';
import SliderControl from './components/SliderControl';
import { GameState, GameHistory as GameHistoryType } from './types';
import { 
  generateRandomSeed, 
  processDiceRoll, 
  saveGameState, 
  loadGameState 
} from './utils/gameLogic';
import axios from 'axios';

function App() {
  // Initial game state
  const [gameState, setGameState] = useState<GameState>({
    balance: 1000,
    betAmount: 10,
    isRolling: false,
    diceValue: null,
    rollValue: null,
    history: [],
    serverSeed: '',
    clientSeed: '',
    nonce: 0,
    previousServerSeed: '',
    previousClientSeed: '',
    previousNonce: 0,
    threshold: 50.5,
    winChance: 49.5,
    multiplier: 2.0,
  });

  const [verifyItem, setVerifyItem] = useState<GameHistoryType | null>(null);
  const [recentRolls, setRecentRolls] = useState<number[]>([]);

  // Load saved game state on initial render
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setGameState(savedState);
    }
  }, []);

  // Save game state whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const handleBetChange = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      betAmount: amount
    }));
  };

  const handleThresholdChange = (threshold: number) => {
    const winChance = +(100 - threshold).toFixed(4);
    const multiplier = +(100 / winChance * 0.99).toFixed(4); // 1% house edge
    
    setGameState(prev => ({
      ...prev,
      threshold,
      winChance,
      multiplier
    }));
  };

  const handleRoll = async () => {
    // Validate bet amount
    if (gameState.betAmount <= 0 || gameState.betAmount > gameState.balance) {
      return;
    }
  
    // Start rolling animation
    setGameState(prev => ({
      ...prev,
      isRolling: true,
      diceValue: null,
      rollValue: null
    }));
  
    try {
      const response = await axios.post('http://localhost:5000/roll-dice', {
        betAmount: gameState.betAmount
      });
  
      const result = response.data;
  
      // Determine if won based on threshold
      const won = result.roll > gameState.threshold;
  
      // Calculate payout
      const payout = won ? Math.floor(gameState.betAmount * gameState.multiplier) : 0;
  
      // Create a new history item
      const historyItem: GameHistoryType = {
        id: gameState.history.length + 1,
        betAmount: gameState.betAmount,
        diceValue: result.roll,
        rollValue: result.roll,
        won: won,
        payout: payout,
        serverSeed: result.serverSeed,
        clientSeed: result.clientSeed,
        nonce: result.nonce,
        timestamp: Date.now(),
      };
  
      // Add to recent rolls
      const newRecentRolls = [...recentRolls, result.roll];
      if (newRecentRolls.length > 3) {
        newRecentRolls.shift();
      }
      setRecentRolls(newRecentRolls);
  
      // Update game state
      setGameState(prev => ({
        ...prev,
        isRolling: false,
        diceValue: result.roll,
        rollValue: result.roll,
        balance: prev.balance - prev.betAmount + payout,
        history: [...prev.history, historyItem],
        nonce: prev.nonce + 1,
        previousServerSeed: prev.serverSeed,
        previousClientSeed: prev.clientSeed,
        previousNonce: prev.nonce,
        serverSeed: result.serverSeed,
        clientSeed: result.clientSeed,
      }));
    } catch (error) {
      console.error('Error rolling dice:', error);
      setGameState(prev => ({
        ...prev,
        isRolling: false
      }));
    }
  };

  const handleChangeClientSeed = () => {
    setGameState(prev => ({
      ...prev,
      clientSeed: generateRandomSeed()
    }));
  };

  const handleVerify = (historyItem: GameHistoryType) => {
    setVerifyItem(historyItem);
  };

  const closeVerifyModal = () => {
    setVerifyItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Provably Fair Dice Game</h1>
          <p className="text-gray-400">Roll over to win!</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Your Balance</h2>
                  <p className="text-2xl font-bold text-green-400">₹{gameState.balance.toFixed(2)}</p>
                </div>
                <div className="flex space-x-2">
                  {recentRolls.map((roll, index) => (
                    <div key={index} className="bg-green-500 text-white px-3 py-1 rounded-md">
                      {roll.toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <Dice value={gameState.diceValue} isRolling={gameState.isRolling} />
                
              </div>

              <BetControls
                balance={gameState.balance}
                betAmount={gameState.betAmount}
                isRolling={gameState.isRolling}
                onBetChange={handleBetChange}
                onRoll={handleRoll}
                multiplier={gameState.multiplier}
                threshold={gameState.threshold}
                winChance={gameState.winChance}
              />
            </div>

            <FairnessInfo
              serverSeed={gameState.serverSeed}
              clientSeed={gameState.clientSeed}
              nonce={gameState.nonce}
              previousServerSeed={gameState.previousServerSeed}
              previousClientSeed={gameState.previousClientSeed}
              previousNonce={gameState.previousNonce}
              onChangeClientSeed={handleChangeClientSeed}
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <SliderControl 
                threshold={gameState.threshold}
                onThresholdChange={handleThresholdChange}
                rollValue={gameState.rollValue}
                isRolling={gameState.isRolling}
              />
            </div>
            
            <GameHistory 
              history={gameState.history} 
              onVerify={handleVerify}
            />
          </div>
        </div>
      </div>

      {verifyItem && (
        <VerifyModal 
          historyItem={verifyItem} 
          onClose={closeVerifyModal} 
        />
      )}
    </div>
  );
}

export default App;