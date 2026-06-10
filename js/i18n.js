const lang = {
  es: {
    tagline: 'sitio personal',
    'about.title': 'Sobre mí',
    'about.bio': 'Estudiante de Ingeniería en Software y nerd de Linux.\nEste es el sitio en el que compartiré mis hobbies y proyectos.',
    'likes.title': 'Cosas que me gustan',
    'likes.item1': 'Dibujo (digital y tradicional)',
    'likes.item2': 'Música',
    'likes.item3': 'Tecnología',
    'likes.item4': 'Self-hosting',
    'likes.item5': 'Linux',
    'likes.item6': 'Videojuegos',
    'gallery.title': 'Dibujos',
    'gallery.loading': 'cargando dibujos...',
    'gallery.error': 'error al cargar dibujos, mostrando galería local',
    'gallery.empty': 'no se encontraron dibujos',
    'gallery.close': 'haz clic para cerrar',
    'gallery.fallback': '',
    'drawings.btn': 'dibujos',
    'drawings.seePixelfed': 'ver en pixelfed',
    'drawings.seeBluesky': 'ver en bluesky',
    'main.construction': 'en construcción',
    'footer': 'hecho con <3 y emuladores de terminal',
    'footer.source': 'código fuente',
  },
  en: {
    tagline: 'personal site',
    'about.title': 'About me',
    'about.bio': 'Software Engineering student and Linux nerd.\nThis is the place where I will share my hobbies and projects.',
    'likes.title': 'Things I like',
    'likes.item1': 'Drawing (digital & traditional)',
    'likes.item2': 'Music',
    'likes.item3': 'Tech',
    'likes.item4': 'Self-hosting',
    'likes.item5': 'Linux',
    'likes.item6': 'Video games',
    'gallery.title': 'Drawings',
    'gallery.loading': 'fetching drawings...',
    'gallery.error': 'failed to load drawings, showing local gallery',
    'gallery.empty': 'no drawings found',
    'gallery.close': 'click to close',
    'gallery.fallback': '',
    'drawings.btn': 'drawings',
    'drawings.seePixelfed': 'see in pixelfed',
    'drawings.seeBluesky': 'see in bluesky',
    'main.construction': 'under construction',
    'footer': 'built with <3 and terminal emulators',
    'footer.source': 'source code',
  }
};

let currentLang = 'es';

function setLang(locale) {
  currentLang = locale;
  const strings = lang[locale];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key] !== undefined) {
      el.innerHTML = strings[key].replace(/\n/g, '<br>');
    }
  });
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === locale);
  });
  document.documentElement.lang = locale;
  localStorage.setItem('bronx-lang', locale);
}

document.querySelectorAll('.lang-toggle button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

const saved = localStorage.getItem('bronx-lang');
if (saved === 'en' || saved === 'es') setLang(saved);
