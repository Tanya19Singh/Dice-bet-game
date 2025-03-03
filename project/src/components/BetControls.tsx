import React from 'react';
import  { useState ,useEffect} from 'react';

import { RefreshCw } from 'lucide-react';

interface BetControlsProps {
  balance: number;
  betAmount: number;
  isRolling: boolean;
  onBetChange: (amount: number) => void;
  onRoll: () => void;
  multiplier: number;
  threshold: number;
  winChance: number;
}

const BetControls: React.FC<BetControlsProps> = ({
  balance,
  betAmount,
  isRolling,
  onBetChange,
  onRoll,
  multiplier,
  threshold,
  winChance
}) => {
  const [localBetAmount, setLocalBetAmount] = useState<number>(betAmount);
  useEffect(() => {
    setLocalBetAmount(betAmount);
  }, [betAmount]);

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue=e.target.value;
    if (inputValue === '') {
      setLocalBetAmount(0);
      onBetChange(0);
    } 
    else{
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0&& value <= balance) {
      setLocalBetAmount(value);
      onBetChange(value);
    }
  }
  };

  const handleQuickBet = (multiplier: number) => {
    onBetChange(Math.min(balance, Math.floor(betAmount * multiplier)));
    setLocalBetAmount(Math.min(balance, Math.floor(betAmount * multiplier)));
  };

  // Calculate profit on win
  const profitOnWin = betAmount * multiplier - betAmount;
  const [selected, setSelected] = useState('manual');
  return (
    <div className="w-full">
      {/* Mode Toggle */}
      <div className="bg-gray-800 rounded-full p-1 flex mb-6 max-w-xs">
        <button
          className={`py-2  px-6 rounded-full text-sm font-medium transition-colors ${selected === 'manual' ? 'element' : 'text-gray-500 hover:text-white'}`}
          onClick={()=>setSelected('manual')}
        >
          Manual
        </button>
        <button
          className={`py-2  px-6 rounded-full text-sm font-medium transition-colors ${selected === 'auto' ? 'element' : 'text-gray-500 hover:text-white'}`}
          onClick={()=>setSelected('auto')}
        >
          Auto
        </button>
        <button className="ml-auto py-2 px-2 text-gray-400 hover:text-white">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Bet Amount */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="betAmount" className="text-sm font-medium text-gray-300">
            Bet Amount
          </label>
          <span className="text-sm text-gray-400">₹{betAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center bg-gray-700 rounded">      
          <div className='w-full relative flex'>
          <input
            type="number"
            id="betAmount"
            value={selected==="manual"?localBetAmount === 0 ? "" : localBetAmount.toString() 
              : betAmount}
            onChange={handleBetChange}
            min="0"
            max={balance}
            disabled={isRolling||selected==="auto"}
            className="relative w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          
          <svg id="Layer_1" data-name="Layer 1" height="36" width="36" className='absolute right-1 p-1 top-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><defs>
              </defs><title>indian-rupee-coin-color</title><path className="cls-1" d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0Z"/><path className="cls-2" d="M61.44,8.74a52.69,52.69,0,0,1,52.7,52.7c0,.31,0,.61,0,.92a50.86,50.86,0,1,0-51.77,51.77h-.92a52.7,52.7,0,0,1,0-105.4Z"/><path className="cls-3" d="M63.28,12.41A50.87,50.87,0,1,1,12.41,63.28,50.87,50.87,0,0,1,63.28,12.41Z"/><path className="cls-4" d="M42.31,58.09l3.78-8.68H60.34a5.55,5.55,0,0,0-.94-1.82,7,7,0,0,0-1.66-1.54,9.19,9.19,0,0,0-2.21-1A7.88,7.88,0,0,0,53,44.59H42.31l3.78-8.69h40.8l-3.78,8.69H73.25a6.87,6.87,0,0,1,1.09,1.07,8.56,8.56,0,0,1,.89,1.25,13,13,0,0,1,.64,1.3,5.38,5.38,0,0,1,.34,1.2H86.89l-3.78,8.68H75.38a14.09,14.09,0,0,1-2.53,4.19A20.71,20.71,0,0,1,69,65.83a25.24,25.24,0,0,1-4.85,2.65,23.16,23.16,0,0,1-5.31,1.45L80.23,92.44h-17L44.17,71v-8h8.46a7.13,7.13,0,0,0,2.4-.41,9,9,0,0,0,2.19-1.1A8.24,8.24,0,0,0,59,60a5.84,5.84,0,0,0,1-1.89Z"/><path className="cls-1" d="M39.67,55.86l3.78-8.51H57.7a5.38,5.38,0,0,0-.94-1.78,6.56,6.56,0,0,0-1.67-1.51,8.93,8.93,0,0,0-2.2-1,8.14,8.14,0,0,0-2.58-.39H39.67l3.78-8.52h40.8l-3.78,8.52H70.61a6.65,6.65,0,0,1,1.09,1,9,9,0,0,1,.89,1.23,12.59,12.59,0,0,1,.64,1.27,6,6,0,0,1,.34,1.18H84.25l-3.78,8.51H72.74A14.24,14.24,0,0,1,70.21,60a20.48,20.48,0,0,1-3.91,3.48A24.76,24.76,0,0,1,61.45,66a23.51,23.51,0,0,1-5.3,1.42L77.59,89.53h-17l-19.12-21V60.74H50a7.37,7.37,0,0,0,2.4-.4,9.33,9.33,0,0,0,2.19-1.09,8.11,8.11,0,0,0,1.74-1.55,5.42,5.42,0,0,0,1-1.84Z"/></svg>
          </div>
          
          <div className="flex " >
            <button
              onClick={() => handleQuickBet(0.5)}
              disabled={isRolling}
              className="px-3 py-2 bg-gray-700 text-xs text-white hover:bg-gray-600 focus:outline-none border-r border-gray-600"
            >
              ½
            </button>
            <button
              onClick={() => handleQuickBet(2)}
              disabled={isRolling}
              className=" mr-1  px-3 py-2 bg-gray-700 text-xs text-white hover:bg-gray-600 focus:outline-none"
            >
              2×
            </button>
          </div>
        </div>
      </div>

      {/* Profit on Win */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="profitOnWin" className="text-sm font-medium text-gray-300">
            Profit on Win
          </label>
          <span className="text-sm text-gray-400">₹{profitOnWin.toFixed(2)}</span>
        </div>
        <div className='w-full relative'>
        <input
          type="number"
          id="profitOnWin"
          value={profitOnWin.toFixed(2)}
          readOnly
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none"
        />
        <svg id="Layer_1" data-name="Layer 1" height="36" width="36" className='absolute right-0 p-1 top-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><defs>
              </defs><title>indian-rupee-coin-color</title><path className="cls-1" d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0Z"/><path className="cls-2" d="M61.44,8.74a52.69,52.69,0,0,1,52.7,52.7c0,.31,0,.61,0,.92a50.86,50.86,0,1,0-51.77,51.77h-.92a52.7,52.7,0,0,1,0-105.4Z"/><path className="cls-3" d="M63.28,12.41A50.87,50.87,0,1,1,12.41,63.28,50.87,50.87,0,0,1,63.28,12.41Z"/><path className="cls-4" d="M42.31,58.09l3.78-8.68H60.34a5.55,5.55,0,0,0-.94-1.82,7,7,0,0,0-1.66-1.54,9.19,9.19,0,0,0-2.21-1A7.88,7.88,0,0,0,53,44.59H42.31l3.78-8.69h40.8l-3.78,8.69H73.25a6.87,6.87,0,0,1,1.09,1.07,8.56,8.56,0,0,1,.89,1.25,13,13,0,0,1,.64,1.3,5.38,5.38,0,0,1,.34,1.2H86.89l-3.78,8.68H75.38a14.09,14.09,0,0,1-2.53,4.19A20.71,20.71,0,0,1,69,65.83a25.24,25.24,0,0,1-4.85,2.65,23.16,23.16,0,0,1-5.31,1.45L80.23,92.44h-17L44.17,71v-8h8.46a7.13,7.13,0,0,0,2.4-.41,9,9,0,0,0,2.19-1.1A8.24,8.24,0,0,0,59,60a5.84,5.84,0,0,0,1-1.89Z"/><path className="cls-1" d="M39.67,55.86l3.78-8.51H57.7a5.38,5.38,0,0,0-.94-1.78,6.56,6.56,0,0,0-1.67-1.51,8.93,8.93,0,0,0-2.2-1,8.14,8.14,0,0,0-2.58-.39H39.67l3.78-8.52h40.8l-3.78,8.52H70.61a6.65,6.65,0,0,1,1.09,1,9,9,0,0,1,.89,1.23,12.59,12.59,0,0,1,.64,1.27,6,6,0,0,1,.34,1.18H84.25l-3.78,8.51H72.74A14.24,14.24,0,0,1,70.21,60a20.48,20.48,0,0,1-3.91,3.48A24.76,24.76,0,0,1,61.45,66a23.51,23.51,0,0,1-5.3,1.42L77.59,89.53h-17l-19.12-21V60.74H50a7.37,7.37,0,0,0,2.4-.4,9.33,9.33,0,0,0,2.19-1.09,8.11,8.11,0,0,0,1.74-1.55,5.42,5.42,0,0,0,1-1.84Z"/></svg>
         
      </div></div>

      {/* Bet Button */}
      <button
        onClick={onRoll}
        disabled={isRolling || betAmount <= 0 || betAmount > balance}
        className={`w-full py-3 px-4 rounded-md font-medium text-gray-900 transition-colors focus:outline-none
          ${
            isRolling || betAmount <= 0 || betAmount > balance
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-400 hover:bg-green-500'
          }`}
      >
        {isRolling ? 'Rolling...' : 'Bet'}
      </button>
    </div>
  );
};

export default BetControls;