import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Reusable hook to manage asset states and CRUD operations.
 */
export const useAssets = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAssets = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/assets', { params });
      const list = Array.isArray(data) ? data : data.assets || [];
      setAssets(list);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch assets');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAssetById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(`/assets/${id}`);
      setSelectedAsset(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch asset');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addAsset = useCallback(async (assetData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.post('/assets', assetData);
      setAssets((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to create asset');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAsset = useCallback(async (id, assetData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.put(`/assets/${id}`, assetData);
      setAssets((prev) => prev.map((item) => (item.id === id ? data : item)));
      if (selectedAsset && selectedAsset.id === id) {
        setSelectedAsset(data);
      }
      return data;
    } catch (err) {
      setError(err.message || 'Failed to update asset');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedAsset]);

  const deleteAsset = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/assets/${id}`);
      setAssets((prev) => prev.filter((item) => item.id !== id));
      if (selectedAsset && selectedAsset.id === id) {
        setSelectedAsset(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete asset');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedAsset]);

  return {
    assets,
    selectedAsset,
    loading,
    error,
    fetchAssets,
    fetchAssetById,
    addAsset,
    updateAsset,
    deleteAsset,
  };
};

export default useAssets;
