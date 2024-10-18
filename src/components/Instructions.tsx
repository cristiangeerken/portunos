import React from 'react';

interface InstructionsProps {
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Instrucciones del Juego</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Tienes 3 unidades: común (ataque normal), ametralladora (ataque fuerte) y explosivo (daño a todos).</li>
        <li>Haz clic en una de tus unidades para seleccionarla.</li>
        <li>Mueve la unidad haciendo clic en una celda dentro de 3 espacios.</li>
        <li>Ataca haciendo clic en una unidad enemiga dentro de 5 espacios.</li>
        <li>Solo puedes mover o atacar una vez por turno.</li>
        <li>Tienes 10 segundos para realizar tu acción, o perderás el turno.</li>
        <li>Las unidades usadas cambiarán de color para indicar que ya actuaron.</li>
        <li>Elimina todas las unidades enemigas para ganar.</li>
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClose}
      >
        Comenzar Juego
      </button>
    </div>
  );
};

export default Instructions;