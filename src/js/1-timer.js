import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const refs = {
    daysEl: document.querySelector("[data-days]"),
    hoursEl: document.querySelector("[data-hours]"),
    minsEl: document.querySelector("[data-minutes]"),
    secsEl: document.querySelector("[data-seconds]"),
    datePicker : document.querySelector("#datetime-picker"),
    startButton : document.querySelector("[data-start]"),
}
let userSelectedDate = null;
let timerId = null;


flatpickr(refs.datePicker, {
   
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate > new Date()) {
          refs.startButton.disabled = false;
      } else {
          iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
});
         

          refs.startButton.disabled = true;
      }
  },


})

refs.startButton.addEventListener("click", () => {
    refs.startButton.disabled = true;
    refs.datePicker.disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0) {
            clearInterval(timerId);
            refs.datePicker.disabled = false;
            refs.startButton.disabled = true;
            updateDisplay(0, 0, 0, 0);
            return;
            
        }
        const { days, hours, minutes, seconds } = convertMs(diff);
        updateDisplay(days, hours, minutes, seconds);
    },1000)
})

function updateDisplay(days, hours, minutes, seconds) {
    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minsEl.textContent = addLeadingZero(minutes);
    refs.secsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}