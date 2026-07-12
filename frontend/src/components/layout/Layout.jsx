import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../styles/layout.css';

const Layout = () => {
  return (
    <div className="layout-container animate-fade-in">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}>
          {/* Outlet is where the nested routes will render */}
          <div style={{ flex: 1 }}>
            <Outlet />
          </div>
          
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;
