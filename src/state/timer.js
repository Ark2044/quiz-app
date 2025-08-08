let timerId = null;

export function startTimer(seconds, onTimeOut, onTick) {
  stopTimer();

  let timeLeft = seconds;
  onTick(timeLeft);

  timerId = setInterval(() => {
    timeLeft--;
    onTick(timeLeft);

    if (timeLeft <= 0) {
      stopTimer();
      onTimeOut();
    }
  }, 1000);
}

export function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}
