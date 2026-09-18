document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el) => observer.observe(el));

  // Very restrained scroll parallax.
  const parallaxItems = document.querySelectorAll("[data-parallax]");

  const updateParallax = () => {
    const viewport = window.innerHeight;

    parallaxItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewport) return;

      const center = rect.top + rect.height / 2;
      const offset = (viewport / 2 - center) * 0.035;
      el.style.setProperty("--parallax", `${offset}px`);
    });
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateParallax();

  // Horizontal gallery: buttons + wheel + pointer drag.
  const track = document.querySelector("#galleryTrack");
  const cards = [...document.querySelectorAll(".gallery-card")];
  const prev = document.querySelector("#galleryPrev");
  const next = document.querySelector("#galleryNext");
  const current = document.querySelector("#galleryCurrent");
  const bar = document.querySelector("#galleryBar");

  let index = 0;
  let position = 0;
  let startX = 0;
  let startPosition = 0;
  let dragging = false;

  const getStep = () => {
    const gap = parseFloat(getComputedStyle(track).gap || 20);
    return cards[0].getBoundingClientRect().width + gap;
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getMax = () => Math.max(0, track.scrollWidth - window.innerWidth * 0.9);

  const renderGallery = (animate = true) => {
    const step = getStep();
    position = clamp(index * step, 0, getMax());

    track.style.transition = animate ? "transform .75s cubic-bezier(.22,1,.36,1)" : "none";
    track.style.transform = `translate3d(${-position}px, 0, 0)`;

    current.textContent = String(index + 1).padStart(2, "0");
    bar.style.width = `${((index + 1) / cards.length) * 100}%`;
  };

  const move = (delta) => {
    index = clamp(index + delta, 0, cards.length - 1);
    renderGallery();
  };

  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));

  window.addEventListener("resize", () => renderGallery(false));

  track.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    startPosition = position;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    position = clamp(startPosition - delta, 0, getMax());
    track.style.transform = `translate3d(${-position}px, 0, 0)`;
  });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");

    index = clamp(Math.round(position / getStep()), 0, cards.length - 1);
    renderGallery();
  };

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("pointerleave", () => {
    if (dragging) endDrag();
  });

  track.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    move(event.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  renderGallery(false);
});
