const posts = [
  {
    category: 'Travel',
    title: 'A slow morning in Hội An',
    excerpt: 'A yellow-walled town, early light, and the comfort of wandering without a plan.',
    date: '12 Sep 2026',
    image: 'image-hue',
  },
  {
    category: 'Experiences',
    title: 'The small courage to begin again',
    excerpt: 'On leaving room for change, even when the next little step feels uncertain.',
    date: '28 Aug 2026',
    image: 'image-field',
  },
  {
    category: 'Books',
    title: 'Books that taught me to slow down',
    excerpt: 'A growing shelf of kind, thoughtful reads to return to when life becomes noisy.',
    date: '15 Aug 2026',
    image: 'image-books',
  },
  {
    category: 'Marketing',
    title: 'What a good story makes us feel',
    excerpt: 'A few notes from the intersection of empathy, clarity, and meaningful work.',
    date: '02 Aug 2026',
    image: 'image-studio',
  },
  {
    category: 'Life',
    title: 'Keeping a little space for wonder',
    excerpt: 'The ordinary rituals that help me notice a brighter, slower kind of day.',
    date: '21 Jul 2026',
    image: 'image-sky',
  },
  {
    category: 'Travel',
    title: 'Notes from a rainy café in Đà Lạt',
    excerpt: 'The scent of coffee, green hills behind misted windows, and an unhurried afternoon.',
    date: '07 Jul 2026',
    image: 'image-cafe',
  },
];

function currentPage() {
  const page = window.location.pathname.split('/').pop();
  return page || 'index.html';
}

function renderHeader() {
  const links = [
    ['Home', 'index.html'],
    ['About', 'about.html'],
    ['Travel', 'blog.html?category=Travel'],
    ['Experiences', 'blog.html?category=Experiences'],
    ['Marketing', 'blog.html?category=Marketing'],
    ['Books', 'blog.html?category=Books'],
    ['Contact', 'contact.html'],
  ];
  const activePage = currentPage();
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  header.innerHTML = `
    <a class="brand" href="index.html" aria-label="Vy’s World home">Vy<span>’s</span> World</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">
      <span class="sr-only">Open navigation menu</span><i></i><i></i>
    </button>
    <nav id="site-menu" class="site-nav" aria-label="Primary navigation">
      ${links.map(([label, href]) => `<a href="${href}" class="${activePage === href ? 'is-active' : ''}">${label}</a>`).join('')}
    </nav>`;

  const menuToggle = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.site-nav');
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
}

function renderFooter() {
  const footer = document.querySelector('[data-site-footer]');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-top">
      <a class="brand" href="index.html">Vy<span>’s</span> World</a>
      <p>A little green garden on the internet for stories, ideas and everyday wonder.</p>
    </div>
    <div class="footer-links">
      <a href="index.html">Home</a><a href="about.html">About</a><a href="blog.html">Stories</a><a href="contact.html">Contact</a>
    </div>
    <div class="footer-bottom"><span>© 2026 Vy. Made slowly with care.</span><a href="mailto:hello@vysworld.com">hello@vysworld.com</a></div>`;
}

const PLACEHOLDER_IMAGE = 'images/1x/1DUMMY-IMAGE.png';

function postCard(post) {
  return `<article class="post-card" data-category="${post.category.toLowerCase()}">
    <a class="post-image ${post.image}" href="article.html" aria-label="Read ${post.title}"><img src="${PLACEHOLDER_IMAGE}" alt="${post.title} cover photo" loading="lazy"></a>
    <div class="post-card-body">
      <p class="eyebrow">${post.category}</p>
      <h3><a href="article.html">${post.title}</a></h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-meta"><time>${post.date}</time><a href="article.html">Read story <span aria-hidden="true">→</span></a></div>
    </div>
  </article>`;
}

function renderPosts() {
  const grid = document.querySelector('[data-post-grid]');
  if (!grid) return;
  const featured = grid.dataset.postGrid === 'featured';
  const renderedPosts = featured ? posts.slice(0, 3) : posts;
  grid.innerHTML = renderedPosts.map(postCard).join('');
}

function setupBlogFiltering() {
  const grid = document.querySelector('[data-post-grid="all"]');
  const search = document.querySelector('[data-search-posts]');
  const tabs = [...document.querySelectorAll('[data-category-filter]')];
  const resultCount = document.querySelector('[data-results-count]');
  if (!grid || !search) return;

  const initialCategory = new URLSearchParams(window.location.search).get('category') || 'All';
  let selectedCategory = initialCategory;
  const applyFilters = () => {
    const term = search.value.trim().toLowerCase();
    const filteredPosts = posts.filter((post) => {
      const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const text = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return categoryMatch && text.includes(term);
    });
    grid.innerHTML = filteredPosts.map(postCard).join('') || '<p class="empty-state">No stories found yet. Try another word or category.</p>';
    resultCount.textContent = `${filteredPosts.length} ${filteredPosts.length === 1 ? 'story' : 'stories'}`;
    tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.categoryFilter === selectedCategory));
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    selectedCategory = tab.dataset.categoryFilter;
    applyFilters();
  }));
  search.addEventListener('input', applyFilters);
  applyFilters();
}

function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const notice = form.querySelector('[data-form-notice]');
    notice.textContent = 'Thank you — your note is ready to send in the full site.';
    notice.hidden = false;
    form.reset();
  });
}

renderHeader();
renderFooter();
renderPosts();
setupBlogFiltering();
setupContactForm();