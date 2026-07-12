/**
 * api.js — Central Axios-like fetch wrapper
 *
 * Provides a thin HTTP client that:
 *  - Automatically prefixes all requests with the API base URL
 *  - Injects the JWT Bearer token from localStorage on every request
 *  - Normalises successful responses (returns `data` field from the server envelope)
 *  - Handles 401 Unauthorized by clearing auth state and redirecting to /login
 *  - Throws a structured error object for consistent error handling in services
 */

import env from '../config/env';

const TOKEN_KEY = 'assetflow_token';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getToken = () => localStorage.getItem(TOKEN_KEY);

const buildHeaders = (extra = {}) => {
  const headers = { 'Content-Type': 'application/json', ...extra };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const buildUrl = (path, params) => {
  let url = `${env.API_BASE_URL}${path}`;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, val);
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }
  return url;
};

const handleResponse = async (res) => {
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    // 401 → clear local token and bounce to login
    if (res.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    const message = json.message || `HTTP error ${res.status}`;
    throw { status: res.status, message, errors: json.errors || null };
  }

  // Server envelope: { success, message, data }
  return json.data !== undefined ? json.data : json;
};

// ─── HTTP methods ─────────────────────────────────────────────────────────────

const api = {
  get: (path, opts = {}) =>
    fetch(buildUrl(path, opts.params), {
      method: 'GET',
      headers: buildHeaders(opts.headers),
    }).then(handleResponse),

  post: (path, body, opts = {}) =>
    fetch(buildUrl(path, opts.params), {
      method: 'POST',
      headers: buildHeaders(opts.headers),
      body: JSON.stringify(body),
    }).then(handleResponse),

  put: (path, body, opts = {}) =>
    fetch(buildUrl(path, opts.params), {
      method: 'PUT',
      headers: buildHeaders(opts.headers),
      body: JSON.stringify(body),
    }).then(handleResponse),

  patch: (path, body, opts = {}) =>
    fetch(buildUrl(path, opts.params), {
      method: 'PATCH',
      headers: buildHeaders(opts.headers),
      body: JSON.stringify(body),
    }).then(handleResponse),

  delete: (path, opts = {}) =>
    fetch(buildUrl(path, opts.params), {
      method: 'DELETE',
      headers: buildHeaders(opts.headers),
    }).then(handleResponse),
};

export { TOKEN_KEY };
export default api;
