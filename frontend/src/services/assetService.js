import api from './api';

/**
 * Retrieves list of assets matching query parameters.
 * @param {object} params - Search and pagination filters.
 * @returns {Promise<any>}
 */
export const getAssets = async (params = {}) => {
  return api.get('/assets', { params });
};

/**
 * Retrieves details of a specific asset by ID.
 * @param {string|number} id - The unique asset identifier.
 * @returns {Promise<any>}
 */
export const getAssetById = async (id) => {
  return api.get(`/assets/${id}`);
};

/**
 * Registers a new asset in the system database.
 * @param {object} data - The asset values to create.
 * @returns {Promise<any>}
 */
export const createAsset = async (data) => {
  return api.post('/assets', data);
};

/**
 * Updates properties of an existing asset.
 * @param {string|number} id - The unique asset identifier.
 * @param {object} data - The asset properties to update.
 * @returns {Promise<any>}
 */
export const updateAsset = async (id, data) => {
  return api.put(`/assets/${id}`, data);
};

/**
 * Deletes an asset record from inventory.
 * @param {string|number} id - The unique asset identifier.
 * @returns {Promise<any>}
 */
export const deleteAsset = async (id) => {
  return api.delete(`/assets/${id}`);
};
