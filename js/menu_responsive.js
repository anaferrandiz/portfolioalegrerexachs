'use strict'


// MENÚ RESPONSIVE

// Lo primero de todo seleccionar los elementos que voy a utilizar en una variable

const headerBtn = document.querySelector('.header__btn')
const headerNav = document.querySelector('.header__nav')
console.log(headerBtn)
console.log(headerNav)
// Ponemos el console.log y vamos a la consola para comprobar que está todo bien y que no me da ningún error. Sólo por comprobar. No es necesario para que funcione ni para el código.


// Cuando hagas click en el botón, que el header-nav tenga una clase pero que cuando vuelva a pinchar se quite esa clase. El método toggle hace que se quite y se ponga, ponemos paréntesis porque es una acción. classList( dentro de su lista de clases).

headerBtn.addEventListener('click', function(){
 headerNav.classList.toggle('isActive')
})
