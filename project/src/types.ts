export interface GameState {
  balance: number;
  betAmount: number;
  isRolling: boolean;
  diceValue: number | null;
  rollValue: number | null;
  history: GameHistory[];
  serverSeed: string;
  clientSeed: string;
  nonce: number;
  previousServerSeed: string;
  previousClientSeed: string;
  previousNonce: number;
  threshold: number;
  winChance: number;
  multiplier: number;
}

export interface GameHistory {
  id: number;
  betAmount: number;
  diceValue: number;
  rollValue: number;
  won: boolean;
  payout: number;
  serverSeed: string;
  clientSeed: string;
  nonce: number;
  timestamp: number;
}

export interface RollResult {
  diceValue: number;
  rollValue: number;
  won: boolean;
  payout: number;
  serverSeed: string;
  clientSeed: string;
  nonce: number;
}