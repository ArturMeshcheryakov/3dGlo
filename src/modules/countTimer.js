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

export default countTimer;
