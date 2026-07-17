const lang = {
  es: {
    tagline: 'sitio personal',
    'main.title': '¿Qué es esto?',
    'main.introTitle': 'sh: intro.sh',
    'main.text': 'Heeeey- huh- tal parece que has llegado a mi página... curioso...',
    'about.title': 'Sobre mí',
    'about.bioTitle': 'sh: whoami.sh',
    'about.bio': 'Eres alguien curioso, ¿no crees?.\nEste es el sitio en el que compartiré mis hobbies y proyectos.',
    'about.bio.extra': 'Ya que estás aquí, te cuento algunas cosas sobre mí:',
    'likes.title': 'Cosas que me gustan',
    'likes.item1': 'Dibujo (digital y tradicional)',
    'likes.item2': 'Música',
    'likes.item3': 'Tecnología',
    'likes.item4': 'Self-hosting',
    'likes.item5': 'Linux',
    'likes.item6': 'Videojuegos',
    'gallery.title': 'Dibujos',
    'gallery.fetchTitle': 'sh: fetch.sh',
    'gallery.fetchMessage': '¡Ey! Déjame buscar algunos dibujos para ti...',
    'gallery.sectionTitle': 'Galería',
    'gallery.loading': 'cargando dibujos...',
    'gallery.error': 'error al cargar dibujos, mostrando galería local',
    'gallery.empty': 'no se encontraron dibujos',
    'gallery.close': 'haz clic para cerrar',
    'gallery.fallback': '',
    'funfacts.title': 'Datos curiosos sobre mí',
    'funfacts.item1': 'Nací en el 2005',
    'funfacts.item2': 'Hablo español, inglés y LSM (Lengua de Señas Mexicana); actualmente aprendiendo finlandés',
    'funfacts.item3': 'Actualmente uso Kubuntu y Artix Linux (runit)',
    'funfacts.item4': 'Me uní al fediverso y me convertí en usuario de GNU/Linux en junio de 2025',
    'funfacts.item5': 'Mi juego favorito es Stardew Valley',
    'funfacts.item6': 'Mi saga de videojuegos favorita es Touhou',
    'funfacts.item7': 'Soy Estudiante de ingeniería en software',
    'funfacts.item8': 'Soy un nerd obsesionado con Linux',
    'notfound.title': 'Error 404',
    'notfound.message': 'La página que buscas no existe.',
    'notfound.back': 'volver al inicio',
    'drawings.btn': 'dibujos',
    'drawings.seePixelfed': 'ver en pixelfed',
    'drawings.seeBluesky': 'ver en bluesky',
    'main.construction': 'en construcción',
    'footer': 'hecho con <3 y emuladores de terminal',
    'footer.source': 'código fuente',
  },
  en: {
    tagline: 'personal site',
    'main.title': 'What is this?',
    'main.introTitle': 'sh: intro.sh',
    'main.text': 'Heeeey- huh- it seems you\'ve found my website... funny...',
    'about.title': 'About me',
    'about.bioTitle': 'sh: whoami.sh',
    'about.bio': 'You\'re really curious, don\'t you think?.\nThis is the place where I will share my hobbies and projects.',
    'about.bio.extra': 'Now that you\'re here, there are some things about me:',
    'likes.title': 'Things I like',
    'likes.item1': 'Drawing (digital & traditional)',
    'likes.item2': 'Music',
    'likes.item3': 'Tech',
    'likes.item4': 'Self-hosting',
    'likes.item5': 'Linux',
    'likes.item6': 'Video games',
    'gallery.title': 'Drawings',
    'gallery.fetchTitle': 'sh: fetch.sh',
    'gallery.fetchMessage': 'Hey! Let me fetch some drawings for you!',
    'gallery.sectionTitle': 'Gallery',
    'gallery.loading': 'fetching drawings...',
    'gallery.error': 'failed to load drawings, showing local gallery',
    'gallery.empty': 'no drawings found',
    'gallery.close': 'click to close',
    'gallery.fallback': '',
    'funfacts.title': 'Fun facts about me',
    'funfacts.item1': 'I was born in 2005',
    'funfacts.item2': 'I speak english, spanish, and LSM (Mexican Sign Language); currently learning finnish',
    'funfacts.item3': 'I currently use both Kubuntu and Artix Linux (runit)',
    'funfacts.item4': 'I joined the fediverse and became a GNU/Linux user in june 2025',
    'funfacts.item5': 'My favorite game is Stardew Valley',
    'funfacts.item6': 'My favorite video games saga is Touhou',
    'funfacts.item7': 'I\'m a software engineering student',
    'funfacts.item8': 'I\'m a nerd obsessed with Linux',
    'notfound.title': 'Error 404',
    'notfound.message': 'The page you are looking for does not exist.',
    'notfound.back': 'go back home',
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
