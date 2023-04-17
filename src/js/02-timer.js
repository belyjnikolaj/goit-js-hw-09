import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
// Створюэмо змінну для зберігання ID таймера
let timerId;
//Опції для календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0].getTime();
      const now = new Date().getTime();
      
      if (selectedDate - now > 0) {
          startBtn.removeAttribute('disabled');
      } else {
          Notify.failure('Please choose a date in the future');
      }
  },
};
// Ініціалізуємо календар з заданими опціями
flatpickr(inputDate, options);
//Створюємо функцію для запуску таймера
const startCountdown = () => {
    // Блокуємо кнопку після запуску
    startBtn.setAttribute('disabled', true);
    const selectedDate = new Date(inputDate.value).getTime();
    timerId = setInterval(() => {
        const now = new Date().getTime();
        if (selectedDate - now < 0) {
            clearInterval(timerId);
        } else {
            convertMs(selectedDate - now);
        };
    }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  daysEl.textContent = days < 10 ? `0${days}` : days;
  hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
  minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

startBtn.addEventListener('click', startCountdown);