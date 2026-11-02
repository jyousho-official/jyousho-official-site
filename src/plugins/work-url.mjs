const URL_ONLY = /^https?:\/\/\S+$/;
const URL_HEADING = /^URL(?:$|[\s(])/;

function isUrlHeading(text) {
  return URL_HEADING.test(text.trim());
}

function escapeAttr(url) {
  return url
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function nextSibling(node, ctx) {
  const parent = ctx.parent(node);
  const index = ctx.indexOf(node);
  if (!parent?.children || index == null) return null;
  return parent.children[index + 1] ?? null;
}

function previousH2Text(node, ctx) {
  const parent = ctx.parent(node);
  const index = ctx.indexOf(node);
  if (!parent?.children || index == null) return "";
  for (let i = index - 1; i >= 0; i -= 1) {
    const sibling = parent.children[i];
    if (sibling?.type === "heading" && sibling.depth === 2) {
      return ctx.textContent(sibling).trim();
    }
  }
  return "";
}

function buttonHtml(url) {
  return `<div class="article-actions"><a class="button" href="${escapeAttr(url)}" target="_blank" rel="noreferrer">作品を開く ↗</a></div>`;
}

/**
 * 作品 Markdown の「## URL」は書く場所の目印。
 * URL があるときだけ「作品を開く」ボタンにし、見出しは出さない。
 * URL が無い作品は見出しごと無くして、ボタンも出さない。
 */
export function workUrlPlugin(ctx) {
  const path = ctx.fileURL ? decodeURIComponent(ctx.fileURL.pathname) : "";
  if (!path.includes("/content/works/")) return false;

  return {
    name: "work-url",
    heading(node, visitCtx) {
      if (node.depth !== 2 || !isUrlHeading(visitCtx.textContent(node))) return;
      const next = nextSibling(node, visitCtx);
      const nextText =
        next?.type === "paragraph" ? visitCtx.textContent(next).trim() : "";
      const hasUrl = URL_ONLY.test(nextText);
      const empty = !next || next.type === "heading";
      if (hasUrl || empty) visitCtx.removeNode(node);
    },
    paragraph(node, visitCtx) {
      if (!isUrlHeading(previousH2Text(node, visitCtx))) return;
      const url = visitCtx.textContent(node).trim();
      if (!URL_ONLY.test(url)) return;
      visitCtx.replaceNode(node, {
        raw: buttonHtml(url),
        mdxExpressions: false,
      });
    },
  };
}
