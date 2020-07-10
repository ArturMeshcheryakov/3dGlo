'use strict';

class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach((elem) => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', (event) => {
      this.elementsForm.forEach((elem) => this.checkIt({target: elem}));
      if (this.error.size) {
        event.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem){
        if (elem.value.trim() === '') {
          return false;
        } else {
          return true;
        }
      },
      pattern(elem, pattern){
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.name];

      if (method) {
        return method.every((item) => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать name полей ввода')
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.add('error');
    elem.classList.remove('success');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) return;

    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.add('success');
    elem.classList.remove('error');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');

    style.textContent = `
      input.success{
        border: 2px solid green!important;
      }
      input.error {
        border: 2px solid red!important;
      }
      .validator-error{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        font-size: 12px;
        font-family: sans-serif;
        color: red;
      }
    `;

    document.head.append(style);
  }

  setPattern() {
    if (!this.pattern.phone) this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    if (!this.pattern.email) this.pattern.email = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!this.pattern.name) this.pattern.name = /^[^a-zA-Z][^a-zA-Z0-9-_\.]{1,20}$/;
    if (!this.pattern.message) this.pattern.message = /^[^a-zA-Z][^a-zA-Z0-9-_\.]{1,20}$/;
  }
}
