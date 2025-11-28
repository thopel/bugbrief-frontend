import { Link, useLocation, matchPath } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const hasId = location.pathname.length > 20;

  const openHistory = () => {
    window.dispatchEvent(new Event("bugbrief:history-open"));
  };

  return (
    <div className="h-[66px] border-b border-[#52b788]/20 bg-[#002f48] backdrop-blur-md bg-opacity-30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex gap-2">
          {/* Bouton historique visible seulement si l'URL matche "/:id" */}
          {hasId && (
            <button
              type="button"
              onClick={openHistory}
              className="bg-[#001a2e]/80 border border-[#52b788]/40 rounded-full p-2 shadow-lg hover:bg-[#003049]/80 transition-colors flex items-center gap-2 1xl:hidden"
            >
              <Clock className="w-4 h-4 text-[#52b788]" />
              <ChevronRight className="w-4 h-4 text-[#52b788]" />
            </button>
          )}

          <Link to="/presentation" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-bold text-[#52b788]">BugBrief</span>
          </Link>
        </div>

        <Link to="/presentation" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#52b788] transition-colors">
          <span>What is a BugBrief?</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
