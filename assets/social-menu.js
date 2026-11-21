(() => {
    const link = document.createElement('a');
    link.href = 'https://www.instagram.com/packtuning/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (document.querySelector('header .social-menu')) return;
    const selectors = ['header .language', 'header .lang','header .language-switch','header .toolbar','header .controls','header .navlinks','header .nav-links','header .switch','.topbar .lang-switch','header nav','header .inner','header','.topbar'];
    const menu = selectors.map((selector) => document.querySelector(selector)).find(Boolean);
    if (!link || !menu) return;
    link.removeAttribute('style');
    link.className = 'instagram-menu-link';
    link.setAttribute('aria-label', 'Instagram PackTuning');
    link.setAttribute('title', 'Instagram @packtuning');
    link.textContent = '';
    const glyph = document.createElement('span');
    glyph.className = 'instagram-glyph';
    glyph.setAttribute('aria-hidden', 'true');
    link.append(glyph);
    const socialMenu = document.createElement('div');
    socialMenu.className = 'social-menu';
    socialMenu.append(link);
    const russianSocials = [
      { href: 'https://www.facebook.com/groups/1561529331198175', label: 'Группа PackTuning в Facebook', brand: 'facebook', glyph: 'f' },
      { href: 'https://www.linkedin.com/groups/10072044/', label: 'Группа PackTuning в LinkedIn', brand: 'linkedin', glyph: 'in' },
      { href: 'https://vk.ru/club79622771', label: 'Группа PackTuning ВКонтакте', brand: 'vk', glyph: 'VK' }
    ].map(({ href, label, brand, glyph: mark }) => {
      const social = document.createElement('a');
      social.href = href;
      social.target = '_blank';
      social.rel = 'noopener noreferrer';
      social.className = 'social-menu-link social-ru ' + brand;
      social.setAttribute('aria-label', label);
      social.title = label;
      const icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = mark;
      social.append(icon);
      return social;
    });
    socialMenu.append(...russianSocials);
    const controlsCluster = document.createElement('div');
    controlsCluster.className = 'social-language-cluster';
    const languageBox = menu.matches('.language, .lang, .language-switch, .switch, .lang-switch');
    if (languageBox && menu.parentElement) {
      menu.before(controlsCluster);
      controlsCluster.append(socialMenu, menu);
    } else {
      const languageControls = [...menu.querySelectorAll(':scope > button')];
      const firstLanguageControl = languageControls[0];
      if (firstLanguageControl) menu.insertBefore(controlsCluster, firstLanguageControl);
      else menu.append(controlsCluster);
      controlsCluster.append(socialMenu, ...languageControls);
    }
    const syncRussianSocials = () => {
      const isRussian = (document.documentElement.lang || 'ru').toLowerCase().startsWith('ru');
      russianSocials.forEach((social) => { social.hidden = !isRussian; });
    };
    new MutationObserver(syncRussianSocials).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    syncRussianSocials();
  })();

