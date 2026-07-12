/**
 * storage.js — Safe localStorage wrapper with JSON serialization
 *
 * Provides get / set / remove / clear with:
 *  - Automatic JSON.stringify / JSON.parse
 *  - try/catch for SSR or private-browsing safety
 *  - TTL (time-to-live) support for expirable cache entries
 *  - Namespaced keys via a configurable prefix
 *
 * Usage:
 *   import storage from '../utils/storage';
 *   storage.set('user', { name: 'John' });
 *   storage.get('user');                   // { name: 'John' }
 *   storage.set('otp', '1234', 300);       // expires in 5 min
 */

const PREFIX = 'assetflow_';

// ─── Core helpers ─────────────────────────────────────────────────────────────

const prefixKey = (key) => (key.startsWith(PREFIX) ? key : `${PREFIX}${key}`);

const isLocalStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// ─── Public API ───────────────────────────────────────────────────────────────

const storage = {
  /**
   * Store a value in localStorage.
   * @param {string}  key    - Storage key (auto-prefixed)
   * @param {*}       value  - Any JSON-serializable value
   * @param {number} [ttlSeconds] - Optional TTL in seconds
   * @returns {boolean}
   */
  set: (key, value, ttlSeconds) => {
    if (!isLocalStorageAvailable()) return false;
    try {
      const entry = { value };
      if (ttlSeconds) {
        entry.expiry = Date.now() + ttlSeconds * 1000;
      }
      window.localStorage.setItem(prefixKey(key), JSON.stringify(entry));
      return true;
    } catch (error) {
      console.error(`[storage.set] Error saving "${key}":`, error);
      return false;
    }
  },

  /**
   * Retrieve a value from localStorage.
   * Returns the fallback if the key doesn't exist or is expired.
   * @param {string} key       - Storage key (auto-prefixed)
   * @param {*}      [fallback=null] - Fallback value
   * @returns {*}
   */
  get: (key, fallback = null) => {
    if (!isLocalStorageAvailable()) return fallback;
    try {
      const raw = window.localStorage.getItem(prefixKey(key));
      if (raw === null) return fallback;

      const entry = JSON.parse(raw);

      // Handle legacy non-envelope values (plain strings stored directly)
      if (entry && typeof entry === 'object' && 'value' in entry) {
        // Check TTL
        if (entry.expiry && Date.now() > entry.expiry) {
          storage.remove(key);
          return fallback;
        }
        return entry.value;
      }

      // Legacy: stored without envelope (e.g. by authService.login)
      return entry;
    } catch (error) {
      console.error(`[storage.get] Error reading "${key}":`, error);
      return fallback;
    }
  },

  /**
   * Remove a single key from localStorage.
   * @param {string} key
   * @returns {boolean}
   */
  remove: (key) => {
    if (!isLocalStorageAvailable()) return false;
    try {
      window.localStorage.removeItem(prefixKey(key));
      return true;
    } catch (error) {
      console.error(`[storage.remove] Error removing "${key}":`, error);
      return false;
    }
  },

  /**
   * Check whether a key exists and is not expired.
   * @param {string} key
   * @returns {boolean}
   */
  has: (key) => {
    return storage.get(key) !== null;
  },

  /**
   * Clear ALL assetflow-prefixed keys (leaves other apps' data untouched).
   * @returns {boolean}
   */
  clear: () => {
    if (!isLocalStorageAvailable()) return false;
    try {
      const keysToRemove = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(PREFIX)) keysToRemove.push(k);
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
      return true;
    } catch (error) {
      console.error('[storage.clear] Error:', error);
      return false;
    }
  },

  /**
   * Return all assetflow-prefixed entries as a plain object.
   * Useful for debugging.
   * @returns {object}
   */
  dump: () => {
    if (!isLocalStorageAvailable()) return {};
    const result = {};
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        result[k.replace(PREFIX, '')] = storage.get(k.replace(PREFIX, ''));
      }
    }
    return result;
  },
};

// Also export the individual functions for backwards-compatibility
// with the teammate's original named-export API
export const setItem      = (key, value) => storage.set(key, value);
export const getItem      = (key, fallback) => storage.get(key, fallback);
export const removeItem   = (key) => storage.remove(key);
export const clearStorage = () => storage.clear();

export default storage;
