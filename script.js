/* ═══════════════════════════════════════
   NAVBAR AUTO-LOADER v2
   Works on ALL pages automatically.
   - If #navbar-placeholder found → inject there
   - If existing <nav> found → replace it + inject mobile menu after
   - No HTML changes needed in any page!
═══════════════════════════════════════ */
(function injectNavbar() {

  /* ── Detect active page for .act highlight ── */
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  if (currentPath === "") currentPath = "index.html";

  function navClass(href) {
    var page = href.split("/").pop();
    return currentPath === page ? 'class="nl act"' : 'class="nl"';
  }

  /* ── Build Navbar HTML ── */
  var NAV_HTML = [
    '<nav id="mainNav">',
    '  <a class="logo" href="/">Tools<span>AI</span><em>Pro</em></a>',
    '  <div class="nav-links" id="desktopNav">',
    '    <a ' + navClass("index.html")    + ' href="/">Home</a>',
    '    <a ' + navClass("about.html")    + ' href="/about.html">About</a>',
    '    <a ' + navClass("tools-hub.html")+ ' href="/tools-hub.html">Tools Hub</a>',
    '    <div class="dropdown" id="guidesDropdown">',
    '      <button class="dropdown-toggle nl" id="guidesToggleBtn">',
    '        Guides <span class="dropdown-arrow">&#9662;</span>',
    '      </button>',
    '      <div class="dropdown-menu">',
    '        <a class="dm-item" href="/blog-pdf-merger.html"><span class="dm-icon">📄</span>Merge PDF Guide</a>',
    '        <a class="dm-item" href="/pdf-splitter.html"><span class="dm-icon">✂️</span>Split PDF Pages</a>',
    '        <a class="dm-item" href="/pdf-compressor.html"><span class="dm-icon">📦</span>Compress PDF</a>',
    '        <a class="dm-item" href="/pdf-to-jpg.html"><span class="dm-icon">🖼️</span>PDF to JPG</a>',
    '        <a class="dm-item" href="/pdf-unlock.html"><span class="dm-icon">🔓</span>Unlock PDF</a>',
    '        <div class="dm-divider"></div>',
    '        <a class="dm-all" href="/tools-hub.html">View All Guides &nbsp;&#8594;</a>',
    '      </div>',
    '    </div>',
    '    <a ' + navClass("contact.html") + ' href="/contact.html">Contact</a>',
    '    <a ' + navClass("privacy.html") + ' href="/privacy.html">Privacy</a>',
    '  </div>',
    '  <button class="hamburger" id="hamburgerBtn" aria-label="Menu">',
    '    <span></span><span></span><span></span>',
    '  </button>',
    '</nav>'
  ].join("\n");

  /* ── Build Mobile Menu HTML ── */
  var MOBILE_HTML = [
    '<div class="mobile-menu" id="mobileMenu">',
    '  <a class="nl" href="/">&#127968; Home</a>',
    '  <a class="nl" href="/about.html">&#8505;&#65039; About</a>',
    '  <a class="nl" href="/tools-hub.html">&#128736;&#65039; Tools Hub</a>',
    '  <div class="mm-label">&#128218; Guides</div>',
    '  <a class="dm-item" href="/blog-pdf-merger.html"><span class="dm-icon">📄</span>Merge PDF Guide</a>',
    '  <a class="dm-item" href="/pdf-splitter.html"><span class="dm-icon">✂️</span>Split PDF Pages</a>',
    '  <a class="dm-item" href="/pdf-compressor.html"><span class="dm-icon">📦</span>Compress PDF</a>',
    '  <a class="dm-item" href="/pdf-to-jpg.html"><span class="dm-icon">🖼️</span>PDF to JPG</a>',
    '  <a class="dm-item" href="/pdf-unlock.html"><span class="dm-icon">🔓</span>Unlock PDF</a>',
    '  <a class="nl" href="/contact.html">&#9993;&#65039; Contact</a>',
    '  <a class="nl" href="/privacy.html">&#128274; Privacy</a>',
    '</div>'
  ].join("\n");

  /* ── INJECT LOGIC ── */
  var placeholder = document.getElementById("navbar-placeholder");
  var existingNav = document.querySelector("nav");

  if (placeholder) {
    /* Has placeholder div → inject nav + mobile menu inside it */
    placeholder.innerHTML = NAV_HTML + MOBILE_HTML;

  } else if (existingNav) {
    /* Has existing hardcoded nav → replace it */
    var wrapper = document.createElement("div");
    wrapper.innerHTML = NAV_HTML + MOBILE_HTML;

    /* Insert new nav before old nav, then remove old nav */
    existingNav.parentNode.insertBefore(wrapper, existingNav);
    existingNav.parentNode.removeChild(existingNav);

    /* Also remove any existing hardcoded mobile-menu (if present) */
    var oldMobile = document.getElementById("mobileMenu");
    if (oldMobile && !wrapper.contains(oldMobile)) {
      oldMobile.parentNode.removeChild(oldMobile);
    }

  } else {
    /* No nav found → prepend to body */
    var wrapper2 = document.createElement("div");
    wrapper2.innerHTML = NAV_HTML + MOBILE_HTML;
    document.body.insertBefore(wrapper2, document.body.firstChild);
  }

  /* ── INJECT CSS (only once) ── */
  if (!document.getElementById("navbar-auto-css")) {
    var style = document.createElement("style");
    style.id = "navbar-auto-css";
    style.textContent = [
      "/* Navbar Auto CSS */",

      /* Base nav */
      "#mainNav{",
        "position:sticky;top:0;z-index:200;",
        "background:rgba(13,13,20,0.97);",
        "backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);",
        "border-bottom:1px solid #2a2a3a;",
        "display:flex;align-items:center;justify-content:space-between;",
        "padding:0 28px;height:64px;",
      "}",

      /* Logo */
      "#mainNav .logo{font-size:19px;font-weight:800;color:#fff;text-decoration:none;flex-shrink:0;}",
      "#mainNav .logo span{color:#6c63ff;}",
      "#mainNav .logo em{color:#ff6584;font-style:normal;}",

      /* Nav links */
      "#mainNav .nav-links{display:flex;align-items:center;gap:3px;}",
      "#mainNav .nl{",
        "padding:5px 11px;border-radius:16px;font-size:11px;font-weight:600;",
        "color:#6b6b80;text-decoration:none;border:1px solid transparent;",
        "transition:all 0.2s;white-space:nowrap;",
      "}",
      "#mainNav .nl:hover{color:#f7971e;border-color:rgba(247,151,30,0.3);}",
      "#mainNav .nl.act{background:#f7971e;color:#fff;border-color:#f7971e;}",

      /* Dropdown */
      "#mainNav .dropdown{position:relative;}",
      "#mainNav .dropdown-toggle{",
        "padding:5px 11px;border-radius:16px;font-size:11px;font-weight:600;",
        "color:#6b6b80;background:none;border:1px solid transparent;cursor:pointer;",
        "transition:all 0.2s;display:flex;align-items:center;gap:4px;",
        "font-family:'Plus Jakarta Sans',sans-serif;",
      "}",
      "#mainNav .dropdown-toggle:hover,",
      "#mainNav .dropdown.open .dropdown-toggle{color:#a78bfa;border-color:rgba(167,139,250,0.3);}",
      "#mainNav .dropdown-arrow{font-size:9px;transition:transform 0.25s;display:inline-block;}",
      "#mainNav .dropdown.open .dropdown-arrow{transform:rotate(180deg);}",
      "#mainNav .dropdown-menu{",
        "position:absolute;top:calc(100% + 10px);right:0;width:220px;",
        "background:rgba(22,22,35,0.98);backdrop-filter:blur(20px);",
        "border:1px solid rgba(167,139,250,0.2);border-radius:16px;padding:10px;",
        "box-shadow:0 16px 48px rgba(0,0,0,0.45);",
        "opacity:0;visibility:hidden;transform:translateY(-8px);",
        "transition:all 0.25s cubic-bezier(0.34,1.2,0.64,1);z-index:300;",
      "}",
      "#mainNav .dropdown.open .dropdown-menu{opacity:1;visibility:visible;transform:translateY(0);}",
      "#mainNav .dm-item{",
        "display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;",
        "text-decoration:none;color:#e8e8f0;font-size:12px;font-weight:600;transition:all 0.18s;",
      "}",
      "#mainNav .dm-item:hover{background:rgba(167,139,250,0.1);color:#fff;}",
      "#mainNav .dm-icon{font-size:14px;flex-shrink:0;width:20px;text-align:center;}",
      "#mainNav .dm-divider{height:1px;background:#2a2a3a;margin:6px 0;}",
      "#mainNav .dm-all{",
        "display:flex;align-items:center;justify-content:center;gap:6px;padding:9px;",
        "border-radius:10px;",
        "background:linear-gradient(135deg,rgba(167,139,250,0.15),rgba(108,99,255,0.1));",
        "color:#a78bfa;font-size:11px;font-weight:700;text-decoration:none;",
        "border:1px solid rgba(167,139,250,0.2);transition:all 0.2s;",
      "}",
      "#mainNav .dm-all:hover{",
        "background:linear-gradient(135deg,rgba(167,139,250,0.25),rgba(108,99,255,0.18));",
        "color:#fff;",
      "}",

      /* Hamburger */
      "#mainNav .hamburger{",
        "display:none;flex-direction:column;gap:5px;cursor:pointer;",
        "padding:6px;border:none;background:none;",
      "}",
      "#mainNav .hamburger span{",
        "display:block;width:22px;height:2px;",
        "background:#6b6b80;border-radius:2px;transition:all 0.3s;",
      "}",
      "#mainNav .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}",
      "#mainNav .hamburger.open span:nth-child(2){opacity:0;}",
      "#mainNav .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}",

      /* Mobile menu */
      "#mobileMenu{",
        "display:none;position:fixed;top:64px;left:0;right:0;",
        "background:rgba(13,13,20,0.98);backdrop-filter:blur(20px);",
        "border-bottom:1px solid #2a2a3a;",
        "padding:16px 20px 20px;z-index:199;flex-direction:column;gap:6px;",
      "}",
      "#mobileMenu.open{display:flex;}",
      "#mobileMenu .nl{",
        "padding:10px 14px;border-radius:10px;font-size:13px;",
        "border:1px solid #2a2a3a;color:#e8e8f0;text-decoration:none;",
        "transition:all 0.2s;",
      "}",
      "#mobileMenu .nl:hover{background:rgba(247,151,30,0.08);color:#f7971e;}",
      "#mobileMenu .nl.act{background:#f7971e;color:#fff;}",
      "#mobileMenu .dm-item{",
        "display:flex;align-items:center;gap:10px;",
        "padding:10px 14px;border-radius:10px;",
        "border:1px solid #2a2a3a;font-size:12px;",
        "color:#e8e8f0;text-decoration:none;transition:all 0.2s;",
      "}",
      "#mobileMenu .dm-item:hover{background:rgba(167,139,250,0.1);color:#fff;}",
      "#mobileMenu .mm-label{",
        "font-size:10px;font-weight:700;color:#6b6b80;",
        "text-transform:uppercase;letter-spacing:1.2px;padding:8px 4px 4px;",
      "}",

      /* Responsive */
      "@media(max-width:680px){",
        "#mainNav{padding:0 16px;}",
        "#mainNav .nav-links{display:none;}",
        "#mainNav .hamburger{display:flex;}",
      "}"

    ].join("");
    document.head.appendChild(style);
  }

  /* ── WIRE UP EVENT LISTENERS ── */

  /* 1. Guides Dropdown */
  var guidesBtn = document.getElementById("guidesToggleBtn");
  var guidesDd  = document.getElementById("guidesDropdown");
  if (guidesBtn && guidesDd) {
    guidesBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      guidesDd.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (!guidesDd.contains(e.target)) {
        guidesDd.classList.remove("open");
      }
    });
  }

  /* 2. Hamburger Toggle */
  var hamburger  = document.getElementById("hamburgerBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
      hamburger.classList.toggle("open");
    });
    /* Auto-close on link click */
    var mobileLinks = mobileMenu.querySelectorAll("a");
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");
      });
    }
  }

})();
/* ═══ END NAVBAR AUTO-LOADER ═══ */
/**
 * ToolsAI Pro — Master Script
 * ============================
 * Auto-detects page type → renders correct cards + footer.
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
    // BUG FIX: Agar icon missing hai, toh script crash nahi hoga. Default icon use karega.
    var defaultIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
    var rawIcon = tool.icon || defaultIcon;
    
    var iconColoured = rawIcon.replace('stroke="currentColor"', 'stroke="' + tool.color + '"').replace('fill="currentColor"', 'fill="' + tool.color + '"');
    
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
