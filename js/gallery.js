const PIXELFED_INSTANCE = 'pxlmo.com';
const PIXELFED_USERNAME = 'bronx';

const statusEl = document.getElementById('gallery-status');
const gridEl = document.getElementById('gallery-grid');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

function renderImages(urls) {
  gridEl.innerHTML = '';
  if (urls.length === 0) {
    statusEl.className = 'gallery-status';
    statusEl.innerHTML = `<span data-i18n="gallery.empty">${lang[currentLang]['gallery.empty']}</span>`;
    return;
  }
  statusEl.style.display = 'none';
  urls.forEach(url => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.className = 'loading';
    img.loading = 'lazy';
    img.src = url;
    img.alt = 'drawing';

    img.onload = () => img.classList.replace('loading', 'loaded');
    img.onerror = () => { item.remove(); };

    img.addEventListener('click', () => openModal(url));

    item.appendChild(img);
    gridEl.appendChild(item);
  });
}

async function fetchPixelfedDrawings() {
  try {
    const lookupUrl = `https://${PIXELFED_INSTANCE}/api/v1/accounts/lookup?acct=${PIXELFED_USERNAME}`;
    const lookupRes = await fetch(lookupUrl);
    if (!lookupRes.ok) throw new Error('lookup failed');
    const account = await lookupRes.json();
    const accountId = account.id;

    const statusUrl = `https://${PIXELFED_INSTANCE}/api/v1/accounts/${accountId}/statuses?only_media=true&limit=30`;
    const statusRes = await fetch(statusUrl);
    if (!statusRes.ok) throw new Error('statuses failed');
    const statuses = await statusRes.json();

    const imageUrls = [];
    statuses.forEach(status => {
      if (status.media_attachments) {
        status.media_attachments.forEach(media => {
          if (media.type === 'image' && media.url) {
            imageUrls.push(media.url);
          }
        });
      }
    });

    if (imageUrls.length > 0) {
      renderImages(imageUrls);
      return true;
    }
    return false;
  } catch (e) {
    console.warn('Pixelfed API failed:', e);
    return false;
  }
}

function loadLocalDrawings() {
  const files = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.jpg',
    'img8.jpg',
    'img9.jpg',
    'img10.jpg',
    'img11.jpg',
    'img12.jpg',
  ];
  renderImages(files);
  statusEl.style.display = 'block';
  statusEl.className = 'gallery-status';
  statusEl.innerHTML = ` ${lang[currentLang]['gallery.fallback']}`;
}

(async function initGallery() {
  statusEl.innerHTML = `<span class="blink">_</span> ${lang[currentLang]['gallery.loading']}`;
  const success = await fetchPixelfedDrawings();
  if (!success) {
    statusEl.innerHTML = `<span class="blink">_</span> ${lang[currentLang]['gallery.error']}`;
    statusEl.className = 'gallery-status error';
    loadLocalDrawings();
  }
})();

function openModal(url) {
  modalImg.src = url;
  modal.classList.add('open');
}

function closeModal() {
  modal.classList.remove('open');
  modalImg.src = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

