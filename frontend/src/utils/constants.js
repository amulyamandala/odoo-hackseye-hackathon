/**
 * constants.js — Application-wide constants for AssetFlow
 *
 * Central source of truth for enums, config values, labels, and messages.
 * Import specific groups as needed:
 *   import { ROLES, ASSET_STATUS, STORAGE_KEYS } from '../utils/constants';
 */

// ─── API & Network ────────────────────────────────────────────────────────────

/** API request timeout in milliseconds. */
export const API_TIMEOUT = 10000;

/** Default pagination values used by list endpoints. */
export const PAGINATION_DEFAULTS = {
  LIMIT: 10,
  PAGE: 1,
};

// ─── Date Formats ─────────────────────────────────────────────────────────────

export const DATE_FORMATS = {
  DISPLAY:       'YYYY-MM-DD',
  DISPLAY_LONG:  'MMMM D, YYYY',
  DISPLAY_SHORT: 'MMM D',
  DATETIME:      'YYYY-MM-DD HH:mm',
  TIME:          'HH:mm',
  ISO:           'YYYY-MM-DDTHH:mm:ssZ',
};

// ─── Roles (mirrors backend src/constants/roles) ─────────────────────────────

export const ROLES = {
  ADMIN:           'Admin',
  ASSET_MANAGER:   'Asset Manager',
  DEPARTMENT_HEAD: 'Department Head',
  EMPLOYEE:        'Employee',
};

/** Flat list for dropdowns / selects. */
export const ROLE_OPTIONS = Object.values(ROLES).map((r) => ({ label: r, value: r }));

// ─── Asset Status ─────────────────────────────────────────────────────────────

export const ASSET_STATUS = {
  AVAILABLE:   'Available',
  ALLOCATED:   'Allocated',
  MAINTENANCE: 'Maintenance',
  RETIRED:     'Retired',
  LOST:        'Lost',
};

export const ASSET_STATUS_OPTIONS = Object.values(ASSET_STATUS).map((s) => ({ label: s, value: s }));

// ─── Allocation / Transfer / Booking Status ───────────────────────────────────

export const REQUEST_STATUS = {
  PENDING:   'Pending',
  APPROVED:  'Approved',
  REJECTED:  'Rejected',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const REQUEST_STATUS_OPTIONS = Object.values(REQUEST_STATUS).map((s) => ({ label: s, value: s }));

// ─── Maintenance Priority ─────────────────────────────────────────────────────

export const MAINTENANCE_PRIORITY = {
  LOW:      'Low',
  MEDIUM:   'Medium',
  HIGH:     'High',
  CRITICAL: 'Critical',
};

// ─── Audit Condition ──────────────────────────────────────────────────────────

export const AUDIT_CONDITION = {
  GOOD:     'Good',
  FAIR:     'Fair',
  POOR:     'Poor',
  MISSING:  'Missing',
};

// ─── Notification Types ───────────────────────────────────────────────────────

export const NOTIFICATION_TYPES = {
  ALLOCATION:  'allocation',
  TRANSFER:    'transfer',
  BOOKING:     'booking',
  MAINTENANCE: 'maintenance',
  AUDIT:       'audit',
  SYSTEM:      'system',
};

// ─── Status → CSS class mapping (for badge styling) ──────────────────────────

export const STATUS_CSS_MAP = {
  Approved:    'status-approved',
  Active:      'status-active',
  Available:   'status-approved',
  Pending:     'status-pending',
  Rejected:    'status-rejected',
  Maintenance: 'status-maintenance',
  Retired:     'status-rejected',
  Completed:   'status-active',
};

// ─── LocalStorage Keys ───────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  TOKEN:     'assetflow_token',
  USER:      'assetflow_user',
  THEME:     'assetflow_theme',
  SETTINGS:  'assetflow_settings',
  SIDEBAR:   'assetflow_sidebar_collapsed',
};

// ─── API Route Prefixes ──────────────────────────────────────────────────────

export const API_ROUTES = {
  AUTH:              '/auth',
  DEPARTMENTS:       '/departments',
  EMPLOYEES:         '/employees',
  ROLES:             '/roles',
  ASSETS:            '/assets',
  ASSET_CATEGORIES:  '/asset-categories',
  ALLOCATIONS:       '/allocations',
  TRANSFERS:         '/transfers',
  BOOKINGS:          '/bookings',
  MAINTENANCE:       '/maintenance',
  AUDITS:            '/audits',
  NOTIFICATIONS:     '/notifications',
  ACTIVITY_LOGS:     '/activity-logs',
  REPORTS:           '/reports',
};

// ─── Messages ─────────────────────────────────────────────────────────────────

export const MESSAGES = {
  // Generic
  ERROR_GENERIC:    'Something went wrong. Please try again.',
  ERROR_NETWORK:    'Network connection issue. Please check your internet.',
  SUCCESS_GENERIC:  'Operation completed successfully.',

  // Auth
  LOGIN_SUCCESS:    'Welcome back!',
  LOGIN_FAILED:     'Invalid email or password.',
  LOGOUT_SUCCESS:   'You have been signed out.',
  SESSION_EXPIRED:  'Your session has expired. Please sign in again.',
  UNAUTHORIZED:     'You do not have permission to perform this action.',

  // CRUD
  CREATED:          'Record created successfully.',
  UPDATED:          'Record updated successfully.',
  DELETED:          'Record deleted successfully.',
  NOT_FOUND:        'The requested resource was not found.',

  // Validation
  REQUIRED_FIELD:   'This field is required.',
  INVALID_EMAIL:    'Please enter a valid email address.',
  PASSWORD_MIN:     'Password must be at least 8 characters.',
  PASSWORD_MISMATCH:'Passwords do not match.',
};

/** Common Resource Status Values. */
export const STATUS_VALUES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DRAFT: 'draft',
};

/** Common system message templates. */
export const COMMON_MESSAGES = {
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  ERROR_NETWORK: 'Network connection issue. Please check your internet.',
  SUCCESS_GENERIC: 'Operation completed successfully.',
};
