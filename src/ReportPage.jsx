import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AlertCircle, Archive, ChevronDown, ChevronUp, Home } from "lucide-react";
import NotFoundPage from "./NotFoundPage.jsx";

// ---------- TABS ----------
const TABS = [
  { id: "apercu", label: "Aperçu" },
  { id: "console", label: "Console" },
  { id: "reseau", label: "Réseau" },
  { id: "localstorage", label: "LocalStorage" },
  { id: "meta", label: "Métadonnées" },
];

// ---------- DEMO DATA ----------
const DEMO_BUGBRIEF = {
  id: "demo-ORISIS-Dashboard-123",
  title: "Erreur sur la page Dashboard",
  timestamp: new Date().toISOString(),
  url: "https://bugbrief.thomaspelfrene.com/Dashboard",
  sizeBytes: 28950,
  ip: "198.51.100.77",
  createdAt: new Date().toISOString(),
  expiresAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),

  meta: {
    url: "https://bugbrief.thomaspelfrene.com/Dashboard",
    title: "BugBrief Demo",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/143.0.1.0",
    lang: "fr-FR",
    time: new Date().toISOString(),
    source: "bugbrief-demo",
  },

  console: [
    {
      t: 1763128569538,
      level: "error",
      text: "ReferenceError: totalStats is not defined",
      args: [
        {
          __isError: true,
          name: "ReferenceError",
          message: "totalStats is not defined",
          stack:
            "ReferenceError: totalStats is not defined\n    at mounted (https://bugbrief.thomaspelfrene.com/assets/app.js:10:5221)\n    at callHook (https://bugbrief.thomaspelfrene.com/assets/app.js:3:11802)",
        },
      ],
    },
    {
      t: 1763128569600,
      level: "log",
      text: "Chargement des stats du dashboard…",
      args: [],
    },
    {
      t: 1763128569800,
      level: "log",
      text: "Dashboard chargé avec succès",
      args: [],
    },
  ],

  network: [
    {
      t: 1763128553604,
      kind: "xhr",
      method: "GET",
      url: "https://api-demo.example.com/Dashboard/GetStats",
      status: 200,
      statusText: "OK",
      durationMs: 98.2,
      error: null,
      request: {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer ***fake-demo-token***",
        },
        body: null,
      },
      response: {
        headersRaw: "content-type: application/json; charset=utf-8\r\n",
        body: JSON.stringify(
          {
            users: 42,
            institutions: 7,
            alerts: 3,
            systemLoad: 12,
          },
          null,
          2
        ),
      },
      perf: {
        startTime: 15491.3,
        responseStart: null,
        responseEnd: 15560.1,
        duration: 68.8,
        transferSize: null,
        encodedBodySize: null,
        decodedBodySize: null,
        nextHopProtocol: "h2",
        initiatorType: "xmlhttprequest",
      },
    },
  ],

  localStorage: [
    {
      key: "activeTab",
      sizeBytes: 9,
      sensitive: false,
      isJson: false,
      raw: "overview",
      parsed: null,
    },
    {
      key: "returnUrl",
      sizeBytes: 62,
      sensitive: false,
      isJson: false,
      raw: "https://bugbrief.thomaspelfrene.com/Dashboard",
      parsed: null,
    },
    {
      key: "userToken",
      sizeBytes: 180,
      sensitive: true,
      isJson: false,
      raw: "*******************************************************************",
      parsed: null,
    },
    {
      key: "appSettings",
      sizeBytes: 220,
      sensitive: false,
      isJson: true,
      raw: JSON.stringify(
        {
          theme: "light",
          language: "fr",
          notifications: {
            email: false,
            push: true,
          },
          lastVisitedPage: "/Dashboard",
        },
        null,
        2
      ),
      parsed: {
        theme: "light",
        language: "fr",
        notifications: {
          email: false,
          push: true,
        },
        lastVisitedPage: "/Dashboard",
      },
    },
  ],
};

