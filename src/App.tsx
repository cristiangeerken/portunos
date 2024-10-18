import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import Instructions from './components/Instructions';
import { GameState, Unit } from './types';
import {
  createInitialState,
  handleUnitClick,
  handleCellClick,
  handleAttack,
  resolveBulletImpact,
  performEnemyTurn,
  resolveEnemyBulletImpact,
  checkGameOver,
} from './utils/gameLogic';

function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [showInstructions, setShowInstructions] = useState(true);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (gameState.bullet) {
      const timer = setTimeout(() => {
        if (gameState.currentTurn === 'player') {
          setGameState((prevState) => resolveBulletImpact(prevState));
        } else {
          setGameState((prevState) => resolveEnemyBulletImpact(prevState));
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameState.bullet]);

  useEffect(() => {
    if (gameState.currentTurn === 'enemy') {
      const timer = setTimeout(() => {
        setGameState((prevState) => performEnemyTurn(prevState));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameState.currentTurn]);

  useEffect(() => {
    setGameState((prevState) => checkGameOver(prevState));
  }, [gameState.playerUnits, gameState.enemyUnits]);

  useEffect(() => {
    if (gameState.currentTurn === 'player' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameState((prevState) => ({
        ...prevState,
        currentTurn: 'enemy',
        message: 'Se acabó el tiempo. Turno del enemigo.',
        movementMade: false,
      }));
      setTimer(10);
    }
  }, [gameState.currentTurn, timer]);

  const onUnitClick = (unit: Unit) => {
    if (gameState.currentTurn === 'player') {
      if (unit.team === 'player') {
        setGameState((prevState) => handleUnitClick(prevState, unit));
      } else if (gameState.selectedUnit) {
        setGameState((prevState) => handleAttack(prevState, unit));
      }
    }
  };

  const onCellClick = (x: number, y: number) => {
    if (gameState.currentTurn === 'player') {
      setGameState((prevState) => handleCellClick(prevState, x, y));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Juego de Estrategia por Turnos</h1>
      {showInstructions ? (
        <Instructions onClose={() => setShowInstructions(false)} />
      ) : (
        <>
          <GameInfo currentTurn={gameState.currentTurn} message={gameState.message} timer={timer} />
          <GameBoard
            units={[...gameState.playerUnits, ...gameState.enemyUnits]}
            bullet={gameState.bullet}
            onUnitClick={onUnitClick}
            onCellClick={onCellClick}
          />
        </>
      )}
    </div>
  );
}

export default App;