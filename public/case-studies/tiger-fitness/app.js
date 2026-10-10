(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = $('.motion-toggle');
  let paused = false, motionContext, ambientTimeline, animationMedia;
  const screens = {
    programs: { title: 'Training programs', label: 'TRAINING / PROGRAM LIBRARY', description: 'A shared program library supports workout planning, assignments and training review.' },
    memberships: { title: 'Membership plans', label: 'MEMBERSHIPS / PLAN CATALOG', description: 'A plan catalog defines membership periods and prices; member standing and billing continue through separate workflows.' },
    permissions: { title: 'Roles and permissions', label: 'ACCESS / ROLES & PERMISSIONS', description: 'Application roles and permissions shape staff access, while shared identity connects member, trainer and staff profiles.' },
    operations: { title: 'Equipment and operations', label: 'OPERATIONS / EQUIPMENT', description: 'Equipment inventory, service windows and maintenance status extend the workspace beyond membership and training.' }
  };
  $$('.screen-choice').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.web, screen = screens[key];
    $$('.screen-choice').forEach(choice => { const selected = choice === button; choice.classList.toggle('active', selected); choice.setAttribute('aria-pressed', String(selected)); });
    const image = $('#web-screen-image');
    image.src = `assets/web-${key}.png`;
    image.alt = `Desktop demo capture of Tiger Fitness: ${screen.title}`;
    $('#web-screen-label').textContent = screen.label;
    $('#web-screen-description').textContent = screen.description;
    const preview = $('.gallery-browser');
    preview.dataset.zoom = image.getAttribute('src');
    preview.dataset.title = `${screen.title} — desktop demo capture`;
    preview.setAttribute('aria-label', `Enlarge ${screen.title} desktop screenshot`);
    if (window.gsap && !reduceMotion.matches && !paused) gsap.fromTo(image, { opacity: .4, scale: .99 }, { opacity: 1, scale: 1, duration: .45, ease: 'power2.out', clearProps: 'opacity,transform' });
  }));
  const rail = $('.mobile-rail');
  $('.gallery-controls').hidden = false;
  $$('[data-scroll]').forEach(button => button.addEventListener('click', () => {
    const distance = $('.mobile-slide').getBoundingClientRect().width + parseFloat(getComputedStyle(rail).gap);
    rail.scrollBy({ left: distance * Number(button.dataset.scroll), behavior: reduceMotion.matches || paused ? 'instant' : 'smooth' });
  }));
  const dialog = $('.screen-dialog');
  let opener;
  $$('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    $('#dialog-title').textContent = button.dataset.title;
    $('.dialog-image').src = button.dataset.zoom;
    $('.dialog-image').alt = button.dataset.title;
    dialog.showModal();
    document.body.classList.add('modal-open');
  }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus({ preventScroll: true }); });
  let ticking = false;
  const updateProgress = () => {
    const length = document.documentElement.scrollHeight - innerHeight;
    $('.reading-progress').style.transform = `scaleX(${length > 0 ? Math.min(1, Math.max(0, scrollY / length)) : 0})`;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();
  function stopMotion() {
    animationMedia?.revert();
    motionContext?.revert();
    animationMedia = motionContext = ambientTimeline = undefined;
  }
  function startMotion(intro = false) {
    if (!window.gsap || !window.ScrollTrigger || reduceMotion.matches || paused) return;
    gsap.registerPlugin(ScrollTrigger);
    motionContext = gsap.context(() => {
      if (intro) gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-meta', { y: 12, opacity: 0, duration: .7 })
        .from('.hero-heading .eyebrow', { y: 16, opacity: 0, duration: .7 }, .12)
        .from('.hero-line', { y: 55, opacity: 0, duration: 1.1, stagger: .13, clearProps: 'opacity,transform' }, .25)
        .from('.hero-bottom', { y: 20, opacity: 0, duration: .8, clearProps: 'opacity,transform' }, .7)
        .from('.hero-browser', { y: 60, opacity: 0, duration: 1.3 }, .8)
        .from('.hero-phone', { y: 70, opacity: 0, duration: 1.2, stagger: .18 }, 1)
        .from('.floating-note', { y: 25, opacity: 0, duration: .8 }, 1.5);
      ambientTimeline = gsap.timeline({ repeat: -1, yoyo: true }).to('.orbit', { rotation: 14, duration: 18, ease: 'sine.inOut' });
      $$('[data-reveal]').forEach(element => gsap.from(element, { y: 28, opacity: 0, duration: .85, ease: 'power2.out', immediateRender: false, clearProps: 'opacity,transform', scrollTrigger: { trigger: element, start: 'top 91%', once: true } }));
    });
    animationMedia = gsap.matchMedia();
    animationMedia.add('(min-width: 801px)', () => {
      gsap.to('.hero-browser', { rotateY: 0, rotateX: 0, rotateZ: 0, y: -18, ease: 'none', scrollTrigger: { trigger: '.hero-stage', start: 'top 78%', end: 'bottom 20%', scrub: 1 } });
      gsap.to('.phone-right', { y: -50, rotateZ: 3, ease: 'none', scrollTrigger: { trigger: '.hero-stage', start: 'top 78%', end: 'bottom 20%', scrub: 1 } });
      gsap.to('.phone-left', { y: -15, rotateZ: -3, ease: 'none', scrollTrigger: { trigger: '.hero-stage', start: 'top 78%', end: 'bottom 20%', scrub: 1 } });
      gsap.to('.journey-line span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.journey-track', start: 'top 80%', end: 'bottom 45%', scrub: .7 } });
    });
    ScrollTrigger.refresh();
  }
  function syncMotionLabel() {
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.innerHTML = paused ? '<span aria-hidden="true">▷</span> Resume motion' : '<span aria-hidden="true">Ⅱ</span> Pause motion';
    motionButton.hidden = !window.gsap || !window.ScrollTrigger || reduceMotion.matches;
  }
  motionButton.addEventListener('click', () => { paused = !paused; stopMotion(); if (!paused) startMotion(); syncMotionLabel(); });
  reduceMotion.addEventListener('change', () => { stopMotion(); startMotion(); syncMotionLabel(); });
  document.addEventListener('visibilitychange', () => { if (ambientTimeline) ambientTimeline.paused(document.hidden || paused); });
  syncMotionLabel();
  startMotion(true);
  addEventListener('load', () => { if (window.ScrollTrigger) ScrollTrigger.refresh(); }, { once: true });
})();
