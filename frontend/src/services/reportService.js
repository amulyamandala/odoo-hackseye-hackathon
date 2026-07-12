import api from './api';

/**
 * Retrieves list of reports matching filters.
 * @param {object} params - Report list query parameters.
 * @returns {Promise<any>}
 */
export const getReports = async (params = {}) => {
  const response = await api.get('/reports', { params });
  return response.data;
};

/**
 * Retrieves detail parameters of a specific report.
 * @param {string|number} id - The unique report identifier.
 * @returns {Promise<any>}
 */
export const getReport = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

/**
 * Generates/Exports a new summary report.
 * @param {object} params - Specifications of data to export.
 * @returns {Promise<any>}
 */
export const exportReport = async (params = {}) => {
  const response = await api.post('/reports/export', params);
  return response.data;
};

/**
 * Downloads report formatted outputs (PDF, CSV).
 * @param {string|number} id - The unique report identifier.
 * @param {string} format - The export type ('csv', 'pdf').
 * @returns {Promise<any>}
 */
export const downloadReport = async (id, format = 'csv') => {
  const response = await api.get(`/reports/${id}/download`, {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
