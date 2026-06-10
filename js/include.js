(async function() {
  try {
    const [headerHtml, footerHtml] = await Promise.all([
      fetch('header.html').then(r => { if (!r.ok) throw Error('header fetch failed'); return r.text(); }),
      fetch('footer.html').then(r => { if (!r.ok) throw Error('footer fetch failed'); return r.text(); }),
    ]);
    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');
    if (headerEl) headerEl.innerHTML = headerHtml;
    if (footerEl) footerEl.innerHTML = footerHtml;
    // Re-apply translations since [data-i18n] elements were replaced
    const saved = localStorage.getItem('bronx-lang');
    setLang(saved === 'en' || saved === 'es' ? saved : 'es');
  } catch (e) {
    // inline fallback stays visible (file:// or network error)
  }
})();
