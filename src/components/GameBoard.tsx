import React from 'react';
import { Unit, Bullet } from '../types';
import UnitComponent from './Unit';
import BulletComponent from './Bullet';

interface GameBoardProps {
  units: Unit[];
  bullet: Bullet | null;
  onUnitClick: (unit: Unit) => void;
  onCellClick: (x: number, y: number) => void;
}

const GRID_SIZE = 10;
const CELL_SIZE = 80;

const GameBoard: React.FC<GameBoardProps> = ({ units, bullet, onUnitClick, onCellClick }) => {
  return (
    <div className="relative w-[800px] h-[800px] bg-gray-200 border-2 border-gray-400">
      {[...Array(GRID_SIZE)].map((_, row) => (
        <div key={row} className="flex">
          {[...Array(GRID_SIZE)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              className="w-20 h-20 border border-gray-300"
              onClick={() => onCellClick(col * CELL_SIZE + CELL_SIZE / 2, row * CELL_SIZE + CELL_SIZE / 2)}
            />
          ))}
        </div>
      ))}
      {units.map((unit) => (
        <UnitComponent key={unit.id} unit={unit} onClick={() => onUnitClick(unit)} />
      ))}
      {bullet && <BulletComponent bullet={bullet} />}
    </div>
  );
};

export default GameBoard;