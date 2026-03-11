(() => {
  const createIconButton = ({ className, href, title, label, svg, external }) => {
    const button = document.createElement("a");
    button.className = `md-header__button md-icon ${className}`;
    button.href = href;
    button.title = title;
    button.setAttribute("aria-label", label);
    if (external) {
      button.target = "_blank";
      button.rel = "noopener";
    }
    button.innerHTML = svg;
    return button;
  };

  const insertHeaderButtons = () => {
    const header = document.querySelector(".md-header__inner");
    if (!header) return;

    const searchButton = header.querySelector('label.md-header__button[for="__search"]');
    const insertBefore = (node) => {
      if (searchButton) {
        searchButton.before(node);
      } else {
        header.appendChild(node);
      }
    };

    if (!header.querySelector(".md-rss")) {
      const rss = createIconButton({
        className: "md-rss",
        href: "/feed_rss_created.xml",
        title: "RSS feed",
        label: "RSS feed",
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6.18,17.82A2.18,2.18 0 0,1 4,15.64A2.18,2.18 0 0,1 6.18,13.46A2.18,2.18 0 0,1 8.36,15.64A2.18,2.18 0 0,1 6.18,17.82M6.18,4A13.64,13.64 0 0,1 19.82,17.64H16.91A10.73,10.73 0 0,0 6.18,6.91V4M6.18,8.36A9.27,9.27 0 0,1 15.45,17.64H12.55A6.36,6.36 0 0,0 6.18,11.27V8.36Z" />
          </svg>
        `,
      });
      insertBefore(rss);
    }

    if (!header.querySelector(".md-github")) {
      const github = createIconButton({
        className: "md-github",
        href: "https://github.com/pierce403/PDXHF",
        title: "GitHub",
        label: "GitHub",
        external: true,
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.15C10.29,6.93 11.15,6.82 12,6.82C12.85,6.82 13.71,6.93 14.5,7.15C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.58 14.5,20.63 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.17 22,16.42 22,12A10,10 0 0,0 12,2Z" />
          </svg>
        `,
      });
      insertBefore(github);
    }
  };

  const init = () => {
    insertHeaderButtons();
    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(() => insertHeaderButtons());
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
