// Імпортуємо бібліотеку Notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Знаходимо форму та кнопку "submit"
const form = document.querySelector('.form');
const button = form.querySelector('button[type="submit"]');

// Функція, яка створює обіцянку з випадковим результатом
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3; 
      if (shouldResolve) {
        resolve({ position, delay }); 
      } else {
        reject({ position, delay }); 
      }
    }, delay);
  });
}

// Додаємо обробник події на форму
form.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value); 
  const amount = Number(form.elements.amount.value); 
  
  button.disabled = true; // Блокуємо кнопку "submit", після натискання

  // Створюємо масив обіцянок з випадковою затримкою
  const promises = Array.from({ length: amount }, (_, index) => {
    const position = index + 1; 
    const promiseDelay = delay + step * index; 

    return createPromise(position, promiseDelay); 
  });

   // Виконуємо всі проміси зі створеного масиву промісів і виводимо повідомлення про успішне виконання чи невиконання
  Promise.allSettled(promises.map((promise, index) => {
    const position = index + 1;
    return promise
      .then(({ delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
  }))
    // Обробляємо помилки.
  .catch((error) => {
    console.error(error);
  })
    //Активуємо кнопку 
  .finally(() => {
    button.disabled = false;
  });
});

