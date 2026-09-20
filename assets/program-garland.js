(() => {
  "use strict";

  const BASE = "https://governorv.github.io";
  const STYLE_ID = "pt-program-garland-style";
  const GARLAND_ID = "pt-program-garland";

  const PRODUCTS = {
    packsizer: {
      title: { ru: "Развесчик", en: "PackSizer" },
      icon: "/assets/icons/packsize.png",
      url: { ru: "/PackSizer/", en: "/PackSizer/en.html" }
    },
    optcutting: {
      title: { ru: "Раскройщик", en: "OptCutting" },
      icon: "/assets/icons/optcutting.png",
      url: { ru: "/OptCutting/?lang=ru", en: "/OptCutting/?lang=en" }
    },
    optpacker: {
      title: { ru: "Фасовщик", en: "Box Packing Optimizer" },
      icon: "/assets/icons/fasovshik.png",
      url: { ru: "/OptPacker/?lang=ru", en: "/OptPacker/?lang=en" }
    },
    gost914290: {
      title: { ru: "Расчёт нагрузки", en: "GOST Load Calculator" },
      icon: "/assets/icons/gost.png",
      url: { ru: "/gost/?lang=ru", en: "/gost/?lang=en" }
    },
    boxpalletizer: {
      title: { ru: "Паллетировщик", en: "Box Palletizer" },
      icon: "/assets/icons/palletizer.png",
      url: { ru: "/BoxPalletizer/#ru", en: "/BoxPalletizer/#en" }
    },
    truckloader: {
      title: { ru: "TruckLoader", en: "TruckLoader" },
      icon: "/assets/icons/truckloader.png",
      url: { ru: "/truckloader-site/?lang=ru", en: "/truckloader-site/?lang=en" }
    },
    boxpricecalculator: {
      title: { ru: "Калькулятор гофроящиков", en: "Box Price Calculator" },
      icon: "/assets/icons/boxprice.png",
      url: { ru: "/BoxPriceCalculator/#ru", en: "/BoxPriceCalculator/#en" }
    },
    standards: {
      title: { ru: "Справочник ГОСТов", en: "GOST Standards Guide" },
      icon: "/assets/icons/standards.jpg",
      url: { ru: "/Standards/?lang=ru", en: "/Standards/?lang=en" }
    },
    platepalletizer: {
      title: { ru: "Паллетировщик плит", en: "Sheet Palletizer" },
      icon: "/assets/icons/platepalletizer.png",
      url: { ru: "/palletizer-site/#ru", en: "/palletizer-site/#en" }
    },
    dbsearch: {
      title: { ru: "Поисковик по базам", en: "Database Search Tool" },
      icon: "/assets/icons/dbsearch.png",
      url: { ru: "/DBSearch/#ru", en: "/DBSearch/#en" }
    },
    licman: {
      title: { ru: "Менеджер лицензий", en: "License Manager" },
      icon: "/assets/icons/licman.png",
      url: { ru: "/Licman/#ru", en: "/Licman/#en" }
    },
    pojas: {
      title: { ru: "ПОЯС", en: "POJAS" },
      icon: "/assets/icons/pojas.png",
      url: { ru: "/Pojas/?lang=ru", en: "/Pojas/?lang=en" }
    },
    bottleoptimizer: {
      title: { ru: "Проектировщик бутылок", en: "Bottle Optimizer" },
      icon: "/assets/icons/bottleoptimizer.png",
      url: { ru: "/BottleOptimizer/?lang=ru", en: "/BottleOptimizer/?lang=en" }
    },
    gofrotechcard: {
      title: { ru: "ГофроТехкарта", en: "Corrugated Box Tech Card" },
      icon: "/assets/icons/techcard.png",
      url: { ru: "/GofroTechCard/?lang=ru", en: "/GofroTechCard/?lang=en" }
    },
    boxtypes: {
      title: { ru: "Конструктор типов ящиков", en: "Corrugated Box Type Designer" },
      icon: "/assets/icons/boxtypes.png",
      url: { ru: "/BoxTypes/?lang=ru", en: "/BoxTypes/?lang=en" }
    },
    unificator: {
      title: { ru: "Унификатор гофроящиков", en: "Corrugated Box Unifier" },
      icon: "/assets/icons/unificator.png",
      url: { ru: "/Unificator/?lang=ru", en: "/Unificator/?lang=en" }
    }
  };

  const RELEVANCE = {
    optcutting: ["gofrotechcard", "boxpricecalculator", "standards", "gost914290", "boxtypes", "optpacker", "boxpalletizer", "pojas", "unificator", "truckloader", "platepalletizer", "bottleoptimizer", "dbsearch", "licman"],
    optpacker: ["unificator", "boxpalletizer", "standards", "gost914290", "boxpricecalculator", "optcutting", "gofrotechcard", "bottleoptimizer", "truckloader", "pojas", "boxtypes", "platepalletizer", "dbsearch", "licman"],
    gost914290: ["standards", "boxpricecalculator", "unificator", "optcutting", "gofrotechcard", "boxtypes", "optpacker", "boxpalletizer", "pojas", "bottleoptimizer", "truckloader", "platepalletizer", "dbsearch", "licman"],
    boxpalletizer: ["truckloader", "optpacker", "boxpricecalculator", "standards", "gost914290", "unificator", "pojas", "optcutting", "gofrotechcard", "platepalletizer", "bottleoptimizer", "boxtypes", "dbsearch", "licman"],
    truckloader: ["boxpalletizer", "platepalletizer", "optpacker", "unificator", "pojas", "boxpricecalculator", "standards", "gost914290", "optcutting", "gofrotechcard", "bottleoptimizer", "boxtypes", "dbsearch", "licman"],
    boxpricecalculator: ["optcutting", "gofrotechcard", "standards", "gost914290", "boxpalletizer", "unificator", "optpacker", "boxtypes", "pojas", "truckloader", "platepalletizer", "bottleoptimizer", "dbsearch", "licman"],
    standards: ["gost914290", "unificator", "optcutting", "optpacker", "boxpricecalculator", "gofrotechcard", "boxtypes", "boxpalletizer", "bottleoptimizer", "pojas", "truckloader", "platepalletizer", "dbsearch", "licman"],
    platepalletizer: ["optcutting", "truckloader", "boxpalletizer", "pojas", "boxpricecalculator", "gofrotechcard", "standards", "gost914290", "optpacker", "unificator", "bottleoptimizer", "boxtypes", "dbsearch", "licman"],
    dbsearch: ["licman", "pojas", "standards", "gofrotechcard", "boxpricecalculator", "optcutting", "optpacker", "boxpalletizer", "truckloader", "platepalletizer", "unificator", "boxtypes", "gost914290", "bottleoptimizer"],
    licman: ["dbsearch", "pojas", "standards", "gofrotechcard", "boxpricecalculator", "optcutting", "optpacker", "boxpalletizer", "truckloader", "platepalletizer", "unificator", "boxtypes", "gost914290", "bottleoptimizer"],
    pojas: ["optcutting", "optpacker", "boxpalletizer", "truckloader", "standards", "gost914290", "boxpricecalculator", "gofrotechcard", "boxtypes", "unificator", "bottleoptimizer", "platepalletizer", "dbsearch", "licman"],
    bottleoptimizer: ["optpacker", "unificator", "boxpalletizer", "standards", "boxpricecalculator", "gost914290", "boxtypes", "truckloader", "optcutting", "gofrotechcard", "pojas", "platepalletizer", "dbsearch", "licman"],
    gofrotechcard: ["optcutting", "boxpricecalculator", "standards", "boxtypes", "gost914290", "boxpalletizer", "optpacker", "unificator", "pojas", "truckloader", "platepalletizer", "bottleoptimizer", "dbsearch", "licman"],
    boxtypes: ["gofrotechcard", "standards", "unificator", "optcutting", "boxpricecalculator", "gost914290", "optpacker", "boxpalletizer", "pojas", "bottleoptimizer", "truckloader", "platepalletizer", "dbsearch", "licman"],
    unificator: ["standards", "gost914290", "boxtypes", "optpacker", "boxpricecalculator", "boxpalletizer", "truckloader", "optcutting", "gofrotechcard", "bottleoptimizer", "pojas", "platepalletizer", "dbsearch", "licman"]
  };

  // Include every registered program once, preserving the relevance order.
  for (const id of Object.keys(PRODUCTS)) {
    RELEVANCE[id] = [...new Set([...(RELEVANCE[id] || []), ...Object.keys(PRODUCTS)])].filter(other => other !== id);
  }

  const ROUTES = {
    packsizer: "packsizer",
    optcutting: "optcutting",
    optpacker: "optpacker",
    gost: "gost914290",
    boxpalletizer: "boxpalletizer",
    "truckloader-site": "truckloader",
    boxpricecalculator: "boxpricecalculator",
    standards: "standards",
    "palletizer-site": "platepalletizer",
    dbsearch: "dbsearch",
    licman: "licman",
    pojas: "pojas",
    bottleoptimizer: "bottleoptimizer",
    gofrotechcard: "gofrotechcard",
    boxtypes: "boxtypes",
    unificator: "unificator"
  };

  const PLACEMENT = {
    packsizer: { selector: ".hero-banner", last: false },
    optcutting: { selector: "section.hero", last: false },
    optpacker: { selector: ".hero-banner", last: true },
    gost914290: { selector: ".top-banner", last: false },
    boxpalletizer: { selector: ".site-banner", last: false },
    truckloader: { selector: ".banner", last: false },
    boxpricecalculator: { selector: ".top-banner", last: false },
    standards: { selector: "#hero", last: false },
    platepalletizer: { selector: ".top-banner", last: false },
    dbsearch: { selector: ".site-banner", last: false },
    licman: { selector: "section.hero", last: false },
    pojas: { selector: "section.hero", last: false },
    bottleoptimizer: { selector: ".hero-image", last: true },
    gofrotechcard: { selector: "#top.hero-banner", last: false },
    boxtypes: { selector: "picture.top-banner", last: false },
    unificator: { selector: ".hero-banner", last: true }
  };

  const route = window.location.pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  const currentId = ROUTES[route];
  if (!currentId || !PRODUCTS[currentId]) return;

  if (!document.getElementById(STYLE_ID)) {
    const stylesheet = document.createElement("link");
    stylesheet.id = STYLE_ID;
    stylesheet.rel = "stylesheet";
    stylesheet.href = BASE + "/assets/program-garland.css?v=20260913-1";
    document.head.appendChild(stylesheet);
  }

  const placement = PLACEMENT[currentId];
  const anchors = document.querySelectorAll(placement.selector);
  const anchor = placement.last ? anchors[anchors.length - 1] : anchors[0];
  if (!anchor) return;

  const nav = document.createElement("nav");
  nav.id = GARLAND_ID;
  nav.className = "pt-program-garland";
  const track = document.createElement("div");
  track.className = "pt-program-garland-track";
  nav.appendChild(track);
  anchor.insertAdjacentElement("afterend", nav);

  let renderedLanguage = "";

  function detectLanguage() {
    const rootLanguage = document.documentElement.dataset.lang;
    if (rootLanguage === "ru" || rootLanguage === "en") return rootLanguage;

    const visibleMain = [...document.querySelectorAll("main[data-lang]")].find((main) => {
      if (main.hidden || main.classList.contains("hidden")) return false;
      return window.getComputedStyle(main).display !== "none";
    });
    const mainLanguage = visibleMain?.dataset.lang;
    if (mainLanguage === "ru" || mainLanguage === "en") return mainLanguage;

    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    if (queryLanguage === "ru" || queryLanguage === "en") return queryLanguage;

    const hashLanguage = window.location.hash.slice(1).toLowerCase();
    if (hashLanguage === "ru" || hashLanguage === "en") return hashLanguage;

    return (document.documentElement.lang || navigator.language || "ru").toLowerCase().startsWith("en") ? "en" : "ru";
  }

  function render() {
    const language = detectLanguage();
    if (language === renderedLanguage) return;
    renderedLanguage = language;
    nav.setAttribute("aria-label", language === "en" ? "Other PackTuning programs" : "Другие программы PackTuning");
    track.replaceChildren();

    const order = [currentId, ...RELEVANCE[currentId]];
    if (currentId !== "packsizer") {
      order.splice(order.indexOf("packsizer"), 1);
      order.splice(order.indexOf("bottleoptimizer"), 0, "packsizer");
    }
    for (const id of order) {
      const product = PRODUCTS[id];
      if (!product) continue;

      const link = document.createElement("a");
      link.className = "pt-program-garland-item";
      link.dataset.program = id;
      link.href = BASE + product.url[language];
      link.target = "_blank";
      link.rel = "noopener";
      link.title = product.title[language];
      if (id === currentId) link.setAttribute("aria-current", "page");

      const icon = document.createElement("img");
      icon.className = "pt-program-garland-icon";
      icon.src = BASE + product.icon;
      icon.alt = "";
      icon.width = id === currentId ? 72 : 48;
      icon.height = id === currentId ? 72 : 48;
      icon.loading = id === currentId ? "eager" : "lazy";

      const label = document.createElement("span");
      label.className = "pt-program-garland-label";
      label.textContent = product.title[language];

      link.append(icon, label);
      track.appendChild(link);
    }
    track.scrollLeft = 0;
  }

  let renderQueued = false;
  function queueRender() {
    if (renderQueued) return;
    renderQueued = true;
    window.setTimeout(() => {
      renderQueued = false;
      render();
    }, 0);
  }

  render();
  window.addEventListener("hashchange", queueRender);
  window.addEventListener("popstate", queueRender);
  document.addEventListener("click", queueRender, true);
  new MutationObserver(queueRender).observe(document.documentElement, {
    subtree: true,
    attributes: true,
    attributeFilter: ["lang", "data-lang", "class", "hidden"]
  });
})();
