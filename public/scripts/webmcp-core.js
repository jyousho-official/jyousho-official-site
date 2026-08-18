export const TOOL_NAMES = [
  "get-site-info",
  "list-teams",
  "list-pages",
  "search-site",
  "open-page",
];

function catalogPaths(catalog) {
  const paths = new Set((catalog.pages || []).map((item) => item.path));
  for (const item of catalog.works || []) paths.add(item.path);
  for (const item of catalog.news || []) paths.add(item.path);
  return paths;
}

export function isAllowedPath(catalog, path) {
  if (typeof path !== "string" || !path.startsWith("/") || path.includes("://") || path.includes("..")) {
    return false;
  }
  return catalogPaths(catalog).has(path);
}

function haystack(item) {
  return [item.path, item.title, item.name, item.description, item.id]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function searchCatalog(catalog, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];
  const rows = [
    ...(catalog.pages || []).map((item) => ({ kind: "page", ...item })),
    ...(catalog.teams || []).map((item) => ({ kind: "team", path: "/teams", ...item })),
    ...(catalog.works || []).map((item) => ({ kind: "work", ...item })),
    ...(catalog.news || []).map((item) => ({ kind: "news", ...item })),
  ];
  return rows.filter((item) => haystack(item).includes(q)).slice(0, 12);
}

export function registerTools(modelContext, catalog, navigate) {
  if (!modelContext || typeof modelContext.registerTool !== "function") return [];
  const registered = [];
  const tools = [
    {
      name: "get-site-info",
      description: "情報処理研究会公式サイトの名前・説明・ドメインを返す。",
      inputSchema: { type: "object", properties: {} },
      execute() {
        return JSON.stringify(catalog.site);
      },
    },
    {
      name: "list-teams",
      description: "5つの班の名前と活動内容を返す。",
      inputSchema: { type: "object", properties: {} },
      execute() {
        return JSON.stringify(catalog.teams);
      },
    },
    {
      name: "list-pages",
      description: "公式サイトの主要ページ一覧を返す。",
      inputSchema: { type: "object", properties: {} },
      execute() {
        return JSON.stringify(catalog.pages);
      },
    },
    {
      name: "search-site",
      description: "班・作品・お知らせ・ページからキーワードで探す。",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string", description: "検索語" } },
        required: ["query"],
      },
      execute({ query }) {
        return JSON.stringify(searchCatalog(catalog, query));
      },
    },
    {
      name: "open-page",
      description: "公式サイト内の許可されたパスだけを開く。",
      inputSchema: {
        type: "object",
        properties: { path: { type: "string", description: "例: /teams" } },
        required: ["path"],
      },
      execute({ path }) {
        if (!isAllowedPath(catalog, path)) {
          return JSON.stringify({ ok: false, error: "許可されていないパスです" });
        }
        if (typeof navigate === "function") navigate(path);
        return JSON.stringify({ ok: true, path });
      },
    },
  ];
  for (const tool of tools) {
    modelContext.registerTool(tool);
    registered.push(tool.name);
  }
  return registered;
}
