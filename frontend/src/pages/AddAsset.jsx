import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAssets from '../hooks/useAssets';
import AssetForm from '../components/asset/AssetForm';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';

const AddAsset = () => {
  const navigate = useNavigate();
  const { addAsset, loading, error } = useAssets();

  const handleSubmit = async (formData) => {
    try {
      const newAsset = await addAsset(formData);
      if (newAsset && newAsset.id) {
        navigate(`/assets/${newAsset.id}`);
      } else {
        navigate('/assets');
      }
    } catch (err) {
      // Error is caught by hook
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.name || !data.name.trim()) {
      errors.name = 'Asset name is required.';
    }
    if (!data.tag || !data.tag.trim()) {
      errors.tag = 'Asset tag is required.';
    }
    return errors;
  };

  return (
    <div className="add-asset-page container">
      <div className="mb-6">
        <h1>Add New Asset</h1>
      </div>

      <Card>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <Loader text="Submitting asset..." />}
        
        <AssetForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/assets')}
          validate={validate}
        />
      </Card>
    </div>
  );
};

export default AddAsset;
