import { registerTools } from "./webmcp-core.js";

function readCatalog() {
  const node = document.getElementById("webmcp-catalog");
  if (!node) return null;
  try {
    return JSON.parse(node.textContent || "null");
  } catch {
    return null;
  }
}

const catalog = readCatalog();
const ctx = document.modelContext;
if (catalog && ctx) {
  registerTools(ctx, catalog, (path) => {
    window.location.assign(path);
  });
}
