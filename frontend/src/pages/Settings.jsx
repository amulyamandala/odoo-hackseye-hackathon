import React, { useState } from 'react';
import { User, Bell, Shield, Palette } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import '../styles/settings.css';

const Settings = () => {
  const { user, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const [toggles, setToggles] = useState({
    emailNotifs: true,
    pushNotifs: false,
    darkMode: true,
    twoFactor: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submittingPassword, setSubmittingPassword] = useState(false);

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }

    setSubmittingPassword(true);
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordSuccess('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password. Verify current password.');
    } finally {
      setSubmittingPassword(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="animate-fade-in">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences.</p>
      </div>

      <div className="settings-content">
        <div className="settings-nav">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-panel">
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h3>Personal Information</h3>
                <div className="settings-form">
                  <div className="settings-row">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Guest User'} 
                      readOnly 
                      style={{ opacity: 0.8 }} 
                    />
                  </div>
                  <div className="settings-row">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={user?.email || ''} 
                      readOnly 
                      style={{ opacity: 0.8 }} 
                    />
                  </div>
                  <div className="settings-row">
                    <label>Role</label>
                    <input 
                      type="text" 
                      value={user?.role?.name || user?.role || 'Employee'} 
                      readOnly 
                      style={{ opacity: 0.8 }} 
                    />
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn btn-secondary" onClick={() => setActiveTab('profile')}>Reset</button>
                <button className="btn btn-primary" disabled>Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h3>Notification Preferences</h3>
                
                <div className="toggle-row">
                  <div className="toggle-label">
                    <span className="toggle-title">Email Notifications</span>
                    <span className="toggle-desc">Receive updates via email for important events</span>
                  </div>
                  <div 
                    className={`toggle-switch ${toggles.emailNotifs ? 'on' : ''}`} 
                    onClick={() => handleToggle('emailNotifs')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>

                <div className="toggle-row">
                  <div className="toggle-label">
                    <span className="toggle-title">Push Notifications</span>
                    <span className="toggle-desc">Receive push notifications in browser</span>
                  </div>
                  <div 
                    className={`toggle-switch ${toggles.pushNotifs ? 'on' : ''}`} 
                    onClick={() => handleToggle('pushNotifs')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h3>Password & Security</h3>
                
                {passwordSuccess && <div className="alert alert-success">{passwordSuccess}</div>}
                {passwordError && <div className="alert alert-danger">{passwordError}</div>}

                <form onSubmit={handlePasswordSubmit} className="settings-form" style={{ marginBottom: '2rem' }}>
                  <div className="settings-row">
                    <label>Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="settings-row">
                    <label>New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-secondary" 
                    style={{ width: 'fit-content', marginTop: '0.5rem' }}
                    disabled={submittingPassword}
                  >
                    {submittingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </form>

                <div className="toggle-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  <div className="toggle-label">
                    <span className="toggle-title">Two-Factor Authentication</span>
                    <span className="toggle-desc">Add an extra layer of security to your account</span>
                  </div>
                  <div 
                    className={`toggle-switch ${toggles.twoFactor ? 'on' : ''}`} 
                    onClick={() => handleToggle('twoFactor')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h3>Theme Settings</h3>
                
                <div className="toggle-row">
                  <div className="toggle-label">
                    <span className="toggle-title">Dark Mode</span>
                    <span className="toggle-desc">Use the dark theme for the application interface</span>
                  </div>
                  <div 
                    className={`toggle-switch ${toggles.darkMode ? 'on' : ''}`} 
                    onClick={() => handleToggle('darkMode')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
