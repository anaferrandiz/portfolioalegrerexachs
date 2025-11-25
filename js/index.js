'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // --------- CARRUSELES ---------
  const carruseles = document.querySelectorAll('.carrusel');

  carruseles.forEach(carrusel => {
    try {

      const container = carrusel.querySelector('.carrusel__img');
      if (!container) throw new Error("No se encontró .carrusel__img");

      const slides = container.children;
      const total = slides.length;

      const indicadores = carrusel.querySelectorAll('.carrusel__btn span');
      const btnSiguiente = carrusel.querySelector('.siguiente');
      const btnAnterior = carrusel.querySelector('.anterior');

      if (!total) throw new Error("Carrusel sin imágenes");

      let posicion = 0;

      // ---- ACTUALIZAR ----
      function actualizar() {
        container.style.transform = `translateX(-${posicion * (100 / total)}%)`;

        indicadores.forEach((ind, i) => {
          ind.classList.toggle('active', i === posicion);
        });
      }

      // ---- BOTONES ----
      if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => {
          posicion = (posicion + 1) % total;
          actualizar();
        });
      }

      if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
          posicion = (posicion - 1 + total) % total;
          actualizar();
        });
      }

      // ---- INDICADORES ----
      indicadores.forEach((ind, i) => {
        ind.addEventListener('click', () => {
          posicion = i;
          actualizar();
        });
      });

      // ---- SWIPE (funcional y limpio) ----
      let startX = 0;
      let endX = 0;

      carrusel.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        endX = 0;
      }, { passive: true });

      carrusel.addEventListener('touchmove', e => {
        endX = e.touches[0].clientX;
      }, { passive: true });

      carrusel.addEventListener('touchend', () => {
        if (!startX || !endX) return;

        const diff = startX - endX;

        if (diff > 50) {
          posicion = (posicion + 1) % total;
        } else if (diff < -50) {
          posicion = (posicion - 1 + total) % total;
        }

        actualizar();
        startX = 0;
        endX = 0;
      });

      actualizar();

    } catch (err) {
      console.warn("Carrusel con error (pero seguimos el script):", err);
    }
  });

  // --------- TABS ---------
  let touchStart = 0;

  function toggleTab(tabId) {
    const content = document.getElementById(tabId);
    if (!content) return;

    const tabElement = content.previousElementSibling;
    const isActive = content.classList.contains('active');

    document.querySelectorAll('.content').forEach(el => {
      el.classList.remove('active', 'visible');
      el.style.height = 0;
    });

    if (!isActive) {
      const fullHeight = content.scrollHeight + "px";
      content.classList.add('active');
      content.style.height = fullHeight;

      setTimeout(() => content.classList.add('visible'), 200);

      setTimeout(() => {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 60;
        const y = tabElement.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 500);
    }
  }

  const tabs = document.querySelectorAll(".tab");

  tabs.forEach(tab => {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      const next = this.nextElementSibling;
      if (next?.id) toggleTab(next.id);
    });

    tab.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const next = this.nextElementSibling;
        if (next?.id) toggleTab(next.id);
      }
    });

    tab.addEventListener("touchstart", e => {
      touchStart = e.touches[0].clientY;
    }, { passive: true });

    tab.addEventListener("touchend", function (e) {
      const touchEnd = e.changedTouches[0].clientY;
      if (Math.abs(touchStart - touchEnd) < 20) {
        e.preventDefault();
        const next = this.nextElementSibling;
        if (next?.id) toggleTab(next.id);
      }
    }, { passive: false });
  });

});
