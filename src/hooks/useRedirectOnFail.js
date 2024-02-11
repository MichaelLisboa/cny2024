import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

// Custom hook for redirecting based on the actionsSkippedOrFailed condition
const useRedirectOnFail = () => {
  const { actionsSkippedOrFailed, currentLocation } = useContext(AppContext);
  const [shouldRedirect, setShouldRedirect] = useState(false); // State to hold whether a redirect should occur
  const [previousPage, setPreviousPage] = useState(null); // State to hold the previous page

  useEffect(() => {
    if (currentLocation) {
      setPreviousPage(currentLocation);
    }
  }, []);

  useEffect(() => {
    // Listen for the condition to become true
    if (actionsSkippedOrFailed === true) {
      // Instead of navigating, set the state value
      setShouldRedirect(true);
    }
  }, [actionsSkippedOrFailed]); // Depend on the state

  return { shouldRedirect, previousPage }; // Return the state value and the previous page
};

export default useRedirectOnFail;