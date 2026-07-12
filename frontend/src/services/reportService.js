import api from './api';

/**
 * Retrieves list of reports matching filters.
 * @param {object} params - Report list query parameters.
 * @returns {Promise<any>}
 */
export const getReports = async (params = {}) => {
  return api.get('/reports', { params });
};

/**
 * Retrieves detail parameters of a specific report.
 * @param {string|number} id - The unique report identifier.
 * @returns {Promise<any>}
 */
export const getReport = async (id) => {
  return api.get(`/reports/${id}`);
};

/**
 * Generates/Exports a new summary report.
 * @param {object} params - Specifications of data to export.
 * @returns {Promise<any>}
 */
export const exportReport = async (params = {}) => {
  return api.post('/reports/export', params);
};

/**
 * Downloads report formatted outputs (PDF, CSV).
 * @param {string|number} id - The unique report identifier.
 * @param {string} format - The export type ('csv', 'pdf').
 * @returns {Promise<any>}
 */
export const downloadReport = async (id, format = 'csv') => {
  return api.get(`/reports/${id}/download`, { params: { format } });
};
