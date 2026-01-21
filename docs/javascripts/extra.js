(() => {
  const insertRssButton = () => {
    const header = document.querySelector(".md-header__inner");
    if (!header || header.querySelector(".md-rss")) return;

    const rss = document.createElement("a");
    rss.className = "md-header__button md-icon md-rss";
    rss.href = "/feed_rss_created.xml";
    rss.title = "RSS feed";
    rss.setAttribute("aria-label", "RSS feed");
    rss.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.18,17.82A2.18,2.18 0 0,1 4,15.64A2.18,2.18 0 0,1 6.18,13.46A2.18,2.18 0 0,1 8.36,15.64A2.18,2.18 0 0,1 6.18,17.82M6.18,4A13.64,13.64 0 0,1 19.82,17.64H16.91A10.73,10.73 0 0,0 6.18,6.91V4M6.18,8.36A9.27,9.27 0 0,1 15.45,17.64H12.55A6.36,6.36 0 0,0 6.18,11.27V8.36Z" />
      </svg>
    `;

    const searchButton = header.querySelector('label.md-header__button[for="__search"]');
    if (searchButton) {
      searchButton.before(rss);
    } else {
      header.appendChild(rss);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertRssButton, { once: true });
  } else {
    insertRssButton();
  }
})();
