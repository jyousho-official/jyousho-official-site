import assert from "node:assert/strict";
import test from "node:test";
import {
  isAllowedPath,
  searchCatalog,
  TOOL_NAMES,
} from "../public/scripts/webmcp-core.js";

const catalog = {
  site: { name: "情報処理研究会", description: "公式サイト", domain: "jyoushotku.com" },
  pages: [
    { path: "/", title: "トップ" },
    { path: "/teams", title: "班紹介" },
    { path: "/works", title: "作品" },
  ],
  teams: [{ id: "programming", name: "プログラミング班", description: "Webアプリ" }],
  works: [{ path: "/works/demo", title: "デモ作品", description: "文化祭の展示" }],
  news: [{ path: "/news/open", title: "お知らせページ公開", description: "news公開" }],
};

test("tool names match WebMCP constraints", () => {
  for (const name of TOOL_NAMES) {
    assert.match(name, /^[A-Za-z0-9_.-]{1,128}$/);
  }
  assert.ok(TOOL_NAMES.includes("search-site"));
  assert.ok(TOOL_NAMES.includes("open-page"));
});

test("open-page allows only catalog paths", () => {
  assert.equal(isAllowedPath(catalog, "/teams"), true);
  assert.equal(isAllowedPath(catalog, "https://evil.example/"), false);
  assert.equal(isAllowedPath(catalog, "/../secret"), false);
  assert.equal(isAllowedPath(catalog, "/works/demo"), true);
});

test("search-site finds Japanese text across catalog", () => {
  const hits = searchCatalog(catalog, "文化祭");
  assert.equal(hits.some((h) => h.path === "/works/demo"), true);
});
