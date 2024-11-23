
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


//deactive button-Start
const inputTimer = document.querySelector(".input-timer");
const btnTimer = document.querySelector(".btn-timer");
const daysSpan = document.querySelector("span[data-days]");
const hoursSpan = document.querySelector("span[data-hours]");
const minutesSpan = document.querySelector("span[data-minutes]");
const secondsSpan = document.querySelector("span[data-seconds]");

//відключення кнопки старт
btnTimer.setAttribute("disabled", "");

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const unixNowTime = Date.now();
        
        //Валидація дати
        if (unixNowTime >= userSelectedDate.getTime()) {
            iziToast.show({
                title: '',
                iconText: '',
                backgroundColor: 'red',
                messageColor: 'white',
                message: 'Please choose a date in the future',
                position: 'topRight',
            })
            btnTimer.setAttribute("disabled", "");
        } else {
            btnTimer.removeAttribute("disabled");
            
        }   
  },
};
//виклик flatpickr
flatpickr(inputTimer, options);


//форматування часу 00:00:00
function pad(value) {
    return String(value).padStart(2, '0');
}

//конвертація мс в дні, години, хвилини, секунди
function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}


//відображення часу на екрані
function displayTimer(ms) {
    const { days, hours, minutes, seconds
    } = convertMs(ms);
    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;
}

//запуск таймера
function handleClick() {
    if (intervalId !== null) {
    clearInterval(intervalId); 
  }

    btnTimer.setAttribute("disabled", "");
    const targetTime = userSelectedDate.getTime();

    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timeRemaining = targetTime - currentTime;
        
        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            displayTimer(0);
            return;
        }

        displayTimer(timeRemaining);   
    }, 1000);
    
}


btnTimer.addEventListener("click", handleClick);



