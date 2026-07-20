const DAY = "day";
const NIGHT = "night";
const RU = "ru";
const EN = "en";

const header = document.querySelector(".site-header");
const langButtons = {
  ru: document.getElementById("lang-ru"),
  en: document.getElementById("lang-en")
};

const text = {
  ru: {
    title: "Паллетировщик плит — программа для расчета поддонов листовых материалов",
    description: "Паллетировщик плит: программа для оптимальной раскладки фиброцементных, металлических и других листовых материалов по поддонам. Импорт заявок из Excel, расчет поддонов, контроль веса и высоты, печать раскладок.",
    ogTitle: "Паллетировщик плит — расчет поддонов листовых материалов",
    ogDescription: "Программа для паллетизации листовых материалов: импорт заявок из Excel, автоматический расчет поддонов, контроль веса, высоты и цвета, печать производственных раскладок.",
    nav: ["Работа", "Возможности", "Цены", "Другие программы", "Контакты"],
    brand: "Паллетировщик плит",
    heroEyebrow: "Автоматизация раскладки листовых материалов",
    heroTitle: "Паллетировщик плит",
    heroLead: "Программа помогает быстро распределить позиции заявки по поддонам, учесть габариты, цвет, вес и ограничения по высоте, а затем подготовить понятные раскладки для печати.",
    heroPrimary: "Выбрать лицензию",
    heroSecondary: "Посмотреть возможности",
    heroDemo: "Скачать демоверсию",
    heroPresentation: "Презентация",
    metrics: [["Excel", "импорт заявок"], ["Вес", "контроль поддона"], ["Цвет", "разделение партий"]],
    visualTitle: "Готовый отчет для производства",
    visualText: "После расчета программа формирует отчет в табличном виде: служебная записка, параметры поддона, цвет, размеры листов, количество и комментарии для производства.",
    workflowEyebrow: "Процесс",
    workflowTitle: "От заявки до готовой раскладки",
    steps: [
      ["Импорт заявки", "Оператор выбирает Excel-файл, программа считывает позиции, размеры, количество и параметры материала."],
      ["Расчет поддонов", "Алгоритм раскладывает листы по поддонам с учетом цвета, высоты, веса и допустимых ограничений."],
      ["Контроль результата", "В таблицах отображаются поддоны, содержимое каждого поддона и расчетные показатели."],
      ["Печать", "Готовые раскладки можно вывести в отчет и передать на производство или склад."]
    ],
    featuresEyebrow: "Возможности",
    featuresTitle: "Для производства и склада",
    features: [
      ["Импорт из Excel", "Быстрая загрузка заявок без ручного переноса строк и размеров."],
      ["Учет ограничений", "Расчет учитывает длину, ширину, толщину, количество, массу и максимальную высоту поддона."],
      ["Разделение по цветам", "Позиции разных цветов не смешиваются в один производственный поток."],
      ["Прогресс расчета", "Во время длительных расчетов видны этап, прошедшее время и кнопка прерывания."],
      ["Архив заявок", "Рассчитанные заявки можно хранить и возвращаться к ним позже."],
      ["Печать раскладок", "Подготовка понятных документов для операторов линии, склада и отгрузки."]
    ],
    interfaceEyebrow: "Интерфейс",
    interfaceTitle: "Все ключевые таблицы в одном окне",
    interfaceText: "Список заявок, позиции, список поддонов и содержимое выбранного поддона находятся рядом. Это удобно для проверки результата и повторной печати.",
    pricingEyebrow: "Лицензии",
    pricingTitle: "Стоимость",
    priceCards: [
      ["Постоянная лицензия", "Покупка", "29 900 ₽", "Оптимально для постоянного использования на производстве.", "Заказать"],
      ["Подписка", "На год", "10 000 ₽", "Удобно для сезонной загрузки или пилотного внедрения.", "Оформить"],
      ["Гибкий старт", "На месяц", "1 000 ₽", "Подходит для проверки программы на реальных заявках.", "Попробовать"]
    ],
    otherEyebrow: "Каталог",
    otherTitle: "Познакомьтесь также с другими моими программами",
    otherButton: "Страница",
    otherCards: [
      ["Проектировщик бутылок", "Оптимизация бутылки, ящика, решётки и паллетной укладки."],
      ["Фасовщик", "Оптимальная укладка изделий в ящик, расчет заполнения и PDF-отчет."],
      ["Паллетировщик", "Расчет укладки коробов на поддон, 3D-визуализация, ограничения и отчеты."],
      ["Калькулятор гофроящиков", "Расчет себестоимости гофроупаковки с учетом материалов, печати и дополнительных расходов."],
      ["Поисковик по базам данных", "Поиск объектов и данных в SQL Server, просмотр кода, фильтры и экспорт результатов."],
      ["Менеджер лицензий", "Учет лицензий, контроль сроков действия, ответственные, уведомления и экспорт в Excel."],
      ["Раскройщик", "Оптимизация раскроя полотна гофрокартона, карты раскроя, сетевой график и отчеты Excel."],
      ["Расчет нагрузки по ГОСТ 9142-2014", "Расчет характеристик гофроящика, подбор марки гофрокартона и PDF-отчет."],
      ["TruckLoader", "Расчет загрузки поддонов в автофургоны и контейнеры, 2D и 3D схемы."]
    ],
    contactEyebrow: "Заказ и внедрение",
    contactTitle: "Подберите вариант лицензии под вашу загрузку",
    contactText: "Можно начать с месяца, проверить расчет на своих Excel-заявках и затем перейти на годовую или постоянную лицензию.",
    contactButton: "Написать",
    footer: "Оптимальное распределение листовых материалов по поддонам"
  },
  en: {
    title: "Sheet Palletizer — pallet calculation software for sheet materials",
    description: "Sheet Palletizer is Windows software for optimal distribution of fiber cement, metal and other sheet materials onto pallets. Excel order import, pallet calculation, weight and height control, printable layouts.",
    ogTitle: "Sheet Palletizer — pallet calculation for sheet materials",
    ogDescription: "Software for palletizing sheet materials: Excel order import, automatic pallet calculation, weight, height and color control, printable production layouts.",
    nav: ["Workflow", "Features", "Pricing", "Other software", "Contact"],
    brand: "Sheet Palletizer",
    heroEyebrow: "Sheet material layout automation",
    heroTitle: "Sheet Palletizer",
    heroLead: "The program helps distribute order lines across pallets, account for dimensions, color, weight and height limits, and prepare clear printable layouts.",
    heroPrimary: "Choose license",
    heroSecondary: "View features",
    heroDemo: "Download demo",
    heroPresentation: "Presentation",
    metrics: [["Excel", "order import"], ["Weight", "pallet control"], ["Color", "batch separation"]],
    visualTitle: "Production-ready report",
    visualText: "After calculation, the program generates a spreadsheet-style report: memo fields, pallet parameters, color, sheet dimensions, quantities and production comments.",
    workflowEyebrow: "Workflow",
    workflowTitle: "From order to finished layout",
    steps: [
      ["Order import", "The operator selects an Excel file, and the program reads items, dimensions, quantities and material parameters."],
      ["Pallet calculation", "The algorithm lays sheets onto pallets while respecting color, height, weight and allowed limits."],
      ["Result control", "Tables show pallets, each pallet's contents and calculated indicators."],
      ["Printing", "Finished layouts can be exported to a report for production or warehouse teams."]
    ],
    featuresEyebrow: "Features",
    featuresTitle: "For production and warehouse teams",
    features: [
      ["Excel import", "Fast order loading without manual copying of rows and dimensions."],
      ["Constraint control", "Calculation accounts for length, width, thickness, quantity, weight and maximum pallet height."],
      ["Color separation", "Items of different colors stay separated in the production flow."],
      ["Calculation progress", "Long calculations show stage, elapsed time and a cancel button."],
      ["Order archive", "Calculated orders can be stored and reopened later."],
      ["Layout printing", "Clear documents for line operators, warehouse and shipping."]
    ],
    interfaceEyebrow: "Interface",
    interfaceTitle: "All key tables in one window",
    interfaceText: "Order list, order lines, pallet list and selected pallet contents are side by side, which makes checking and reprinting easier.",
    pricingEyebrow: "Licenses",
    pricingTitle: "Pricing",
    priceCards: [
      ["Perpetual license", "Purchase", "€299", "Best for regular production use.", "Order"],
      ["Subscription", "Annual", "€100", "Convenient for seasonal workload or pilot adoption.", "Subscribe"],
      ["Flexible start", "Monthly", "€10", "Good for testing the program on real orders.", "Try"]
    ],
    otherEyebrow: "Catalog",
    otherTitle: "Explore my other software as well",
    otherButton: "Page",
    otherCards: [
      ["Bottle Optimizer", "Optimize bottle geometry, box, divider and pallet layout for minimum total cost."],
      ["Box Packing Optimizer", "Optimal product placement in boxes, fill calculation and PDF reporting."],
      ["Box Palletizer", "Plan box stacking on pallets with 3D visualization, constraints and exportable reports."],
      ["Corrugated Box Cost Calculator", "Estimate corrugated packaging costs with materials, printing and additional expenses."],
      ["Database Search", "Search SQL Server objects and data, view code, filter results and export reports."],
      ["License Manager", "Track licenses, expiration dates, owners, notifications and Excel exports."],
      ["OptCutting", "Corrugated board cutting optimization with cutting maps, Gantt schedule and Excel reports."],
      ["GOST 9142-2014 Load Calculator", "Corrugated box load, board grade calculation and PDF report export."],
      ["TruckLoader", "Pallet loading calculation for trucks and containers with 2D and 3D layouts."]
    ],
    contactEyebrow: "Order and implementation",
    contactTitle: "Choose a license for your workload",
    contactText: "You can start with one month, check calculations on your Excel orders, and then switch to annual or perpetual licensing.",
    contactButton: "Email",
    footer: "Optimal pallet distribution for sheet materials"
  }
};

