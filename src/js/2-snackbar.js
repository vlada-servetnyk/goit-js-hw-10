// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputMs = document.querySelector(".form-input-ms");
const btnCreate = document.querySelector(".form-btn");
const radioFulfilled = document.querySelector(".fulfilled");
const radioRejected = document.querySelector(".rejected");




const isSuccess = true;

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
      resolve("Success! Value passed to resolve function");
    } else {
      reject("Error! Error passed to reject function");
    }
  }, 2000);
});


const delay = null;
function fooInput() {
    delay = inputMs.value;
}

function handleSubmit() {
    preventDefault();
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => { }, delay)
    })
};




inputMs.addEventListener("input", fooInput)
form.addEventListener("submit", handleSubmit)

