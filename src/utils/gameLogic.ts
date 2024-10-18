import { GameState, Unit, Bullet } from '../types';

// ... (previous functions remain unchanged)

export const resolveBulletImpact = (state: GameState): GameState => {
  if (!state.bullet) return state;

  const { attacker, target, type } = state.bullet;
  let updatedEnemyUnits = state.enemyUnits;
  let message = '';

  if (type === 'explosive') {
    updatedEnemyUnits = state.enemyUnits.map(unit => ({
      ...unit,
      health: Math.max(0, unit.health - attacker.attack)
    }));
    message = `${attacker.name} causó ${attacker.attack} de daño a todas las unidades enemigas`;
  } else {
    updatedEnemyUnits = state.enemyUnits.map(unit =>
      unit.id === target.id
        ? { ...unit, health: Math.max(0, unit.health - attacker.attack) }
        : unit
    );
    message = `${attacker.name} causó ${attacker.attack} de daño a ${target.name}`;
  }

  return {
    ...state,
    enemyUnits: updatedEnemyUnits,
    bullet: null,
    message,
    currentTurn: 'enemy'
  };
};

export const performEnemyTurn = (state: GameState): GameState => {
  const activeEnemyUnits = state.enemyUnits.filter(unit => unit.health > 0);
  if (activeEnemyUnits.length === 0) return state;

  const enemyUnit = activeEnemyUnits[Math.floor(Math.random() * activeEnemyUnits.length)];
  const playerUnits = state.playerUnits.filter(unit => unit.health > 0);
  
  if (playerUnits.length === 0) return state;

  const targetUnit = playerUnits[Math.floor(Math.random() * playerUnits.length)];

  const bullet: Bullet = {
    id: Date.now().toString(),
    x: enemyUnit.x,
    y: enemyUnit.y,
    targetX: targetUnit.x,
    targetY: targetUnit.y,
    attacker: enemyUnit,
    target: targetUnit,
    type: enemyUnit.type,
  };

  return {
    ...state,
    bullet,
    message: `${enemyUnit.name} ataca a ${targetUnit.name}`,
    currentTurn: 'enemy'
  };
};

export const resolveEnemyBulletImpact = (state: GameState): GameState => {
  if (!state.bullet) return state;

  const { attacker, target, type } = state.bullet;
  let updatedPlayerUnits = state.playerUnits;
  let message = '';

  if (type === 'explosive') {
    updatedPlayerUnits = state.playerUnits.map(unit => ({
      ...unit,
      health: Math.max(0, unit.health - attacker.attack)
    }));
    message = `${attacker.name} causó ${attacker.attack} de daño a todas tus unidades`;
  } else {
    updatedPlayerUnits = state.playerUnits.map(unit =>
      unit.id === target.id
        ? { ...unit, health: Math.max(0, unit.health - attacker.attack) }
        : unit
    );
    message = `${attacker.name} causó ${attacker.attack} de daño a ${target.name}`;
  }

  return {
    ...state,
    playerUnits: updatedPlayerUnits,
    bullet: null,
    message,
    currentTurn: 'player'
  };
};

export const checkGameOver = (state: GameState): GameState => {
  const activePlayerUnits = state.playerUnits.filter((unit) => unit.health > 0);
  const activeEnemyUnits = state.enemyUnits.filter((unit) => unit.health > 0);

  if (activePlayerUnits.length === 0) {
    return { ...state, message: "¡El enemigo gana!" };
  }

  if (activeEnemyUnits.length === 0) {
    return { ...state, message: "¡El jugador gana!" };
  }

  return state;
};

// Export all functions
export {
  createInitialState,
  handleUnitClick,
  handleCellClick,
  handleAttack,
};