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

  //Menu
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
      if(!menuActive && !btnMenu) menu.classList.remove('active-menu');
      if (menuItems) {
        scrollElem(event, menuItems);
        handlerMenu();
      }
    });
  };

  //Popup
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

  //Scroll
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

  const scroll = () => {
    const mouseBtn = document.querySelector('[href="#service-block"]');
    const href = mouseBtn.getAttribute('href');
    mouseBtn.addEventListener('click', function (e) {
      scrollElem(e, mouseBtn);
    });
  };

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  countTimer('2 july 2020');
  toggleMenu();
  togglePopup();
  scroll();
  tabs();
});
