/* Informational interactions only. No customer data, tracking, or remote APIs. */
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.navbar'),menu=document.querySelector('.nav-link-wrapper'),inner=document.querySelector('.nav-link-wrapper-inner');
 let previousFocus;
 function setMenu(open){
  if(!menu)return;
  menu.classList.toggle('active',open);inner?.classList.toggle('active',open);
  document.body.classList.toggle('active',open);document.body.style.overflow=open?'hidden':'';
  document.querySelectorAll('.ham-menu').forEach(b=>{b.classList.toggle('active',open);b.setAttribute('aria-expanded',String(open));});
  if(open){previousFocus=document.activeElement;menu.querySelector('button,a')?.focus();}else previousFocus?.focus();
 }
 document.querySelectorAll('.ham-menu,.mobile-menu-close-window-btn').forEach(b=>b.addEventListener('click',()=>setMenu(!menu.classList.contains('active'))));
 menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);if(e.key==='Tab'&&menu?.classList.contains('active')){const items=[...menu.querySelectorAll('a[href],button')].filter(x=>x.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
 document.querySelectorAll('.faq-accordion-toggle-btn').forEach((button,i)=>{
  const panel=button.nextElementSibling;if(!panel)return;
  button.setAttribute('role','button');button.setAttribute('tabindex','0');panel.id ||= `faq-answer-${i}`;button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded','false');panel.style.display='none';
  const toggle=()=>{const open=button.getAttribute('aria-expanded')!=='true';button.closest('.faq-accordion')?.querySelectorAll('.faq-accordion-toggle-btn').forEach(other=>{if(other!==button){other.setAttribute('aria-expanded','false');other.parentElement.classList.remove('active');other.nextElementSibling.style.display='none';}});button.setAttribute('aria-expanded',String(open));button.parentElement.classList.toggle('active',open);panel.style.display=open?'block':'none';};
  button.addEventListener('click',toggle);button.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&button.tagName!=='BUTTON'){e.preventDefault();toggle();}});
 });
 document.querySelectorAll('.custom-product-gallery').forEach(gallery=>{
  const main=gallery.querySelector('.main-image');
  const dialog=document.createElement('dialog');dialog.className='product-lightbox';dialog.innerHTML='<button type="button" aria-label="Close image">×</button><img alt="">';document.body.append(dialog);const close=dialog.querySelector('button');close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.querySelector('img').src=main.src;
  main.tabIndex=0;main.setAttribute('role','button');main.setAttribute('aria-label','Enlarge product image');const enlarge=()=>{const img=dialog.querySelector('img');img.src=main.src;img.alt=main.alt;dialog.showModal();};main.addEventListener('click',enlarge);main.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enlarge();}});
  gallery.querySelectorAll('.thumb-item').forEach((thumb,i)=>{thumb.tabIndex=0;thumb.setAttribute('role','button');thumb.setAttribute('aria-label',`View product image ${i+1}`);const select=()=>{const img=thumb.querySelector('img');main.src=img.dataset.full||img.src;main.alt=img.alt;gallery.querySelectorAll('.thumb-item').forEach(t=>{t.classList.toggle('active',t===thumb);t.setAttribute('aria-pressed',String(t===thumb));});};thumb.addEventListener('click',select);thumb.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});});
 });
 document.querySelectorAll('.slider-button').forEach(button=>button.addEventListener('click',()=>{const slider=button.closest('slider-component')?.querySelector('.slider');if(slider)slider.scrollBy({left:(button.name==='previous'?-1:1)*slider.clientWidth,behavior:'smooth'});}));
 const update=()=>nav?.classList.toggle('nav-fixed',window.scrollY>10);window.addEventListener('scroll',update,{passive:true});update();
});
