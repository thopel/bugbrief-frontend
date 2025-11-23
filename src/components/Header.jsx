import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border-b border-[#52b788]/20 bg-[#002f48]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/presentation" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="font-bold text-[#52b788]">BugBrief</span>
        </Link>
        <Link to="/presentation" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#52b788] transition-colors">
          <span>What is a BugBrief?</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
