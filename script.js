// =====================================================================
//  All site content lives in content.json — edit it in the dashboard
//  (Pages CMS). This file only turns that content into the page.
// =====================================================================

// ===== Navigation =====
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
  document.querySelector('.menu-toggle').classList.toggle('active');
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
    document.querySelector('.menu-toggle').classList.remove('active');
  });
});

// ===== Scroll fade-in =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== Helpers =====
// The dashboard may save image paths as "/images/x.jpg"; make them relative
// so the site works both on a custom domain and on username.github.io/repo/.
function asset(p) { return (p || '').replace(/^\/+/, ''); }
function el(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
// Small preview copy made by the "Image previews" GitHub workflow (thumbs/<path>.webp).
// Falls back to the original if the preview doesn't exist (yet).
function previewOf(src) {
  var p = asset(src);
  if (!p || /^(data:|https?:|blob:)/.test(p)) return '';
  return 'thumbs/' + p + '.webp';
}
function setPreview(el, src) {
  var full = asset(src), small = previewOf(src);
  if (!small) { el.src = full; return; }
  el.onerror = function () { el.onerror = null; el.src = full; };
  el.src = small;
}
function imgPreview(src, alt) {
  var i = document.createElement('img');
  i.alt = alt || ''; i.loading = 'lazy'; i.decoding = 'async';
  setPreview(i, src);
  return i;
}
function img(src, alt) {
  var i = document.createElement('img');
  i.src = asset(src); i.alt = alt || ''; i.loading = 'lazy'; i.decoding = 'async';
  return i;
}
function get(obj, path) {
  return path.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, obj);
}

// ===== Language (English / Arabic) =====
// The language is chosen in index.html before the page draws (URL ?lang=, saved choice,
// or the visitor's phone/browser language). Dashboard fields ending in "_ar" hold Arabic
// text; when one is empty, the English text is used.
var LANG = document.documentElement.lang === 'ar' ? 'ar' : 'en';
var UI = {
  en: {
    'nav.about': 'About', 'nav.skills': 'Skills', 'nav.services': 'Services', 'nav.portfolio': 'Portfolio',
    'nav.reviews': 'Reviews', 'nav.contact': 'Contact', 'switch': 'عربي',
    'cv': 'Download CV',
    'skills.label': 'Expertise', 'skills.title': 'TOOLS & SKILLS',
    'services.label': 'What I Do', 'services.title': 'SERVICES',
    'portfolio.label': 'Selected Work', 'portfolio.title': 'PORTFOLIO',
    'reviews.label': 'Testimonials', 'reviews.title': 'WHAT CLIENTS SAY',
    'reviews.empty': 'No reviews yet. Worked with me? Be the first to share your experience.',
    'reviews.leave': 'Leave a review',
    'contact.label': 'Get in Touch', 'contact.title': "LET'S WORK TOGETHER",
    'tab.logos': 'Logos', 'tab.branding': 'Brand Identity', 'tab.social': 'Social Media', 'tab.catalog': 'Catalogs',
    'badge.logo': 'Logo', 'badge.view': 'View', 'badge.flipbook': 'Flipbook', 'badge.posts': '{n} Posts',
    'count.pages': '{n} Pages', 'count.posts': '{n} posts', 'viewer.pages': '{n} pages', 'viewer.posts': '{n} posts', 'count.posts.one': '1 post',
    'more': 'Show more · {n} left', 'social.more': 'More work', 'social.all': 'Show all {n}', 'social.less': 'Show less',
    'c.waMsg': "Hi Ahmad! I saw your portfolio and I'd like to talk about a design project.",
    'c.email': 'Email', 'c.whatsapp': 'WhatsApp', 'c.phone': 'Phone', 'c.mobile': 'Phone', 'c.link': 'Link',
    'rights': 'All Rights Reserved', 'stars': '{n} out of 5 stars',
    'error': 'Content could not be loaded. (If you opened index.html straight from your computer, use a local server or view the live site.)'
  },
  ar: {
    'nav.about': 'نبذة', 'nav.skills': 'المهارات', 'nav.services': 'الخدمات', 'nav.portfolio': 'الأعمال',
    'nav.reviews': 'الآراء', 'nav.contact': 'تواصل', 'switch': 'EN',
    'cv': 'تحميل السيرة الذاتية',
    'skills.label': 'الخبرة', 'skills.title': 'الأدوات والمهارات',
    'services.label': 'ماذا أقدّم', 'services.title': 'الخدمات',
    'portfolio.label': 'أعمال مختارة', 'portfolio.title': 'معرض الأعمال',
    'reviews.label': 'آراء العملاء', 'reviews.title': 'ماذا يقول العملاء',
    'reviews.empty': 'لا توجد آراء بعد. عملتَ معي؟ كن أول من يشارك تجربته.',
    'reviews.leave': 'اترك تقييمك',
    'contact.label': 'تواصل معي', 'contact.title': 'لنعمل معًا',
    'tab.logos': 'الشعارات', 'tab.branding': 'الهويات البصرية', 'tab.social': 'السوشيال ميديا', 'tab.catalog': 'الكتالوجات',
    'badge.logo': 'شعار', 'badge.view': 'عرض', 'badge.flipbook': 'تصفّح', 'badge.posts': '{n} منشور',
    'count.pages': '{n} صفحة', 'count.posts': '{n} منشور', 'viewer.pages': '{n} صفحة', 'viewer.posts': '{n} منشور', 'count.posts.one': 'منشور واحد',
    'more': 'عرض المزيد · متبقٍ {n}', 'social.more': 'أعمال أخرى', 'social.all': 'عرض الكل · {n}', 'social.less': 'عرض أقل',
    'c.waMsg': 'مرحبا أحمد! شفت معرض أعمالك وحابب نحكي عن مشروع تصميم.',
    'c.email': 'البريد الإلكتروني', 'c.whatsapp': 'واتساب', 'c.phone': 'الهاتف', 'c.mobile': 'الجوال', 'c.link': 'رابط',
    'rights': 'جميع الحقوق محفوظة', 'stars': '{n} من 5 نجوم',
    'error': 'تعذّر تحميل المحتوى. يرجى المحاولة لاحقًا.'
  }
};
function T(key, n) {
  if (n === 1 && UI.en[key + '.one']) key += '.one';   // "1 post", not "1 posts"
  var s = (UI[LANG] && UI[LANG][key]) || UI.en[key] || key;
  return n == null ? s : s.replace('{n}', n);
}
// Text from the dashboard in the current language (falls back to English)
function tr(obj, key) {
  if (!obj) return '';
  if (LANG === 'ar') {
    var ar = obj[key + '_ar'];
    if (ar != null && String(ar).trim() !== '') return ar;
  }
  return obj[key] == null ? '' : obj[key];
}
// Visitor stats: counts clicks on projects, CV, contact (shows in the GoatCounter dashboard)
function track(name) {
  try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: name, title: name, event: true }); } catch (e) {}
}
function switchLang() {
  var next = LANG === 'ar' ? 'en' : 'ar';
  try { localStorage.setItem('lang', next); } catch (e) {}
  try { sessionStorage.setItem('scrollY', String(window.scrollY)); } catch (e) {}
  var u = new URL(location.href);
  u.searchParams.set('lang', next);
  location.replace(u.toString());
}
function applyStaticText() {
  document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = T(n.getAttribute('data-i18n')); });
  var b = document.getElementById('langToggle');
  if (b) {
    b.querySelector('.lang-label').textContent = T('switch');
    b.setAttribute('aria-label', LANG === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    b.lang = LANG === 'ar' ? 'en' : 'ar';
  }
}
applyStaticText();

