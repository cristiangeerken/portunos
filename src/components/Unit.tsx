import React from 'react';
import { Unit as UnitType } from '../types';

interface UnitProps {
  unit: UnitType;
  onClick: () => void;
}

const UnitComponent: React.FC<UnitProps> = ({ unit, onClick }) => {
  const healthPercentage = (unit.health / unit.maxHealth) * 100;
  const healthColor = healthPercentage > 50 ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`absolute w-16 h-16 rounded-full ${
        unit.isSelected ? 'ring-4 ring-yellow-400' : ''
      }`}
      style={{
        left: unit.x - 32,
        top: unit.y - 32,
        backgroundColor: unit.color,
      }}
      onClick={onClick}
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20">
        <div className="h-2 bg-gray-300 rounded-full">
          <div
            className={`h-full ${healthColor} rounded-full`}
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
      </div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700">
        {unit.name}
      </div>
    </div>
  );
};

export default UnitComponent;