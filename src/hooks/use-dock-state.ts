import { useState } from 'react';

export function useDockState() {
  const [isExpanded, setIsExpanded] = useState(
    window.localStorage.getItem('isDockExpanded') === 'true'
  );

  function toggleDock() {
    window.localStorage.setItem('isDockExpanded', String(!isExpanded));
    setIsExpanded(!isExpanded);
  }

  return {
    isExpanded,
    toggleDock,
  };
}
