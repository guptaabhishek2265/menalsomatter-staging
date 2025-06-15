import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.alatreeventures.com/raffle-widget.js";
    script.onload = () => {
      if ((window as any).RaffleWidget) {
        (window as any).RaffleWidget.init({
          apiBase: "https://api.alatreeventures.com",
          userId: "rahul-test-user" // replace with dynamic user ID if available
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER (if needed) */}
      <div className="w-full bg-white shadow-md p-4 text-center text-lg font-bold text-navy-900">
        MenAlsoMatter
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        {children || <MainContent />}
      </div>

      {/* FOOTER with raffle widget */}
      <footer className="bg-white p-4 mt-auto border-t border-gray-200">
        <div id="raffle-widget" />
      </footer>
    </div>
  );
};

export default Layout;
