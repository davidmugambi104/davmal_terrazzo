import React, { useRef, useEffect } from 'react';

const PatternCanvas = ({ pattern, onSave }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (pattern) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // ...existing code to draw pattern on canvas...
    }
  }, [pattern]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    onSave(dataUrl);
  };

  return (
    <div className="pattern-canvas">
      <h2>Pattern Canvas</h2>
      <p>Design your pattern here.</p>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
      <button onClick={handleSave}>Save Pattern</button>
    </div>
  );
};

export default PatternCanvas;
