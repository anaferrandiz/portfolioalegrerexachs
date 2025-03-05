'use strict';

// Selecciona todos los carruseles
const carruseles = document.querySelectorAll('.carrusel');

carruseles.forEach(carrusel => {
    let posicion = 0;
    const totalImagenes = 3;
    
    let siguiente = carrusel.querySelector('.siguiente');
    let anterior = carrusel.querySelector('.anterior');
    const carrouselBtns = carrusel.querySelectorAll('.carrusel__btn span');
    const carrouselButton = carrusel.querySelectorAll('.carrusel__btn');
    let carrouselContainer = carrusel.querySelector('.carrusel__img');
    let interval;

    const desplazarContainer = function () {
        carrouselContainer.style.transform = `translateX(-${posicion * (100 / totalImagenes)}%)`;
        actualizarProgressBar();
    };

    const actualizarProgressBar = function () {
        carrouselBtns.forEach((btn, index) => {
            btn.style.transition = "none"; // Eliminamos transiciones previas
            btn.style.width = "0%"; // Reseteamos todas las barras
        });

        setTimeout(() => {
            carrouselBtns[posicion].style.transition = "width 3s linear";
            carrouselBtns[posicion].style.width = "100%";
        }, 10);
    };

    const startCarousel = function () {
        stopCarousel();
        actualizarProgressBar();
        interval = setInterval(() => {
            posicion = (posicion + 1) % totalImagenes;
            desplazarContainer();
        }, 3000);
    };

    const stopCarousel = function () {
        clearInterval(interval);
    };

    carrouselBtns.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
            posicion = i;
            desplazarContainer();
        });
    });

    if (siguiente) {
        siguiente.addEventListener('click', function () {
            posicion = (posicion + 1) % totalImagenes;
            desplazarContainer();
        });
    }

    if (anterior) {
        anterior.addEventListener('click', function () {
            posicion = (posicion - 1 + totalImagenes) % totalImagenes;
            desplazarContainer();
        });
    }

    carrouselButton.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
            posicion = i;
            desplazarContainer();
        });
    });

    // Activar el carrusel al pasar el ratón sobre el carrusel
    carrusel.addEventListener('mouseenter', startCarousel);
    carrusel.addEventListener('mouseleave', stopCarousel);
});