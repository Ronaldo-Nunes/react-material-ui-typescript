import { useCallback, useRef } from 'react';

export const useDebounce = (delay = 500, notDelayInFirstExecution = true) => {
  const isFirstTime = useRef(notDelayInFirstExecution);
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback((func: () => void) => {

    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    } else {
      if (debouncing.current !== undefined) {
        clearInterval(debouncing.current);
      }

      debouncing.current = setTimeout(() => func(), delay);
    }

  }, [delay]);

  return { debounce };
};