// src/ArchivedReportPage.jsx
import { Link, useParams } from "react-router-dom";
import { Archive, Home } from "lucide-react";
import { useEffect, useState } from "react";

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
      <div className="max-w-2xl w-full space-y-8">
        {/* Carte principale */}
        <div className="bg-[#001a2e]/30 open:bg-[#001a2e]/60 transition-colors border border-[#52b788]/25 rounded-3xl shadow-xl p-7 backdrop-blur-sm">
          {/* En-tête */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-[#52b788]/20 border border-[#52b788]/40 flex items-center justify-center">
              <Archive className="w-6 h-6 text-[#52b788]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1">Rapport BugBrief expiré</h1>
              <p className="text-xs uppercase tracking-[0.18em] text-[#52b788]/70">Indisponible depuis le {new Date(data?.expiresAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* --- ESPACE IMAGE --- */}
          <div className="relative w-full aspect-[16/9] rounded-2xl bg-black/20 border border-[#52b788]/30 flex items-center justify-center overflow-hidden mb-6">
            {/* Je générerai cette image ensuite */}
            <img src="/assets/bugbrief-410.png" alt="Illustration rapport expiré" className="w-full object-contain opacity-95" />
          </div>

          {/* Texte explicatif */}
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              Le rapport associé à ce lien a <span className="font-semibold text-[#f4a261]">atteint sa date d’expiration</span>. Les rapports BugBrief ne sont
              conservés que pour une durée limitée afin d’optimiser le stockage et les performances du service.
            </p>

            <p>
              Une fois supprimés, <span className="font-semibold text-[#e76f51]">ils ne peuvent plus être restaurés</span> ni consultés à nouveau.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/presentation"
              className="inline-flex items-center gap-2 bg-[#52b788] hover:bg-[#3e9368] text-[#00212e] text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg hover:shadow-[#52b788]/30"
            >
              <Home className="w-4 h-4" />
              Retour à la présentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchivedReportPage;
