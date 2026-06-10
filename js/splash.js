(async function() {
  if (sessionStorage.getItem('bronx-splash-done')) return;

  const splash = document.getElementById('splash');
  if (!splash) return;

  const bootMessages = [
    'Starting Bronx\' lair...',
    'Initializing terminal interface...',
    'Loading user profile...',
    'Establishing secure connection...',
    'Mounting filesystem...',
    'System ready.',
  ];

  const container = document.querySelector('.container');
  if (container) container.style.display = 'none';

  splash.classList.add('visible');
  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    splash.classList.add('hidden');
    sessionStorage.setItem('bronx-splash-done', 'true');
    setTimeout(() => {
      splash.remove();
      if (container) container.style.display = '';
    }, 420);
  }

  splash.addEventListener('click', dismiss);
  document.addEventListener('keydown', dismiss);

  const lines = splash.querySelector('.splash-lines');

  for (const msg of bootMessages) {
    if (dismissed) break;
    const el = document.createElement('div');
    el.className = 'splash-line';
    el.innerHTML = `<span class="splash-ok">[  OK  ]</span>${msg}`;
    lines.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
    await new Promise(r => setTimeout(r, 500));
  }

  if (!dismissed) {
    const prompt = document.createElement('div');
    prompt.className = 'splash-prompt';
    prompt.innerHTML = '<span class="cursor">_</span><span class="hint">press any key or click to continue</span>';
    lines.appendChild(prompt);
    requestAnimationFrame(() => requestAnimationFrame(() => prompt.classList.add('visible')));
  }
})();
