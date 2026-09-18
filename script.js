document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  window.setTimeout(() => loader?.classList.add("is-hidden"), 650);

  // Reveal por scroll
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
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

  // Revelado táctil del origen
  document.querySelectorAll(".origin-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const active = button.classList.toggle("is-origin");
      button.setAttribute("aria-pressed", String(active));
    });
  });

  // Countdown: cambia únicamente el data-drop-date del HTML para cada Drop.
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

    if (diff <= 0) {
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

  // Formulario: modo demo hasta conectar proveedor de email.
  const form = document.getElementById("guild-form");
  const message = document.getElementById("form-message");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(form).get("email");

    if (!email) return;

    message.textContent = "Solicitud preparada. Conecta aquí tu webhook o proveedor de email.";
    form.reset();
  });

  // Lucide icons, si se usan en futuras iteraciones.
  if (window.lucide) window.lucide.createIcons();
});