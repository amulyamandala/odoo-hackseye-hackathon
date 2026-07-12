/**
 * API Timeout duration in milliseconds.
 * @type {number}
 */
export const API_TIMEOUT = 10000;

/**
 * Pagination defaults.
 * @type {object}
 */
export const PAGINATION_DEFAULTS = {
  LIMIT: 10,
  PAGE: 1,
};

/**
 * Common Date Formats.
 * @type {object}
 */
export const DATE_FORMATS = {
  DISPLAY: 'YYYY-MM-DD',
  DISPLAY_LONG: 'MMMM D, YYYY',
};

/**
 * Common Resource Status Values.
 * @type {object}
 */
export const STATUS_VALUES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DRAFT: 'draft',
};

/**
 * Common system message templates.
 * @type {object}
 */
export const COMMON_MESSAGES = {
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  ERROR_NETWORK: 'Network connection issue. Please check your internet.',
  SUCCESS_GENERIC: 'Operation completed successfully.',
};

/**
 * Reusable Local Storage Keys.
 * @type {object}
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  SETTINGS: 'settings',
  THEME: 'theme',
};
