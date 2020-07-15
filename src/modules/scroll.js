import scrollElem from './scrollElem'

const scroll = () => {
  const mouseBtn = document.querySelector('[href="#service-block"]');
  const href = mouseBtn.getAttribute('href');
  mouseBtn.addEventListener('click', function (e) {
    scrollElem(e, mouseBtn);
  });
};

export default scroll;