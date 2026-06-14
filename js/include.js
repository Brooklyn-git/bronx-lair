(async function() {
  try {
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
      tryFetch(['header.html', '../header.html']),
      tryFetch(['footer.html', '../footer.html']),
    ]);
    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');
    if (headerEl) headerEl.innerHTML = headerHtml;
    if (footerEl) footerEl.innerHTML = footerHtml;
    const saved = localStorage.getItem('bronx-lang');
    setLang(saved === 'en' || saved === 'es' ? saved : 'es');
  } catch (e) {
    // inline fallback stays visible (file:// or network error)
  }
})();