// Portfolio tabs, in this order. Only tabs that have projects are shown.
var CATEGORIES = [
  { id: 'logos' }, { id: 'branding' }, { id: 'social' }, { id: 'catalog' }
];
var CONTACT_TYPES = {
  email:    { label: 'Email',    icon: '✉️', href: function (v) { return 'mailto:' + v.trim(); } },
  whatsapp: { label: 'WhatsApp', icon: '💬', href: function (v, ct) { return 'https://wa.me/' + v.replace(/\D/g, '') + '?text=' + encodeURIComponent(tr(ct || {}, 'message') || T('c.waMsg')); }, blank: true },
  phone:    { label: 'Phone',    icon: '📞', href: function (v) { return 'tel:+' + v.replace(/\D/g, ''); } },
  mobile:   { label: 'Phone',    icon: '📱', href: function (v) { return 'tel:+' + v.replace(/\D/g, ''); } },
  link:     { label: 'Link',     icon: '🔗', href: function (v) { return v.trim(); }, blank: true }
};

var PROJECTS = {};

// ===== Build the page from content.json =====
function render(c) {
  var site = c.site || {}, hero = c.hero || {};
  if (tr(site, 'pageTitle')) document.title = tr(site, 'pageTitle');

  document.querySelectorAll('[data-text]').forEach(function (n) {
    var path = n.getAttribute('data-text'), dot = path.lastIndexOf('.');
    n.textContent = tr(get(c, path.slice(0, dot)), path.slice(dot + 1));
  });

  // Hero name: "FIRST <span>LAST</span>"
  var hn = document.getElementById('heroName');
  hn.textContent = tr(hero, 'firstName') + ' ';
  hn.appendChild(el('span', null, tr(hero, 'lastName')));

  var photo = document.getElementById('profileImg');
  setPreview(photo, hero.photo); photo.alt = tr(hero, 'firstName') + ' ' + tr(hero, 'lastName');

  var cv = document.getElementById('cvBtn');
  if (hero.cv) { cv.href = asset(hero.cv); cv.setAttribute('download', asset(hero.cv).split('/').pop()); cv.onclick = function () { track('Download CV'); }; }
  else cv.style.display = 'none';

  // Stats
  var stats = document.getElementById('heroStats');
  (c.stats || []).forEach(function (s) {
    var st = el('div', 'stat');
    var num = el('div', 'stat-num', '0');
    num.setAttribute('data-target', s.number || 0);
    num.setAttribute('data-suffix', s.suffix || '');
    st.appendChild(num);
    st.appendChild(el('div', 'stat-label', tr(s, 'label')));
    stats.appendChild(st);
  });

  // Skills
  var skills = document.getElementById('skillsGrid');
  (c.skills || []).forEach(function (s) {
    var card = el('div', 'skill-card');
    var ic = el('div', 'skill-icon');
    if (s.icon) ic.appendChild(img(s.icon, s.name));
    card.appendChild(ic);
    card.appendChild(el('div', 'skill-name', s.name));
    card.appendChild(el('div', 'skill-level', tr(s, 'level')));
    skills.appendChild(card);
  });

  // Services (numbered automatically)
  var services = document.getElementById('servicesList');
  (c.services || []).forEach(function (s, i) {
    var row = el('article', 'service-row');
    row.appendChild(el('span', 'service-num', String(i + 1).padStart(2, '0')));
    var body = el('div', 'service-body');
    body.appendChild(el('h3', null, tr(s, 'title')));
    body.appendChild(el('p', null, tr(s, 'description')));
    row.appendChild(body);
    services.appendChild(row);
  });

  // Portfolio
  var grid = document.getElementById('portfolioGrid');
  var used = {};
  (c.projects || []).forEach(function (p, i) {
    var images = (p.images || []).filter(Boolean);
    if (!images.length) return;
    var id = 'p' + i, n = images.length, viewer = p.viewer || 'single';
    var title = tr(p, 'title');
    var countText = viewer === 'grid' ? T('count.posts', n) : T('count.pages', n);
    var sub = tr(p, 'subtitle');
    if (viewer !== 'single' && n > 1) sub += (viewer === 'grid' ? ' — ' : ' · ') + countText;
    PROJECTS[id] = { title: title, sub: sub, kind: viewer, images: images.map(asset) };
    used[p.category] = true;

    var badge = viewer === 'grid' ? T('badge.posts', n)
              : viewer === 'flipbook' ? T('badge.flipbook')
              : p.category === 'logos' ? T('badge.logo') : T('badge.view');

    // Social media: one section per brand (taken from the image's folder), real shapes, no cropping
    if (viewer === 'grid') {
      addSocialGroup(grid, p, images);
      return;
    }

    var item = el('div', 'portfolio-item');
    item.dataset.cat = p.category;
    item.onclick = function () { openProject(id); };
    var thumb = el('div', 'portfolio-thumb' + (p.category === 'logos' ? ' logo-thumb' : ''));
    thumb.appendChild(imgPreview(p.thumbnail || images[0], title));
    thumb.appendChild(el('span', 'thumb-badge', badge));
    var info = el('div', 'portfolio-info');
    info.appendChild(el('h3', null, title));
    info.appendChild(el('p', null, sub));
    item.appendChild(thumb); item.appendChild(info);
    grid.appendChild(item);
  });

  var tabs = document.getElementById('portfolioTabs');
  var first = null;
  CATEGORIES.forEach(function (cat) {
    if (!used[cat.id]) return;
    var b = el('button', 'tab-btn', T('tab.' + cat.id));
    b.onclick = function () { filterWork(cat.id, b); };
    tabs.appendChild(b);
    if (!first) first = { id: cat.id, btn: b };
  });
  if (first) filterWork(first.id, first.btn);

  // Contact
  var contact = document.getElementById('contactGrid');
  (c.contact || []).forEach(function (ct) {
    var t = CONTACT_TYPES[ct.type] || CONTACT_TYPES.link;
    var a = el('a', 'contact-card');
    a.href = t.href(ct.value || '', ct);
    if (t.blank) a.target = '_blank';
    a.addEventListener('click', function () { track('Contact: ' + (ct.type || 'link')); });
    a.appendChild(el('div', 'contact-icon', t.icon));
    a.appendChild(el('div', 'contact-label', tr(ct, 'label') || T('c.' + (CONTACT_TYPES[ct.type] ? ct.type : 'link'))));
    var cv = el('div', 'contact-value');
    var cvText = el('span', null, ct.value);
    cvText.dir = 'ltr';                         // numbers/emails never flip in Arabic
    cv.appendChild(cvText);
    a.appendChild(cv);
    contact.appendChild(a);
  });

  loadReviews(c);

  // Footer (year updates automatically)
  var f = document.getElementById('footer');
  f.textContent = '© ' + new Date().getFullYear() + ' ';
  f.appendChild(el('span', null, tr(site, 'footerName')));
  f.appendChild(document.createTextNode(' — ' + T('rights')));

  startStats();

  // after a language switch, return to where the visitor was
  try {
    var y = sessionStorage.getItem('scrollY');
    if (y != null) { sessionStorage.removeItem('scrollY'); setTimeout(function () { window.scrollTo(0, +y); }, 50); }
  } catch (e) {}
}

