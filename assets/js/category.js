(() => {
  const selected = new URLSearchParams(location.search).get('category') || '';
  document.querySelectorAll('.category-link').forEach(link => {
    const active = link.dataset.category === selected;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const list = document.getElementById('post-list');
  if (!list) return;
  let count = 0;
  list.querySelectorAll('article[data-categories]').forEach(post => {
    const visible = !selected || post.dataset.categories.split('|').includes(selected);
    post.hidden = !visible;
    if (visible) count++;
  });
  document.getElementById('list-title').textContent = selected || '전체 글';
  document.getElementById('post-count').textContent = count + '개의 글';
  document.getElementById('empty-list').hidden = count !== 0;
})();
