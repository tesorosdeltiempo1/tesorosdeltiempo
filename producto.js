/* ═══════════════════════════════════════════════════════════════
   Tesoros del Tiempo · producto.js  (solo ficha)
   El reveal, el parallax y el menú móvil viven en base.js.
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initHeroVideo();
  initGallery();
});

/* ─────────────────────────────────────────────────────────────
   HERO · vídeo
   El encuadre se controla con variables CSS (ver producto.css).
   Aquí solo: pausa/reproducción, movimiento reducido y, con
   producto.html?ajuste, el panel para encajar el vídeo en vivo.
   ───────────────────────────────────────────────────────────── */
function initHeroVideo() {
  const wrap = document.querySelector(".hero-image-wrap");
  const video = wrap && wrap.querySelector(".hero-video");
  const toggle = document.getElementById("videoToggle");
  if (!wrap || !video) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const syncToggle = () => {
    if (toggle) toggle.textContent = video.paused ? "Reproducir" : "Pausar";
  };
  video.addEventListener("play", syncToggle);
  video.addEventListener("pause", syncToggle);
  video.addEventListener("loadeddata", syncToggle);

  // Con "reducir movimiento" el vídeo no arranca solo; la persona decide.
  if (reduceMotion.matches) {
    video.autoplay = false;
    video.pause();
  }
  syncToggle();

  if (toggle) {
    toggle.addEventListener("click", () => {
      if (video.paused) {
        const started = video.play();
        if (started && started.catch) started.catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  initVideoTuner(wrap);
}

/* Panel de ajuste: solo aparece con producto.html?ajuste
   Sliders → mueven las variables --video-* en vivo → botón "Copiar CSS". */
function initVideoTuner(wrap) {
  if (!new URLSearchParams(window.location.search).has("ajuste")) return;

  wrap.classList.add("is-tuning"); // dibuja la cruz de centro sobre el círculo

  // [variable, etiqueta, mín, máx, paso, unidad, valor por defecto]
  const controls = [
    ["--video-zoom",    "Zoom",        0.5,  3,   0.01, "",  1],
    ["--video-pan-x",   "Encuadre X",  0,    100, 0.5,  "%", 50],
    ["--video-pan-y",   "Encuadre Y",  0,    100, 0.5,  "%", 50],
    ["--video-shift-x", "Desplazar X", -50,  50,  0.5,  "%", 0],
    ["--video-shift-y", "Desplazar Y", -50,  50,  0.5,  "%", 0]
  ];

  const computed = window.getComputedStyle(wrap);
  const values = {};
  const defaults = {};
  controls.forEach(([key, , , , , , fallback]) => {
    const fromCss = parseFloat(computed.getPropertyValue(key));
    defaults[key] = Number.isNaN(fromCss) ? fallback : fromCss;
    values[key] = defaults[key];
  });

  const round = (n) => Number(n.toFixed(2));

  const panel = document.createElement("aside");
  panel.className = "tuner";
  panel.setAttribute("aria-label", "Ajuste del vídeo del hero");
  panel.innerHTML =
    "<h2>Ajuste del vídeo</h2>" +
    controls.map(([key, label, min, max, step, unit]) =>
      `<label><span>${label}</span>` +
      `<input type="range" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${values[key]}">` +
      `<output data-out="${key}">${round(values[key])}${unit}</output></label>`
    ).join("") +
    '<textarea readonly aria-label="CSS resultante"></textarea>' +
    '<div class="tuner-actions">' +
    '<button type="button" data-action="copy">Copiar CSS</button>' +
    '<button type="button" data-action="reset">Restablecer</button>' +
    "</div>";
  document.body.append(panel);

  const area = panel.querySelector("textarea");
  const copyButton = panel.querySelector("[data-action='copy']");

  const buildCss = () =>
    ".hero-image-wrap {\n" +
    controls.map(([key, , , , , unit]) => `  ${key}: ${round(values[key])}${unit};`).join("\n") +
    "\n  --video-fit: cover;\n}";

  const apply = (key, value) => {
    const control = controls.find((c) => c[0] === key);
    values[key] = value;
    wrap.style.setProperty(key, `${round(value)}${control[5]}`);
    panel.querySelector(`[data-out="${key}"]`).textContent = `${round(value)}${control[5]}`;
    area.value = buildCss();
  };

  panel.addEventListener("input", (event) => {
    const input = event.target.closest("input[data-key]");
    if (input) apply(input.dataset.key, parseFloat(input.value));
  });

  panel.querySelector("[data-action='reset']").addEventListener("click", () => {
    controls.forEach(([key]) => {
      panel.querySelector(`input[data-key="${key}"]`).value = defaults[key];
      apply(key, defaults[key]);
    });
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(area.value);
      copyButton.textContent = "Copiado";
    } catch (error) {
      area.select(); // sin permiso de portapapeles: queda seleccionado para Ctrl+C
      copyButton.textContent = "Ctrl+C";
    }
    window.setTimeout(() => { copyButton.textContent = "Copiar CSS"; }, 1600);
  });

  area.value = buildCss();
}

/* ─────────────────────────────────────────────────────────────
   GALERÍA horizontal: botones + swipe/drag + rueda horizontal
   ───────────────────────────────────────────────────────────── */
function initGallery() {
  const track = document.querySelector("#galleryTrack");
  const cards = [...document.querySelectorAll(".gallery-card")];
  const prev = document.querySelector("#galleryPrev");
  const next = document.querySelector("#galleryNext");
  const current = document.querySelector("#galleryCurrent");
  const bar = document.querySelector("#galleryBar");
  if (!track || !cards.length || !prev || !next || !current || !bar) return;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  let index = 0;
  let position = 0;
  let startX = 0;
  let startPosition = 0;
  let startIndex = 0;
  let dragging = false;

  // Recorrido máximo: el borde derecho de la última tarjeta queda en el margen derecho.
  const maxScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

  // Posición (px) que deja cada tarjeta alineada a la izquierda. Las últimas se
  // paran en el tope, así el índice siempre coincide con lo que se ve.
  const stops = () => {
    const origin = cards[0].offsetLeft;
    const max = maxScroll();
    return cards.map((card) => Math.min(card.offsetLeft - origin, max));
  };

  const nearestStop = (value) => {
    const list = stops();
    let best = 0;
    list.forEach((stop, i) => {
      // <= : si dos tarjetas comparten parada (las últimas), gana la última
      if (Math.abs(stop - value) <= Math.abs(list[best] - value)) best = i;
    });
    return best;
  };

  const render = (animate = true) => {
    position = stops()[index];

    track.style.transition = animate ? "" : "none";
    track.style.transform = `translate3d(${-position}px, 0, 0)`;

    current.textContent = String(index + 1).padStart(2, "0");
    bar.style.width = `${((index + 1) / cards.length) * 100}%`;
    prev.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  };

  const move = (delta) => {
    index = clamp(index + delta, 0, cards.length - 1);
    render();
  };

  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  window.addEventListener("resize", () => render(false));

  /* Drag / swipe (ratón, táctil y lápiz) */
  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    startX = event.clientX;
    startPosition = position;
    startIndex = index;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    position = clamp(startPosition - (event.clientX - startX), 0, maxScroll());
    track.style.transform = `translate3d(${-position}px, 0, 0)`;
  });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");

    const moved = position - startPosition; // + = se arrastró hacia el final
    let target = nearestStop(position);

    // Un gesto corto pero claro (>40 px) avanza una tarjeta, como un swipe normal.
    if (target === startIndex && Math.abs(moved) > 40) {
      target = clamp(startIndex + Math.sign(moved), 0, cards.length - 1);
    }

    index = target;
    render();
  };

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("lostpointercapture", endDrag);

  /* Rueda: solo el gesto HORIZONTAL (trackpad). El scroll vertical sigue siendo de
     la página; antes se capturaba y la página no podía scrollear sobre la galería. */
  let wheelLocked = false;
  track.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    event.preventDefault();
    if (wheelLocked) return;

    wheelLocked = true;
    move(event.deltaX > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLocked = false; }, 500);
  }, { passive: false });

  render(false);
}
