import { useContext } from 'react';
import { AiContext } from '../contexts/AiContext';

const ModeSelector = () => {
  const { mode, setMode } = useContext(AiContext);

  return (
    <div className="mode-selector">
      <button 
        onClick={() => setMode('normal')}
        className={mode === 'normal' ? 'active' : ''}
      >
        Normal
      </button>
      <button
        onClick={() => setMode('pirate')}
        className={mode === 'pirate' ? 'active' : ''}
      >
        Pirate
      </button>
      <button
        onClick={() => setMode('conspiracy')}
        className={mode === 'conspiracy' ? 'active' : ''}
      >
        Conspiracy
      </button>
    </div>
  );
};

export default ModeSelector;