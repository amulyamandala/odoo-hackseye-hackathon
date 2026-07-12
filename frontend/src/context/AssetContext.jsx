import React, { createContext, useState, useContext } from 'react';
import * as assetService from '../services/assetService';

const AssetContext = createContext(null);

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAssets = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await assetService.getAssets(params);
      const list = Array.isArray(data) ? data : data.assets || [];
      setAssets(list);
      return data;
    } catch (err) {
      const errMsg = err.message || 'Failed to fetch assets.';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAsset = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await assetService.getAssetById(id);
      setSelectedAsset(data);
      return data;
    } catch (err) {
      const errMsg = err.message || 'Failed to fetch asset details.';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addAsset = async (assetData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await assetService.createAsset(assetData);
      setAssets((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      const errMsg = err.message || 'Failed to create asset.';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAsset = async (id, assetData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await assetService.updateAsset(id, assetData);
      setAssets((prev) => prev.map((asset) => (asset.id === id ? data : asset)));
      if (selectedAsset && selectedAsset.id === id) {
        setSelectedAsset(data);
      }
      return data;
    } catch (err) {
      const errMsg = err.message || 'Failed to update asset.';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeAsset = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await assetService.deleteAsset(id);
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
      if (selectedAsset && selectedAsset.id === id) {
        setSelectedAsset(null);
      }
    } catch (err) {
      const errMsg = err.message || 'Failed to delete asset.';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    assets,
    selectedAsset,
    loading,
    error,
    fetchAssets,
    fetchAsset,
    addAsset,
    updateAsset,
    removeAsset,
  };

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
};

export const useAssetContext = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssetContext must be used within an AssetProvider');
  }
  return context;
};
