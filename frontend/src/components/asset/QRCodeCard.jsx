import React from 'react';

/**
 * Reusable layout to render a barcode/QR wrapper offering print/downloads.
 */
const QRCodeCard = ({
  qrValue,
  title = 'Asset QR Code',
  onDownload,
  onPrint,
  className = '',
  ...props
}) => {
  if (!qrValue) return null;

  return (
    <div className={`custom-qr-card ${className}`} {...props}>
      <h3 className="qr-title">{title}</h3>
      <div className="qr-container">
        <svg className="qr-svg-placeholder" width="128" height="128" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h6v6H0zm1 1v4h4V1zm1 1h2v2H2zM18 0h6v6h-6zm1 1v4h4V1zm1 1h2v2h-2zM0 18h6v6H0zm1 1v4h4v-4zm1 1h2v2H2z" />
          <path d="M9 1h3v2H9zm4 0h1v1h-1zm3 1h1v1h-1zm-6 2h1v1h-1zm1 1h2v1H8zm4 0h1v1h-1zm2 1h1v1h-1zM9 8h2v2H9zm3 1h1v1h-1zm2 0h1v1h-1zm2-1h1v1h-1zm2 0h1v1h-1zM8 12h2v1H8zm3 0h1v1h-1zm3 0h1v2h-1zm2 1h1v1h-1zm3-1h1v1h-1zm-9 2h2v1h-2zm3 0h1v1h-1zm4 1h1v1h-1zM9 16h2v1H9zm4 0h1v1h-1zm2 1h1v2h-1zm3-1h1v1h-1zm-9 2h2v1h-2zm3 0h1v1h-1zm3 1h1v1h-1zm1 1h2v1h-2zm-3 1h1v1h-1z" />
        </svg>
      </div>
      <p className="qr-value-text">{qrValue}</p>
      <div className="qr-actions">
        {onDownload && (
          <button type="button" onClick={() => onDownload(qrValue)}>
            Download
          </button>
        )}
        {onPrint && (
          <button type="button" onClick={() => onPrint(qrValue)}>
            Print
          </button>
        )}
      </div>
    </div>
  );
};

export default QRCodeCard;
