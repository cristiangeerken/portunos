export interface Unit {
  id: string;
  name: string;
  type: 'common' | 'machinegun' | 'explosive';
  x: number;
  y: number;
  color: string;
  health: number;
  maxHealth: number;
  attack: number;
  isSelected: boolean;
  team: 'player' | 'enemy';
  hasActed: boolean;
}

export interface Bullet {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  attacker: Unit;
  target: Unit;
  type: 'common' | 'machinegun' | 'explosive';
}

export interface GameState {
  playerUnits: Unit[];
  enemyUnits: Unit[];
  currentTurn: 'player' | 'enemy';
  selectedUnit: Unit | null;
  bullet: Bullet | null;
  message: string;
  movementMade: boolean;
}