import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '1.5rem 2rem', 
      borderTop: '1px solid var(--border-color)', 
      color: 'var(--text-muted)',
      fontSize: '0.85rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto'
    }}>
      <div>
        &copy; {new Date().getFullYear()} AssetFlow. All rights reserved.
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
        <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
