'use strict'


// MENÚ RESPONSIVE

// Lo primero de todo seleccionar los elementos que voy a utilizar en una variable

// const headerBtn = document.querySelector('.header__btn')
// const headerNav = document.querySelector('.header__nav')
// console.log(headerBtn)
// console.log(headerNav)
// Ponemos el console.log y vamos a la consola para comprobar que está todo bien y que no me da ningún error. Sólo por comprobar. No es necesario para que funcione ni para el código.


// Cuando hagas click en el botón, que el header-nav tenga una clase pero que cuando vuelva a pinchar se quite esa clase. El método toggle hace que se quite y se ponga, ponemos paréntesis porque es una acción. classList( dentro de su lista de clases).

const headerBtn = document.querySelector('.header__btn');
const nav = document.querySelector('.header__nav');

let isAnimating = false;

headerBtn.addEventListener('click', () => {
    if (isAnimating) return;

    isAnimating = true;
    const isOpen = nav.classList.contains('isActive');

    if (isOpen) {
        // Cerrar menú
        const currentHeight = nav.scrollHeight;
        nav.style.height = currentHeight + 'px';

        requestAnimationFrame(() => {
            nav.style.height = '0px';
        });

        nav.addEventListener('transitionend', function handler() {
            nav.classList.remove('isActive');
            nav.style.height = '';
            nav.removeEventListener('transitionend', handler);
            isAnimating = false;
        });
    } else {
        // Abrir menú
        nav.classList.add('isActive');
        nav.style.height = 'auto';

        const targetHeight = nav.scrollHeight;
        nav.style.height = '0px';

        requestAnimationFrame(() => {
            nav.style.height = targetHeight + 'px';
        });

        nav.addEventListener('transitionend', function handler() {
            nav.style.height = targetHeight + 'px'; // mantener altura abierta
            nav.removeEventListener('transitionend', handler);
            isAnimating = false;
        });
    }
});


// CAMBIO DE COLOR EN HEADER__H1 AL HACER SCROLL


  const title = document.querySelector('.header__h1');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      title.classList.add('gradient-animated-text');
    } else {
      title.classList.remove('gradient-animated-text');
    }
  });

