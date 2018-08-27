let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //check if we should stop
    if (secondsLeft < 0) {
      clearInterval(countdown);
    }

    displayTimeLeft(secondsLeft);

  }, 1000);
}

function displayTimeLeft(seconds){
  const min = Math.floor(seconds / 60);
  const remainderSec = seconds % 60;
  const display = `${min}:${remainderSec < 10 ? '0' : ''}${remainderSec}`;
  timerDisplay.textContent = display;

  document.title = display; // updates countdown timer in the title of the tab
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  let adjustedHour;
  if(hour == 0){
    adjustedHour = 12;
  }else if (hour > 12){
    adjustedHour = hour - 12;
  }else {
    adjustedHour = hour;
  }
  endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
