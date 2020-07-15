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
      if (!menuActive && !btnMenu) menu.classList.remove('active-menu');
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

  //Slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    const btn = document.querySelectorAll('.portfolio-btn');
    const dots = document.querySelector('.portfolio-dots');
    const slider = document.querySelector('.portfolio-content');
    let dot;

    let currentSlide = 0;
    let interval;

    const addDot = () => {
      dot = document.createElement('li');
      dot.classList.add('dot');

      for (let i = 0; i < slide.length; i++) {
        dot = dot.cloneNode();
        dots.append(dot);
      }

      dot = document.querySelectorAll('.dot');
      dot[0].classList.add('dot-active');
    };

    addDot();

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, index) => {
          if (item === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        startSlide(1500);
      }
    });

    startSlide(1500);
  };

  //Team
  const team = () => {
    const command = document.querySelector('.command');

    const mouseHover = (event) => {
      let target = event.target;
      const commandPhoto = target.closest('.command__photo');

      if (commandPhoto) {
        const src = target.getAttribute('src');

        target.setAttribute('src', target.getAttribute('data-img'));
        target.setAttribute('data-img', src);
      }
    };

    command.addEventListener('mouseover', (event) => {
      mouseHover(event);
    });

    command.addEventListener('mouseout', (event) => {
      mouseHover(event);
    });
  };

  //Calc
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcDay = document.querySelector('.calc-day');
    const calcCount = document.querySelector('.calc-count');
    const totalValue = document.getElementById('total');

    const setValue = (elem, value) => {
      let interval = false;
      let change = true;
      let step = 10;
      let input = calcBlock.querySelectorAll('.calc-item');
      const result = +totalValue.textContent;

      const ipnutEach = (bool) => {
        input.forEach((item) => {
          item.disabled = bool;
        });
      };

      if (result > value) {
        change = false;
      }
      else if (result < value) {
        change = true;
      }

      if (change) {
        interval = setInterval(function () {
          if (elem.innerHTML * 1 + step >= value) {
            elem.innerHTML = value;
            clearInterval(interval);
            ipnutEach(false);
          } else {
            elem.innerHTML = Math.round(elem.innerHTML * 1 + step);
            ipnutEach(true);
          }
        });
      } else {
        interval = setInterval(function () {
          if (elem.innerHTML * 1 - step <= value) {
            elem.innerHTML = value;
            clearInterval(interval);
            ipnutEach(false);
          } else {
            elem.innerHTML = Math.round(elem.innerHTML * 1 - step);
            ipnutEach(true);
          }
        });
      }
    };

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;

      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10;

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) total = Math.round(price * typeValue * squareValue * countValue * dayValue);

      setValue(totalValue, total);
    };

    calcBlock.addEventListener('input', (event) => {
      let target = event.target;
      const input = target.closest('input');

      if (input) input.value = input.value.replace(/\D/, '');
    });

    calcBlock.addEventListener('change', (event) => {
      let target = event.target;
      const input = target.closest('input');
      const select = target.closest('select');

      if (input || select) countSum();
    });
  };

  //send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    const form = document.querySelectorAll('form');
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status__message');
    statusMessage.style.cssText = `
      font-size: 2rem;
    `;

    const formSubmit = (form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.append(statusMessage);

        let elementsForm = [...form.elements].filter((item) => {
          return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });

        let bool = true;
        let button = event.submitter;

        elementsForm.forEach((item) => {
          if (item.name && (item.name === 'user_name' || item.name === 'user_message')) {
            if (item.value.match(/^[^a-zA-Z][^a-zA-Z0-9-_\.]{1,20}$/)) {
              item.style.border = '2px solid green';
            } else {
              item.style.border = '2px solid red';
              bool = false;
            }
          } else if (item.name && item.name === 'user_email') {
            if (item.value.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
              item.style.border = '2px solid green';
            } else {
              item.style.border = '2px solid red';
              bool = false;
            }
          } else if (item.name && item.name === 'user_phone') {
            if (item.value.match(/^\+?[78]([-()]*\d){10}$/)) {
              item.style.border = '2px solid green';
            } else {
              item.style.border = '2px solid red';
              bool = false;
            }
          }
        });

        if (bool) {
          statusMessage.innerHTML = `
            <div class="sk-double-bounce">
                <div class="sk-child sk-double-bounce-1"></div>
                <div class="sk-child sk-double-bounce-2"></div>
            </div>
          `;
          button.disabled = true;

          const formData = new FormData(form);
          let body = {};

          formData.forEach((val, key) => {
            body[key] = val;
          });

          const formClear = () => {
            elementsForm.forEach((item) => {
              item.value = '';
              item.style.border = '';
              button.disabled = false;
            });
          };

          postData(body)
            .then((response) => {
              if (response.status !== 200) {
                throw new Error('status network not 200');
              }
              statusMessage.textContent = successMessage;
              setTimeout(() => {
                animation();
              }, 1500);
              formClear();
            })
            .catch((error) => {
              statusMessage.textContent = errorMessage;
              setTimeout(() => {
                animation();
              }, 1500);
              formClear();
              console.error(error);
            });
        }
      });
    };

    form.forEach((item) => {
      formSubmit(item);
    });

    const animation = () => {
      const animMessage = document.querySelector('.status__message');
      let anim = animMessage.animate([
        {opacity: '1'},
        {opacity: '0'}
      ], 600);

      anim.addEventListener('finish', function () {
        animMessage.textContent = '';
        animMessage.remove();
      })
    };

    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };
  };

  countTimer('2 august 2020');
  toggleMenu();
  togglePopup();
  scroll();
  tabs();
  slider();
  team();
  calc(100);
  sendForm();
});
