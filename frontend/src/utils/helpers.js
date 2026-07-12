/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates text to a specified maximum length and appends an ellipsis.
 * @param {string} str - The text to truncate.
 * @param {number} maxLength - The maximum allowed length.
 * @returns {string} The truncated text.
 */
export const truncateText = (str, maxLength = 100) => {
  if (typeof str !== 'string' || !str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

/**
 * Generates a unique random string ID.
 * @returns {string} A unique ID.
 */
export const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
};

/**
 * Creates a debounced function that delays invoking the provided function.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Deep clones an object or array.
 * @param {*} obj - The target to clone.
 * @returns {*} The deep cloned copy.
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    if (Array.isArray(obj)) {
      return obj.map(item => deepClone(item));
    }
    const cloned = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object).
 * @param {*} val - The value to check.
 * @returns {boolean} True if empty, false otherwise.
 */
export const isEmpty = (val) => {
  if (val === null || val === undefined) return true;
  if (typeof val === 'string') return val.trim().length === 0;
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === 'object') return Object.keys(val).length === 0;
  return false;
};