function by(selector) {
  return document.querySelector(selector);
}

function all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function setText(selector, value) {
  const element = by(selector);
  if (element) element.textContent = value;
}

function setMetaContent(selector, value) {
  const element = by(selector);
  if (element) element.content = value;
}

function setPair(article, values) {
  if (!article || !values) return;
  const title = article.querySelector("h3");
  const paragraph = article.querySelector("p");
  if (title) title.textContent = values[0];
  if (paragraph) paragraph.textContent = values[1];
}

function applyLanguage(lang) {
  const t = text[lang];
  document.documentElement.lang = lang;
  document.title = t.title;
  const description = by('meta[name="description"]');
  if (description) description.content = t.description;
  setMetaContent('meta[property="og:title"]', t.ogTitle);
  setMetaContent('meta[property="og:description"]', t.ogDescription);
  setMetaContent('meta[property="og:locale"]', lang === EN ? "en_US" : "ru_RU");
  setMetaContent('meta[name="twitter:title"]', t.ogTitle);
  setMetaContent('meta[name="twitter:description"]', t.ogDescription);

  setText(".brand span", t.brand);
  all(".top-nav a").forEach((link, index) => {
    if (t.nav[index]) link.textContent = t.nav[index];
  });

  setText(".hero-copy .eyebrow", t.heroEyebrow);
  setText(".hero-copy h1", t.heroTitle);
  setText(".hero-copy .lead", t.heroLead);
  setText(".hero-actions .primary", t.heroPrimary);
  setText(".hero-actions .secondary", t.heroSecondary);
  setText(".hero-actions .demo-download", t.heroDemo);
  setText(".hero-actions .presentation-link", t.heroPresentation);
  all(".hero-metrics div").forEach((item, index) => {
    const values = t.metrics[index];
    if (!values) return;
    const strong = item.querySelector("strong");
    const span = item.querySelector("span");
    if (strong) strong.textContent = values[0];
    if (span) span.textContent = values[1];
  });

  setText(".visual-copy h2", t.visualTitle);
  setText(".visual-copy p", t.visualText);
  setText("#workflow .section-heading .eyebrow", t.workflowEyebrow);
  setText("#workflow .section-heading h2", t.workflowTitle);
  all(".steps article").forEach((article, index) => setPair(article, t.steps[index]));
  setText("#features .section-heading .eyebrow", t.featuresEyebrow);
  setText("#features .section-heading h2", t.featuresTitle);
  all(".feature-grid article").forEach((article, index) => setPair(article, t.features[index]));
  setText(".screenshot-copy .eyebrow", t.interfaceEyebrow);
  setText(".screenshot-copy h2", t.interfaceTitle);
  setText(".screenshot-copy p:not(.eyebrow)", t.interfaceText);
  setText("#pricing .section-heading .eyebrow", t.pricingEyebrow);
  setText("#pricing .section-heading h2", t.pricingTitle);
  all(".price-card").forEach((card, index) => {
    const values = t.priceCards[index];
    if (!values) return;
    const fields = [".tag", "h3", ".price", "p:not(.price)", ".button"];
    fields.forEach((selector, fieldIndex) => setTextIn(card, selector, values[fieldIndex]));
  });
  setText("#other-programs .section-heading .eyebrow", t.otherEyebrow);
  setText("#other-programs .section-heading h2", t.otherTitle);
  all(".other-program-card").forEach((card, index) => {
    setPair(card, t.otherCards[index]);
    const button = card.querySelector(".button");
    if (button) button.textContent = t.otherButton;
  });
  all("[data-ru-href][data-en-href]").forEach((link) => {
    link.href = lang === EN ? link.dataset.enHref : link.dataset.ruHref;
  });
  all("[data-ru-src][data-en-src]").forEach((image) => {
    image.src = lang === EN ? image.dataset.enSrc : image.dataset.ruSrc;
  });
  all("[data-ru-only]").forEach((node) => {
    node.hidden = lang !== RU;
  });
  setText(".contact .eyebrow", t.contactEyebrow);
  setText(".contact h2", t.contactTitle);
  setText(".contact p:not(.eyebrow)", t.contactText);
  setText(".contact .button", t.contactButton);
  const footerSpans = all(".site-footer span");
  if (footerSpans[0]) footerSpans[0].textContent = t.title;
  if (footerSpans[1]) footerSpans[1].textContent = t.footer;

  Object.values(langButtons).forEach((button) => button.classList.remove("active"));
  langButtons[lang].classList.add("active");
  try { localStorage.setItem("palletizer-lang", lang); } catch (e) {}
}

