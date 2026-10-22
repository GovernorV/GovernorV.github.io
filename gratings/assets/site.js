(() => {
  'use strict';
  const root = document.documentElement;
  const descriptions = {
    ru: 'Расчёт самосборных перегородок: размерные чертежи, параметры пачки, укладка на поддон и PDF-отчёт. JSON, 10 языков, демоверсия, Standard и PRO с дежурством и JSON-интеграцией.',
    en: 'Design self-assembly cardboard dividers with dimensioned drawings, bundle sizes, pallet layouts and PDF reports. JSON input, 10 interface languages, demo, Standard and PRO licenses with watch mode and JSON integration.'
  };
  function setLang(value) {
    const lang = value === 'en' ? 'en' : 'ru';
    root.lang = lang;
    document.title = lang === 'ru' ? 'Самосборные решётки — перегородки, пачки и укладка на поддон' : 'Self-assembly Dividers — partitions, bundles and pallet layouts';
    document.querySelector('meta[name="description"]').content = descriptions[lang];
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = descriptions[lang];
    document.querySelector('meta[property="og:image"]').content = 'https://governorv.github.io/gratings/assets/hero-' + lang + '.png';
    document.querySelectorAll('[data-set-lang]').forEach(button => {
      const active = button.dataset.setLang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.catalog-link').forEach(link => link.href = '/?lang=' + lang);
    document.querySelectorAll('.order-link').forEach(link => {
      const names = { purchase: {ru:'покупка Standard',en:'Standard purchase'}, annual:{ru:'годовая аренда Standard',en:'Standard annual rental'}, monthly:{ru:'месячная аренда Standard',en:'Standard monthly rental'}, standard:{ru:'Standard',en:'Standard'}, pro_purchase:{ru:'покупка PRO',en:'PRO purchase'}, pro_annual:{ru:'годовая аренда PRO',en:'PRO annual rental'}, pro_monthly:{ru:'месячная аренда PRO',en:'PRO monthly rental'} };
      const name = names[link.dataset.license][lang];
      const title = lang === 'ru' ? 'Самосборные решётки' : 'Self-assembly Dividers';
      const body = lang === 'ru' ? 'Здравствуйте! Меня интересует программа «Самосборные решётки», ' + name + '.\n\nРеквизиты для счёта:\n' : 'Hello! I am interested in Self-assembly Dividers, ' + name + '.\n\nBilling details:\n';
      link.href = 'mailto:vguberniev@gmail.com?subject=' + encodeURIComponent(title + ' — ' + name) + '&body=' + encodeURIComponent(body);
    });
    const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState(null, '', url);
    try { localStorage.setItem('packtuning-language', lang); } catch (_) {}
  }
  document.querySelectorAll('[data-set-lang]').forEach(button => button.addEventListener('click', () => setLang(button.dataset.setLang)));
  let saved; try { saved = localStorage.getItem('packtuning-language'); } catch (_) {}
  setLang(new URLSearchParams(location.search).get('lang') || saved || 'ru');
  function automaticTheme() { const h = new Date().getHours(); root.dataset.theme = h >= 6 && h < 18 ? 'day' : 'night'; }
  automaticTheme(); setInterval(automaticTheme, 60000);
  const dialog = document.getElementById('viewer');
  let trigger;
  document.querySelectorAll('.zoom').forEach(button => button.addEventListener('click', () => {
    trigger = button;
    const source = button.querySelector('img');
    document.getElementById('viewerImage').src = source.src;
    document.getElementById('viewerImage').alt = source.alt;
    document.getElementById('viewerCaption').textContent = source.alt;
    dialog.showModal();
  }));
  document.getElementById('viewerClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => trigger?.focus());
})();
