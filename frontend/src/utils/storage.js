/**
 * Safely sets an item in localStorage after serializing to JSON.
 * @param {string} key - The localStorage key.
 * @param {*} value - The value to store.
 * @returns {boolean} True if successfully stored, false otherwise.
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
    return false;
  }
};

/**
 * Safely gets an item from localStorage and parses JSON.
 * @param {string} key - The localStorage key.
 * @param {*} fallback - The fallback value if key does not exist or errors.
 * @returns {*} The parsed value or the fallback.
 */
export const getItem = (key, fallback = null) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
};

/**
 * Removes an item from localStorage.
 * @param {string} key - The localStorage key.
 * @returns {boolean} True if successfully removed, false otherwise.
 */
export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
    return false;
  }
};

/**
 * Clears all items from localStorage.
 * @returns {boolean} True if successfully cleared, false otherwise.
 */
export const clearStorage = () => {
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
