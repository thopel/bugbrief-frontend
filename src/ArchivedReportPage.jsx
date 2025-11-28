// src/ArchivedReportPage.jsx
import { Link, useParams } from "react-router-dom";
import { Archive, Home } from "lucide-react";
import { useEffect, useState } from "react";
import History from "./components/History";

function ArchivedReportPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const r = await fetch(`https://bugbrief.thomaspelfrene.com/api/get_report.php?id=${encodeURIComponent(id)}`);
      setData(await r.json());
    }
    fetchData();
  }, [id]);

  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100 flex items-center justify-center px-4">
      <History current={null} />
      <div className="max-w-2xl w-full space-y-8">
        {/* Main Card */}
        <div className="bg-[#001a2e]/30 open:bg-[#001a2e]/60 transition-colors border border-[#52b788]/25 rounded-3xl shadow-xl p-7 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-[#52b788]/20 border border-[#52b788]/40 flex items-center justify-center">
              <Archive className="w-6 h-6 text-[#52b788]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1">Expired BugBrief Report</h1>
              <p className="text-xs uppercase tracking-[0.18em] text-[#52b788]/70">Unavailable since {new Date(data?.expiresAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* --- IMAGE AREA --- */}
          <div className="relative w-full aspect-[16/9] rounded-2xl bg-black/20 border border-[#52b788]/30 flex items-center justify-center overflow-hidden mb-6">
            {/* I will generate this image afterwards */}
            <img src="/assets/bugbrief-410.png" alt="Expired report illustration" className="w-full object-contain opacity-95" />
          </div>

          {/* Explanation Text */}
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              The report associated with this link has <span className="font-semibold text-[#f4a261]">reached its expiration date</span>. BugBrief reports are
              only kept for a limited time to optimize storage and service performance.
            </p>

            <p>
              Once deleted, <span className="font-semibold text-[#e76f51]">they cannot be restored</span> or accessed again.
            </p>
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

export default ArchivedReportPage;
