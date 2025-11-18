// src/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { AlertCircle, Home, Bug } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Carte principale */}
        <div className="bg-[#001a2e]/30 open:bg-[#001a2e]/60 transition-colors border border-[#52b788]/25 rounded-3xl shadow-xl p-7 backdrop-blur-sm">
          {/* En-tête */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-[#e76f51]/15 border border-[#e76f51]/40 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[#e76f51]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1">Rapport BugBrief introuvable</h1>
              <p className="text-xs uppercase tracking-[0.18em] text-[#52b788]/70">Lien non reconnu</p>
            </div>
          </div>

          {/* --- ESPACE IMAGE --- */}
          <div className="relative w-full aspect-[16/9] rounded-2xl bg-black/20 border border-[#52b788]/30 flex items-center justify-center overflow-hidden mb-6">
            {/* Remplace cette image par celle que tu généreras pour la 404 */}
            <img src="/assets/bugbrief-404.png" alt="Illustration rapport introuvable" className="w-full object-contain opacity-95" />
          </div>

          {/* Texte explicatif */}
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              Le lien que tu as ouvert ne correspond à <span className="font-semibold text-[#f4a261]">aucun rapport BugBrief connu</span>. Il peut s’agir d’une
              petite erreur dans l’URL ou d’un lien incomplet.
            </p>

            <p>
              Tu peux vérifier que le lien n’a pas été raccourci, modifié ou tronqué lors d’un copier-coller, ou demander une nouvelle capture à la personne qui
              t’a envoyé ce rapport.
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

export default NotFoundPage;
