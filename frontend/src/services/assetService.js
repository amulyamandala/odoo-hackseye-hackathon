import api from './api';

/**
 * Retrieves list of assets matching query parameters.
 * @param {object} params - Search and pagination filters.
 * @returns {Promise<any>}
 */
export const getAssets = async (params = {}) => {
  const response = await api.get('/assets', { params });
  return response.data;
};

/**
 * Retrieves details of a specific asset by ID.
 * @param {string|number} id - The unique asset identifier.
 * @returns {Promise<any>}
 */
export const getAssetById = async (id) => {
  const response = await api.get(`/assets/${id}`);
  return response.data;
};

/**
 * Registers a new asset in the system database.
 * @param {object} data - The asset values to create.
 * @returns {Promise<any>}
 */
export const createAsset = async (data) => {
  const response = await api.post('/assets', data);
  return response.data;
};

/**
 * Updates properties of an existing asset.
 * @param {string|number} id - The unique asset identifier.
 * @param {object} data - The asset properties to update.
 * @returns {Promise<any>}
 */
export const updateAsset = async (id, data) => {
  const response = await api.put(`/assets/${id}`, data);
  return response.data;
};

/**
 * Deletes an asset record from inventory.
 * @param {string|number} id - The unique asset identifier.
 * @returns {Promise<any>}
 */
export const deleteAsset = async (id) => {
  const response = await api.delete(`/assets/${id}`);
  return response.data;
};
