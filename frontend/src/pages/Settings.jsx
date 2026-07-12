import React, { useState } from 'react';
import { User, Bell, Shield, Palette } from 'lucide-react';
import '../styles/settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const [toggles, setToggles] = useState({
    emailNotifs: true,
    pushNotifs: false,
    darkMode: true,
    twoFactor: false
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
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
                    <input type="text" defaultValue="John Doe" />
                  </div>
                  <div className="settings-row">
                    <label>Email Address</label>
                    <input type="email" defaultValue="john.doe@company.com" readOnly style={{ opacity: 0.7 }} />
                  </div>
                  <div className="settings-row">
                    <label>Role</label>
                    <input type="text" defaultValue="Asset Manager" readOnly style={{ opacity: 0.7 }} />
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary">Save Changes</button>
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
                
                <div className="settings-form" style={{ marginBottom: '2rem' }}>
                  <div className="settings-row">
                    <label>Current Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                  <div className="settings-row">
                    <label>New Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                  <button className="btn btn-secondary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>
                    Update Password
                  </button>
                </div>

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