// ===== Client reviews =====
var COUNTRIES = {
  ps:'Palestine', sa:'Saudi Arabia', ae:'UAE', kw:'Kuwait', qa:'Qatar', bh:'Bahrain', om:'Oman',
  jo:'Jordan', eg:'Egypt', lb:'Lebanon', sy:'Syria', iq:'Iraq', ye:'Yemen', ma:'Morocco',
  dz:'Algeria', tn:'Tunisia', ly:'Libya', sd:'Sudan', tr:'Turkey', us:'USA', gb:'UK', ca:'Canada',
  de:'Germany', fr:'France', it:'Italy', es:'Spain', nl:'Netherlands', se:'Sweden', au:'Australia'
};
var COUNTRIES_AR = {
  ps:'فلسطين', sa:'السعودية', ae:'الإمارات', kw:'الكويت', qa:'قطر', bh:'البحرين', om:'عُمان',
  jo:'الأردن', eg:'مصر', lb:'لبنان', sy:'سوريا', iq:'العراق', ye:'اليمن', ma:'المغرب',
  dz:'الجزائر', tn:'تونس', ly:'ليبيا', sd:'السودان', tr:'تركيا', us:'الولايات المتحدة', gb:'المملكة المتحدة', ca:'كندا',
  de:'ألمانيا', fr:'فرنسا', it:'إيطاليا', es:'إسبانيا', nl:'هولندا', se:'السويد', au:'أستراليا'
};
function starsEl(n) {
  var wrap = el('div', 'review-stars');
  wrap.setAttribute('aria-label', T('stars', n));
  for (var i = 1; i <= 5; i++) wrap.appendChild(el('span', i <= n ? 'star on' : 'star', '★'));
  return wrap;
}
function initials(name) {
  return (name || '?').trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
}
function reviewCard(r, i) {
  var card = el('article', 'review-card');

  // top: client + rating badge
  var head = el('div', 'review-head');
  var person = el('div', 'review-person');
  var av = el('div', 'review-avatar');
  if (r.photo) av.appendChild(imgPreview(r.photo, r.name)); else av.textContent = initials(r.name);
  person.appendChild(av);
  var who = el('div', 'review-who');
  who.appendChild(el('div', 'review-name', r.name || ''));
  if (r.role) who.appendChild(el('div', 'review-role', r.role));
  var code = (r.country || '').toLowerCase();
  if (code) {
    var meta = el('div', 'review-meta');
    var flag = document.createElement('img');
    flag.className = 'review-flag';
    flag.src = 'images/flags/' + code + '.svg';
    flag.alt = ''; flag.loading = 'lazy';
    flag.onerror = function () { flag.remove(); };
    meta.appendChild(flag);
    meta.appendChild(document.createTextNode((LANG === 'ar' && COUNTRIES_AR[code]) || COUNTRIES[code] || code.toUpperCase()));
    who.appendChild(meta);
  }
  person.appendChild(who);
  head.appendChild(person);

  var rating = Math.min(parseInt(r.rating, 10) || 0, 5);
  card.appendChild(head);

  if (rating > 0) card.appendChild(starsEl(rating));
  card.appendChild(el('p', 'review-text', r.opinion || ''));
  return card;
}

