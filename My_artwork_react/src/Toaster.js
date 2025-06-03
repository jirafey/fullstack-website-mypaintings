import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function Toaster({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(ts => [...ts, { id, msg, type }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3500);
  };

  return (
    <ToastContext.Provider value={showToast}>
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
        {toasts.map(t => (
          <div key={t.id} className={`alert alert-${t.type} shadow mb-2`}>{t.msg}</div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
} 