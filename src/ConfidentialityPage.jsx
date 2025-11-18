import { Link } from "react-router-dom";

function ConfidentialityPage() {
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* HEADER */}
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#52b788]">Confidentialité & Données</h1>
          <Link to="/presentation" className="text-sm text-gray-400 hover:text-[#52b788] transition-colors underline underline-offset-4">
            Retour à la présentation
          </Link>
        </header>

        {/* CONTENT */}
        <div className="space-y-8 text-sm leading-relaxed text-gray-200 bg-[#001a2e]/60 border border-[#52b788]/20 rounded-xl p-6">
          {/* INTRO */}
          <p>
            BugBrief a été conçu pour faciliter le diagnostic des bugs tout en restant simple, transparent et respectueux des données. Cette page explique
            clairement ce qui est collecté, pourquoi, et comment les rapports sont gérés.
          </p>

          {/* SECTION : CE QUI EST COLLECTÉ */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Données collectées</h2>
            <p>BugBrief enregistre uniquement les éléments techniques nécessaires pour comprendre un comportement anormal sur une page web :</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>Console JavaScript (messages, erreurs, avertissements)</li>
              <li>Requêtes réseau (URL, méthode, statut, durée, payload)</li>
              <li>Contenu du localStorage (avec masquage automatique des clés sensibles)</li>
              <li>Métadonnées techniques : URL active, user agent, langue, fuseau horaire, horodatage</li>
              <li>Informations sur l’onglet (titre, visibilité, état général)</li>
            </ul>
          </section>

          {/* SECTION : CE QUI N'EST PAS COLLECTÉ */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Ce qui n&apos;est jamais collecté</h2>
            <p>Aucune donnée personnelle ou sensible n’est capturée intentionnellement. En particulier :</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>Mot de passe, email, numéro de carte, identité ou informations privées</li>
              <li>Contenu de formulaire ou message écrit par l’utilisateur</li>
              <li>Données externes ou système non liées à la page web</li>
              <li>Cookies contenant des tokens sensibles</li>
            </ul>
            <p className="mt-2">Le système détecte automatiquement les clés à risque dans le localStorage afin de les masquer ou les supprimer du rapport.</p>
          </section>

          {/* SECTION : STOCKAGE */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Stockage temporaire</h2>
            <p>Les rapports sont stockés pour une durée limitée (par exemple 30 jours), puis supprimés automatiquement. Cette durée courte permet :</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>d’éviter une accumulation inutile</li>
              <li>de garder un service rapide et léger</li>
            </ul>
          </section>

          {/* SECTION : SÉCURITÉ */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Sécurité & accès</h2>
            <p>
              Chaque rapport possède un identifiant unique généré de manière aléatoire. BugBrief ne partage rien automatiquement : seule une personne possédant
              le lien peut consulter le rapport.
            </p>
            <p className="mt-2">Les rapports ne sont ni revendus, ni analysés, ni transmis à des tiers.</p>
          </section>

          {/* SECTION : PARTAGE */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Partage des liens</h2>
            <p>Comme les liens sont accessibles à toute personne les possédant, il est conseillé de ne les transmettre qu’à des personnes de confiance :</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>Développeurs</li>
              <li>Support technique</li>
              <li>Équipes produit</li>
            </ul>
          </section>

          {/* SECTION : BONNES PRATIQUES */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Bonnes pratiques</h2>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>Éviter de partager un lien sur un espace public</li>
              <li>Supprimer manuellement un rapport si vous ne souhaitez plus qu’il soit consultable</li>
              <li>S’assurer que le rapport ne contient pas d’informations métier sensibles</li>
            </ul>
          </section>

          {/* SECTION : CONTACT */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Besoin d’aide ?</h2>
            <p>
              Pour toute question concernant la confidentialité, la suppression des rapports ou la gestion de vos données, contactez votre administrateur ou
              l’équipe responsable de BugBrief dans votre organisation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ConfidentialityPage;
