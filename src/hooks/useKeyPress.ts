import { useEffect } from 'react';

export function useKeyPress(handler: (event: KeyboardEvent) => void) {
  // If pressed key is our target key then set to true
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [handler]);
  return handler;
}
