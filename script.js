/* ═══════════════════════════════════════
   NAVBAR AUTO-LOADER v4 (5+5 Ready & Centered Button)
   Works on ALL pages automatically.
═══════════════════════════════════════ */
(function injectNavbar() {

  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  if (currentPath === "") currentPath = "index.html";

  function navClass(href) {
    var page = href.split("/").pop();
    return currentPath === page ? 'class="nl act"' : 'class="nl"';
  }

  /* ── Build Navbar HTML (5+5 Layout) ── */
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
    '      <div class="dropdown-menu mega-menu">',
    '        <div class="mega-columns">',
    '          ',
    '          <div class="menu-col">',
    '            <div class="menu-label">🛠️ Popular Tools</div>',
    '            <a class="dm-item" href="/pdf-merger.html"><span class="dm-icon">📄</span>Merge PDF</a>',
    '            <a class="dm-item" href="/pdf-compressor.html"><span class="dm-icon">🗜️</span>Compress PDF</a>',
    '            <a class="dm-item" href="/pdf-unlock.html"><span class="dm-icon">🔓</span>Unlock PDF</a>',
    '            <a class="dm-item" href="/pdf-splitter.html"><span class="dm-icon">✂️</span>Split PDF</a>',
    '            <a class="dm-item" href="/percentage-calculator.html"><span class="dm-icon">%</span>Percentage Calc</a>',
    '          </div>',
    '          ',
    '          <div class="menu-col">',
    '            <div class="menu-label">📚 Expert Guides</div>',
    '            <a class="dm-item" href="/how-to-merge-pdf-online.html"><span class="dm-icon">📄</span>Merge PDF Guide</a>',
    '            <a class="dm-item" href="/how-to-unlock-pdf-online.html"><span class="dm-icon">🔓</span>Unlock PDF Guide</a>',
    '            <a class="dm-item" href="/blog-percentage-calculator.html"><span class="dm-icon">📊</span>Percentage Guide</a>',
    '            ',
    '          </div>',
    '        </div>',
    '        <div class="dm-divider"></div>',
    '        <a class="dm-all" href="/tools-hub.html">View All Tools & Guides &nbsp;&#8594;</a>',
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
    '  <div class="mobile-accordion">',
    '    <div class="accordion-header" onclick="toggleAcc(this)">🛠️ POPULAR TOOLS <span class="acc-arrow">▼</span></div>',
    '    <div class="accordion-content">',
    '      <a class="dm-item" href="/pdf-merger.html">Merge PDF</a>',
    '      <a class="dm-item" href="/pdf-splitter.html">Split PDF</a>',
    '      <a class="dm-item" href="/pdf-compressor.html">Compress PDF</a>',
    '      <a class="dm-item" href="/pdf-unlock.html">Unlock PDF</a>',
    '      <a class="dm-item" href="/percentage-calculator.html">Percentage Calculator</a>',
    '    </div>',
    '  </div>',
    '  <div class="mobile-accordion">',
    '    <div class="accordion-header" onclick="toggleAcc(this)">📚 EXPERT GUIDES <span class="acc-arrow">▼</span></div>',
    '    <div class="accordion-content">',
    '      <a class="dm-item" href="/how-to-merge-pdf-online.html">Merge PDF Guide</a>',
    '      <a class="dm-item" href="/how-to-unlock-pdf-online.html">Unlock PDF Guide</a>',
    '      <a class="dm-item" href="/blog-percentage-calculator.html">Percentage Guide</a>',
    '    </div>',
    '  </div>',
    '  <a class="nl" href="/contact.html">&#9993;&#65039; Contact</a>',
    '  <a class="nl" href="/privacy.html">&#128274; Privacy</a>',
    '</div>'
  ].join("\n");

  /* Global toggle for accordion */
  window.toggleAcc = function(el) {
    el.classList.toggle("active");
    var content = el.nextElementSibling;
    content.style.display = (content.style.display === "flex") ? "none" : "flex";
  };

  /* Inject Navbar Logic */
  var placeholder = document.getElementById("navbar-placeholder") || document.body;
  var wrapper = document.createElement("div");
  wrapper.innerHTML = NAV_HTML + MOBILE_HTML;
  placeholder.insertBefore(wrapper, placeholder.firstChild);

  /* Inject CSS */
  if (!document.getElementById("navbar-auto-css")) {
    var style = document.createElement("style");
    style.id = "navbar-auto-css";
    style.textContent = [
      "#mainNav{position:sticky;top:0;z-index:200;background:rgba(13,13,20,0.97);backdrop-filter:blur(24px);border-bottom:1px solid #2a2a3a;display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:64px;}",
      "#mainNav .logo{font-size:19px;font-weight:800;color:#fff;text-decoration:none;}",
      "#mainNav .logo span{color:#6c63ff;} #mainNav .logo em{color:#ff6584;font-style:normal;}",
      "#mainNav .nav-links{display:flex;align-items:center;gap:5px;}",
      "#mainNav .nl{padding:6px 12px;border-radius:16px;font-size:12px;font-weight:600;color:#6b6b80;text-decoration:none;transition:0.2s;}",
      "#mainNav .nl:hover{color:#f7971e;} #mainNav .nl.act{background:#f7971e;color:#fff;}",
      "#mainNav .dropdown{position:relative;}",
      "#mainNav .dropdown-toggle{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:4px;font-family:inherit;}",
      "#mainNav .mega-menu{display:none;position:absolute;top:100%;right:-50px;width:450px;background:#161623;border:1px solid #2a2a3a;border-radius:16px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,0.5);flex-direction:column;gap:15px;}",
      "#mainNav .dropdown.open .mega-menu{display:flex;}",
      ".mega-columns{display:flex;gap:20px;}",
      ".menu-col{flex:1;display:flex;flex-direction:column;gap:8px;}",
      ".menu-label{font-size:10px;font-weight:800;color:#a78bfa;text-transform:uppercase;margin-bottom:5px;}",
      ".dm-item{display:flex;align-items:center;gap:10px;color:#e8e8f0;text-decoration:none;font-size:13px;padding:8px;border-radius:8px;transition:0.2s;}",
      ".dm-item:hover{background:rgba(167,139,250,0.1);color:#fff;}",
      ".dm-divider{height:1px;background:#2a2a3a;width:100%;}",
      ".dm-all{display:block;text-align:center;padding:12px;background:rgba(167,139,250,0.1);color:#a78bfa;text-decoration:none;border-radius:10px;font-weight:700;font-size:12px;}",
      ".dm-all:hover{background:rgba(167,139,250,0.2);}",
      ".hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;}",
      ".hamburger span{width:22px;height:2px;background:#fff;}",
      "#mobileMenu{display:none;position:fixed;top:64px;left:0;right:0;background:#0d0d14;padding:20px;flex-direction:column;gap:10px;}",
      "#mobileMenu.open{display:flex;}",
      "@media(max-width:850px){ #mainNav .nav-links{display:none;} .hamburger{display:flex;} }"
    ].join("");
    document.head.appendChild(style);
  }

  /* Event Listeners */
  var guidesBtn = document.getElementById("guidesToggleBtn");
  var guidesDd  = document.getElementById("guidesDropdown");
  if (guidesBtn) {
    guidesBtn.onclick = function(e) { e.stopPropagation(); guidesDd.classList.toggle("open"); };
  }
  document.onclick = function() { if(guidesDd) guidesDd.classList.remove("open"); };

  var hamburger = document.getElementById("hamburgerBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  if (hamburger) {
    hamburger.onclick = function() { mobileMenu.classList.toggle("open"); };
  }
})();
