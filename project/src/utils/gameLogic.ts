import SHA256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';
import { GameState, RollResult } from '../types';

// Generate a random hex string for seeds
export const generateRandomSeed = (): string => {
  const randomValues = new Uint8Array(32);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Calculate a provably fair roll value between 0-100
export const calculateRollValue = (
  serverSeed: string,
  clientSeed: string,
  nonce: number
): number => {
  // Combine the seeds and nonce
  const combinedSeed = `${serverSeed}:${clientSeed}:${nonce}`;
  
  // Generate a hash
  const hash = SHA256(combinedSeed).toString(Hex);
  
  // Use the first 8 characters of the hash as a hex number
  const hexSubstring = hash.substring(0, 8);
  
  // Convert to a decimal number
  const decimalValue = parseInt(hexSubstring, 16);
  
  // Map to a value between 0 and 100
  return (decimalValue % 10001) / 100;
};

// Process a dice roll and return the result
export const processDiceRoll = (gameState: GameState): RollResult => {
  // Calculate the roll value (0-100)
  const rollValue = calculateRollValue(
    gameState.serverSeed,
    gameState.clientSeed,
    gameState.nonce
  );
  
  // Map to dice value (1-6)
  const diceValue = Math.floor(rollValue / 16.67) + 1;
  
  // Determine if the player won (roll > threshold)
  const won = rollValue > gameState.threshold;
  
  // Calculate payout
  const payout = won ? Math.floor(gameState.betAmount * gameState.multiplier) : 0;
  
  return {
    diceValue,
    rollValue,
    won,
    payout,
    serverSeed: gameState.serverSeed,
    clientSeed: gameState.clientSeed,
    nonce: gameState.nonce,
  };
};

// Verify a previous roll
export const verifyRoll = (
  serverSeed: string,
  clientSeed: string,
  nonce: number,
  expectedRollValue: number
): boolean => {
  const calculatedRollValue = calculateRollValue(serverSeed, clientSeed, nonce);
  return Math.abs(calculatedRollValue - expectedRollValue) < 0.01; // Allow small floating point differences
};

// Save game state to localStorage
export const saveGameState = (gameState: GameState): void => {
  localStorage.setItem('diceGameState', JSON.stringify(gameState));
};

// Load game state from localStorage
export const loadGameState = (): GameState | null => {
  const savedState = localStorage.getItem('diceGameState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return null;
};