document.addEventListener('DOMContentLoaded', () => {
    const hotspots = document.querySelectorAll('.hotspot');
  
    // hover effect sull'immagine (funziona per tutti)
    const img = document.getElementById('planisphere');
    hotspots.forEach(h=>{
      h.addEventListener('mouseenter', ()=> {
        if(img){
          img.style.filter = 'brightness(1.04) saturate(1.12) drop-shadow(0 6px 18px rgba(0,0,0,0.35))';
        }
      });
      h.addEventListener('mouseleave', ()=> {
        if(img){
          img.style.filter = 'saturate(1.05) contrast(1.02)';
        }
      });
    });
  
    // Se ci sono ancora bottoni (fallback) — comportamento di scroll/animazione
    hotspots.forEach(el => {
      if(el.tagName === 'BUTTON'){ // comportamento esistente: scroll verso l'elemento nella stessa pagina
        el.addEventListener('click', ()=>{
          const id = el.getAttribute('data-target');
          const targetEl = document.getElementById(id);
          if(targetEl){
            targetEl.scrollIntoView({behavior:'smooth', block:'start'});
            targetEl.style.transition = 'box-shadow .45s ease, transform .25s ease';
            targetEl.style.boxShadow = '0 20px 60px rgba(0,0,0,0.45)';
            targetEl.style.transform = 'translateY(-6px)';
            setTimeout(()=>{ targetEl.style.boxShadow=''; targetEl.style.transform=''; }, 900);
          }
        });
  
        // keyboard accessibility: Enter/Space su button
        el.addEventListener('keydown', (ev)=>{
          if(ev.key === 'Enter' || ev.key === ' '){
            ev.preventDefault();
            el.click();
          }
        });
      } else if(el.tagName === 'A'){
        // Lascia la navigazione naturale per <a>. Possiamo però supportare
        // click con Modifiers: se l'utente tiene Shift/Ctrl apre in nuova scheda come al solito.
        // Non interferiamo col comportamento nativo.
      }
    });
  
    // --- Optional: auto-posizionamento via data-x/data-y (se vuoi mappare hotspots rispetto all'immagine reale)
    function positionHotspotsFromData() {
      const image = document.getElementById('planisphere');
      if(!image) return;
      const naturalW = image.naturalWidth;
      const naturalH = image.naturalHeight;
      if(!naturalW || !naturalH) return;
      document.querySelectorAll('.hotspot[data-x][data-y]').forEach(h=>{
        const px = parseFloat(h.getAttribute('data-x'));
        const py = parseFloat(h.getAttribute('data-y'));
        if(!isNaN(px) && !isNaN(py)){
          h.style.left = ((px / naturalW) * 100) + '%';
          h.style.top  = ((py / naturalH) * 100) + '%';
        }
      });
    }
  
    // Se vuoi usarla, decommenta la chiamata qui
    // positionHotspotsFromData();
  
    window.addEventListener('resize', () => {
      clearTimeout(window._hpResize);
      window._hpResize = setTimeout(() => {
        // positionHotspotsFromData();
      }, 80);
    });
  });
  