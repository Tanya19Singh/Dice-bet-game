import React from 'react';

interface SliderControlProps {
  threshold: number;
  onThresholdChange: (threshold: number) => void;
  rollValue: number | null;
  isRolling: boolean;
}

const SliderControl: React.FC<SliderControlProps> = ({ 
  threshold, 
  onThresholdChange,
  rollValue,
  isRolling
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onThresholdChange(value);
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-white mb-4">Roll Outcome</h3>
      
      <div className="relative mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
        
        <div className="h-12 relative">
          {/* Background track */}
          <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-700 ">
          <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-900 mx-3 my-2.5">
            {/* Red part (left) */}
            <div className="absolute left-0 top-0 bottom-0 bg-red-500  mx-3 my-2.5 rounded-full" style={{ width: `${threshold}%` }}></div>
            {/* Green part (right) */}
            <div className="absolute right-0 top-0 bottom-0 bg-green-500  mx-3 my-2.5 rounded-full" style={{ width: `${100 - threshold}%` }}></div>
          </div>
          </div>
          
          {/* Threshold handle */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
            style={{ left: `${threshold}%` }}
          >
            <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded">
              <span className="text-white font-medium">{threshold.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Roll value marker (hexagon) */}
          {rollValue !== null && !isRolling && (
            <div 
              className="absolute top-1/2 transform -translate-y-12 -translate-x-1/2 z-20"
              style={{ left: `${rollValue*16.66}%` }}
            >
              <div className="w-12 h-12 flex items-center justify-center z-50">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <polygon 
                    points="24,0 48,12 48,36 24,48 0,36 0,12" 
                    fill="white" 
                    stroke="darkgray" 
                    strokeWidth="1" 
                    stroke-linejoin="round" 
                    
                  />
                          {/* Front Face */}
              <polygon 
                points="24,0 48,12 48,36 24,48 0,36 0,12" 
                fill="white" 
                
              />
              {/* Side Faces */}
              <polygon 
                points="24,24 48,12 48,36 24,48" 
                fill="lightgray" 
                opacity="0.5" 
              />
              <polygon 
                points="0,12 0,36 24,48 24,24" 
                fill="darkgray" 
                opacity="0.5" 
              />
                  {/* Inner Lines to Simulate 3D Effect */}
                  <line x1="24" y1="24" x2="24" y2="48" stroke="darkgray" strokeWidth="0.2" />
                  <line x1="24" y1="24" x2="0" y2="12" stroke="darkgray" strokeWidth="0.2" />
                  <line x1="24" y1="24" x2="48" y2="12" stroke="lightgray" strokeWidth="0.2" />
                  {/* Text in the center */}
                  <text 
                    x="24" 
                    y="28" 
                    z-index="50"
                    textAnchor="middle" 
                    fill="rgb(34 197 94 / var(--tw-bg-opacity))" 
                    fontSize="12" 
                    fontWeight="bold"
                  >
                    {rollValue*16.66.toFixed(2)}
                  </text>
                </svg>
              </div>
            </div>
          )}
          
          {/* Actual slider input (invisible but functional) */}
          <input
            type="range"
            min="0.5"
            max="99.5"
            step="0.01"
            value={threshold}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
          />
        </div>
      </div>
      
      {/* Game Settings */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">Multiplier</div>
          <div className="bg-gray-700 rounded flex items-center p-2">
            <span className="text-white">{(100 / (100 - threshold) * 0.99).toFixed(4)}</span>
            <span className="ml-auto text-white">×</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Roll Over</div>
          <div className="bg-gray-700 rounded flex items-center p-2">
            <span className="text-white">{threshold.toFixed(2)}</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Win Chance</div>
          <div className="bg-gray-700 rounded flex items-center p-2">
            <span className="text-white">{(100 - threshold).toFixed(4)}</span>
            <span className="ml-auto text-white">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderControl;
