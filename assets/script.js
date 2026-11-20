/* =========================================================
   Fatima Boubker — Portfolio interactions
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Theme ---------------- */
  const themeToggle = document.getElementById("themeToggle");

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem("fb-theme", theme); } catch (e) { /* ignore */ }
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------------- Header + progress ---------------- */
  const header = document.getElementById("header");
  const progress = document.getElementById("progress");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 12);

    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------------- Mobile navigation ---------------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("open")) return;
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("visible"); });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = Array.prototype.slice.call(el.parentElement.children);
          const index = Math.max(0, siblings.indexOf(el) % 6);
          el.style.transitionDelay = Math.min(index * 70, 280) + "ms";
          el.classList.add("visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- Active nav link ---------------- */
  const navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map(function (link) {
      const id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------------- Typing effect ---------------- */
  const typedEl = document.getElementById("typed");
  const roles = [
    "Data Analytics & Intelligence Artificielle",
    "Machine Learning & Deep Learning",
    "Computer Vision & NLP",
    "Business Intelligence & Data Mining"
  ];

  if (typedEl && !reduceMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          deleting = true;
          window.setTimeout(tick, 2200);
          return;
        }
        window.setTimeout(tick, 55 + Math.random() * 45);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          window.setTimeout(tick, 350);
          return;
        }
        window.setTimeout(tick, 26);
      }
    }

    window.setTimeout(tick, 2600);
  }

  /* ---------------- Stat counters ---------------- */
  const counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) { el.textContent = String(target); return; }

    const duration = 1100;
    const start = performance.now();

    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
    } else {
      const counterObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) { counterObserver.observe(el); });
    }
  }

  /* ---------------- Project filters ---------------- */
  const filters = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  const projects = Array.prototype.slice.call(document.querySelectorAll(".project"));

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.getAttribute("data-filter") || "all";

      filters.forEach(function (b) { b.classList.toggle("active", b === button); });
      projects.forEach(function (card) {
        const match = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !match);
        if (match && !reduceMotion) {
          card.classList.remove("visible");
          void card.offsetWidth;
          card.classList.add("visible");
        }
      });
    });
  });

  /* ---------------- Copy email ---------------- */
  const copyBtn = document.getElementById("copyMail");
  const toast = document.getElementById("toast");
  const copyLabel = document.getElementById("copyLabel");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove("show"); }, 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const email = copyBtn.getAttribute("data-mail") || "";
      const done = function () {
        showToast("Email copié : " + email);
        if (copyLabel) {
          const original = copyLabel.textContent;
          copyLabel.textContent = "Email copié !";
          window.setTimeout(function () { copyLabel.textContent = original; }, 2000);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function () {
          showToast("Copie impossible — écrivez à " + email);
        });
      } else {
        const temp = document.createElement("textarea");
        temp.value = email;
        temp.setAttribute("readonly", "");
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        try { document.execCommand("copy"); done(); }
        catch (e) { showToast("Copie impossible — écrivez à " + email); }
        document.body.removeChild(temp);
      }
    });
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------- Smooth anchor offset (fallback) ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });
})();
