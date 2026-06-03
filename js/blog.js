const blogManifest = "/blog/posts.json";
const blogCacheKey = "blog_posts";
const blogCacheTTL = 30 * 60 * 1000;

let allPosts = [];

function extractTitle(md) {
  const m = md.match(/^#\s+(.+)/m);
  return m ? m[1].trim() : "Untitled";
}

function extractTags(md) {
  const m = md.match(/\*\*Tags:\*\*\s*(.+)/i);
  return m ? m[1].split(",").map(t => t.trim()).filter(Boolean) : [];
}

function extractDate(md) {
  const m = md.match(/\*\*Date:\*\*\s*(.+)/i);
  return m ? m[1].trim() : "";
}

function stripMeta(md) {
  return md.replace(/^\*\*Date:\*\*.*$/gm, "").replace(/^\*\*Tags:\*\*.*$/gm, "").replace(/^---\s*$/gm, "").trim();
}

async function fetchPosts() {
  try {
    const res = await fetch(blogManifest);
    if (!res.ok) return [];
    const manifest = await res.json();
    if (!Array.isArray(manifest)) return [];

    const posts = [];
    for (const entry of manifest) {
      if (!entry.file) continue;
      try {
        const r = await fetch(`/blog/${entry.file}`);
        if (!r.ok) continue;
        const md = await r.text();
        posts.push({
          slug: entry.file.replace(/\.md$/i, ""),
          title: extractTitle(md),
          date: extractDate(md),
          tags: extractTags(md),
          markdown: md,
        });
      } catch { continue; }
    }

    return posts.sort((a, b) => b.date.localeCompare(a.date));
  } catch { return []; }
}

function renderList(posts) {
  const list = document.getElementById("blogList");
  const count = document.getElementById("blog-count");
  const total = document.getElementById("blog-total");
  if (!list) return;

  if (posts.length === 0) {
    list.innerHTML = `<div class="blog-empty">No posts yet.</div>`;
    if (count) count.textContent = "0";
    if (total) total.textContent = "0";
    return;
  }

  if (count) count.textContent = "01";
  if (total) total.textContent = String(posts.length).padStart(2, "0");

  list.innerHTML = posts.map((p, i) => `
    <article class="blog-card" data-index="${i}">
      <div class="blog-card-header">
        <span class="blog-card-number">${String(i + 1).padStart(2, "0")}</span>
        <time class="blog-card-date">${p.date}</time>
      </div>
      <h2 class="blog-card-title">${p.title}</h2>
      ${p.tags.length ? `<div class="blog-card-tags">${p.tags.map(t => `<span class="blog-tag">${t}</span>`).join("")}</div>` : ""}
    </article>
  `).join("");

  list.querySelectorAll(".blog-card").forEach(card => {
    card.addEventListener("click", () => showPost(parseInt(card.dataset.index, 10)));
  });
}

function showPost(i) {
  const post = allPosts[i];
  if (!post) return;
  document.getElementById("blogList").style.display = "none";
  document.getElementById("blogPost").style.display = "block";

  const html = marked.parse(stripMeta(post.markdown));
  document.getElementById("blogContent").innerHTML = `
    <div class="blog-post-meta">
      <time>${post.date}</time>
      ${post.tags.length ? `<div class="blog-post-tags">${post.tags.map(t => `<span class="blog-tag">${t}</span>`).join("")}</div>` : ""}
    </div>
    <div class="blog-post-body">${html}</div>
  `;
}

function showList() {
  document.getElementById("blogList").style.display = "";
  document.getElementById("blogPost").style.display = "none";
}

function init() {
  document.getElementById("blogBack")?.addEventListener("click", showList);

  const cached = localStorage.getItem(blogCacheKey);
  if (cached) {
    try {
      const p = JSON.parse(cached);
      if (Date.now() - p.fetchedAt < blogCacheTTL) { allPosts = p.posts; renderList(allPosts); return; }
    } catch { /* corrupt */ }
  }

  fetchPosts().then(posts => {
    allPosts = posts;
    renderList(allPosts);
    localStorage.setItem(blogCacheKey, JSON.stringify({ posts, fetchedAt: Date.now() }));
  });
}

function wait() { typeof marked !== "undefined" ? init() : setTimeout(wait, 100); }

document.addEventListener("DOMContentLoaded", wait);