function setTextIn(parent, selector, value) {
  const element = parent.querySelector(selector);
  if (element) element.textContent = value;
}

function automaticTheme() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? DAY : NIGHT;
}

function applyTheme(theme) {
  const next = theme === NIGHT ? NIGHT : DAY;
  document.documentElement.classList.toggle("day-theme", next === DAY);
  document.documentElement.classList.toggle("night-theme", next === NIGHT);
}

function initialLanguage() {
  const hash = (window.location.hash || "").toLowerCase();
  if (hash === "#en") return EN;
  if (hash === "#ru") return RU;
  try {
    const saved = localStorage.getItem("palletizer-lang");
    if (saved === EN || saved === RU) return saved;
  } catch (e) {}
  return RU;
}

function initialTheme() {
  return automaticTheme();
}

window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 24 ? "0 12px 34px rgba(0, 0, 0, 0.28)" : "none";
});

langButtons.ru.addEventListener("click", () => applyLanguage(RU));
langButtons.en.addEventListener("click", () => applyLanguage(EN));

window.addEventListener("hashchange", () => {
  const hash = (window.location.hash || "").toLowerCase();
  if (hash === "#en") applyLanguage(EN);
  if (hash === "#ru") applyLanguage(RU);
});

applyLanguage(initialLanguage());
applyTheme(initialTheme());
setInterval(() => {
  applyTheme(automaticTheme());
}, 60 * 1000);
