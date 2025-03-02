'use strict';

// CARRUSEL
let posicion = 0;
const totalImagenes = 3;

let siguiente = document.querySelector('.siguiente');
let anterior = document.querySelector('.anterior');
const carrouselBtns = document.querySelectorAll('.carrusel__btn span');
let carrouselContainer = document.querySelector('.carrusel__img');
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

    // Iniciar la animación en el botón correspondiente
    setTimeout(() => {
        carrouselBtns[posicion].style.transition = "width 5s linear";
        carrouselBtns[posicion].style.width = "100%";
    }, 10);
};

const startCarousel = function () {
    stopCarousel(); // Limpiar cualquier intervalo previo
    actualizarProgressBar();
    interval = setInterval(() => {
        posicion = (posicion + 1) % totalImagenes;
        desplazarContainer();
    }, 5000);
};

const stopCarousel = function () {
    clearInterval(interval);
};



carrouselBtns.forEach(function (each, i) {
    carrouselBtns[i].addEventListener('click', function () {
        posicion = i
        console.log(posicion)
        desplazarContainer()
    })
})

// Iniciar el carrusel automáticamente
startCarousel();
