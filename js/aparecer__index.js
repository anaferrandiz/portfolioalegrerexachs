'use strict'

const selecText = document.querySelectorAll('.wrap__projects')
// seleccionamos texto
const imagenes = document.querySelectorAll('.imgs__projects')
// seleccionamos imágenes

let posicion = 0

let mostrarImagen = function () {
    imagenes.forEach(function (each, i) {
        imagenes[i].classList.remove('isVisible')
        selecText[i].classList.remove('isActive')
    })
    imagenes[posicion].classList.add('isVisible')
    selecText[posicion].classList.add('isActive')
}

selecText.forEach(function (each, i) {
    selecText[i].addEventListener('mouseenter', function () {
        posicion = i

        mostrarImagen()
    })
    selecText[i].addEventListener('mouseleave', function () {
        imagenes[i].classList.remove('isVisible')
        selecText[i].classList.remove('isActive')

    })


})