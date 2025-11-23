import React from "react";
import packageJson from "../../package.json";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#000000] text-gray-400 text-sm py-4 px-6 text-center">
    <span>Version: {packageJson.version}</span>
    {" | "}
    <span>Developed by </span>
    <a href="https://thomaspelfrene.com" target="_blank" rel="noopener noreferrer" className="text-[#52b788] hover:underline">
      thomaspelfrene.com
    </a>
    {" | "}
    <Link to="/confidentiality" className="text-[#52b788] hover:underline">
      Privacy & Data
    </Link>
  </footer>
);

export default Footer;
