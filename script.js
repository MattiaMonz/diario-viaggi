document.addEventListener('DOMContentLoaded', () => {
    // scroll morbido e animazione evidenza
    document.querySelectorAll('.hotspot').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-target');
        const el = document.getElementById(id);
        if(el){
          el.scrollIntoView({behavior:'smooth', block:'start'});
          el.style.transition = 'box-shadow .45s ease, transform .25s ease';
          el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.45)';
          el.style.transform = 'translateY(-6px)';
          setTimeout(()=>{ el.style.boxShadow=''; el.style.transform=''; }, 900);
        }
      });
  
      // keyboard accessibility: Enter/Space
      btn.addEventListener('keydown', (ev)=>{
        if(ev.key === 'Enter' || ev.key === ' '){
          ev.preventDefault();
          btn.click();
        }
      });
    });
  
    // hover effect sull'immagine
    const img = document.getElementById('planisphere');
    document.querySelectorAll('.hotspot').forEach(h=>{
      h.addEventListener('mouseenter', ()=> {
        img.style.filter = 'brightness(1.04) saturate(1.12) drop-shadow(0 6px 18px rgba(0,0,0,0.35))';
      });
      h.addEventListener('mouseleave', ()=> {
        img.style.filter = 'saturate(1.05) contrast(1.02)';
      });
    });
  
    // --- Optional: auto-posizionamento via data-x/data-y ---
    // Se preferisci usare coordinate in pixel rispetto alla dimensione originale
    // dell'immagine, puoi aggiungere data-x / data-y ai bottoni e decommentare la
    // funzione sottostante. Lasciato qui come riferimento.
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
  
    // Esegui all'avvio e al resize (se userai la funzione, decommenta la chiamata)
    // positionHotspotsFromData();
    window.addEventListener('resize', () => {
      clearTimeout(window._hpResize);
      window._hpResize = setTimeout(() => {
        // se usi data-x/data-y, richiamare positionHotspotsFromData qui
        // positionHotspotsFromData();
      }, 80);
    });
  });
  