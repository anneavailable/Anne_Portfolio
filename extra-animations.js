/* Extra animations: cursor sparkle trail + emoji bursts on click.
   Adds listeners only; nothing in script.js is changed. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var last = 0, marks = ['✦', '✧', '♡', '✿'], boom = ['🌸', '✨', '🎀', '💖', '🌹'];

  function add(cls, text, x, y, vars) {
    var el = document.createElement('span');
    el.className = cls; el.textContent = text;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    for (var k in vars) el.style.setProperty(k, vars[k]);
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    el.addEventListener('animationend', function () { el.remove(); });
  }

  if (fine) {
    document.addEventListener('pointermove', function (e) {
      var now = Date.now();
      if (now - last < 55) return;
      last = now;
      add('fx-spark', marks[Math.floor(Math.random() * marks.length)], e.clientX, e.clientY,
        { '--dx': (Math.random() * 30 - 15) + 'px' });
    }, { passive: true });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.btn, .brand, .filter-chip, .theme-toggle, .project-card, .photo-frame')) return;
    for (var i = 0; i < 8; i++) {
      var a = (Math.PI * 2 * i) / 8 + Math.random() * 0.5, d = 50 + Math.random() * 40;
      add('fx-burst', boom[Math.floor(Math.random() * boom.length)], e.clientX, e.clientY,
        { '--dx': Math.cos(a) * d + 'px', '--dy': Math.sin(a) * d + 'px', '--rot': (Math.random() * 120 - 60) + 'deg' });
    }
  });
})();