// Reviews = approved reviews sent by clients (Google Sheet) + reviews added in the dashboard.
// Dashboard reviews (and the last known client reviews) show immediately; fresh client
// reviews are added whenever Google answers. The script can take several seconds to wake up.
function loadReviews(c) {
  var own = c.reviews || [];
  var api = ((c.site && c.site.reviewsApi) || '').trim();
  if (!api) { renderReviews(own); return; }
  document.getElementById('reviewsCta').style.display = '';
  document.querySelector('#reviewsCta a').onclick = function () { track('Leave a review (button)'); };   // form is connected → show the button

  var KEY = 'portfolioClientReviews', cached = [];
  try { cached = JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { cached = []; }
  renderReviews(cached.concat(own));

  fetch(api)
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var fresh = (d && Array.isArray(d.reviews)) ? d.reviews : [];
      try { localStorage.setItem(KEY, JSON.stringify(fresh)); } catch (e) {}
      if (JSON.stringify(fresh) !== JSON.stringify(cached)) renderReviews(fresh.concat(own));
    })
    .catch(function () { /* keep what is already shown */ });
}

// Moving strip: the cards slide in an endless loop (pauses on hover/touch).
function renderReviews(list) {
  list = list.filter(function (r) { return r && (r.name || r.opinion); });
  var formOpen = document.getElementById('reviewsCta').style.display !== 'none';
  if (!list.length && !formOpen) return;          // nothing to show → section stays hidden
  ['reviews', 'reviewsDivider'].forEach(function (id) { document.getElementById(id).style.display = ''; });
  document.getElementById('navReviews').style.display = '';
  var marqueeBox = document.querySelector('.reviews-marquee');
  document.getElementById('reviewsTrack').innerHTML = '';      // allow re-rendering
  marqueeBox.style.display = list.length ? '' : 'none';
  document.getElementById('reviewsEmpty').style.display = list.length ? 'none' : '';
  if (!list.length) return;                       // no reviews yet, but clients can add one

  var track = document.getElementById('reviewsTrack');
  // Repeat short lists so the strip is always full, then add one identical
  // copy so the loop joins seamlessly.
  var half = [];
  while (half.length < 6) half = half.concat(list);
  [false, true].forEach(function (isCopy) {
    half.forEach(function (r, i) {
      var card = reviewCard(r, i);
      if (isCopy) card.setAttribute('aria-hidden', 'true');
      track.appendChild(card);
    });
  });
  // ~7 seconds per card keeps it calm and readable
  track.style.animationDuration = (half.length * 7) + 's';

  // pause while a finger is on it (phones)
  var marquee = track.parentElement;
  if (!marquee.dataset.touch) {
    marquee.dataset.touch = '1';
    marquee.addEventListener('touchstart', function () { marquee.classList.add('paused'); }, { passive: true });
    marquee.addEventListener('touchend', function () { marquee.classList.remove('paused'); }, { passive: true });
  }
}

