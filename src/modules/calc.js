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

export default calc;
