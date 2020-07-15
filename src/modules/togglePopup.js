const togglePopup = () => {
  const popup = document.querySelector('.popup');
  const popupBtn = document.querySelectorAll('.popup-btn');
  const popupContent = document.querySelector('.popup-content');

  let count = 140;
  let animation;

  const animate = () => {
    animation = requestAnimationFrame(animate);
    count = count - 4;

    if (count === 0) {
      cancelAnimationFrame(animation);
    }

    popupContent.style.transform = `translate(-50px, -${count}%)`;
  };

  popupBtn.forEach((item) => {
    item.addEventListener('click', () => {
      const width = document.documentElement.offsetWidth;

      popup.style.display = 'block';
      if (width > 768) {
        animate();
        popupContent.style.transform = `translate(-50px, -140%)`;
      }
    });
  });

  popup.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
      count = 140;
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        popup.style.display = 'none';
        count = 140;
      }
    }
  });
};

export default togglePopup;
