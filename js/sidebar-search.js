/**
 * Add search entry to the sidebar/aside
 * Injects a search card into the aside-content and attaches click handler
 */
document.addEventListener('DOMContentLoaded', () => {
  const asideContent = document.getElementById('aside-content');
  if (!asideContent) return;

  // Create search card widget
  const searchCard = document.createElement('div');
  searchCard.className = 'card-widget card-search';
  searchCard.id = 'card-search';
  searchCard.innerHTML = `
    <div class="item-headline">
      <i class="fas fa-search"></i>
      <span>搜索</span>
    </div>
    <button class="search-card-btn" type="button" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid var(--btn-border); border-radius: 4px; background-color: var(--btn-bg); cursor: pointer; transition: all 0.3s;">
      <i class="fas fa-search"></i> 搜索文章
    </button>
  `;

  // Insert at the beginning of aside-content (after card-author and card-announcement)
  const firstCard = asideContent.querySelector('.card-widget');
  if (firstCard && firstCard.nextElementSibling) {
    firstCard.nextElementSibling.insertAdjacentElement('afterend', searchCard);
  } else if (firstCard) {
    firstCard.insertAdjacentElement('afterend', searchCard);
  } else {
    asideContent.insertAdjacentElement('afterbegin', searchCard);
  }

  // Attach click handler to trigger search
  const searchBtn = searchCard.querySelector('.search-card-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      // Trigger the search button click from the header
      const headerSearchButton = document.querySelector('#search-button > .search');
      if (headerSearchButton) {
        headerSearchButton.click();
      }
    });
  }
});

// Also handle pjax:complete event to re-attach if content is replaced
if (window.btf && window.btf.addGlobalFn) {
  window.btf.addGlobalFn('pjaxComplete', () => {
    const asideContent = document.getElementById('aside-content');
    const existingSearchCard = document.getElementById('card-search');

    if (asideContent && !existingSearchCard) {
      const searchCard = document.createElement('div');
      searchCard.className = 'card-widget card-search';
      searchCard.id = 'card-search';
      searchCard.innerHTML = `
        <div class="item-headline">
          <i class="fas fa-search"></i>
          <span>搜索</span>
        </div>
        <button class="search-card-btn" type="button" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid var(--btn-border); border-radius: 4px; background-color: var(--btn-bg); cursor: pointer; transition: all 0.3s;">
          <i class="fas fa-search"></i> 搜索文章
        </button>
      `;

      const firstCard = asideContent.querySelector('.card-widget');
      if (firstCard && firstCard.nextElementSibling) {
        firstCard.nextElementSibling.insertAdjacentElement('afterend', searchCard);
      } else if (firstCard) {
        firstCard.insertAdjacentElement('afterend', searchCard);
      } else {
        asideContent.insertAdjacentElement('afterbegin', searchCard);
      }

      const searchBtn = searchCard.querySelector('.search-card-btn');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          const headerSearchButton = document.querySelector('#search-button > .search');
          if (headerSearchButton) {
            headerSearchButton.click();
          }
        });
      }
    }
  }, 'sidebarSearch');
}
