/**
 * Validates if a string is a valid email address format.
 * @param {string} val - The email string to validate.
 * @returns {boolean} True if valid email, false otherwise.
 */
export const isEmail = (val) => {
  if (typeof val !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(val);
};

/**
 * Validates if a string is a valid phone number format.
 * @param {string} val - The phone string to validate.
 * @returns {boolean} True if valid phone, false otherwise.
 */
export const isPhoneNumber = (val) => {
  if (typeof val !== 'string') return false;
  const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
  return phoneRegex.test(val);
};

/**
 * Validates if a value is not empty or null.
 * @param {*} val - The value to check.
 * @returns {boolean} True if value is present, false otherwise.
 */
export const isRequired = (val) => {
  if (val === null || val === undefined) return false;
  if (typeof val === 'string') return val.trim().length > 0;
  if (Array.isArray(val)) return val.length > 0;
  return true;
};

/**
 * Validates if a string's length is at least the specified minimum.
 * @param {string} val - The string to check.
 * @param {number} min - The minimum length.
 * @returns {boolean} True if valid, false otherwise.
 */
export const minLength = (val, min) => {
  if (typeof val !== 'string') return false;
  return val.length >= min;
};

/**
 * Validates if a string's length is at most the specified maximum.
 * @param {string} val - The string to check.
 * @param {number} max - The maximum length.
 * @returns {boolean} True if valid, false otherwise.
 */
export const maxLength = (val, max) => {
  if (typeof val !== 'string') return false;
  return val.length <= max;
};

/**
 * Validates if a value is a positive number.
 * @param {*} val - The value to validate.
 * @returns {boolean} True if valid positive number, false otherwise.
 */
export const isPositiveNumber = (val) => {
  const num = Number(val);
  return !isNaN(num) && num > 0;
};
