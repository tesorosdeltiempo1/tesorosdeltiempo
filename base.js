/* ═══════════════════════════════════════════════════════════════
   Tesoros del Tiempo · base.js
   Comportamiento COMPARTIDO por home y ficha:
   reveal por scroll · parallax mínimo · menú móvil.
   Se carga antes que script.js / producto.js.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ── Reveal por scroll ───────────────────────────────────── */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ── Parallax mínimo ─────────────────────────────────────────
     Uso:  <div data-parallax>            → intensidad por defecto (0.035)
           <div data-parallax="0.06">     → intensidad propia
     Escribe --parallax (px) en el elemento; el CSS decide cómo aplicarlo. */
  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];

  if (parallaxItems.length && !reduceMotion.matches) {
    const updateParallax = () => {
      const viewport = window.innerHeight;

      parallaxItems.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) return;

        const strength = parseFloat(el.dataset.parallax) || 0.035;
        const center = rect.top + rect.height / 2;
        el.style.setProperty("--parallax", `${(viewport / 2 - center) * strength}px`);
      });
    };

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener("resize", updateParallax);
    updateParallax();
  }

  /* ── Menú móvil ──────────────────────────────────────────────
     Se construye a partir de los enlaces de .nav, así hay una sola
     fuente de verdad. Sin JS, en móvil solo se ve marca + El Gremio. */
  const header = document.querySelector(".site-header");
  const nav = header && header.querySelector(".nav");
  const actions = header && header.querySelector(".header-actions");

  if (header && nav && actions) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "menu-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "mobile-menu");
    toggle.setAttribute("aria-label", "Abrir menú");
    toggle.innerHTML = "<span></span><span></span>";
    actions.append(toggle);

    const menu = document.createElement("nav");
    menu.className = "mobile-menu";
    menu.id = "mobile-menu";
    menu.setAttribute("aria-label", "Menú");
    nav.querySelectorAll("a").forEach((link) => menu.append(link.cloneNode(true)));
    header.after(menu);

    // Mientras el menú está abierto, el resto de la página no es navegable.
    const background = document.querySelectorAll("main, .footer");

    const setOpen = (open) => {
      root.classList.toggle("menu-open", open);
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      background.forEach((el) => { el.inert = open; });
      if (open) {
        const first = menu.querySelector("a");
        if (first) first.focus();
      }
    };

    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !menu.classList.contains("is-open")) return;
      setOpen(false);
      toggle.focus();
    });

    window.matchMedia("(min-width: 851px)").addEventListener("change", (event) => {
      if (event.matches) setOpen(false);
    });
  }
})();
