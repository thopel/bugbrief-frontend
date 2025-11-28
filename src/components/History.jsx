import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, ChevronLeft, ChevronRight, Trash2, Search } from "lucide-react";

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

// Nettoyage avec expires_at
function filterNotExpired(list) {
  const now = Date.now();
  return list.filter((item) => {
    if (!item.expires_at) return true;
    const t = new Date(item.expires_at).getTime();
    if (Number.isNaN(t)) return true;
    return t > now;
  });
}

// Tri par created_at (fallback 0 si manquant)
function sortByCreatedAt(list) {
  return [...list].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;

    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;

    // plus récent d'abord
    return tb - ta;
  });
}

// Regroupement par jour de lastSeenAt
function groupByLastSeenDay(list) {
  const groups = new Map();

  list.forEach((item) => {
    let key = "unknown";
    if (item.lastSeenAt) {
      const d = new Date(item.lastSeenAt);
      if (!Number.isNaN(d.getTime())) {
        key = d.toISOString().slice(0, 10); // yyyy-mm-dd
      }
    }

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(item);
  });

  const result = Array.from(groups.entries()).map(([key, items]) => {
    let label = "Unknown date";
    if (key !== "unknown") {
      const d = new Date(key + "T00:00:00Z");
      if (!Number.isNaN(d.getTime())) {
        label = d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      }
    }
    return { key, label, items };
  });

  return result.sort((a, b) => {
    if (a.key === "unknown") return 1;
    if (b.key === "unknown") return -1;
    if (a.key > b.key) return -1;
    if (a.key < b.key) return 1;
    return 0;
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, open ? "true" : "false");
  }, [open]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen((prev) => !prev);

    window.addEventListener("bugbrief:history-open", handleOpen);
    window.addEventListener("bugbrief:history-close", handleClose);
    window.addEventListener("bugbrief:history-toggle", handleToggle);

    return () => {
      window.removeEventListener("bugbrief:history-open", handleOpen);
      window.removeEventListener("bugbrief:history-close", handleClose);
      window.removeEventListener("bugbrief:history-toggle", handleToggle);
    };
  }, []);

  // Chargement initial
  useEffect(() => {
    const initial = loadHistory();
    const cleaned = filterNotExpired(initial);
    const sorted = sortByCreatedAt(cleaned);
    if (sorted.length !== initial.length) {
      saveHistory(sorted);
    }
    setItems(sorted);
  }, []);

  // Ajout / MAJ du rapport courant
  useEffect(() => {
    if (!current || !current.id) return;

    const rawCreated = current.created_at || current.createdAt || current.meta?.created_at || current.meta?.createdAt || null;

    const rawExpires = current.expires_at || current.expiresAt || current.meta?.expires_at || current.meta?.expiresAt || null;

    const entry = {
      id: current.id,
      title: current?.meta?.title || current.title || current.url || current.id,
      created_at: rawCreated,
      expires_at: rawExpires,
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

  // Filtrage par recherche
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const url = (item.url || "").toLowerCase();
      const idStr = String(item.id || "").toLowerCase();
      return title.includes(q) || url.includes(q) || idStr.includes(q);
    });
  }, [items, search]);

  const groupedByDay = useMemo(() => groupByLastSeenDay(filteredItems), [filteredItems]);

  const hasFilteredItems = filteredItems && filteredItems.length > 0;

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
        <div className="h-full w-72 bg-[#000814] border-r border-[#52b788]/30 shadow-xl flex flex-col">
          {/* Header */}
          <div className="border-b border-[#52b788]/30 bg-[#001a2e]">
            <div className="flex items-center justify-between px-3 py-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#52b788]" />
                <div className="text-s font-bold text-[#52b788] uppercase">History</div>
              </div>

              <button type="button" onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-[#003049]/60 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-300" />
              </button>
            </div>

            {/* Barre de recherche */}
            <div className="px-3 pb-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reports..."
                  className="w-full pl-7 pr-2 py-1.5 rounded-md bg-[#000814] border border-[#52b788]/30 text-[11px] text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#52b788] focus:border-[#52b788]"
                />
              </div>
            </div>
          </div>

          {/* Liste */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
            {!hasItems && <div className="text-xs text-gray-500 px-2 py-3">No recent report yet.</div>}

            {hasItems && !hasFilteredItems && <div className="text-xs text-gray-500 px-2 py-3">No report matches your search.</div>}

            {groupedByDay.map((group) => (
              <div key={group.key} className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{group.label}</div>

                {group.items.map((item) => {
                  const url = computeUrl(item.id);
                  const isActive = current && current.id === item.id;

                  let createdLabel = "N/A";
                  if (item.created_at) {
                    const d = new Date(item.created_at);
                    if (!Number.isNaN(d.getTime())) {
                      createdLabel = d.toLocaleString();
                    }
                  }

                  let lastSeenLabel = "N/A";
                  if (item.lastSeenAt) {
                    const d = new Date(item.lastSeenAt);
                    if (!Number.isNaN(d.getTime())) {
                      lastSeenLabel = d.toLocaleString();
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
                      <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-gray-100 truncate">{item.title}</span>

                        <span className="text-[10px] text-[#52b788]/80 uppercase tracking-wider">{createdLabel}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer */}
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
