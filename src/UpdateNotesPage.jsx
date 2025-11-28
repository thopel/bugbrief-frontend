import { Link } from "react-router-dom";
import { CHANGELOG } from "./changelog";

function UpdateNotesPage() {
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* HEADER */}
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#52b788]">Release Notes</h1>
          <Link to="/presentation" className="text-sm text-gray-400 hover:text-[#52b788] transition-colors underline underline-offset-4">
            Back to homepage
          </Link>
        </header>

        {/* CONTENT */}
        <div className="space-y-8 text-sm leading-relaxed bg-[#001a2e]/60 border border-[#52b788]/20 rounded-xl p-6 text-gray-200">
          {CHANGELOG.map((entry) => (
            <section key={entry.version} className="pb-6 border-b border-[#52b788]/10 last:border-0">
              <h2 className="text-[#52b788] font-semibold text-lg mb-1">
                {entry.version} – {entry.title}
              </h2>
              <p className="text-xs text-gray-400 mb-3">{entry.date}</p>

              <ul className="list-disc ml-5 space-y-1 text-gray-300">
                {entry.items.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpdateNotesPage;
