(() => {
  "use strict";
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = preference.matches;
  try {
    reduced = localStorage.getItem("baran-motion") === "reduce" || reduced;
  } catch {}
  const motionButton = document.querySelector(".motion-toggle");
  let syncExperiment = () => {};
  const setMotion = (value, persist = false) => {
    reduced = value;
    document.body.classList.toggle("reduced-motion", value);
    if (value)
      document.getAnimations?.().forEach((animation) => animation.cancel());
    if (motionButton) {
      motionButton.setAttribute("aria-pressed", String(value));
      motionButton.textContent = value ? "Hareketi aç" : "Hareketi azalt";
    }
    if (persist) {
      try {
        localStorage.setItem("baran-motion", value ? "reduce" : "full");
      } catch {}
    }
    syncExperiment();
  };
  setMotion(reduced);
  motionButton?.addEventListener("click", () => setMotion(!reduced, true));
  preference.addEventListener("change", (event) => setMotion(event.matches));
  document.querySelector("#year").textContent = String(
    new Date().getFullYear(),
  );
  document.querySelector(".copy-email")?.addEventListener("click", async () => {
    const status = document.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText("fizikhub@gmail.com");
      status.textContent = "Kopyalandı!";
    } catch {
      status.textContent = "fizikhub@gmail.com";
    }
  });

  // Native scrolling stays native. Only the illustration receives bounded depth.
  const art = document.querySelector(".hero-art");
  let pointerFrame = 0;
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    art.addEventListener("pointermove", (event) => {
      if (reduced || pointerFrame) return;
      const box = art.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      pointerFrame = requestAnimationFrame(() => {
        art.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        pointerFrame = 0;
      });
    });
    art.addEventListener("pointerleave", () => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      art.style.transform = "";
    });
  }
  // Brief rotations unroll each project into the page; content is always visible.
  if ("IntersectionObserver" in window) {
    const reveals = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!reduced)
            entry.target.animate(
              [
                { transform: "translateY(24px) rotate(-2deg)" },
                { transform: "translateY(0) rotate(0deg)" },
              ],
              { duration: 850, easing: "cubic-bezier(.16,1,.3,1)" },
            );
          reveals.unobserve(entry.target);
        });
      },
      { threshold: 0.13 },
    );
    document
      .querySelectorAll(".about, .lab-section, .contact-section")
      .forEach((el) => reveals.observe(el));
  }

  const canvas = document.querySelector("#pendulum");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.parentElement.classList.add("canvas-ready");
  let w = 0,
    h = 0,
    a1 = 2.15,
    a2 = 1.3,
    v1 = 0,
    v2 = 0;
  let trail = [],
    raf = 0,
    last = 0,
    accumulator = 0,
    visible = false,
    paused = false;
  const pauseButton = document.querySelector("#pause-pendulum");
  const status = document.querySelector("#experiment-status");
  // Equal masses and lengths. RK4 integrates angular positions/velocities;
  // fixed 1/120-second steps keep motion stable on 60/120/144 Hz displays.
  const derivatives = ([x, y, vx, vy]) => {
    const d = x - y,
      denominator = 3 - Math.cos(2 * d),
      g = 9.81;
    return [
      vx,
      vy,
      (-3 * g * Math.sin(x) -
        g * Math.sin(x - 2 * y) -
        2 * Math.sin(d) * (vy * vy + vx * vx * Math.cos(d))) /
        denominator,
      (2 *
        Math.sin(d) *
        (2 * vx * vx + 2 * g * Math.cos(x) + vy * vy * Math.cos(d))) /
        denominator,
    ];
  };
  const step = (dt) => {
    const q = [a1, a2, v1, v2];
    const k1 = derivatives(q);
    const k2 = derivatives(q.map((x, i) => x + (k1[i] * dt) / 2));
    const k3 = derivatives(q.map((x, i) => x + (k2[i] * dt) / 2));
    const k4 = derivatives(q.map((x, i) => x + k3[i] * dt));
    [a1, a2, v1, v2] = q.map(
      (x, i) => x + (dt * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])) / 6,
    );
  };
  const geometry = () => {
    const length = Math.min(w * 0.225, (h - 65) * 0.225),
      cx = w / 2,
      cy = (h - 34) / 2;
    const x1 = cx + length * Math.sin(a1),
      y1 = cy + length * Math.cos(a1);
    return {
      cx,
      cy,
      x1,
      y1,
      x2: x1 + length * Math.sin(a2),
      y2: y1 + length * Math.cos(a2),
    };
  };
  const draw = (record = false) => {
    const { cx, cy, x1, y1, x2, y2 } = geometry();
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#a9b49a";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(w, h) * 0.34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([2, 7]);
    ctx.beginPath();
    ctx.moveTo(cx, 35);
    ctx.lineTo(cx, h - 45);
    ctx.moveTo(20, cy);
    ctx.lineTo(w - 20, cy);
    ctx.stroke();
    ctx.setLineDash([]);
    if (record) {
      trail.push([x2, y2]);
      if (trail.length > 650) trail.shift();
    }
    if (trail.length > 1) {
      ctx.strokeStyle = "#b9420c";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      trail.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    }
    ctx.strokeStyle = "#202320";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    [
      [cx, cy, 4],
      [x1, y1, 8],
      [x2, y2, 11],
    ].forEach(([x, y, r], i) => {
      ctx.fillStyle = i === 2 ? "#b9420c" : "#202320";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  const shouldRun = () => visible && !document.hidden && !paused && !reduced;
  const tick = (time) => {
    raf = 0;
    if (!shouldRun()) {
      last = 0;
      return;
    }
    if (last) accumulator += Math.min((time - last) / 1000, 0.05);
    last = time;
    while (accumulator >= 1 / 120) {
      step(1 / 120);
      accumulator -= 1 / 120;
    }
    draw(true);
    raf = requestAnimationFrame(tick);
  };
  syncExperiment = () => {
    status.textContent = reduced
      ? "Hareket azaltıldı / sabit görünüm"
      : paused
        ? "Deney duraklatıldı"
        : "İdeal sistem / kaotik hareket";
    pauseButton.disabled = reduced;
    if (shouldRun() && !raf) raf = requestAnimationFrame(tick);
    else if (!shouldRun()) {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    }
    draw();
  };
  new ResizeObserver(() => {
    const box = canvas.getBoundingClientRect();
    w = box.width;
    h = box.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    trail = [];
    draw();
  }).observe(canvas);
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      syncExperiment();
    },
    { threshold: 0.05 },
  ).observe(canvas);
  document.addEventListener("visibilitychange", syncExperiment);
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.textContent = paused ? "Devam et ▷" : "Duraklat Ⅱ";
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.setAttribute(
      "aria-label",
      paused ? "Animasyonu devam ettir" : "Animasyonu duraklat",
    );
    syncExperiment();
  });
  document.querySelector("#reset-pendulum").addEventListener("click", () => {
    a1 = 2.05 + Math.random() * 0.25;
    a2 = 1.1 + Math.random() * 0.3;
    v1 = 0;
    v2 = 0;
    trail = [];
    last = 0;
    accumulator = 0;
    draw();
    syncExperiment();
    status.textContent = reduced
      ? "Yeni başlangıç / sabit görünüm"
      : "Yeni başlangıç koşulları";
  });
  syncExperiment();
})();
