window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //Timer
  const countTimer = (deadline) => {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = Math.floor(timeRemaining % 60);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let hours = Math.floor(timeRemaining / 60 / 60);

      return {timeRemaining, hours, minutes, seconds}
    };

    const rightDate = (a) => {
      if (a >= 0 && a < 10) return '0' + a;

      if (a < 0) {
        a = 0;
        return '0' + a;
      }

      return a;
    };

    const updateClock = () => {
      let timer = getTimeRemaining();
      let upHours = rightDate(timer.hours);
      let upMinutes = rightDate(timer.minutes);
      let upSeconds = rightDate(timer.seconds);

      timerHours.textContent = upHours;
      timerMinutes.textContent = upMinutes;
      timerSeconds.textContent = upSeconds;

      if (timer.timeRemaining <= 0) {
        clearInterval(timerStop);
      }
    };

    let timerStop = setInterval(updateClock, 1000);
    updateClock();
  };

  countTimer('2 july 2020');

  //Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => menu.classList.toggle('active-menu');

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((item) => item.addEventListener('click', function (e) {
      scrollElem(e, item);
      handlerMenu();
    }));
  };

  toggleMenu();

  //Popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');
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

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
      count = 140;
    });
  };

  togglePopup();

  //Scroll
  function scrollElem(e, item) {
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
  }

  function scroll() {
    const mouseBtn = document.querySelector('[href="#service-block"]');
    const href = mouseBtn.getAttribute('href');
    mouseBtn.addEventListener('click', function (e) {
      scrollElem(e, mouseBtn);
    });
  }

  scroll();
});
