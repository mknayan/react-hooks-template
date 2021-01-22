/*export const CONSTANT = {

    MODULES: [
        "auth",
        "checklist",
        "myaccount",
        "common"
    ]

}*/

export const ROUTES = {
    ROOT: '/',
    LOGIN: '/auth/login',
}

export const API_STATUS = {
    OK: 'OK'
}

export const SET_STORAGE = (name, value) => {
    return localStorage.setItem(name, value);
}
export const GET_STORAGE = (name) => {
    return localStorage.getItem(name);
}
export const REMOVE_STORAGE = (name) => {
    return localStorage.removeItem(name);
}

export const USER = '_cbecom';

// const num = [3, 6, 9];
// num.push(num.push(num.pop()));
// num.pop()
// num.push(num.pop());
// console.log('main_result', num);
// console.log('num.pop()', num.pop());
// console.log('num.pop()', num);
// console.log('num.push', num.push(num));
// console.log(num)