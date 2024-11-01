import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-4">
      <div className="container mx-auto flex items-center space-y-2 md:flex-row md:justify-between">
        <div className="text-lg font-bold">My web site</div>

        <div className="text-sm text-white">
          © 2024 My web site. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
