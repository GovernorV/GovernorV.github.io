(()=>{"use strict";
const root=document.documentElement, buttons=[...document.querySelectorAll('[data-lang-button]')];
const metadata={ru:{title:'Ротационный станок — планирование высечки и сборки перегородок | PackTuning',description:'Планирование ротационных станков, штампов и сборки перегородок. Таблица операций, диаграмма Ганта и контроль сроков. От 1 990 ₽ в месяц.',alt:'Ротационный станок — планирование работы и переналадок'},en:{title:'Rotary Machine — partition cutting and assembly planning | PackTuning',description:'Schedule rotary die cutters, dies and partition assembly. Operation tables, Gantt charts and due-date tracking. From €19.90 per month.',alt:'Rotary Machine — work and changeover planning'}};
let lang='ru';try{lang=new URLSearchParams(location.search).get('lang')||localStorage.getItem('rotary-machine-lang')||((navigator.language||'').startsWith('ru')?'ru':'en')}catch(e){}
function apply(next){lang=next==='en'?'en':'ru';root.lang=lang;
 document.querySelectorAll('[data-ru][data-en]').forEach(n=>n.textContent=n.dataset[lang]);
 buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.langButton===lang)));
 document.getElementById('hero-source').srcset=`assets/hero-${lang}.webp`;
 const hero=document.getElementById('hero-image');hero.src=`assets/hero-${lang}.png`;hero.alt=metadata[lang].alt;
 document.querySelectorAll('[data-alt-ru]').forEach(n=>n.alt=n.dataset[lang==='ru'?'altRu':'altEn']);
 document.querySelectorAll('[data-image-ru]').forEach(n=>n.src=n.dataset[lang==='ru'?'imageRu':'imageEn']);
 document.querySelectorAll('[data-download-ru]').forEach(n=>n.href=n.dataset[lang==='ru'?'downloadRu':'downloadEn']);
 document.querySelectorAll('[data-related]').forEach(n=>n.href=`https://governorv.github.io/${n.dataset.related}/?lang=${lang}`);
 document.querySelectorAll('[data-catalog]').forEach(n=>n.href=`https://governorv.github.io/?lang=${lang}`);
 document.title=metadata[lang].title;document.querySelector('meta[name="description"]').content=metadata[lang].description;
 const canonical=`https://governorv.github.io/RotaryMachine/${lang==='en'?'?lang=en':''}`;
 document.querySelector('link[rel="canonical"]').href=canonical;
 [['og:title',metadata[lang].title],['og:description',metadata[lang].description],['og:url',canonical],['og:image',`https://governorv.github.io/RotaryMachine/assets/hero-${lang}.png`],['og:locale',lang==='ru'?'ru_RU':'en_US']].forEach(([k,v])=>document.querySelector(`meta[property="${k}"]`).content=v);
 document.getElementById('close-dialog').setAttribute('aria-label',lang==='ru'?'Закрыть':'Close');
 document.querySelectorAll('.zoom-image').forEach(n=>n.setAttribute('aria-label',lang==='ru'?'Увеличить изображение':'Enlarge image'));
 try{localStorage.setItem('rotary-machine-lang',lang)}catch(e){}
 const schemaNode=document.querySelector('script[type="application/ld+json"]');if(schemaNode){const schema=JSON.parse(schemaNode.textContent);const prices=lang==='en'?['790','199','19.90']:['79000','19900','1990'];schema.offers.forEach((offer,i)=>{offer.priceCurrency=lang==='en'?'EUR':'RUB';offer.price=prices[i]});schemaNode.textContent=JSON.stringify(schema);}
 const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);
}
buttons.forEach(b=>b.addEventListener('click',()=>apply(b.dataset.langButton)));apply(lang);
function autoTheme(){const h=new Date().getHours();const t=h>=6&&h<18?'day':'night';let mode='auto';try{mode=localStorage.getItem('packtuning-color-scheme-mode')||'auto'}catch(e){}if(mode==='auto'){root.dataset.theme=t;document.querySelector('meta[name="theme-color"]').content=t==='day'?'#f5f8fc':'#071221'}}autoTheme();setInterval(autoTheme,60000);
const dialog=document.getElementById('image-dialog'), image=document.getElementById('dialog-image');let opener=null;
document.querySelectorAll('.zoom-image').forEach(b=>b.addEventListener('click',()=>{const src=b.querySelector('img');opener=b;image.src=src.src;image.alt=src.alt;dialog.showModal()}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>opener?.focus());
})();