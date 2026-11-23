(()=>{'use strict';
const root=document.documentElement,defaultOrigin='https://packtuning-kdm-planner.vguberniev.chatgpt.site';
const download={ru:'https://disk.yandex.ru/d/C6yA4jDau-R4Sw',en:'https://mega.nz/file/G5QhSCxB#rZ9t8LJuPL0U_AeWYK1h4hWcvOD-jfeoSifg97kLUoU'};
const meta={ru:{title:'Планировщик КДМ — план производства и раскрои | PackTuning',description:'Планирование КДМ, ПРС, листорезки и ККМ. Заказы, раскрои, графики, материальный баланс и PDF. Демоверсия и лицензии.',alt:'Планировщик КДМ — планирование картоноделательной машины'},en:{title:'Board Machine Planner — production scheduling | PackTuning',description:'Board-machine, slitter, sheet-cutter and gluing-machine scheduling. Orders, cutting layouts, equipment timelines, material balance and PDF reports. Demo and licenses.',alt:'Board Machine Planner — production scheduling for board machines'}};
let language='ru';try{language=new URLSearchParams(location.search).get('lang')||localStorage.getItem('kdm-planner-language')||((navigator.language||'').startsWith('ru')?'ru':'en')}catch(e){}
function applyLanguage(value){language=value==='en'?'en':'ru';root.lang=language;root.dataset.lang=language;
 document.querySelectorAll('[data-ru][data-en]').forEach(n=>n.textContent=n.dataset[language]);
 document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
 document.getElementById('hero-source').srcset=`assets/hero-${language}.webp`;
 const hero=document.getElementById('hero-image');hero.src=`assets/hero-${language}.png`;hero.alt=meta[language].alt;
 document.querySelectorAll('[data-src-ru]').forEach(n=>n.src=n.dataset[language==='ru'?'srcRu':'srcEn']);
 document.querySelectorAll('[data-image]').forEach(n=>n.src=`assets/${n.dataset.image}-${language}.webp`);
 document.querySelectorAll('[data-related-image]').forEach(n=>n.src=`assets/related-${n.dataset.relatedImage}-${language}.webp`);
 document.querySelectorAll('[data-alt-ru]').forEach(n=>n.alt=n.dataset[language==='ru'?'altRu':'altEn']);
 document.querySelectorAll('[data-demo]').forEach(n=>n.href=download[language]);
 document.querySelectorAll('[data-report]').forEach(n=>n.href=`assets/sample-report-${language}.pdf`);
 document.querySelectorAll('[data-catalog]').forEach(n=>n.href=`https://governorv.github.io/?lang=${language}`);
 document.querySelectorAll('[data-related]').forEach(n=>n.href=`https://governorv.github.io/${n.dataset.related?n.dataset.related+'/':''}?lang=${language}`);
 document.querySelectorAll('[data-mail]').forEach(n=>n.href='mailto:vguberniev@gmail.com?subject='+encodeURIComponent(language==='ru'?'Планировщик КДМ — заявка на лицензию':'Board Machine Planner — license request'));
 document.title=meta[language].title;document.querySelector('meta[name=description]').content=meta[language].description;
 const origin=/localhost|127\.0\.0\.1/.test(location.hostname)?defaultOrigin:location.origin;
 const base=origin+location.pathname.replace(/index\.html$/,'').replace(/\/?$/,'/');const canonical=base+(language==='en'?'?lang=en':'');
 document.querySelector('link[rel=canonical]').href=canonical;
 for(const [key,value] of Object.entries({'og:title':meta[language].title,'og:description':meta[language].description,'og:url':canonical,'og:image':base+`assets/hero-${language}.png`,'og:locale':language==='ru'?'ru_RU':'en_US'}))document.querySelector(`meta[property="${key}"]`).content=value;
 const schemaNode=document.querySelector('script[type="application/ld+json"]'),schema=JSON.parse(schemaNode.textContent);schema.name=language==='ru'?'Планировщик КДМ':'Board Machine Planner';schema.offers.forEach((o,i)=>{o.priceCurrency=language==='ru'?'RUB':'EUR';o.price=(language==='ru'?['149000','37900','3790']:['1490','379','37.90'])[i]});schemaNode.textContent=JSON.stringify(schema);
 document.getElementById('dialog-close').ariaLabel=language==='ru'?'Закрыть':'Close';document.getElementById('theme-toggle').ariaLabel=language==='ru'?'Выбрать тему':'Choose theme';
 document.querySelectorAll('.zoom').forEach(b=>b.ariaLabel=language==='ru'?'Увеличить изображение':'Enlarge image');
 try{localStorage.setItem('kdm-planner-language',language)}catch(e){}
 const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);
}
document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>applyLanguage(b.dataset.language)));applyLanguage(language);
let mode='auto';try{mode=localStorage.getItem('packtuning-color-scheme-mode')||'auto'}catch(e){}if(!['auto','day','night','system'].includes(mode))mode='auto';
const header=document.querySelector('.topbar');new ResizeObserver(()=>root.style.setProperty('--header-height',header.getBoundingClientRect().height+'px')).observe(header);
const system=window.matchMedia('(prefers-color-scheme:dark)');
function applyTheme(value){mode=value;let resolved=mode;if(mode==='auto'){const hour=new Date().getHours();resolved=hour>=6&&hour<18?'day':'night'}else if(mode==='system')resolved=system.matches?'night':'day';root.dataset.theme=resolved;document.querySelector('meta[name=theme-color]').content=resolved==='day'?'#f5f8fc':'#071221';document.querySelectorAll('[data-theme-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeMode===mode)));try{localStorage.setItem('packtuning-color-scheme-mode',mode)}catch(e){}}
const toggle=document.getElementById('theme-toggle'),menu=document.getElementById('theme-menu');function closeTheme(){menu.hidden=true;toggle.setAttribute('aria-expanded','false')}
toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden))});document.querySelectorAll('[data-theme-mode]').forEach(b=>b.addEventListener('click',()=>{applyTheme(b.dataset.themeMode);closeTheme();toggle.focus()}));document.addEventListener('click',e=>{if(!e.target.closest('.theme-control'))closeTheme()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeTheme()});system.addEventListener('change',()=>applyTheme(mode));setInterval(()=>{if(mode==='auto')applyTheme(mode)},60000);applyTheme(mode);
const dialog=document.getElementById('image-dialog'),image=document.getElementById('dialog-image'),caption=document.getElementById('dialog-caption');let opener;
document.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{opener=b;const source=b.querySelector('img');image.src=source.dataset.image?`assets/${source.dataset.image}-${language}.png`:source.currentSrc;image.alt=source.alt;caption.textContent=source.alt;dialog.showModal()}));document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>opener?.focus());
})();
