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

export default sendForm;
