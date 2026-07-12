import { useState, useEffect } from 'react';

/**
 * Reusable hook to debounce values.
 * @param {*} value - The input value to debounce.
 * @param {number} delay - Delay timeout in milliseconds.
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
