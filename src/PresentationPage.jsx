import { Link } from "react-router-dom";

function PresentationPage() {
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* INTRO SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Make debugging and issue understanding easier</h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            BugBrief automatically collects the technical context of a bug to avoid back-and-forth and let developers focus on what matters: console, network,
            environment, localStorage – everything is centralized.
          </p>
        </div>

        {/* SECTION 1 — 3 CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gradient-to-br from-[#003049]/40 to-[#001a2e]/40 border border-[#52b788]/30 rounded-xl p-6 backdrop-blur-sm hover:border-[#52b788]/70 hover:shadow-lg hover:shadow-[#52b788]/10 transition-all duration-300">
            <div className="text-[#52b788] text-3xl font-bold mb-3">📸</div>
            <h3 className="text-white font-semibold mb-3">Capture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The client sends a complete payload (console, network, metadata, storage) in a single click to the BugBrief API.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#003049]/40 to-[#001a2e]/40 border border-[#52b788]/30 rounded-xl p-6 backdrop-blur-sm hover:border-[#52b788]/70 hover:shadow-lg hover:shadow-[#52b788]/10 transition-all duration-300">
            <div className="text-[#52b788] text-3xl font-bold mb-3">🔍</div>
            <h3 className="text-white font-semibold mb-3">Review</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Open the generated report using its unique ID and explore the different sections to understand exactly what happened.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#003049]/40 to-[#001a2e]/40 border border-[#52b788]/30 rounded-xl p-6 backdrop-blur-sm hover:border-[#52b788]/70 hover:shadow-lg hover:shadow-[#52b788]/10 transition-all duration-300">
            <div className="text-[#52b788] text-3xl font-bold mb-3">🛠</div>
            <h3 className="text-white font-semibold mb-3">Debug</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Analyze logs, requests, browser settings, and local data to quickly identify the root cause of the issue.
            </p>
          </div>
        </div>

        {/* SECTION — WHY */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why BugBrief?</h2>
          <p className="text-gray-300 max-w-3xl leading-relaxed mb-4">
            When a bug appears, users do not always know what to share. On the developer side, this often leads to long and imprecise exchanges.
          </p>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            BugBrief automatically captures all the technical context at the moment of the issue, in a reliable and standardized way. The result: fewer
            questions, fewer uncertainties, and faster resolution.
          </p>
        </div>

        {/* SECTION — FEATURES */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Key features</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🧭",
                title: "Detailed console",
                text: "Full logs: levels, messages, stack traces, sources.",
              },
              {
                emoji: "🌐",
                title: "Network requests",
                text: "All requests: URL, method, status, duration, payloads.",
              },
              {
                emoji: "💾",
                title: "LocalStorage",
                text: "Full local storage state (key/value) to understand the context.",
              },
              {
                emoji: "🖥",
                title: "Browser environment",
                text: "User agent, OS, resolution, active URL, and other useful parameters.",
              },
              {
                emoji: "📂",
                title: "Metadata",
                text: "Essential technical information related to the bug.",
              },
              {
                emoji: "⏳",
                title: "Automatic expiration",
                text: "Reports expire after a set period so data is not stored longer than necessary.",
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

        {/* SECTION — HOW IT WORKS */}
        <div className="bg-gradient-to-r from-[#003049]/60 to-[#001a2e]/60 border border-[#52b788]/40 rounded-xl p-8 backdrop-blur-sm shadow-lg mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">How it works</h2>
          <ul className="text-gray-300 leading-relaxed space-y-3">
            <li>• The user clicks on the BugBrief icon when a bug occurs.</li>
            <li>• The extension automatically collects the technical context (logs, network, local data…).</li>
            <li>• A complete JSON payload is sent to the API.</li>
            <li>• The server generates a unique link to a clear, structured report.</li>
            <li>• The developer opens the report and analyzes each section independently.</li>
          </ul>
        </div>

        {/* SECTION — TRY IT */}
        <div className="bg-gradient-to-r from-[#003049]/60 to-[#001a2e]/60 border border-[#52b788]/40 rounded-xl p-8 backdrop-blur-sm shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Try it now</h2>
          <p className="text-gray-300 mb-8 max-w-2xl">Explore the full interface by opening a pre-filled demo report.</p>
          <Link
            to="/demo"
            className="inline-block bg-gradient-to-r from-[#52b788] to-[#40a06f] hover:from-[#40a06f] hover:to-[#2d7a56] text-[#001a2e] font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#52b788]/20"
          >
            View a report →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PresentationPage;
