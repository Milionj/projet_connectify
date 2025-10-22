import React from 'react';
import Navbar from './Navbar';

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
}

export default AppLayout;
