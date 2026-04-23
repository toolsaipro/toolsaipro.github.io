/**
 * ToolsAI Pro — Master Script
 * ============================
 * Auto-detects page type → renders correct cards + footer.
 *
 * Page types detected:
 * "home"  → index.html  → simple .tc cards (4-col grid)
 * "hub"   → tools-hub.html / blog.html / tools-hub.html → .tool-card with "Use Tool" button
 * "tool"  → any other page  → oft-grid (Other Free Tools section)
 *
 * Include in every page AFTER tools-data.js:
 * <script src="/tools-data.js"></script>
 * <script src="/script.js"></script>
 */

(function () {
  "use strict";

  /* ═══════════════════════════════════════
     1. DETECT PAGE TYPE
  ═══════════════════════════════════════ */
  function detectPage() {
    var path = window.location.pathname.replace(/\/$/, "");
    var file = path.split("/").pop() || "index.html";
    if (file === "" || file === "index.html") return "home";
    if (file === "tools-hub.html" || file === "blog.html") return "hub";
    return "tool";
  }

  var PAGE = detectPage();

  /* ═══════════════════════════════════════
     2. BADGE HTML
  ═══════════════════════════════════════ */
  function badgeHTML(type) {
    var map = {
      free: { cls: "badge-free", label: "Free" },
      pro:  { cls: "badge-pro",  label: "Pro"  },
      new:  { cls: "badge-new",  label: "New"  },
      ai:   { cls: "badge-ai",   label: "AI"   }
    };
    var b = map[type] || map.free;
    return '<span class="badge ' + b.cls + '">' + b.label + '</span>';
  }

  /* ═══════════════════════════════════════
     3. CARD RENDERERS
  ═══════════════════════════════════════ */

  /* ── 3a. HOME card (.tc) ── */
  function homeCard(tool, idx) {
    var c = idx + 1;
    return (
      '<a class="tc c' + c + '" href="' + tool.link + '" data-name="' + tool.title.toLowerCase() + ' ' + tool.desc.toLowerCase() + '">' +
        '<div class="tc-top">' +
          '<div class="ti i' + c + '">' + tool.emoji + '</div>' +
          '<span class="arrow">↗</span>' +
        '</div>' +
        '<div class="tc-body">' +
          '<div class="tt">' + tool.title + '</div>' +
          '<div class="td">' + tool.desc + '</div>' +
        '</div>' +
        '<div class="tc-foot">' + badgeHTML(tool.badge) + '</div>' +
      '</a>'
    );
  }

  /* ── 3b. HUB card (.tool-card with Use Tool btn) ── */
  function hubCard(tool) {
    var btnClass = "btn-" + (tool.cat === "pdf" ? "pdf" : tool.cat === "img" ? "img" : tool.cat === "tool" ? "tool" : tool.cat === "calc" ? "calc" : tool.cat === "hlth" ? "hlth" : tool.cat === "yt" ? "yt" : "ai");
    return (
      '<div class="tool-card ' + tool.cat + '" data-cat="' + tool.cat + '" data-name="' + tool.title.toLowerCase() + ' ' + tool.desc.toLowerCase() + '">' +
        '<div class="card-top">' +
          '<div class="card-icon ic-' + tool.cat + '">' + tool.emoji + '</div>' +
          '<div class="card-meta">' +
            '<div class="card-category" style="color:' + tool.color + ';">' + catLabel(tool.cat) + '</div>' +
            '<div class="card-name">' + tool.title + '</div>' +
          '</div>' +
          '<span class="card-badge badge-' + tool.badge + '">' + tool.badge.toUpperCase() + '</span>' +
        '</div>' +
        '<p class="card-desc">' + tool.descLong + '</p>' +
        '<a class="use-tool-btn ' + btnClass + '" href="' + tool.link + '">⚡ Use Tool &nbsp;→</a>' +
      '</div>'
    );
  }

  /* ── 3c. OFT card (Other Free Tools grid) ── */
  function oftCard(tool) {
    var iconColoured = tool.icon.replace('stroke="currentColor"', 'stroke="' + tool.color + '"').replace('fill="currentColor"', 'fill="' + tool.color + '"');
    return (
      '<a class="oft-tool-card ' + tool.cat + '" href="' + tool.link + '">' +
        '<div class="oft-icon-wrap c-' + tool.cat + '">' + iconColoured + '</div>' +
        '<span class="oft-tool-name">' + tool.title + '</span>' +
        '<span class="oft-badge ' + tool.badge + '">' + tool.badge.toUpperCase() + '</span>' +
      '</a>'
    );
  }

  function catLabel(cat) {
    var labels = { pdf: "PDF Tool", img: "Image Tool", tool: "Utility", calc: "Calculator", hlth: "Health Tool", ai: "AI Tool", yt: "YouTube Tool" };
    return labels[cat] || "Tool";
  }

  /* ═══════════════════════════════════════
     4. INJECT CARDS
  ═══════════════════════════════════════ */
  function injectCards() {
    var tools = ACTIVE_TOOLS;

    /* ──── HOME PAGE ──── */
    if (PAGE === "home") {
      var grid = document.getElementById("toolsGrid");
      if (!grid) return;
      grid.innerHTML = tools.map(homeCard).join("");
      var cnt = document.getElementById("toolCount");
      if (cnt) cnt.textContent = tools.length + " tools";
      initHomeSearch(tools);
    }

    /* ──── HUB PAGE ──── */
    if (PAGE === "hub") {
      var grid = document.getElementById("toolsGrid");
      if (!grid) return;
      grid.innerHTML = tools.map(hubCard).join("");
      var cnt = document.getElementById("toolCount");
      if (cnt) cnt.textContent = tools.length + " tools";
      initHubFilter(tools);
    }

    /* ──── TOOL PAGE ──── */
    if (PAGE === "tool") {
      var oftGrid = document.getElementById("oftGrid");
      if (!oftGrid) return;
      
      var current = window.location.pathname;
      var others  = tools.filter(function (t) { return t.link !== current && !current.endsWith(t.link.replace("/", "")); });
      oftGrid.innerHTML = others.map(oftCard).join("");

      /* Update "View All" button text automatically */
      var va = document.querySelector(".oft-view-all");
      if (va) va.innerHTML = "View All " + tools.length + " Free Tools &nbsp;→";

      /* Update "All 12 tools..." subtitle text automatically */
      var subText = document.querySelector(".oft-sub");
      if (subText) {
        subText.textContent = "All " + tools.length + " tools — no signup required, no files uploaded, 100% private & browser-based.";
      }
    }
  }

  /* ═══════════════════════════════════════
     5. HOME SEARCH
  ═══════════════════════════════════════ */
  function initHomeSearch(tools) {
    var inp = document.getElementById("searchInp");
    if (!inp) return;
    inp.addEventListener("input", function () {
      var q = this.value.toLowerCase().trim();
      var cards = document.querySelectorAll(".tc");
      var noRes = document.getElementById("noResults");
      var cnt   = document.getElementById("toolCount");
      var sqEl  = document.getElementById("searchQuery");
      var visible = 0;
      cards.forEach(function (card) {
        var hay = (card.getAttribute("data-name") || "") + " " + (card.querySelector(".tt") || {textContent:""}).textContent.toLowerCase();
        var show = !q || hay.indexOf(q) !== -1;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (noRes) noRes.style.display = visible === 0 ? "block" : "none";
      if (sqEl)  sqEl.textContent = this.value;
      if (cnt)   cnt.textContent  = visible + (!q ? " tools" : " result" + (visible !== 1 ? "s" : ""));
    });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { this.value = ""; this.dispatchEvent(new Event("input")); }
    });
  }

  /* ═══════════════════════════════════════
     6. HUB FILTER
  ═══════════════════════════════════════ */
  function initHubFilter(tools) {
    window._toolsCache = tools;

    window.setCategory = function (cat, btn) {
      window._currentCat = cat;
      document.querySelectorAll(".cat-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var bar = document.getElementById("searchBar");
      if (bar) bar.value = "";
      applyHubFilters();
    };

    window.filterTools = function () {
      window._currentCat = "all";
      document.querySelectorAll(".cat-btn").forEach(function (b, i) { b.classList.toggle("active", i === 0); });
      applyHubFilters();
    };

    window.applyFilters = applyHubFilters;
    window._currentCat = "all";
  }

  function applyHubFilters() {
    var cat   = window._currentCat || "all";
    var q     = (document.getElementById("searchBar") || {value:""}).value.toLowerCase().trim();
    var cards = document.querySelectorAll(".tool-card");
    var count = 0;
    cards.forEach(function (card, idx) {
      var cardCat  = card.getAttribute("data-cat");
      var name     = card.getAttribute("data-name") || "";
      var catMatch = (cat === "all" || cardCat === cat);
      var qMatch   = (!q || name.includes(q));
      if (catMatch && qMatch) {
        card.style.display = "flex";
        card.style.animationDelay = (idx * 0.04) + "s";
        count++;
      } else {
        card.style.display = "none";
      }
    });
    var cntEl = document.getElementById("toolCount");
    var noEl  = document.getElementById("noResults");
    if (cntEl) cntEl.textContent = count + (count === 1 ? " tool" : " tools");
    if (noEl)  noEl.style.display = count === 0 ? "block" : "none";
  }

  /* ═══════════════════════════════════════
     7. FOOTER AUTO-INJECT
  ═══════════════════════════════════════ */
  function injectFooter() {
    var col1 = document.getElementById("footerCol1");
    var col2 = document.getElementById("footerCol2");
    if (!col1 && !col2) return;

    var tools = ACTIVE_TOOLS;
    var half  = Math.ceil(tools.length / 2);
    var left  = tools.slice(0, half);
    var right = tools.slice(half);

    function linkHTML(t) {
      return '<a href="' + t.link + '"><span class="fl-icon">' + t.emoji + '</span> ' + t.title + '</a>';
    }

    if (col1) col1.innerHTML = left.map(linkHTML).join("");
    if (col2) col2.innerHTML = right.map(linkHTML).join("");
  }

  /* ═══════════════════════════════════════
     8. CSS INJECTION — Equal-size grid
  ═══════════════════════════════════════ */
  function injectCSS() {
    var css = [
      "/* ToolsAI Auto Grid */",
      "#toolsGrid.tools-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }",
      "#toolsGrid.tools-grid .tc { height:100%; min-height:180px; }",
      "@media(max-width:1000px){ #toolsGrid.tools-grid { grid-template-columns:repeat(3,1fr); } }",
      "@media(max-width:700px) { #toolsGrid.tools-grid { grid-template-columns:repeat(2,1fr); } }",
      "@media(max-width:400px) { #toolsGrid.tools-grid { grid-template-columns:1fr; } }",
      /* Hub equal height */
      ".tools-section .tools-grid { grid-template-columns:repeat(3,1fr); }",
      ".tool-card { display:flex; flex-direction:column; height:100%; }",
      ".tool-card .card-desc { flex:1; }",
      "@media(max-width:900px){ .tools-section .tools-grid { grid-template-columns:repeat(2,1fr); } }",
      "@media(max-width:560px){ .tools-section .tools-grid { grid-template-columns:1fr; } }",
      /* OFT equal height */
      ".oft-grid { grid-template-columns:repeat(3,1fr); }",
      "@media(max-width:600px){ .oft-grid { grid-template-columns:repeat(2,1fr); } }",
      /* Badge AI */
      ".badge-ai { background:linear-gradient(135deg,rgba(167,139,250,0.18),rgba(6,182,212,0.12)); color:#a78bfa; border:1px solid rgba(167,139,250,0.3); }",
      ".ic-ai { background:linear-gradient(135deg,rgba(167,139,250,0.2),rgba(6,182,212,0.15)); border:1px solid rgba(167,139,250,0.25); }",
      ".tool-card.ai { border-color:rgba(167,139,250,0.14); }",
      ".tool-card.ai:hover { border-color:rgba(167,139,250,0.5); box-shadow:0 12px 36px rgba(167,139,250,0.18),0 0 0 1px rgba(167,139,250,0.15); }",
      ".tool-card.ai::before { background:radial-gradient(ellipse at 50% 0%,rgba(167,139,250,0.1),transparent 70%); }",
      ".oft-tool-card.ai:hover { border-color:rgba(167,139,250,0.5); box-shadow:0 8px 24px rgba(167,139,250,0.18); }",
      ".oft-tool-card.ai::before { background:radial-gradient(ellipse at 50% 0%,rgba(167,139,250,0.13),transparent 70%); }",
      ".oft-icon-wrap.c-ai { background:rgba(167,139,250,0.14); border:1px solid rgba(167,139,250,0.25); }",
      ".btn-ai { background:linear-gradient(135deg,#a78bfa,#06b6d4); color:#fff; box-shadow:0 4px 14px rgba(167,139,250,0.35); }",
      ".btn-ai:hover { box-shadow:0 6px 22px rgba(167,139,250,0.55); }",
      /* YouTube Tool Custom CSS */
      ".oft-tool-card.yt:hover { border-color:rgba(255,68,68,0.5); box-shadow:0 8px 24px rgba(255,68,68,0.18); }",
      ".oft-tool-card.yt::before { background:radial-gradient(ellipse at 50% 0%,rgba(255,68,68,0.13),transparent 70%); }",
      ".oft-icon-wrap.c-yt { background:rgba(255,68,68,0.15); border:1px solid rgba(255,68,68,0.3); }",
      ".btn-yt { background:linear-gradient(135deg,#ff4444,#cc0000); color:#fff; box-shadow:0 4px 14px rgba(255,68,68,0.35); border:none; border-radius:6px; padding:8px 16px; font-weight:600; text-decoration:none; display:inline-block; }",
      ".btn-yt:hover { box-shadow:0 6px 22px rgba(255,68,68,0.55); }"
    ].join("\n");

    var style = document.createElement("style");
    style.id  = "toolsai-auto-css";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ═══════════════════════════════════════
     9. INIT
  ═══════════════════════════════════════ */
  function init() {
    injectCSS();
    injectCards();
    injectFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
