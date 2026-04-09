const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .pack-card, .carousel-slide').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });