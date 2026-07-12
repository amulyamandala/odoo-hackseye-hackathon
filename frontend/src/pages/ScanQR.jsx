import React, { useState } from 'react';
import useAssets from '../hooks/useAssets';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';

const ScanQR = () => {
  const navigate = useNavigate();
  const { fetchAssets, loading } = useAssets();
  const [scanValue, setScanValue] = useState('');
  const [scannedAsset, setScannedAsset] = useState(null);
  const [scanError, setScanError] = useState('');

  const handleSimulateScan = async (e) => {
    e.preventDefault();
    setScanError('');
    setScannedAsset(null);

    if (!scanValue.trim()) {
      setScanError('Please enter a valid tag or QR value.');
      return;
    }

    try {
      const data = await fetchAssets({ search: scanValue.trim() });
      const list = Array.isArray(data) ? data : data.assets || [];
      const match = list.find(
        (a) => a.tag?.toLowerCase() === scanValue.trim().toLowerCase()
      );

      if (match) {
        setScannedAsset(match);
      } else {
        setScanError(`No asset found matching QR tag: "${scanValue}"`);
      }
    } catch (err) {
      setScanError('Failed to verify QR value. Please try again.');
    }
  };

  return (
    <div className="scan-qr-page container">
      <div className="mb-6">
        <h1>Scan Tracking QR Code</h1>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <Card title="Scanner Interface">
          <div className="scanner-viewfinder" style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-neutral-50)', marginBottom: '15px' }}>
            <span style={{ fontSize: '40px', marginBottom: '10px' }}>📷</span>
            <p className="text-muted">Place QR tag within frame</p>
          </div>

          <form onSubmit={handleSimulateScan}>
            <div className="form-group mb-4">
              <label htmlFor="qr-tag-input">Simulated Scanner Input (Tag Value)</label>
              <Input
                id="qr-tag-input"
                type="text"
                value={scanValue}
                onChange={(e) => setScanValue(e.target.value)}
                placeholder="Enter or paste QR code tag..."
              />
            </div>
            <Button type="submit" className="btn-primary w-full">
              Process Scan
            </Button>
          </form>
        </Card>

        <div>
          <Card title="Scanned Result">
            {loading && <Loader text="Searching asset details..." />}

            {scanError && (
              <div className="alert alert-danger text-center">
                {scanError}
              </div>
            )}

            {!loading && !scanError && !scannedAsset && (
              <div className="text-center py-6 text-muted">
                No active scan performed.
              </div>
            )}

            {scannedAsset && (
              <div className="scanned-asset-details">
                <div className="alert alert-success text-center mb-4">
                  Match Identified!
                </div>
                <h3>{scannedAsset.name}</h3>
                <p><strong>Tag:</strong> {scannedAsset.tag}</p>
                <p><strong>Status:</strong> {scannedAsset.status}</p>
                <p><strong>Location:</strong> {scannedAsset.location}</p>
                
                <Button
                  onClick={() => navigate(`/assets/${scannedAsset.id}`)}
                  className="btn-primary w-full mt-4"
                >
                  View Full Asset Details
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
