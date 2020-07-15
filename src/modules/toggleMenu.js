import scrollElem from './scrollElem'

const toggleMenu = () => {
  const menu = document.querySelector('menu');
  const handlerMenu = () => menu.classList.toggle('active-menu');

  document.body.addEventListener('click', (event) => {
    let target = event.target;
    const btnMenu = target.closest('.menu');
    const closeBtn = target.closest('.close-btn');
    const menuItems = target.closest('.active-menu ul>li');
    const menuActive = target.closest('.active-menu');

    if (btnMenu || closeBtn) handlerMenu();
    if (!menuActive && !btnMenu) menu.classList.remove('active-menu');
    if (menuItems) {
      scrollElem(event, menuItems);
      handlerMenu();
    }
  });
};

export default toggleMenu;