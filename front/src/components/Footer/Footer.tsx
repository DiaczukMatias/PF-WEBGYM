import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary py-6 border-t border-secondary2">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        {/* izquierda */}
        <div className="text-sm mb-4 md:mb-0">
          © 2024 NOMBREDELGYM. All rights reserved.
        </div>

        {/* Centro */}
        <div className="flex space-x-4 text-sm mb-4 md:mb-0">
          <a href="/privacy" className="hover:text-secondary2">Privacy Policy</a>
          <a href="/terms" className="hover:text-secondary2">Terms of Service</a>
        </div>

        {/* derecha*/}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <span className="text-secondary hover:text-accent2 transition-colors duration-200">
              <FaFacebook size={20} />
            </span>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <span className="text-secondary hover:text-accent2 transition-colors duration-200">
              <FaInstagram size={20} />
            </span>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <span className="text-secondary hover:text-accent2 transition-colors duration-200">
              <FaLinkedin size={20} />
            </span>
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <span className="text-secondary hover:text-accent2 transition-colors duration-200">
              <FaPinterest size={20} />
            </span>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <span className="text-secondary hover:text-accent2 transition-colors duration-200">
              <FaTiktok size={20} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