// ===== Social media: one section per dashboard entry =====
// Each "Social Media" entry in the dashboard is a section on the site (its name = section title).
// Entries that follow each other with the same name share one section; the 2nd+ entry is shown
// under a small label taken from its subtitle (e.g. Ministry: posts, then "Booklets & reports").
var LAST_SOCIAL = null;
function addSocialGroup(grid, p, images) {
  var name = tr(p, 'title');
  var sec, count;
  if (LAST_SOCIAL && LAST_SOCIAL.name === name && grid.lastElementChild === LAST_SOCIAL.sec) {
    sec = LAST_SOCIAL.sec;
    var lbl = el('div', 'social-sub');
    lbl.appendChild(el('em', 'social-note', tr(p, 'subtitle') || name));
    sec.appendChild(lbl);
    LAST_SOCIAL.total += images.length;
    LAST_SOCIAL.count.textContent = T('count.posts', LAST_SOCIAL.total);
  } else {
    sec = el('div', 'portfolio-item social-section');
    sec.dataset.cat = p.category;
    var head = el('div', 'social-head');
    head.appendChild(el('h3', null, name));
    count = el('span', null, T('count.posts', images.length));
    head.appendChild(count);
    sec.appendChild(head);
    grid.appendChild(sec);
    LAST_SOCIAL = { name: name, sec: sec, count: count, total: images.length };
  }
  socialWall(sec, name, images);
}

