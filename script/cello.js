const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', (event) => {
    const lang = event.target.getAttribute('data-lang');
    const divs = document.querySelectorAll('.en, .zh, .de');
    
    divs.forEach((div) => {
      if (div.classList.contains(lang)) {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    });
  });
});
