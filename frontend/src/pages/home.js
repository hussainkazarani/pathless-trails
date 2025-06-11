import { validateName } from '../transitions.js';

const playBtn = document.querySelector('.btn');
const input = document.getElementById('player-name');
const input_class = document.querySelector('.namebox');
const nameOfUser = localStorage.getItem('username');
const page = document.querySelector('.page');

let isButtonClick = false;

window.addEventListener('load', () => {
    if (localStorage.getItem('playerToken')) {
        console.log('(F) Cleared LocalStorage in home');

        localStorage.clear();
    }
});

input.addEventListener('input', () => {
    if (input.value.length == 0) {
        input_class.classList.remove('success');
        input_class.classList.remove('error');
    }
    if (!validateName(input.value.trim())) {
        input_class.classList.remove('success');
        input_class.classList.add('error');
    }
    if (validateName(input.value.trim())) {
        isButtonClick = false;
    }
});

playBtn.addEventListener('click', () => {
    if (input.value.length > 0) {
        isButtonClick = true;
        if (!validateName(input.value.trim())) {
            input_class.classList.remove('success');
            input_class.classList.add('error');
            return;
        }
    }
});
