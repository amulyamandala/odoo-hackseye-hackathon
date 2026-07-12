import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page container flex items-center justify-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Card className="text-center" style={{ maxWidth: '480px', padding: '40px' }}>
        <h1 style={{ fontSize: '72px', color: 'var(--color-primary)', marginBottom: '10px' }}>404</h1>
        <h2>Page Not Found</h2>
        <p className="mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
