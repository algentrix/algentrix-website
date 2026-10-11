(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const catalog = {
    'web-dashboard': ['Operations dashboard', 'A shared view of workers, attendance, open tasks, payroll and site actions.'],
    'web-payroll': ['Payroll workspace', 'Review worker readiness, salary advances and payments before Generate & Lock.'],
    'web-accounts': ['Site accounts', 'See recorded money in, site spend, money left and recent activity by location.'],
    'web-reports': ['Reports hub', 'Attendance, daily earnings, salary slips, site finances and business summaries.'],
    'task-create': ['Define the task', 'Give each task a name, category, site, due date and priority.'],
    'task-assign': ['Assign responsibility', 'Choose the worker and reviewer, then add written or voice instructions.'],
    'task-progress': ['Record the work', 'Keep started work, progress updates and submitted photo proof on a timeline.'],
    'task-review': ['Review the evidence', 'The reviewer can approve the task or request rework.'],
    'task-approved': ['Close the loop', 'Approval moves the task to Completed and closes the activity stream.'],
  };
  function select(group, chosen) {
    $$(group).forEach(button => {
      button.classList.toggle('active', button === chosen);
      button.setAttribute('aria-pressed', String(button === chosen));
    });
  }
  function setScreen(button, key) {
    const [title, caption] = catalog[key];
    const img = button.querySelector('img');
    img.src = `assets/${key}.webp`;
    img.alt = `${title}: ${caption}`;
    button.dataset.zoom = img.getAttribute('src');
    button.dataset.title = title;
    button.setAttribute('aria-label', `Enlarge ${title}`);
  }
  $$('[data-web]').forEach(button => button.addEventListener('click', () => {
    select('[data-web]', button);
    const key = button.dataset.web;
    setScreen($('.gallery-browser'), key);
    $('.gallery-browser .browser-chrome span:nth-child(2)').textContent = `WORKPULSE / ${catalog[key][0].toUpperCase()}`;
    $('#web-screen-description').textContent = catalog[key][1];
  }));
  $$('[data-step]').forEach(button => button.addEventListener('click', () => {
    select('[data-step]', button);
    const key = button.dataset.step;
    setScreen($('.task-preview'), key);
    $('#task-step-title').textContent = catalog[key][0];
    $('#task-step-description').textContent = catalog[key][1];
  }));
  $$('[data-scroll]').forEach(button => button.addEventListener('click', () => {
    const rail = document.getElementById(button.dataset.rail);
    const slide = rail.querySelector('.mobile-slide');
    const distance = slide.getBoundingClientRect().width + (parseFloat(getComputedStyle(rail).gap) || 0);
    rail.scrollBy({left: distance * Number(button.dataset.scroll), behavior: reduced.matches ? 'instant' : 'smooth'});
  }));
  function railWheelDistance(event, rail) {
    const dominant = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (event.deltaMode === 1) return dominant * 40;
    if (event.deltaMode === 2) return dominant * rail.clientWidth;
    return dominant;
  }
  $$('.mobile-rail').forEach(rail => {
    let pending = 0;
    let timer;
    rail.addEventListener('wheel', event => {
      const max = rail.scrollWidth - rail.clientWidth;
      if (max <= 1 || event.ctrlKey) return;
      const delta = railWheelDistance(event, rail);
      if (!delta) return;
      const atStart = rail.scrollLeft <= 1 && delta < 0;
      const atEnd = rail.scrollLeft >= max - 1 && delta > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      pending += delta;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const slide = rail.querySelector('.mobile-slide');
        const distance = slide.getBoundingClientRect().width + (parseFloat(getComputedStyle(rail).gap) || 0);
        const steps = Math.sign(pending) * Math.max(1, Math.round(Math.abs(pending) / 120));
        pending = 0;
        rail.scrollBy({left: steps * distance, behavior: reduced.matches ? 'instant' : 'smooth'});
      }, 40);
    }, {passive: false});
  });
  const dialog = $('.screen-dialog');
  let opener;
  $$('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    $('#dialog-title').textContent = button.dataset.title;
    $('.dialog-image').src = button.dataset.zoom;
    $('.dialog-image').alt = button.querySelector('img').alt;
    dialog.showModal();
    document.body.classList.add('modal-open');
  }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus({preventScroll:true});
  });
  let ticking = false;
  function progress() {
    const length = document.documentElement.scrollHeight - innerHeight;
    $('.reading-progress').style.transform = `scaleX(${length > 0 ? Math.min(1,Math.max(0,scrollY/length)) : 0})`;
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) {requestAnimationFrame(progress); ticking = true;}
  }, {passive:true});
  addEventListener('resize', progress);
  progress();
})();
