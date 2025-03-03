import React from 'react';

interface DiceProps {
  value: number | null;
  isRolling: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, isRolling }) => {
  // Dice face configurations
  const diceFaces = {
    1: [{ x: 2, y: 2 }],
    2: [{ x: 1, y: 1 }, { x: 3, y: 3 }],
    3: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
    4: [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: 3 }],
    5: [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 3 }],
    6: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
  };

  // Get dots for current value
  const getDots = () => {
    if (!value || value < 1 || value > 6) return [];
    return diceFaces[value as keyof typeof diceFaces];
  };

  return (
    <div 
      className={`relative w-24 h-24 bg-gray-800 rounded-xl shadow-lg border-2 border-gray-700 
                 ${isRolling ? 'animate-bounce' : ''} 
                 ${value && value >= 4 ? 'border-green-500' : value ? 'border-red-500' : 'border-gray-700'}`}
    >
      {value ? (
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full p-2">
          {getDots().map((dot, index) => (
            <div 
              key={index}
              className={`absolute w-4 h-4 bg-white rounded-full`}
              style={{
                top: `${(dot.y - 0.5) * 33.33}%`,
                left: `${(dot.x - 0.5) * 33.33}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          ?
        </div>
      )}
    </div>
  );
};

export default Dice;