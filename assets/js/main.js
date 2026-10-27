(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });
  }

  const themeButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('the-hidden-route-theme');
  if (savedTheme === 'dark') document.documentElement.classList.add('dark-mode');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('the-hidden-route-theme', isDark ? 'dark' : 'light');
      themeButton.setAttribute('aria-pressed', String(isDark));
    });
  }

  const dateEl = document.querySelector('[data-current-date]');
  if (dateEl) {
    dateEl.textContent = new Intl.DateTimeFormat('en-GB', {
      weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
    }).format(new Date()).toUpperCase();
  }

  const search = document.querySelector('#story-search');
  const stories = [...document.querySelectorAll('.searchable-story')];
  const count = document.querySelector('#search-count');
  const noResults = document.querySelector('#no-results');
  if (search) {
    const update = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      stories.forEach(story => {
        const match = !query || (story.dataset.search || '').includes(query);
        story.hidden = !match;
        if (match) visible++;
      });
      if (count) count.textContent = query ? `${visible} result${visible === 1 ? '' : 's'}` : `${stories.length} stories`;
      if (noResults) noResults.hidden = visible !== 0;
    };
    search.addEventListener('input', update);
    update();
  }
})();
