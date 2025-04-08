import { useContext } from 'react';
import { AiContext } from '../contexts/AiContext';

const VoiceButton = () => {
  const { voiceEnabled, setVoiceEnabled } = useContext(AiContext);

  const handleVoiceToggle = () => {
    if (!voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Voice mode activated!");
      window.speechSynthesis.speak(utterance);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <button 
      onClick={handleVoiceToggle}
      className={voiceEnabled ? 'voice-active' : ''}
    >
      {voiceEnabled ? '🔊 Voice On' : '🔈 Voice Off'}
    </button>
  );
};

export default VoiceButton;