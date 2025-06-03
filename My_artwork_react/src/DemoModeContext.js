import React, { createContext, useContext, useState } from 'react';

const DemoModeContext = createContext();

export function DemoModeProvider({ children }) {
  const [demoMode, setDemoMode] = useState(() => {
    const stored = localStorage.getItem('demoMode');
    return stored === null ? true : stored === 'true';
  });
  const toggleDemoMode = () => {
    setDemoMode(dm => {
      localStorage.setItem('demoMode', !dm);
      return !dm;
    });
  };
  return (
    <DemoModeContext.Provider value={{ demoMode, toggleDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  return useContext(DemoModeContext);
} 