(async function() {
  try {
    const pathParts = location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    const isProjectSite = location.hostname === 'brooklyn-git.github.io';
    const depth = isProjectSite ? Math.max(0, pathParts.length - 1) : pathParts.length;
    const fetchPrefix = depth > 0 ? '../'.repeat(depth) : '';

    async function tryFetch(paths) {
      for (const p of paths) {
        try {
          const res = await fetch(p);
          if (res.ok) return await res.text();
        } catch(e) {}
      }
      throw Error('fetch failed');
    }

    const [headerHtml, footerHtml] = await Promise.all([
      tryFetch([fetchPrefix + 'header.html', '../header.html', 'header.html']),
      tryFetch([fetchPrefix + 'footer.html', '../footer.html', 'footer.html']),
    ]);
    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');
    if (headerEl) {
      headerEl.innerHTML = headerHtml;
      if (depth > 0) {
        headerEl.querySelectorAll('a[href]:not([href*="://"]):not([href^="#"])').forEach(a => {
          a.href = '../' + a.getAttribute('href');
        });
      }
    }
    if (footerEl) footerEl.innerHTML = footerHtml;
    const saved = localStorage.getItem('bronx-lang');
    setLang(saved === 'en' || saved === 'es' ? saved : 'es');
  } catch (e) {
    // inline fallback stays visible (file:// or network error)
  }
})();