import React from 'react';

interface GameInfoProps {
  currentTurn: 'player' | 'enemy';
  message: string;
  timer: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ currentTurn, message, timer }) => {
  return (
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold mb-2">
        {currentTurn === 'player' ? "Turno del Jugador" : "Turno del Enemigo"}
      </h2>
      <p className="text-lg mb-2">{message}</p>
      {currentTurn === 'player' && (
        <p className="text-xl font-bold">Tiempo restante: {timer} segundos</p>
      )}
    </div>
  );
};

export default GameInfo;