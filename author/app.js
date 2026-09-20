const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('#main-nav')?.classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');document.querySelector('#main-nav')?.classList.remove('open');menu.focus();}});
const filters=[...document.querySelectorAll('[data-filter]')];
function filterWorks(category){
 if(!filters.some(x=>x.dataset.filter===category))category='all';
 let count=0;
 for(const card of document.querySelectorAll('[data-category]')){card.hidden=category!=='all'&&!(category==='visual'?['photo','other'].includes(card.dataset.category):category==='articles'?['articles','literature'].includes(card.dataset.category):card.dataset.category===category);if(!card.hidden)count++;}
 for(const button of filters){const active=button.dataset.filter===category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
 for(const section of document.querySelectorAll('[data-catalog-section]'))section.hidden=![...section.querySelectorAll('[data-category]')].some(card=>!card.hidden);
 const status=document.querySelector('.filter-status');if(status)status.textContent=`${count} ${status.dataset.countLabel}`;
 const empty=document.querySelector('.empty-state');if(empty)empty.hidden=count!==0;
}
for(const button of filters)button.addEventListener('click',()=>{const category=button.dataset.filter;history.replaceState(null,'',category==='all'?location.pathname:'#'+category);filterWorks(category);});
if(filters.length){filterWorks(location.hash.slice(1)||'all');window.addEventListener('hashchange',()=>filterWorks(location.hash.slice(1)||'all'));}
document.querySelector('#travel-year')?.addEventListener('change',event=>{for(const item of document.querySelectorAll('[data-year]'))item.hidden=event.target.value!=='all'&&event.target.value!==item.dataset.year;});
