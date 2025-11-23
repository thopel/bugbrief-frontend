// src/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { AlertCircle, Home, Bug } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Main card */}
        <div className="bg-[#001a2e]/30 open:bg-[#001a2e]/60 transition-colors border border-[#52b788]/25 rounded-3xl shadow-xl p-7 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-[#e76f51]/15 border border-[#e76f51]/40 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[#e76f51]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1">BugBrief Report Not Found</h1>
              <p className="text-xs uppercase tracking-[0.18em] text-[#52b788]/70">Unrecognized link</p>
            </div>
          </div>

          {/* --- IMAGE AREA --- */}
          <div className="relative w-full aspect-[16/9] rounded-2xl bg-black/20 border border-[#52b788]/30 flex items-center justify-center overflow-hidden mb-6">
            {/* Replace this with the generated 404 illustration */}
            <img src="/assets/bugbrief-404.png" alt="Missing report illustration" className="w-full object-contain opacity-95" />
          </div>

          {/* Explanation text */}
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              The link you opened does not match <span className="font-semibold text-[#f4a261]">any known BugBrief report</span>. It may be a small mistake in
              the URL or an incomplete link.
            </p>

            <p>You can check if the link was shortened, modified, or cut during copy-paste, or ask the sender to generate a fresh BugBrief capture.</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/presentation"
              className="inline-flex items-center gap-2 bg-[#52b788] hover:bg-[#3e9368] text-[#00212e] text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg hover:shadow-[#52b788]/30"
            >
              <Home className="w-4 h-4" />
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
