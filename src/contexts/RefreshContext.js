import React, { createContext, useState } from 'react';

export const RefreshContext = createContext();

export function RefreshProvider({ children }) {
  const [refreshEnabled, setRefreshEnabled] = useState(true);

  return (
    <RefreshContext.Provider value={{ refreshEnabled, setRefreshEnabled }}>
      {children}
    </RefreshContext.Provider>
  );
}