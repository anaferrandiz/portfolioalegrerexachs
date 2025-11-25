// Solo activar cursor personalizado en desktop
if (window.matchMedia('(min-width: 1000px)').matches) {
  
  // Crear el cursor personalizado
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background-color: #ff6b35;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(cursor);

  // Seguir el movimiento del mouse
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Efecto al hacer clic
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Ocultar cursor predeterminado
  document.body.style.cursor = 'none';

  // CAMBIO DE COLOR 
  // Detectar cuando pasas sobre elementos clicables
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [onclick]');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.backgroundColor = '#22672F'; // Verde
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.backgroundColor = '#ff6b35'; // Vuelve a naranja
    });
  });
}