// Justified rows: every design keeps its real shape; each row is scaled so it fills the full width exactly.
// Collapsed walls show only the first full rows, with a "Show all" button for the rest.
var SOCIAL_WALLS = [];
function layoutWall(wall) {
  var W = wall.clientWidth;
  if (!W) return;
  var mobile = window.matchMedia('(max-width: 600px)').matches;
  var target = mobile ? 160 : 280, gap = mobile ? 8 : 12, maxRows = mobile ? 3 : 2;
  var items = [].slice.call(wall.children);
  var ratio = function (it) { return parseFloat(it.dataset.r) || 0.8; };

  // split into rows
  var rows = [], row = [], sum = 0;
  items.forEach(function (it) {
    row.push(it); sum += ratio(it);
    if (sum * target + gap * (row.length - 1) >= W) { rows.push({ items: row, sum: sum, full: true }); row = []; sum = 0; }
  });
  if (row.length) rows.push({ items: row, sum: sum, full: false });

  var shown = wall.collapsed ? rows.slice(0, maxRows) : rows;
  rows.forEach(function (r) { r.items.forEach(function (it) { it.hidden = shown.indexOf(r) < 0; }); });
  shown.forEach(function (r) {
    var free = W - gap * (r.items.length - 1), h = free / r.sum;
    if (!r.full) {                                   // last row: stretch only when it's mostly full
      var fill = (r.sum * target) / free;
      h = fill >= 0.6 ? Math.min(h, target * 1.5) : target;
    }
    r.items.forEach(function (it) {
      it.style.width = Math.floor(ratio(it) * h) + 'px';
      it.style.height = Math.round(h) + 'px';
    });
  });
  if (wall.moreBtn) wall.moreBtn.hidden = rows.length <= maxRows;
}
window.addEventListener('resize', function () {
  clearTimeout(layoutWall.t);
  layoutWall.t = setTimeout(function () { SOCIAL_WALLS.forEach(layoutWall); }, 120);
});
function socialWall(sec, name, paths) {
  var wall = el('div', 'social-rows');
  wall.collapsed = true;
  SOCIAL_WALLS.push(wall);
  var srcs = paths.map(asset);
  var again = function () { cancelAnimationFrame(again.f); again.f = requestAnimationFrame(function () { layoutWall(wall); }); };
  srcs.forEach(function (src, k) {
    var post = el('button', 'social-post');
    post.type = 'button';
    post.onclick = function () { openImgLightbox(src, srcs, k); };
    post.dataset.r = '0.8';                                     // a typical 4:5 post until the image is loaded
    var im = imgPreview(src, name + ' ' + (k + 1));
    im.addEventListener('load', function () {
      if (im.naturalWidth && im.naturalHeight) { post.dataset.r = (im.naturalWidth / im.naturalHeight).toFixed(4); again(); }
    });
    post.appendChild(im);
    wall.appendChild(post);
  });
  sec.appendChild(wall);

  var more = el('button', 'show-more-btn social-more', T('social.all', srcs.length));
  more.type = 'button';
  more.hidden = true;
  wall.moreBtn = more;
  more.onclick = function () {
    wall.collapsed = !wall.collapsed;
    more.textContent = wall.collapsed ? T('social.all', srcs.length) : T('social.less');
    layoutWall(wall);
    // When closing, bring this group back into view so the visitor isn't left far below
    if (wall.collapsed) {
      var top = wall.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  };
  sec.appendChild(more);
  setTimeout(again, 0);
}

// ===== Tab filter + "Show more" =====
// How many items to show before the "Show more" button (and per tap).
function pageSize() { return window.matchMedia('(max-width: 600px)').matches ? 6 : 10; }
var FILTER = { cat: null, shown: 0 };

function filterWork(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  FILTER.cat = cat;
  FILTER.shown = pageSize();
  applyFilter();
}
function showMore() {
  FILTER.shown += pageSize();
  applyFilter();
}
function applyFilter() {
  var cat = FILTER.cat, count = 0, postsOnly = true;
  document.querySelectorAll('.portfolio-item').forEach(item => {
    var match = (cat === 'all' || item.dataset.cat === cat);
    if (match) {
      count++;
      if (!item.classList.contains('social-section')) postsOnly = false;
    }
    item.style.display = (match && count <= FILTER.shown) ? '' : 'none';
  });
  // Denser grid when the tab only contains social posts
  document.getElementById('portfolioGrid').classList.toggle('posts-mode', count > 0 && postsOnly);
  if (typeof SOCIAL_WALLS !== 'undefined') SOCIAL_WALLS.forEach(layoutWall);   // size the rows now that they are visible

  var wrap = document.getElementById('showMoreWrap');
  var left = count - FILTER.shown;
  if (left > 0) {
    wrap.style.display = '';
    document.getElementById('showMoreBtn').textContent = T('more', left);
  } else {
    wrap.style.display = 'none';
  }
}

// ===== Animated stat counters =====
function animateCount(el) {
  var target = parseInt(el.getAttribute('data-target'), 10) || 0;
  var suffix = el.getAttribute('data-suffix') || '';
  var dur = 1600, start = null;
  function step(ts) {
    if (!start) start = ts;
    var prog = Math.min((ts - start) / dur, 1);
    var eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}
function startStats() {
  var stats = document.getElementById('heroStats');
  if (!stats) return;
  var done = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !done) {
        done = true;
        stats.querySelectorAll('.stat-num[data-target]').forEach(animateCount);
        io.disconnect();
      }
    });
  }, { threshold: 0.4 });
  io.observe(stats);
}

// ===== Load content =====
fetch('content.json', { cache: 'no-cache' })
  .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(render)
  .catch(function (err) {
    console.error('Could not load content.json', err);
    document.getElementById('portfolioGrid').textContent =
      T('error');
  });

