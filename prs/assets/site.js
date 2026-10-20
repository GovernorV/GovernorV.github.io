(() => {
  const root = document.documentElement;
  let programs = [];
  function renderGarland(lang) {
    const track = document.getElementById('garland'); if(!track)return; track.replaceChildren();
    for (const p of programs) {
      const a = document.createElement('a'); a.className = 'pt-program-garland-item';
      a.href = p.url[lang]; a.title = p.title[lang];
      if (p.current) a.setAttribute('aria-current','page');
      const img = document.createElement('img'); img.className='pt-program-garland-icon'; img.src=p.icon;img.alt='';img.width=p.current?72:48;img.height=img.width;
      const label=document.createElement('span');label.className='pt-program-garland-label';label.textContent=p.title[lang];a.append(img,label);track.append(a);
    }
  }
  function setLang(value) {
    const lang = value === 'en' ? 'en' : 'ru';root.lang=lang;
    document.title=lang==='ru'?'Раскройщик ПРС — продольный раскрой и производственный план':'PRS Cutter — Roll Slitting Optimizer and Production Planning';
    document.querySelectorAll('[data-set-lang]').forEach(b=>{const active=b.dataset.setLang===lang;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    document.querySelectorAll('.report-link').forEach(a=>a.href='reports/report-'+lang+'.html');
    document.querySelectorAll('[data-related]').forEach(a=>a.href='https://governorv.github.io/'+a.dataset.related+'/?lang='+lang);
    const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);
    try{localStorage.setItem('packtuning-language',lang);}catch{}
    renderGarland(lang);
  }
  document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.setLang)));
  const query=new URLSearchParams(location.search).get('lang');
  let saved;try{saved=localStorage.getItem('packtuning-language');}catch{}
  setLang(query||saved||'ru');
  fetch('assets/programs.json').then(r=>r.json()).then(p=>{programs=p;renderGarland(root.lang);}).catch(()=>{});
  const dialog=document.getElementById('viewer');let trigger;
  document.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{trigger=b;const img=b.querySelector('img');document.getElementById('viewerImage').src=img.src;document.getElementById('viewerImage').alt=img.alt;document.getElementById('viewerCaption').textContent=img.alt;dialog.showModal();}));
  document.getElementById('viewerClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>trigger?.focus());
  function automaticTheme(){const h=new Date().getHours();root.dataset.theme=h>=6&&h<18?'day':'night';}
  automaticTheme();setInterval(automaticTheme,60000);
})();
