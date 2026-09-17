(() => {
  const burger = document.querySelector(".burger");
  const overlay = document.getElementById("menu-overlay");
  const menu = document.getElementById("mobile-menu");
  const mobileLinks = menu ? menu.querySelectorAll("a") : [];

  const setMenuOpen = (open) => {
    if (!burger || !overlay || !menu) return;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    overlay.hidden = !open;
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  };

  burger?.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    setMenuOpen(open);
  });

  overlay?.addEventListener("click", () => setMenuOpen(false));

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) setMenuOpen(false);
  });

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateStat = (el, index) => {
    const target = Number(el.dataset.target);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    const valueEl = el.querySelector(".stat-value");
    if (!valueEl || Number.isNaN(target)) return;

    const duration = 1500 + index * 80;
    const startDelay = 480 + index * 90;
    const start = performance.now() + startDelay;

    const tick = (now) => {
      if (now < start) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (now - start) / duration);
      const value = target * easeOutCubic(progress);
      valueEl.textContent = `${value.toFixed(decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const stats = Array.from(document.querySelectorAll(".stat"));
  let counted = false;

  const runCount = () => {
    if (counted) return;
    counted = true;
    stats.forEach((stat, index) => animateStat(stat, index));
  };

  if ("IntersectionObserver" in window && stats.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runCount();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    const footer = document.querySelector(".stats");
    if (footer) observer.observe(footer);
  } else {
    runCount();
  }
})();
