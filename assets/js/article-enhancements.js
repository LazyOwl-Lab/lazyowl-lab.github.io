/* The Hidden Route — article reading time and automatic table of contents */
(() => {
  const article = document.querySelector('#article-content');
  if (!article) return;

  // Estimate reading time from article text. About 220 words/minute.
  const readingTime = document.querySelector('[data-reading-time]');
  if (readingTime) {
    const sourceBlock = article.querySelector('#article-sources');
    const disclaimer = article.querySelector('.editorial-disclaimer');
    const clone = article.cloneNode(true);
    clone.querySelectorAll('#article-sources,.editorial-disclaimer').forEach(el => el.remove());
    const words = (clone.innerText || clone.textContent || '').trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 220));
    readingTime.textContent = `${minutes} min read`;
    readingTime.setAttribute('aria-label', `Approximately ${minutes} minute read`);
  }

  // Build a table of contents from H2/H3 headings in the article.
  const toc = document.querySelector('[data-article-toc]');
  const tocPanel = document.querySelector('[data-toc-panel]');
  if (!toc || !tocPanel) return;

  const headings = [...article.querySelectorAll('h2, h3')]
    .filter(heading => !heading.closest('#article-sources'));
  if (headings.length < 2) {
    tocPanel.hidden = true;
    return;
  }

  const slugify = text => text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

  const usedIds = new Set([...document.querySelectorAll('[id]')].map(el => el.id));
  headings.forEach((heading, index) => {
    if (!heading.id) {
      const base = slugify(heading.textContent) || `section-${index + 1}`;
      let id = base;
      let suffix = 2;
      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      heading.id = id;
      usedIds.add(id);
    }

    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    if (heading.tagName === 'H3') {
      link.classList.add('toc-subheading');
    }
    link.addEventListener('click', event => {
      event.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${heading.id}`);
    });
    li.appendChild(link);
    toc.appendChild(li);
  });
})();