// ---------- COMPOSANTS UTILITAIRES ----------
function InfoCard({ label, value }) {
  return (
    <div className="bg-[#001a2e]/60 border border-[#52b788]/20 rounded-lg p-4">
      <div className="text-xs text-[#52b788]/70 font-semibold uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm text-gray-200 truncate font-medium">{value}</div>
    </div>
  );
}

function Badge({ children, className = "" }) {
  return <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md border ${className}`}>{children}</span>;
}

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-xs font-medium px-3 py-1.5 rounded-md border border-[#52b788]/40 text-[#52b788] hover:bg-[#52b788]/10 hover:border-[#52b788]/70 transition-colors"
    >
      {children}
    </button>
  );
}

// ---------- PAGE PRINCIPALE ----------
export default function ReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState("apercu");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [archived, setArchived] = useState(false);

  // FETCH
  useEffect(() => {
    let stop = false;
    setErr(null);
    setNotFound(false);
    setArchived(false);
    setLoading(true);
    setData(null);

    if (!id) {
      setNotFound(true);
      setArchived(false);
      setLoading(false);
      return () => {
        stop = true;
      };
    }

    // Mode démo
    if (id === "demo") {
      setData(DEMO_BUGBRIEF);
      setLoading(false);
      return () => {
        stop = true;
      };
    }

    (async () => {
      try {
        const r = await fetch(`https://bugbrief.thomaspelfrene.com/api/get_report.php?id=${encodeURIComponent(id)}`);

        // On essaie de lire le JSON, même en cas d'erreur HTTP
        let payload = null;
        try {
          payload = await r.json();
        } catch {
          // pas de JSON / corps vide
        }

        // Cas HTTP non OK
        if (!r.ok) {
          const apiError = payload?.error;

          // archived => on redirige vers la page d'archive
          if (apiError === "archived") {
            if (!stop) {
              navigate(`/archived/${encodeURIComponent(id)}`, { replace: true });
            }
            return;
          }

          // invalid_id ou not_found => on affiche la page 404 rapport introuvable
          if (apiError === "invalid_id" || apiError === "not_found") {
            if (!stop) {
              setNotFound(true);
              setData(null);
            }
            return;
          }

          let msg = apiError || `HTTP ${r.status}`;
          throw new Error(msg);
        }

        // OK HTTP, on récupère le rapport
        const rep = (payload && (payload.report || payload)) || null;

        if (!rep) {
          throw new Error("Réponse API invalide");
        }

        if (!stop) setData(rep);
      } catch (e) {
        if (!stop) setErr(e.message || "Erreur de chargement");
      } finally {
        if (!stop) setLoading(false);
      }
    })();

    return () => {
      stop = true;
    };
  }, [id]);

  // Raccourcis clavier pour changer d’onglet
  useEffect(() => {
    const onKey = (e) => {
      if (!e.ctrlKey) return;
      const idx = TABS.findIndex((t) => t.id === tab);
      if (e.key === "ArrowRight") setTab(TABS[(idx + 1) % TABS.length].id);
      if (e.key === "ArrowLeft") setTab(TABS[(idx - 1 + TABS.length) % TABS.length].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab]);

  const MAX_BODY_PREVIEW = 4000;

  const pretty = (val) => {
    if (val == null) return "";
    if (typeof val === "string") {
      try {
        return JSON.stringify(JSON.parse(val), null, 2);
      } catch {
        return val;
      }
    }
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return String(val);
    }
  };

  const truncate = (str, n = MAX_BODY_PREVIEW) => (typeof str === "string" && str.length > n ? str.slice(0, n) + "\n…" : str);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text ?? "");
    } catch {
      // ignore
    }
  };

  // ⚠️ useMemo AVANT tout return conditionnel
  const content = useMemo(() => {
    if (!data) return null;

    switch (tab) {
      // ---------- APERÇU ----------
      case "apercu":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{data.title || `BugBrief ${data.id}`}</h3>
              {data.timestamp && <p className="text-sm text-[#52b788]/60">{new Date(data.timestamp).toLocaleString()}</p>}
            </div>

            {data.url && (
              <div className="bg-[#001a2e]/40 border border-[#52b788]/20 rounded-lg p-4">
                <div className="text-xs text-[#52b788]/70 font-semibold uppercase tracking-wider mb-2">URL</div>
                <a href={data.url} target="_blank" rel="noreferrer" className="text-[#52b788] hover:text-[#40a06f] break-all transition-colors text-sm">
                  {data.url}
                </a>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <InfoCard label="Taille" value={`${data.sizeBytes || 0} octets`} />
              <InfoCard label="IP" value={data.ip || "—"} />
              <InfoCard label="Créé le" value={data.createdAt ? new Date(data.createdAt).toLocaleString() : "—"} />
              <InfoCard
                label="Expire le"
                value={
                  data.expiresAt
                    ? `${new Date(data.expiresAt).toLocaleDateString("fr-FR")} (${Math.max(
                        0,
                        Math.ceil((new Date(data.expiresAt) - new Date()) / (1000 * 60 * 60 * 24))
                      )} jour${Math.max(0, Math.ceil((new Date(data.expiresAt) - new Date()) / (1000 * 60 * 60 * 24))) > 1 ? "s" : ""})`
                    : "—"
                }
              />
            </div>
          </div>
        );

      // ---------- CONSOLE ----------
      case "console":
        return Array.isArray(data.console) && data.console.length ? (
          <div className="space-y-2">
            {data.console.map((c, i) => {
              const level = c.level || "log";
              const mainText = c.msg ?? c.text ?? "";
              const hasArgs = Array.isArray(c.args) && c.args.length > 0;
              const firstArg = hasArgs ? c.args[0] : null;
              const isErrorObj = firstArg && firstArg.__isError;

              return (
                <div
                  key={i}
                  className={`font-mono text-xs px-3 py-2 rounded-lg border-l-2 ${
                    level === "error"
                      ? "border-red-500/50 bg-red-950/30 text-red-400"
                      : level === "warn"
                      ? "border-yellow-500/50 bg-yellow-950/30 text-yellow-400"
                      : "border-[#52b788]/50 bg-[#52b788]/10 text-gray-300"
                  }`}
                >
                  <span className="text-gray-500 mr-2">[{level.toUpperCase()}]</span>
                  <span>{mainText || (isErrorObj ? `${firstArg.name}: ${firstArg.message}` : "")}</span>

                  {hasArgs && (
                    <details className="mt-1">
                      <summary className="cursor-pointer text-[10px] text-gray-400 hover:text-gray-200">Détails</summary>
                      <pre className="mt-1 whitespace-pre-wrap text-[10px]">{isErrorObj ? firstArg.stack : JSON.stringify(c.args, null, 2)}</pre>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-12">Aucune sortie console.</div>
        );

      // ---------- RÉSEAU ----------
      case "reseau":
        return Array.isArray(data.network) && data.network.length ? (
          <div className="space-y-2">
            {data.network.map((n, i) => {
              const statusOk = n.status >= 200 && n.status < 300;
              return (
                <details key={i} className="group border border-[#52b788]/20 rounded-lg bg-[#001a2e]/30 open:bg-[#001a2e]/60 transition-colors">
                  <summary className="list-none cursor-pointer px-4 py-3 flex items-center gap-3 hover:bg-[#003049]/30 transition-colors">
                    <span
                      className={`font-semibold text-sm ${
                        n.method === "GET"
                          ? "text-[#52b788]"
                          : n.method === "POST"
                          ? "text-green-400"
                          : n.method === "PUT"
                          ? "text-yellow-400"
                          : n.method === "DELETE"
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {n.method}
                    </span>

                    <span className="font-mono text-xs text-gray-400 break-all flex-1">{n.url}</span>

                    <span className="text-xs text-gray-500 tabular-nums">{n.durationMs ?? "—"} ms</span>

                    <span className={`text-sm font-bold ${statusOk ? "text-[#52b788]" : n.status >= 400 ? "text-red-400" : "text-gray-400"}`}>{n.status}</span>

                    <ChevronDown className="w-4 h-4 text-gray-500 group-open:hidden" />
                    <ChevronUp className="w-4 h-4 text-gray-500 hidden group-open:inline-block" />
                  </summary>

                  <div className="px-4 pb-4 pt-2 space-y-4 border-t border-[#52b788]/10">
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => copyToClipboard(n.url)}>Copier l&apos;URL</Button>
                      {n.request?.body && (
                        <Button onClick={() => copyToClipboard(typeof n.request.body === "string" ? n.request.body : JSON.stringify(n.request.body))}>
                          Copier body requête
                        </Button>
                      )}
                      {n.response?.body && <Button onClick={() => copyToClipboard(n.response.body)}>Copier body réponse</Button>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-[#000000]/30 border border-[#52b788]/10 rounded p-3 text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge className="border-[#52b788]/30 text-[#52b788]/70 text-xs">Kind</Badge>
                          <span className="text-gray-300">{n.kind || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="border-[#52b788]/30 text-[#52b788]/70 text-xs">Status Text</Badge>
                          <span className="text-gray-300">{n.statusText || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="border-[#52b788]/30 text-[#52b788]/70 text-xs">Initiator</Badge>
                          <span className="text-gray-300">{n.perf?.initiatorType || "—"}</span>
                        </div>
                      </div>

                      <div className="bg-[#000000]/30 border border-[#52b788]/10 rounded p-3 text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge className="border-[#52b788]/30 text-[#52b788]/70 text-xs">Protocol</Badge>
                          <span className="text-gray-300">{n.perf?.nextHopProtocol || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="border-[#52b788]/30 text-[#52b788]/70 text-xs">Encoded</Badge>
                          <span className="text-gray-300">{n.perf?.encodedBodySize ?? "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="border-[#52b788]/30 text-[#52b788]/70 text-xs">Decoded</Badge>
                          <span className="text-gray-300">{n.perf?.decodedBodySize ?? "—"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-[#000000]/30 border border-[#52b788]/10 rounded p-3">
                        <div className="text-xs font-semibold text-[#52b788]/70 mb-2 uppercase tracking-wider">Headers — Requête</div>
                        <pre className="text-xs font-mono text-gray-400 whitespace-pre-wrap overflow-auto max-h-40">{pretty(n.request?.headers || {})}</pre>
                      </div>

                      <div className="bg-[#000000]/30 border border-[#52b788]/10 rounded p-3">
                        <div className="text-xs font-semibold text-[#52b788]/70 mb-2 uppercase tracking-wider">Body — Requête</div>
                        <pre className="text-xs font-mono text-gray-400 whitespace-pre-wrap overflow-auto max-h-40">{pretty(n.request?.body ?? "")}</pre>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-[#000000]/30 border border-[#52b788]/10 rounded p-3">
                        <div className="text-xs font-semibold text-[#52b788]/70 mb-2 uppercase tracking-wider">Headers — Réponse</div>
                        <pre className="text-xs font-mono text-gray-400 whitespace-pre-wrap overflow-auto max-h-40">{pretty(n.response?.headersRaw || "")}</pre>
                      </div>

                      <div className="bg-[#000000]/30 border border-[#52b788]/10 rounded p-3">
                        <div className="text-xs font-semibold text-[#52b788]/70 mb-2 uppercase tracking-wider">Body — Réponse (aperçu)</div>
                        <pre className="text-xs font-mono text-gray-400 whitespace-pre-wrap overflow-auto max-h-40">
                          {pretty(truncate(n.response?.body ?? ""))}
                        </pre>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-12">Aucune requête capturée.</div>
        );

      // ---------- LOCALSTORAGE ----------
      case "localstorage":
        if (!data.localStorage?.length) {
          return <div className="text-gray-500 text-center py-12">Aucun localStorage enregistré.</div>;
        }
        return (
          <div className="space-y-2">
            {data.localStorage.map((item, i) => (
              <details key={i} className="border border-[#52b788]/20 rounded-lg bg-[#001a2e]/30 open:bg-[#001a2e]/60 transition-colors">
                <summary className="list-none cursor-pointer px-4 py-3 flex flex-wrap justify-between items-center gap-3 hover:bg-[#003049]/30 transition-colors">
                  <div className="flex gap-3 items-center">
                    <span className="text-sm font-semibold text-gray-200">{item.key}</span>
                    <span className="text-xs text-gray-500">{item.sizeBytes} octets</span>
                    {item.sensitive && <Badge className="border-red-800/50 text-red-400 bg-red-950/20">sensible</Badge>}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 group-open:hidden" />
                  <ChevronUp className="w-4 h-4 text-gray-500 hidden group-open:inline-block" />
                </summary>

                <div className="px-4 pb-4 pt-2 space-y-3 border-t border-[#52b788]/10">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="border-[#52b788]/30 text-[#52b788]/70">{item.isJson ? "JSON" : "Texte brut"}</Badge>
                    <Button onClick={() => copyToClipboard(item.parsed ? JSON.stringify(item.parsed) : item.raw ?? "")}>Copier la valeur</Button>
                  </div>

                  <div className="bg-[#000000]/30 border border-[#52b788]/10 rounded-lg p-4">
                    <pre className="text-xs font-mono text-gray-400 whitespace-pre-wrap overflow-auto max-h-60">
                      {item.parsed ? pretty(item.parsed) : item.raw ?? ""}
                    </pre>
                  </div>
                </div>
              </details>
            ))}
          </div>
        );

      // ---------- MÉTADONNÉES ----------
      case "meta":
        return data.meta ? (
          <pre className="bg-[#000000]/30 border border-[#52b788]/20 text-gray-300 p-4 rounded-lg overflow-auto text-xs font-mono whitespace-pre-wrap max-h-96">
            {JSON.stringify(data.meta, null, 2)}
          </pre>
        ) : (
          <div className="text-gray-500 text-center py-12">Aucune métadonnée.</div>
        );

      default:
        return null;
    }
  }, [tab, data]);

  // ---------- RENDUS CONDITIONNELS APRÈS TOUS LES HOOKS ----------
  if (archived) {
    return <ArchivedReportPage />;
  } else if (notFound) {
    return <NotFoundPage />;
  }

  if (loading) {
    return (
      <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="mb-4">Chargement…</div>
          <div className="animate-pulse">⏳</div>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="grow bg-gradient-to-b from-[#3d0000] via-[#120000] to-[#000000] text-gray-100 flex items-center">
        <div className="max-w-xl mx-auto px-4 py-16">
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-red-400 font-semibold">Erreur</div>
              <div className="text-red-300 text-sm mt-1">{err}</div>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/presentation" className="inline-block text-sm text-gray-400 hover:text-[#52b788] transition-colors underline underline-offset-4">
              ← Retour à la présentation
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    // Cas extrême : pas de données mais pas d’erreur → on évite de crasher
    return null;
  }

  // ---------- RENDU NORMAL ----------
  return (
    <div className="grow bg-gradient-to-b from-[#003049] via-[#001f2e] to-[#000000] text-gray-100">
      <div className="max-w-7xl mx-auto p-4" style={{ height: "calc(100vh - 110px)" }}>
        <div className="bg-[#001a2e]/40 border border-[#52b788]/20 rounded-xl overflow-y-auto shadow-xl h-full">
          <nav className="flex border-b border-[#52b788]/20 overflow-x-auto bg-gradient-to-r from-[#003049]/50 to-[#001a2e]/50">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                  tab === t.id
                    ? "bg-[#52b788]/20 text-[#52b788] border-b-2 border-[#52b788]"
                    : "text-gray-400 hover:text-gray-200  border-b-2 border-transparent hover:bg-[#003049]/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="p-6">{content}</div>
        </div>
      </div>
    </div>
  );
}
