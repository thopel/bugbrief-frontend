import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const STORAGE_KEY = "bugbrief_history_v1";
const SESSION_KEY = "bugbrief_history_open";

function loadHistory() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveHistory(items) {
  if (typeof window === "undefined") return;
  items = items.filter((item) => item.id !== "demo");
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

function filterNotExpired(list) {
  const now = Date.now();
  return list.filter((item) => {
    if (!item.created_at) return true;
    const t = new Date(item.created_at).getTime();
    if (Number.isNaN(t)) return true;
    return t > now;
  });
}

function sortByCreatedAt(list) {
  return [...list].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;

    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;

    return tb - ta;
  });
}

export default function History({ current, buildUrl }) {
  const location = useLocation();

  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored === "true";
  });

  const [items, setItems] = useState([]);

  // Persistance de l'état open/closed
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, open ? "true" : "false");
  }, [open]);

  // ÉCOUTE DES EVENTS GLOBAUX (ajout important)
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen((prev) => (prev ? false : true));

    window.addEventListener("bugbrief:history-open", handleOpen);
    window.addEventListener("bugbrief:history-close", handleClose);
    window.addEventListener("bugbrief:history-toggle", handleToggle);

    return () => {
      window.removeEventListener("bugbrief:history-open", handleOpen);
      window.removeEventListener("bugbrief:history-close", handleClose);
      window.removeEventListener("bugbrief:history-toggle", handleToggle);
    };
  }, []);

  // Chargement initial de l'historique
  useEffect(() => {
    const initial = loadHistory();
    const cleaned = filterNotExpired(initial);
    const sorted = sortByCreatedAt(cleaned);
    if (sorted.length !== initial.length) {
      saveHistory(sorted);
    }
    setItems(sorted);
  }, []);

  // Ajout du rapport courant
  useEffect(() => {
    if (!current || !current.id) return;

    const rawCreated = current.created_at || current.expiresAt || current.meta?.created_at || current.meta?.expiresAt || null;

    const entry = {
      id: current.id,
      title: current?.meta?.title || current.title || current.url || current.id,
      created_at: rawCreated,
      url: current.url || null,
      lastSeenAt: new Date().toISOString(),
    };

    setItems((prev) => {
      const cleaned = filterNotExpired(prev);
      const without = cleaned.filter((i) => i.id !== entry.id);
      const merged = [...without, entry];
      const sorted = sortByCreatedAt(merged);

      saveHistory(sorted);
      return sorted;
    });
  }, [current]);

  const hasItems = items && items.length > 0;
  const computeUrl = useMemo(() => buildUrl || ((id) => `/${encodeURIComponent(id)}`), [buildUrl]);

  const handleClear = () => {
    setItems([]);
    saveHistory([]);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed left-2 top-[98px] -translate-y-1/2 z-30 bg-[#001a2e]/80 border border-[#52b788]/40 rounded-full p-2 shadow-lg hover:bg-[#003049]/80 transition-colors flex items-center gap-2 max-1xl:hidden"
        >
          <Clock className="w-4 h-4 text-[#52b788]" />
          <ChevronRight className="w-4 h-4 text-[#52b788]" />
        </button>
      )}

      <aside className={`fixed top-[66px] left-0 bottom-0 z-20 transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full w-72 bg-[#000814]/95 border-r border-[#52b788]/30 shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-3 py-3 border-b border-[#52b788]/30 bg-[#001a2e]/90">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#52b788]" />
              <div>
                <div className="text-s font-bold text-[#52b788] uppercase">History</div>
              </div>
            </div>

            <button type="button" onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-[#003049]/60 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
            {!hasItems && <div className="text-xs text-gray-500 px-2 py-3">No recent report yet.</div>}

            {items.map((item) => {
              const url = computeUrl(item.id);
              const isActive = current && current.id === item.id;

              let createdLabel = "N/A";
              if (item.created_at) {
                const d = new Date(item.created_at);
                if (!Number.isNaN(d.getTime())) {
                  createdLabel = d.toLocaleString();
                }
              }

              return (
                <Link
                  key={item.id}
                  to={url}
                  className={`block rounded-lg px-3 py-2 text-xs transition-colors border ${
                    isActive ? "bg-[#52b788]/15 border-[#52b788]/60" : "bg-[#00121f]/80 border-transparent hover:bg-[#003049]/50 hover:border-[#52b788]/30"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-gray-100 truncate">{item.title}</span>
                    <span className="text-[10px] text-[#52b788]/80 uppercase tracking-wider">{createdLabel}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="px-3 py-2 border-t border-[#52b788]/20 flex items-center justify-between bg-[#00111c]/90">
            <span className="text-[12px] text-gray-500">Expired reports are removed automatically.</span>
            {hasItems && (
              <button type="button" onClick={handleClear} className="p-1 rounded-md hover:bg-red-900/40 transition-colors" title="Clear history">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
