import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', e => {
    e.preventDefault();
    const delay = Number(refs.form.delay.value);
    const state = refs.form.state.value;


const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (state === "fulfilled") {
            resolve (delay)
        } else {
            reject(delay)
        }
    }, delay)
})

promise.then(delay => {
    iziToast.success({
    title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight'
    })
})
promise.catch((delay) => {
    iziToast.error({
    title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight'
    })
})
})