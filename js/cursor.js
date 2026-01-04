document.addEventListener('DOMContentLoaded', () => {

  if (window.matchMedia('(min-width: 1000px)').matches) {

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

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    document.body.style.cursor = 'none';

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [onclick]'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = '#22672F';
      });
      element.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = '#ff6b35';
      });
    });
  }

});
