 
    /* ---- NAV SCROLL ---- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ---- SCROLL REVEAL ---- */
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => observer.observe(el));

    /* ---- CAROUSEL ---- */
    const track    = document.getElementById('carouselTrack');
    const prevBtn  = document.getElementById('prevBtn');
    const nextBtn  = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('carouselDots');
    let allSlides  = [...track.querySelectorAll('.carousel-slide')];
    let currentIdx = 0;

    function buildDots(slides) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => scrollToSlide(i));
        dotsWrap.appendChild(d);
      });
    }

    function updateDots(idx) {
      dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    }

    function scrollToSlide(idx) {
      const visible = getVisible();
      if (!visible[idx]) return;
      visible[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      currentIdx = idx;
      updateDots(idx);
    }

    function getVisible() {
      return [...track.querySelectorAll('.carousel-slide:not([style*="display: none"])')];
    }

    function slideBy(dir) {
      const visible = getVisible();
      currentIdx = Math.max(0, Math.min(visible.length - 1, currentIdx + dir));
      scrollToSlide(currentIdx);
    }

    prevBtn.addEventListener('click', () => slideBy(-1));
    nextBtn.addEventListener('click', () => slideBy(1));

    // drag to scroll
    let isDragging = false, startX = 0, scrollLeft = 0;
    track.addEventListener('mousedown', e => {
      isDragging = true; startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft; track.classList.add('grabbing');
    });
    track.addEventListener('mouseleave', () => { isDragging = false; track.classList.remove('grabbing'); });
    track.addEventListener('mouseup',    () => { isDragging = false; track.classList.remove('grabbing'); });
    track.addEventListener('mousemove',  e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });

    // touch
    let touchStart = 0;
    track.addEventListener('touchstart', e => touchStart = e.touches[0].clientX);
    track.addEventListener('touchend',   e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) slideBy(diff > 0 ? 1 : -1);
    });

    // update dot on scroll
    track.addEventListener('scroll', () => {
      const visible = getVisible();
      let minDist = Infinity;
      visible.forEach((s, i) => {
        const dist = Math.abs(s.getBoundingClientRect().left - track.getBoundingClientRect().left);
        if (dist < minDist) { minDist = dist; currentIdx = i; }
      });
      updateDots(currentIdx);
    });

    /* ---- CATEGORY FILTER ---- */
    const tabs = document.querySelectorAll('.cat-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        currentIdx = 0;
        allSlides.forEach(s => {
          const match = cat === 'all' || s.dataset.cat === cat;
          s.style.display = match ? '' : 'none';
        });
        buildDots(getVisible());
        track.scrollTo({ left: 0, behavior: 'smooth' });
      });
    });

    buildDots(allSlides);

    /* ---- CONTACT FORM ---- */
    function handleSubmit(e) {
      e.preventDefault();
      const btn = e.target.querySelector('.form-submit');
      btn.textContent = '✓ Mensaje enviado';
      btn.style.background = '#4a7c59';
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje →';
        btn.style.background = '';
        e.target.reset();
      }, 3000);
    }

    /* ---- PARALLAX HERO ---- */
    window.addEventListener('scroll', () => {
      const heroRight = document.querySelector('.hero-right img');
      if (heroRight && window.scrollY < window.innerHeight) {
        heroRight.style.transform = `scale(1) translateY(${window.scrollY * 0.12}px)`;
      }
    });
 