// ===== Unified Project Viewer =====
var V = { id:null, kind:null, images:[], idx:0 };

function openProject(id) {
  var p = PROJECTS[id];
  if (!p) return;
  V.id = id; V.kind = p.kind; V.images = p.images.slice(); V.idx = 0;
  track('Project: ' + p.title);
  document.getElementById('viewerTitle').textContent = p.title;
  document.getElementById('viewerSub').textContent = p.sub;

  var stage = document.getElementById('viewerStage');
  var flip  = document.getElementById('flipStage');
  var scroll = document.getElementById('scrollStage');
  var grid  = document.getElementById('gridStage');

  // reset all stages
  stage.style.display = 'none';
  flip.style.display = 'none';
  scroll.style.display = 'none';
  grid.style.display = 'none';

  if (p.kind === 'flipbook') {
    flip.style.display = 'flex';
    flipRender();
  } else if (p.kind === 'scroll') {
    scroll.style.display = 'block';
    scroll.scrollTop = 0;
    scrollRender();
  } else if (p.kind === 'grid') {
    grid.style.display = 'grid';
    grid.scrollTop = 0;
    gridRender();
  } else {
    stage.style.display = 'flex';
    // hide nav arrows for single-image projects
    var single = V.images.length <= 1;
    document.querySelectorAll('#viewerStage .viewer-nav').forEach(b => b.style.display = single ? 'none' : '');
    galleryRender();
  }
  document.getElementById('viewer').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ---- grid mode (social: all thumbnails at once) ----
function gridRender() {
  var c = document.getElementById('gridStage');
  c.innerHTML = '';
  V.images.forEach(function(src, i){
    var cell = document.createElement('div');
    cell.className = 'grid-cell';
    var im = document.createElement('img');
    im.src = src;
    im.alt = 'Post ' + (i+1);
    im.loading = 'lazy';
    im.decoding = 'async';
    cell.appendChild(im);
    cell.onclick = function(){ openImgLightbox(src, V.images, i); };
    c.appendChild(cell);
  });
  document.getElementById('viewerCounter').textContent = T('viewer.posts', V.images.length);
}

// ---- image lightbox (single post, with prev/next through its set) ----
var LB = { list: [], idx: 0 };
function openImgLightbox(src, list, idx) {
  var lb = document.getElementById('imgLightbox');
  LB.list = list || [src];
  LB.idx = idx || 0;
  ensureLightboxNav();
  lbShow();
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function lbShow() {
  document.getElementById('imgLightboxImg').src = LB.list[LB.idx];
  var multi = LB.list.length > 1;
  document.querySelectorAll('.imglightbox-nav').forEach(b => b.style.display = multi ? '' : 'none');
  var c = document.getElementById('imgLightboxCounter');
  c.textContent = multi ? (LB.idx + 1) + ' / ' + LB.list.length : '';
}
function lbNav(dir) {
  if (LB.list.length < 2) return;
  LB.idx = (LB.idx + dir + LB.list.length) % LB.list.length;
  lbShow();
}
function lbClose() {
  document.getElementById('imgLightbox').classList.remove('active');
  // keep page scroll locked if the big viewer is still open underneath
  if (!document.getElementById('viewer').classList.contains('active')) document.body.style.overflow = '';
}
function ensureLightboxNav() {
  var lb = document.getElementById('imgLightbox');
  if (lb.querySelector('.imglightbox-nav')) return;
  [[-1, 'imglightbox-prev', '\u2039', 'Previous'], [1, 'imglightbox-next', '\u203A', 'Next']].forEach(function (d) {
    var b = el('button', 'imglightbox-nav ' + d[1], d[2]);
    b.setAttribute('aria-label', d[3]);
    b.onclick = function (e) { e.stopPropagation(); lbNav(d[0]); };
    lb.appendChild(b);
  });
  var c = el('div', 'imglightbox-counter'); c.id = 'imgLightboxCounter';
  lb.appendChild(c);
  // swipe on phones
  var x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });
}
function closeImgLightbox(e) {
  // close on backdrop or close button
  if (e.target === document.getElementById('imgLightbox') ||
      e.target.classList.contains('imglightbox-close')) {
    lbClose();
  }
}

// ---- scroll mode (identity decks: all pages stacked vertically) ----
function scrollRender() {
  var c = document.getElementById('scrollStage');
  c.innerHTML = '';
  V.images.forEach(function(src, i){
    var im = document.createElement('img');
    im.src = src;
    im.alt = 'Page ' + (i+1);
    im.className = 'scroll-page';
    im.loading = 'lazy';
    im.decoding = 'async';
    c.appendChild(im);
  });
  document.getElementById('viewerCounter').textContent = T('viewer.pages', V.images.length);
}

