import React, { useEffect, useState } from 'react';
import { Bullet as BulletType } from '../types';

interface BulletProps {
  bullet: BulletType;
}

const BulletComponent: React.FC<BulletProps> = ({ bullet }) => {
  const [position, setPosition] = useState({ x: bullet.x, y: bullet.y });

  useEffect(() => {
    const interval = setInterval(() => {
      const dx = bullet.targetX - position.x;
      const dy = bullet.targetY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5) {
        clearInterval(interval);
      } else {
        const vx = (dx / distance) * 5;
        const vy = (dy / distance) * 5;
        setPosition((prev) => ({ x: prev.x + vx, y: prev.y + vy }));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [bullet, position]);

  const bulletColor = bullet.type === 'common' ? 'bg-yellow-500' : bullet.type === 'machinegun' ? 'bg-orange-500' : 'bg-green-500';

  return (
    <div
      className={`absolute w-3 h-3 rounded-full ${bulletColor}`}
      style={{ left: position.x, top: position.y }}
    />
  );
};

export default BulletComponent;