// Імпортуємо функцію
import { getRandomHexColor } from "./helpers/randomColor"

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

// Створюємо змінну для збереження ідентифікатора інтервалу
let timerId = null;

// Додаємо обробник події "click" на кнопку "start"
btnStart.addEventListener("click", () => {
  // Запускаємо інтервал, який буде змінювати колір тла кожну секунду
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // Блокуємо кнопку після запуску
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}); 

// Додаємо обробник події "click" на кнопку "stop"
btnStop.addEventListener("click", () => {
   // Зупиняємо інтервал, вказавши його ідентифікатор
  clearInterval(timerId);
  // Виводимо повідомлення в консоль
  console.log(`Interval with id ${timerId} has stopped!`);
  // Активуємо кнопку після зупинки інтервалу
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}); 