function closeViewer() {
  document.getElementById('viewer').classList.remove('active');
  document.body.style.overflow = '';
}
function viewerBackdrop(e) {
  if (e.target === document.getElementById('viewer')) closeViewer();
}

// ---- gallery / single ----
function galleryRender() {
  var img = document.getElementById('viewerImg');
  img.src = V.images[V.idx];
  document.getElementById('viewerCounter').textContent =
    V.images.length > 1 ? (V.idx + 1) + ' / ' + V.images.length : '';
}
function viewerNav(dir) {
  V.idx = (V.idx + dir + V.images.length) % V.images.length;
  galleryRender();
}

// ---- flipbook (two-page spread) ----
// Desktop: cover (page 1) alone on the right, then spreads [2-3],[4-5]...
//   modeled as: spread 0 = [null, p1]; spread k = [p(2k), p(2k+1)]
// Mobile (<=600px): single page per view -> [null, p(idx)]
function isMobileFlip() {
  return window.matchMedia('(max-width: 600px)').matches;
}
function flipSpreads() {
  var imgs = V.images, spreads = [];
  if (isMobileFlip()) {
    for (var j = 0; j < imgs.length; j++) spreads.push([null, imgs[j]]);
    return spreads;
  }
  spreads.push([null, imgs[0]]);              // cover on the right
  for (var i = 1; i < imgs.length; i += 2) {
    spreads.push([imgs[i], imgs[i+1] || null]);
  }
  return spreads;
}
function flipRender() {
  var spreads = flipSpreads();
  if (V.idx < 0) V.idx = 0;
  if (V.idx >= spreads.length) V.idx = spreads.length - 1;
  var sp = spreads[V.idx];
  var L = document.getElementById('flipLeft');
  var R = document.getElementById('flipRight');
  var Lp = L.parentElement, Rp = R.parentElement;
  if (sp[0]) { L.src = sp[0]; Lp.style.visibility = 'visible'; }
  else { L.removeAttribute('src'); Lp.style.visibility = 'hidden'; }
  if (sp[1]) { R.src = sp[1]; Rp.style.visibility = 'visible'; }
  else { R.removeAttribute('src'); Rp.style.visibility = 'hidden'; }
  // page label
  var first = sp[0] ? V.images.indexOf(sp[0]) + 1 : (sp[1] ? V.images.indexOf(sp[1]) + 1 : 1);
  var last  = sp[1] ? V.images.indexOf(sp[1]) + 1 : first;
  document.getElementById('viewerCounter').textContent =
    (first === last ? first : first + '–' + last) + ' / ' + V.images.length;
  [spreads[V.idx + 1], spreads[V.idx - 1]].forEach(function (p) {
    if (p) p.forEach(function (u) { if (u) { var pre = new Image(); pre.src = u; } });
  });
}
function flipNav(dir) {
  var spreads = flipSpreads();
  V.idx = Math.min(Math.max(V.idx + dir, 0), spreads.length - 1);
  flipRender();
}

// ===== Re-render flipbook on viewport change =====
var _rsz;
window.addEventListener('resize', function(){
  clearTimeout(_rsz);
  _rsz = setTimeout(function(){
    var v = document.getElementById('viewer');
    if (v.classList.contains('active') && V.kind === 'flipbook') flipRender();
  }, 150);
});

// ===== Keyboard controls =====
document.addEventListener('keydown', (e) => {
  // image lightbox takes priority
  var lb = document.getElementById('imgLightbox');
  if (lb.classList.contains('active')) {
    if (e.key === 'Escape') lbClose();
    else if (e.key === 'ArrowLeft') lbNav(-1);
    else if (e.key === 'ArrowRight') lbNav(1);
    return;
  }
  if (!document.getElementById('viewer').classList.contains('active')) return;
  if (e.key === 'Escape') closeViewer();
  else if (V.kind === 'scroll' || V.kind === 'grid') { return; }
  else if (e.key === 'ArrowLeft')  { V.kind === 'flipbook' ? flipNav(-1) : (V.images.length>1 && viewerNav(-1)); }
  else if (e.key === 'ArrowRight') { V.kind === 'flipbook' ? flipNav(1)  : (V.images.length>1 && viewerNav(1)); }
});

// ===== Touch swipe (mobile) =====
(function(){
  var x0 = null;
  var v = document.getElementById('viewer');
  v.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, {passive:true});
  v.addEventListener('touchend', e => {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) {
      if (V.kind === 'scroll' || V.kind === 'grid') { x0 = null; return; }
      var dir = dx < 0 ? 1 : -1;
      V.kind === 'flipbook' ? flipNav(dir) : (V.images.length>1 && viewerNav(dir));
    }
    x0 = null;
  }, {passive:true});
})();
