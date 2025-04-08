import { createContext, useState } from 'react';

export const AiContext = createContext();

export const AiProvider = ({ children }) => {
  const [mode, setMode] = useState('normal');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <AiContext.Provider value={{ mode, setMode, voiceEnabled, setVoiceEnabled }}>
      {children}
    </AiContext.Provider>
  );
};