const scrollElem = (e, item) => {
  e.preventDefault();

  const a = item.querySelector('a');
  let href;

  if (a) {
    href = a.getAttribute('href');
  } else {
    href = item.getAttribute('href');
  }

  document.querySelector(href).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

export default scrollElem;