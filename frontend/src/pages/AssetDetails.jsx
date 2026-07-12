import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAssets from '../hooks/useAssets';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import QRCodeCard from '../components/asset/QRCodeCard';

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedAsset, loading, error, fetchAssetById, deleteAsset } = useAssets();

  useEffect(() => {
    if (id) {
      fetchAssetById(id);
    }
  }, [id, fetchAssetById]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await deleteAsset(id);
        navigate('/assets');
      } catch (err) {
        // Error is handled by hook
      }
    }
  };

  const handleDownloadQR = (val) => {
    console.log(`Downloading QR Code for: ${val}`);
  };

  const handlePrintQR = (val) => {
    console.log(`Printing QR Code for: ${val}`);
  };

  if (loading) {
    return (
      <div className="container text-center py-10">
        <Loader text="Loading asset details..." />
      </div>
    );
  }

  if (error || !selectedAsset) {
    return (
      <div className="container py-10">
        <div className="alert alert-danger">
          {error || 'Asset not found or has been deleted.'}
        </div>
        <Button onClick={() => navigate('/assets')} className="btn-secondary">
          Back to Assets
        </Button>
      </div>
    );
  }

  return (
    <div className="asset-details-page container">
      <div className="flex justify-between items-center mb-6">
        <h1>Asset Details</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/assets/${id}/edit`)} className="btn-secondary">
            Edit
          </Button>
          <Button onClick={handleDelete} className="btn-danger" style={{ backgroundColor: 'var(--color-danger)', color: 'var(--text-on-primary)' }}>
            Delete
          </Button>
          <Button onClick={() => navigate('/assets')} className="btn-secondary">
            Back
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <Card title="General Information">
            <div className="detail-group mb-4">
              <strong>Name:</strong>
              <p>{selectedAsset.name || 'N/A'}</p>
            </div>
            <div className="detail-group mb-4">
              <strong>Tag:</strong>
              <p>{selectedAsset.tag || 'N/A'}</p>
            </div>
            <div className="detail-group mb-4">
              <strong>Category:</strong>
              <p>{selectedAsset.category || 'N/A'}</p>
            </div>
            <div className="detail-group mb-4">
              <strong>Status:</strong>
              <p>{selectedAsset.status || 'N/A'}</p>
            </div>
            <div className="detail-group mb-4">
              <strong>Location:</strong>
              <p>{selectedAsset.location || 'N/A'}</p>
            </div>
            <div className="detail-group mb-4">
              <strong>Description:</strong>
              <p>{selectedAsset.description || 'No description provided.'}</p>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Tracking QR">
            {selectedAsset.tag ? (
              <QRCodeCard
                qrValue={selectedAsset.tag}
                title="Asset QR Code"
                onDownload={handleDownloadQR}
                onPrint={handlePrintQR}
              />
            ) : (
              <p className="text-muted">No QR Code available (missing asset tag).</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
