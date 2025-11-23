import { Link } from "react-router-dom";

function ConfidentialityPage() {
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* HEADER */}
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#52b788]">Privacy & Data</h1>
          <Link to="/presentation" className="text-sm text-gray-400 hover:text-[#52b788] transition-colors underline underline-offset-4">
            Back to homepage
          </Link>
        </header>

        {/* CONTENT */}
        <div className="space-y-8 text-sm leading-relaxed text-gray-200 bg-[#001a2e]/60 border border-[#52b788]/20 rounded-xl p-6">
          {/* INTRO */}
          <p>
            BugBrief is designed to simplify debugging while remaining simple, transparent, and respectful of data. This page clearly explains what is
            collected, why, and how reports are handled.
          </p>

          {/* SECTION: WHAT IS COLLECTED */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Data Collected</h2>
            <p>BugBrief records only the technical elements required to understand abnormal behavior on a web page:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>JavaScript console (messages, errors, warnings)</li>
              <li>Network requests (URL, method, status, duration, payload)</li>
              <li>localStorage content (with automatic masking of sensitive keys)</li>
              <li>Technical metadata: active URL, user agent, language, timezone, timestamp</li>
              <li>Tab information (title, visibility, general state)</li>
            </ul>
          </section>

          {/* SECTION: WHAT IS NOT COLLECTED */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">What Is Never Collected</h2>
            <p>No personal or sensitive data is intentionally captured, including:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>Password, email, card number, identity, or private information</li>
              <li>Form content or messages typed by the user</li>
              <li>External or system data not related to the web page</li>
              <li>Cookies containing sensitive tokens</li>
            </ul>
            <p className="mt-2">The system automatically detects risky localStorage keys to mask or remove them from the report.</p>
          </section>

          {/* SECTION: STORAGE */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Temporary Storage</h2>
            <p>Reports are stored for a limited time (for example, 30 days) and then automatically deleted. This short retention period helps:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>avoid unnecessary accumulation</li>
              <li>keep the service fast and lightweight</li>
            </ul>
          </section>

          {/* SECTION: SECURITY */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Security & Access</h2>
            <p>
              Each report has a unique randomly generated identifier. BugBrief never shares anything automatically: only someone with the link can view the
              report.
            </p>
            <p className="mt-2">Reports are not sold, analyzed, or transmitted to third parties.</p>
          </section>

          {/* SECTION: SHARING */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Link Sharing</h2>
            <p>Because links can be accessed by anyone who has them, it is recommended to share them only with trusted individuals:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>Developers</li>
              <li>Technical support</li>
              <li>Product teams</li>
            </ul>
          </section>

          {/* SECTION: BEST PRACTICES */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Best Practices</h2>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li>Avoid sharing a link in a public space</li>
              <li>Manually delete a report if you no longer want it accessible</li>
              <li>Ensure the report does not contain sensitive business information</li>
            </ul>
          </section>

          {/* SECTION: CONTACT */}
          <section>
            <h2 className="text-[#52b788] font-semibold text-lg mb-2">Need Help?</h2>
            <p>
              For any questions regarding privacy, report deletion, or data management, contact your administrator or the team responsible for BugBrief within
              your organization.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ConfidentialityPage;
