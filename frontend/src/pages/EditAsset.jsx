import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAssets from '../hooks/useAssets';
import AssetForm from '../components/asset/AssetForm';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedAsset, loading, error, fetchAssetById, updateAsset } = useAssets();

  useEffect(() => {
    if (id) {
      fetchAssetById(id);
    }
  }, [id, fetchAssetById]);

  const handleSubmit = async (formData) => {
    try {
      await updateAsset(id, formData);
      navigate(`/assets/${id}`);
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

  if (loading && !selectedAsset) {
    return (
      <div className="container text-center py-10">
        <Loader text="Loading asset data..." />
      </div>
    );
  }

  if (error || !selectedAsset) {
    return (
      <div className="container py-10">
        <div className="alert alert-danger">
          {error || 'Unable to load asset for editing.'}
        </div>
        <Button onClick={() => navigate('/assets')} className="btn-secondary">
          Back to Assets
        </Button>
      </div>
    );
  }

  return (
    <div className="edit-asset-page container">
      <div className="mb-6">
        <h1>Edit Asset</h1>
      </div>

      <Card>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <Loader text="Saving changes..." />}

        <AssetForm
          initialData={selectedAsset}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/assets/${id}`)}
          isEditMode={true}
          validate={validate}
        />
      </Card>
    </div>
  );
};

export default EditAsset;
