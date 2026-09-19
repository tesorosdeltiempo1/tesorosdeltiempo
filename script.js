/* ═══════════════════════════════════════════════════════════════
   Tesoros del Tiempo · script.js  (solo home)
   El reveal, el parallax y el menú móvil viven en base.js.
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  // URL que recibe { "email": "..." } por POST cuando alguien pide acceso al Gremio.
  // Vacía = modo demo: el formulario NO guarda nada y lo dice claramente.
  // El bloque de envío es genérico: cada proveedor (Brevo, Mailchimp, un
  // formulario de WordPress…) pide su propio formato y CORS. Ajústalo al elegido.
  guildEndpoint: ""
};

document.addEventListener("DOMContentLoaded", () => {
  /* ── Loader: una vez por sesión ──────────────────────────────
     El <head> ya lo oculta si se vio antes (clase .loader-seen). */
  const loader = document.getElementById("loader");
  window.setTimeout(() => {
    if (loader) loader.classList.add("is-hidden");
    try { sessionStorage.setItem("tt-loader", "1"); } catch (e) { /* modo privado: da igual */ }
  }, 650);

  /* ── Revelado táctil del origen ──────────────────────────── */
  document.querySelectorAll(".origin-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const active = button.classList.toggle("is-origin");
      button.setAttribute("aria-pressed", String(active));
    });
  });

  /* ── Countdown ───────────────────────────────────────────────
     Para cada Drop solo hay que cambiar data-drop-date en el HTML. */
  const countdownBar = document.querySelector("[data-drop-date]");
  const countdown = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function updateCountdown() {
    if (!countdownBar) return;
    const target = new Date(countdownBar.dataset.dropDate).getTime();
    const diff = target - Date.now();

    if (Number.isNaN(target) || diff <= 0) {
      Object.values(countdown).forEach((el) => { if (el) el.textContent = "00"; });
      return;
    }

    const day = 86400000;
    const hour = 3600000;
    const minute = 60000;

    countdown.days.textContent = String(Math.floor(diff / day)).padStart(2, "0");
    countdown.hours.textContent = String(Math.floor((diff % day) / hour)).padStart(2, "0");
    countdown.minutes.textContent = String(Math.floor((diff % hour) / minute)).padStart(2, "0");
    countdown.seconds.textContent = String(Math.floor((diff % minute) / 1000)).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  /* ── Formulario del Gremio ───────────────────────────────── */
  const form = document.getElementById("guild-form");
  const message = document.getElementById("form-message");

  if (form && message) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = String(new FormData(form).get("email") || "").trim();
      if (!email) return;

      if (!CONFIG.guildEndpoint) {
        // Honesto con quien lo prueba: sin endpoint no se ha guardado nada.
        message.textContent = "Modo demo: este correo todavía no se ha guardado.";
        return;
      }

      const submit = form.querySelector("button[type='submit']");
      if (submit) submit.disabled = true;
      message.textContent = "Enviando…";

      try {
        const response = await fetch(CONFIG.guildEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        form.reset();
        message.textContent = "Listo. Te avisaremos antes de la apertura pública.";
      } catch (error) {
        message.textContent = "No hemos podido registrar tu correo. Inténtalo de nuevo en unos minutos.";
      } finally {
        if (submit) submit.disabled = false;
      }
    });
  }
});
