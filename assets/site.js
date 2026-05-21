(function(){
  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    var nav = document.querySelector('[data-nav]');
    if(nav){
      var onScroll = function(){ nav.classList.toggle('is-scrolled', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    function pad(n){ return String(n).padStart(2, '0'); }
    function updateCountdown(){
      var nodes = document.querySelectorAll('[data-countdown]');
      if(!nodes.length) return;
      var now = new Date();
      var end = new Date(now);
      end.setHours(23, 59, 59, 999);
      var diff = Math.max(0, end - now);
      var h = Math.floor(diff / 36e5);
      var m = Math.floor((diff % 36e5) / 6e4);
      var s = Math.floor((diff % 6e4) / 1e3);
      var text = pad(h) + ':' + pad(m) + ':' + pad(s);
      nodes.forEach(function(el){ el.textContent = text; });
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    document.querySelectorAll('[data-accordion]').forEach(function(acc){
      acc.addEventListener('click', function(e){
        var btn = e.target.closest('.accordion__btn');
        if(!btn || !acc.contains(btn)) return;
        var item = btn.closest('.accordion__item');
        var panel = item && item.querySelector('.accordion__panel');
        if(!item || !panel) return;
        var open = item.classList.toggle('is-open');
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
      anchor.addEventListener('click', function(e){
        var id = anchor.getAttribute('href');
        if(!id || id === '#') return;
        var target = document.querySelector(id);
        if(!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
})();
