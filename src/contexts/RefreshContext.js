// RefreshContext.js
import { createContext } from 'react';

// Create the context with a default value
const RefreshContext = createContext({
  refreshEnabled: true, // This specifies whether the refresh feature is enabled
  setRefreshEnabled: () => {} // This is a placeholder for the function that will update the state
});

export default RefreshContext;
