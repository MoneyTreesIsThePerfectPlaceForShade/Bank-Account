"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = (movements) => {
    containerMovements.innerHTML = "";

    movements.forEach((mov, i) => {
        const type = mov > 0 ? "deposit" : "withdrawal";

        // хоть в реальной разработке используются фреймворки
        // но такое взаимодействие полезно для общего понимания
        // тут мы пишем html код (прям как JSX)
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
            <div class="movements__value">${mov}</div>
        </div>
        `;
        // а тут этот html код, мы, можно сказать, вставляем в index.html
        // в то место, куда нам нужно - в <div class="movements">
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

displayMovements(account1.movements);

//

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

let arr = ["a", "b", "c", "d", "e"];

// SLICE
// работает также как в строках
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // начиная с первого, не включая ластовые два элема

console.log(arr.slice()); // создает копию массива === [...arr]

// SPLICE - удаляет элементы начиная с индекса два
// он изменяет изначальный массив
// после этого метода в массиве останутся только первые 2 элемента
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); // 1 - индекс с которого начать, 2 - сколько элементов нужно удалить начиная с индекса
console.log(arr);

// REVERSE - изменяет изначальный массив
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());

// CONCAT
const letters = arr.concat(arr2);
console.log(letters); // === [...arr,...arr2]

// JOIN
console.log(letters.join(" $ "));

//

const arrs = [23, 11, 54];
console.log(arrs.at(0)); // === add[0]

// getting last element of array
console.log(arrs[arrs.length - 1]);
console.log(arrs.slice(-1)[0]);
console.log(arrs.at(-1));

// FOR EACH
const movementsEx = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [key, movement] of movementsEx.entries()) {
    if (movement > 0) {
        console.log(`ОПЕРАЦИЯ ${key + 1}: Вы положили ${movement} рублей.`);
    } else {
        console.log(
            `ОПЕРАЦИЯ ${key + 1}: Вы взяли ${Math.abs(movement)} рублей.`
        );
    }
}

console.log("---- FOREACH ----");
// forEach(переменная*, индекс, массив) *по которой итерируемся, то бишь элемент массива
movementsEx.forEach((movement, index) => {
    if (movement > 0) {
        console.log(`ОПЕРАЦИЯ ${index + 1}: Вы положили ${movement} рублей.`);
    } else {
        console.log(
            `ОПЕРАЦИЯ ${index + 1}: Вы взяли ${Math.abs(movement)} рублей.`
        );
    }
});

// MAPS FOR EACH

const currencies = new Map([
    ["USD", "United States dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound sterling"],
]);

currencies.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});

// SETS FOR EACH
const currenciesUniq = new Set(["USD", "GBP", "RUB", "EUR", "USD"]);
currenciesUniq.forEach((value, _, map) => {
    console.log(`${value}`);
});
