import { Link } from "react-router-dom";

function PresentationPage() {
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* SECTION INTRO */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Simplifie le diagnostic et la compréhension des bugs</h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            BugBrief collecte automatiquement le contexte technique d’un bug pour éviter les allers-retours et permettre aux développeurs d’aller droit à
            l’essentiel : console, réseau, environnement, localStorage, tout est centralisé.
          </p>
        </div>

        {/* SECTION 1 — 3 cartes */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gradient-to-br from-[#003049]/40 to-[#001a2e]/40 border border-[#52b788]/30 rounded-xl p-6 backdrop-blur-sm hover:border-[#52b788]/70 hover:shadow-lg hover:shadow-[#52b788]/10 transition-all duration-300">
            <div className="text-[#52b788] text-3xl font-bold mb-3">📸</div>
            <h3 className="text-white font-semibold mb-3">Capture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Le client envoie un payload complet (console, réseau, metadata, stockage) en un seul clic à l’API BugBrief.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#003049]/40 to-[#001a2e]/40 border border-[#52b788]/30 rounded-xl p-6 backdrop-blur-sm hover:border-[#52b788]/70 hover:shadow-lg hover:shadow-[#52b788]/10 transition-all duration-300">
            <div className="text-[#52b788] text-3xl font-bold mb-3">🔍</div>
            <h3 className="text-white font-semibold mb-3">Consulte</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ouvre le rapport généré grâce à son ID unique et explore les différentes sections pour comprendre précisément ce qui s’est passé.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#003049]/40 to-[#001a2e]/40 border border-[#52b788]/30 rounded-xl p-6 backdrop-blur-sm hover:border-[#52b788]/70 hover:shadow-lg hover:shadow-[#52b788]/10 transition-all duration-300">
            <div className="text-[#52b788] text-3xl font-bold mb-3">🛠</div>
            <h3 className="text-white font-semibold mb-3">Débugge</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Analyse les logs, les requêtes, les paramètres du navigateur et les données locales pour identifier rapidement l’origine du problème.
            </p>
          </div>
        </div>

        {/* SECTION — POURQUOI */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Pourquoi BugBrief ?</h2>
          <p className="text-gray-300 max-w-3xl leading-relaxed mb-4">
            Lorsqu’un bug apparaît, les utilisateurs ne savent pas toujours quoi communiquer. Côté développeurs, cela conduit à des échanges longs et souvent
            imprécis.
          </p>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            BugBrief capte automatiquement tout le contexte technique au moment du problème, de façon fiable et standardisée. Résultat : moins de questions,
            moins d’incertitudes, et une résolution plus rapide.
          </p>
        </div>

        {/* SECTION — FONCTIONNALITÉS */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Fonctionnalités principales</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🧭",
                title: "Console détaillée",
                text: "Logs complets : niveaux, messages, stacktraces, sources.",
              },
              {
                emoji: "🌐",
                title: "Requêtes réseau",
                text: "Toutes les requêtes : URL, méthode, statut, durée, payloads.",
              },
              {
                emoji: "💾",
                title: "LocalStorage",
                text: "État complet du stockage local (clé/valeur) pour comprendre le contexte.",
              },
              {
                emoji: "🖥",
                title: "Environnement du navigateur",
                text: "User agent, OS, résolution, URL active et autres paramètres utiles.",
              },
              {
                emoji: "📂",
                title: "Métadonnées",
                text: "Informations techniques essentielles liées au bug.",
              },
              {
                emoji: "⏳",
                title: "Expiration automatique",
                text: "Les rapports expirent après une durée définie pour ne pas stocker inutilement les données.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#003049]/40 to-[#001a2e]/40 border border-[#52b788]/30 rounded-xl p-6 backdrop-blur-sm hover:border-[#52b788]/70 hover:shadow-lg hover:shadow-[#52b788]/10 transition-all duration-300"
              >
                <div className="text-[#52b788] text-3xl font-bold mb-3">{item.emoji}</div>
                <h3 className="text-white font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION — COMMENT ÇA MARCHE */}
        <div className="bg-gradient-to-r from-[#003049]/60 to-[#001a2e]/60 border border-[#52b788]/40 rounded-xl p-8 backdrop-blur-sm shadow-lg mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Comment ça marche ?</h2>
          <ul className="text-gray-300 leading-relaxed space-y-3">
            <li>• L’utilisateur clique sur l’icône BugBrief en cas de bug.</li>
            <li>• L’extension collecte automatiquement le contexte technique (logs, réseau, données locales…).</li>
            <li>• Un payload JSON complet est envoyé à l’API.</li>
            <li>• Le serveur génère un lien unique vers un rapport clair et structuré.</li>
            <li>• Le développeur accède au rapport et analyse chaque partie indépendamment.</li>
          </ul>
        </div>

        {/* SECTION — ESSAYER */}
        <div className="bg-gradient-to-r from-[#003049]/60 to-[#001a2e]/60 border border-[#52b788]/40 rounded-xl p-8 backdrop-blur-sm shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Essayer maintenant</h2>
          <p className="text-gray-300 mb-8 max-w-2xl">Découvre l’interface complète en ouvrant un rapport de démonstration pré-rempli.</p>
          <Link
            to="/demo"
            className="inline-block bg-gradient-to-r from-[#52b788] to-[#40a06f] hover:from-[#40a06f] hover:to-[#2d7a56] text-[#001a2e] font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#52b788]/20"
          >
            Voir un rapport →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PresentationPage;
