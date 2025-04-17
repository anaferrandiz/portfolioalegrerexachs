'use strict';

// CARRUSELES INDEX 
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

    // Variables para detectar el gesto táctil
    let touchStartX = 0;
    let touchEndX = 0;

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

    // Función para manejar el gesto táctil
    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX; // Captura la posición inicial del toque
    };

    const handleTouchMove = (e) => {
        if (!touchStartX) return; // Si no hay un toque inicial, no hacer nada
        touchEndX = e.touches[0].clientX; // Captura la posición final del toque
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return; // Si no hay un toque inicial o final, no hacer nada

        const diffX = touchStartX - touchEndX; // Calcula la diferencia en el eje X

        if (diffX > 50) {
            // Deslizamiento hacia la izquierda (pasar a la siguiente imagen)
            posicion = (posicion + 1) % totalImagenes;
            desplazarContainer();
        } else if (diffX < -50) {
            // Deslizamiento hacia la derecha (pasar a la imagen anterior)
            posicion = (posicion - 1 + totalImagenes) % totalImagenes;
            desplazarContainer();
        }

        // Reinicia las variables
        touchStartX = 0;
        touchEndX = 0;
    };

    // Agregar event listeners para los gestos táctiles
    carrusel.addEventListener('touchstart', handleTouchStart, false);
    carrusel.addEventListener('touchmove', handleTouchMove, false);
    carrusel.addEventListener('touchend', handleTouchEnd, false);

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

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            this.click();
        }
    });
});

// FIN CARRUSELES INDEX 


// --------- PESTAÑAS

let touchStart = 0;

function toggleTab(tabId) {
    const content = document.getElementById(tabId);
    const tabElement = content.previousElementSibling;
    const isActive = content.classList.contains('active');

    // Cierra todas las demás
    document.querySelectorAll('.content').forEach(el => {
        el.classList.remove('active', 'visible');
        el.style.height = 0;
    });

    if (!isActive) {
        // Medir la altura
        const fullHeight = content.scrollHeight + "px";

        content.classList.add('active');
        content.style.height = fullHeight;

        // Mostrar contenido con opacidad
        setTimeout(() => {
            content.classList.add('visible');
        }, 200);

        // HACER SCROLL DESPUÉS DE QUE TODO SE ABRIÓ
        setTimeout(() => {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 60;
            const y = tabElement.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        
            window.scrollTo({ top: y, behavior: 'smooth' });
        }, 500);
         // Esperamos un poco más para asegurarnos que ya se expandió
    }
}






document.addEventListener("DOMContentLoaded", function() {
    let tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => {
        // Añadir evento de clic para desplegar las tablas
        tab.addEventListener("click", function(event) {
            event.preventDefault(); // Evitar acción por defecto (si existe)
            const tabId = this.nextElementSibling.id;
            toggleTab(tabId);  // Desplegar/ocultar el contenido asociado
        });

        // Añadir evento de touchstart para detectar si es un toque
        tab.addEventListener("touchstart", function(event) {
            // Registrar la posición de inicio del toque
            touchStart = event.touches[0].clientY;
        });

        // Añadir evento de touchend con un pequeño retraso
        tab.addEventListener("touchend", function(event) {
            const touchEnd = event.changedTouches[0].clientY;
            
            // Verificar si el usuario está desplazando (más de un pequeño umbral de distancia)
            if (Math.abs(touchStart - touchEnd) < 20) { // Umbral de 20px para detectar un clic
                event.preventDefault();  // Evitar acción por defecto
                const tabId = this.nextElementSibling.id;
                toggleTab(tabId);  // Desplegar/ocultar el contenido asociado
            }
        });
    });
});
