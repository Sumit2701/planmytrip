"use client"
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="text-center text-gray-600 text-sm">
          © {currentYear} TriplanIQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;