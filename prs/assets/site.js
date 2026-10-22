(() => {
  const root = document.documentElement;
  function setLang(value) {
    const lang = value === 'en' ? 'en' : 'ru';root.lang=lang;
    document.title=lang==='ru'?'Раскройщик ПРС — продольный раскрой и производственный план':'PRS Cutter — Roll Slitting Optimizer and Production Planning';
    document.querySelectorAll('[data-set-lang]').forEach(b=>{const active=b.dataset.setLang===lang;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    document.querySelectorAll('.report-link').forEach(a=>a.href='reports/report-'+lang+'.html');
    document.querySelectorAll('[data-related]').forEach(a=>a.href='https://governorv.github.io/'+a.dataset.related+'/?lang='+lang);
    const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);
    try{localStorage.setItem('packtuning-language',lang);}catch{}
  }
  document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.setLang)));
  const query=new URLSearchParams(location.search).get('lang');
  let saved;try{saved=localStorage.getItem('packtuning-language');}catch{}
  setLang(query||saved||'ru');
  const dialog=document.getElementById('viewer');let trigger;
  document.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{trigger=b;const img=b.querySelector('img');document.getElementById('viewerImage').src=img.src;document.getElementById('viewerImage').alt=img.alt;document.getElementById('viewerCaption').textContent=img.alt;dialog.showModal();}));
  document.getElementById('viewerClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>trigger?.focus());
  function automaticTheme(){const h=new Date().getHours();root.dataset.theme=h>=6&&h<18?'day':'night';}
  automaticTheme();setInterval(automaticTheme,60000);
})();
