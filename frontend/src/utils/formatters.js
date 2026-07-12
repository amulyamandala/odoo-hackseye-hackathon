/**
 * Formats a date string or object into a readable format (YYYY-MM-DD or locale date string).
 * @param {Date|string|number} date - The date to format.
 * @param {string} format - The format type ('default' or 'short').
 * @returns {string} The formatted date string.
 */
export const formatDate = (date, format = 'default') => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  if (format === 'short') {
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a number to currency layout.
 * @param {number} amount - The currency value.
 * @param {string} currency - The currency type (e.g. 'USD', 'EUR').
 * @param {string} locale - The locale to apply.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  const val = Number(amount);
  if (isNaN(val)) return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(val);
};

/**
 * Formats a number with local digit groupings.
 * @param {number|string} num - The number to format.
 * @param {string} locale - The locale to apply.
 * @returns {string} The formatted number.
 */
export const formatNumber = (num, locale = 'en-US') => {
  const val = Number(num);
  if (isNaN(val)) return '';
  return new Intl.NumberFormat(locale).format(val);
};

/**
 * Formats raw file size bytes into a human-readable size label (KB, MB, GB, etc.).
 * @param {number} bytes - The number of bytes.
 * @returns {string} The formatted size label.
 */
export const formatFileSize = (bytes) => {
  const size = Number(bytes);
  if (isNaN(size) || size < 0) return '0 B';
  if (size === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Formats a date relative to now (e.g. "2 hours ago", "yesterday", "in 3 days").
 * @param {Date|string|number} date - The comparison date.
 * @returns {string} Relative time string.
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffSecs) < 60) {
    return rtf.format(diffSecs, 'second');
  } else if (Math.abs(diffMins) < 60) {
    return rtf.format(diffMins, 'minute');
  } else if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, 'hour');
  } else if (Math.abs(diffDays) < 30) {
    return rtf.format(diffDays, 'day');
  } else {
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
};
