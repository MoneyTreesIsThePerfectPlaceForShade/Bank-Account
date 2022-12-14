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
    owner: "Steven Thomas Strange",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Matt Ghost",
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

const displayMovements = (movements, sort = false) => {
    containerMovements.innerHTML = "";

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach((mov, i) => {
        const type = mov > 0 ? "deposit" : "withdrawal";

        // ???????? ?? ???????????????? ???????????????????? ???????????????????????? ????????????????????
        // ???? ?????????? ???????????????????????????? ?????????????? ?????? ???????????? ??????????????????
        // ?????? ???? ?????????? html ?????? (???????? ?????? JSX)
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
            <div class="movements__value">${mov}???</div>
        </div>
        `;
        // ?? ?????? ???????? html ??????, ????, ?????????? ??????????????, ?????????????????? ?? index.html
        // ?? ???? ??????????, ???????? ?????? ?????????? - ?? <div class="movements">
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

// displayMovements(account1.movements);

const calcAndPrintBalance = (acc) => {
    acc.balance = acc.movements.reduce((acc, value) => acc + value, 0);
    labelBalance.textContent = `${acc.balance}???`;
};

// calcAndPrintBalance(account1.movements);

const calcDisplaySummary = (account) => {
    const incomes = account.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);

    labelSumIn.textContent = `${incomes}???`;

    const outcomes = account.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);

    labelSumOut.textContent = `${Math.abs(outcomes)}???`;

    const interest = account.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * account.interestRate) / 100)
        .filter((int) => int >= 1)
        .reduce((acc, int) => acc + int, 0);

    labelSumInterest.textContent = `${interest}???`;
};
// calcDisplaySummary(account1.movements);

const createUsernames = (accs) => {
    accs.forEach((acc) => {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};

createUsernames(accounts);

// event handlers

const upDateUI = (currenAccount) => {
    // display movements
    displayMovements(currenAccount.movements);
    // display balance
    calcAndPrintBalance(currenAccount);
    // display summary
    calcDisplaySummary(currenAccount);
};

let currenAccount;

btnLogin.addEventListener("click", (event) => {
    event.preventDefault();
    currenAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );
    console.log(currenAccount);

    if (currenAccount?.pin === Number(inputLoginPin.value)) {
        // display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currenAccount.owner.split(" ")[0]
        }`;
        containerApp.style.opacity = 100;

        // clear input fields
        inputLoginUsername.value = "";
        inputLoginPin.value = "";
        inputLoginPin.blur();

        upDateUI(currenAccount);
    }
});

btnTransfer.addEventListener("click", (event) => {
    event.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );
    // console.log(amount, receiverAcc);
    inputTransferTo.value = inputTransferAmount.value = "";
    inputTransferAmount.blur();

    if (
        amount > 0 &&
        receiverAcc &&
        currenAccount.balance >= amount &&
        receiverAcc?.username !== currenAccount.username
    ) {
        // doing da transfer
        currenAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        upDateUI(currenAccount);
    }
});

btnLoan.addEventListener("click", (event) => {
    event.preventDefault();
    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        currenAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        // add movement
        currenAccount.movements.push(amount);
        // update ui
        upDateUI(currenAccount);
    }
    inputLoanAmount.value = "";
    inputLoanAmount.blur();
});

btnClose.addEventListener("click", (event) => {
    event.preventDefault();

    if (
        currenAccount.username === inputCloseUsername.value &&
        currenAccount.pin === Number(inputClosePin.value)
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currenAccount.username
        );
        // delete account
        accounts.splice(index, 1); // splice ???????????????? ?????????????????????? ??????????????, ?????????????? ??????????
        // ?????????? ???? ?????????????????? ??????-??, ???????????????? ?? index, ?????????????? 1 ????????

        // hide ui
        containerApp.style.opacity = 0;
    }
    labelWelcome.textContent = "Log in to get started";
    inputCloseUsername.value = inputClosePin.value = "";
    inputClosePin.blur();
});

let sorted = false;

btnSort.addEventListener("click", (event) => {
    event.preventDefault();
    displayMovements(currenAccount.movements, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
let arr = ["a", "b", "c", "d", "e"];

// SLICE
// ???????????????? ?????????? ?????? ?? ??????????????
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // ?????????????? ?? ??????????????, ???? ?????????????? ???????????????? ?????? ??????????

console.log(arr.slice()); // ?????????????? ?????????? ?????????????? === [...arr]

// SPLICE - ?????????????? ???????????????? ?????????????? ?? ?????????????? ??????
// ???? ???????????????? ?????????????????????? ????????????
// ?????????? ?????????? ???????????? ?? ?????????????? ?????????????????? ???????????? ???????????? 2 ????????????????
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); // 1 - ???????????? ?? ???????????????? ????????????, 2 - ?????????????? ?????????????????? ?????????? ?????????????? ?????????????? ?? ??????????????
console.log(arr);

// REVERSE - ???????????????? ?????????????????????? ????????????
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
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [key, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`???????????????? ${key + 1}: ???? ???????????????? ${movement} ????????????.`);
    } else {
        console.log(
            `???????????????? ${key + 1}: ???? ?????????? ${Math.abs(movement)} ????????????.`
        );
    }
}

console.log("---- FOREACH ----");
// forEach(????????????????????*, ????????????, ????????????) *???? ?????????????? ??????????????????????, ???? ???????? ?????????????? ??????????????
movements.forEach((movement, index) => {
    if (movement > 0) {
        console.log(`???????????????? ${index + 1}: ???? ???????????????? ${movement} ????????????.`);
    } else {
        console.log(
            `???????????????? ${index + 1}: ???? ?????????? ${Math.abs(movement)} ????????????.`
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

const euroToUsd = 1.1;

// ?????????? MAP ?????????????????? ???? ???? ??-????, ?????? ?? forEach, ????
// ???? ?????????????????? ?????????????? ?????????? ????????????, ???? ?????????????? ????????????
const movementsUSD = movements.map((value) => value * euroToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsDesc = movements.map(
    (value, index) =>
        `???????????????? ${index + 1}: ???? ${
            value > 0 ? "????????????????" : "??????????"
        } ${Math.abs(value)} ????????????.`
);

console.log(movementsDesc);



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
const deposits = movements.filter((value) => value > 0);
console.log(deposits);

const withdrawals = movements.filter((value) => value < 0);
console.log(withdrawals);

const balance = movements.reduce((accum, element, i, arr) => {
    return accum + element;
}, 0); // 0 - ?????? ?????????????????????? ???????????????? ????????????

console.log(balance);

// max value with reduce

const maxValue = movements.reduce((acc, value) => {
    if (value > acc) {
        acc = value;
    }
    return acc;
}, movements[0]);

console.log(maxValue);

const totalDepsUSD = movements
    .filter((element) => element > 0)
    .map((element) => element * 1.1)
    .reduce((acc, element) => acc + element);

console.log(totalDepsUSD);

const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find((acc) => acc.owner === "Matt Ghost");
console.log(account);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// equality
console.log(movements.includes(-130));
// SOME condition
// ???????? ???? ???????? ?????????????? ???????????? ?????????????????????????????? ??????????????
const anyDeps = movements.some((mov) => mov > 0);
console.log(anyDeps);

// EVERY ???????????? ?????????????? ???????????? ?????????????????????????????? ??????????????
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

// separate callback
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


const arr = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8, 9];
console.log(arrDeep.flat(2));

//flat
const overallBalance = accounts
    .map((acc) => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

// flatMap

const overallBalanceFM = accounts
    .flatMap((acc) => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalanceFM);

// sorting strings
const owners = ["Matt", "Smith", "Broski"];
console.log(owners.sort());

// sorting numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.sort((a, b) => a - b));
*/

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// FILL METHOD
const x = new Array(7);
console.log(x);
x.fill(0, 3, 5); // ?????????????????? ???????????? ?????????????? ?? ?????????????? 3 ???? ???????????? 5
console.log(x);

a.fill(444, 1, 5);
console.log(a);

// Array.from()
// ({length: n}, callback fun)
const genArr = Array.from({ length: 9 }, () => 1);
console.log(genArr);

// '_' - ??????????, ?????????? ???? ???????????????????? ?????????????? ???????????? ??-????
const genArr19 = Array.from({ length: 9 }, (_, i) => i + 1);
console.log(genArr19);

// 100 random dice rolls
const diceRolls = Array.from({ length: 100 }, (elem) => {
    elem = Math.trunc(Math.random() * 6) + 1;
    return elem;
});

console.log(diceRolls);

labelBalance.addEventListener("click", () => {
    const movementsUI = Array.from(
        document.querySelectorAll(".movements__value"),
        (elem) => Number(elem.textContent.replace("???", ""))
    );
    console.log(movementsUI);
});

const bankDepositSum = accounts
    .flatMap((acc) => acc.movements)
    .filter((mov) => mov > 0)
    .reduce((acc, elem) => acc + elem, 0);
console.log(bankDepositSum);

const bankDeposits1000Count = accounts
    .flatMap((acc) => acc.movements)
    .filter((mov) => mov >= 1000).length;
// .reduce((acc, elem, i, arr) => arr.length,0);

const bankDeposits1000CountReduce = accounts
    .flatMap((acc) => acc.movements)
    .reduce((count, elem) => (elem >= 1000 ? ++count : count), 0);

console.log(bankDeposits1000Count);
console.log(bankDeposits1000CountReduce);

// ?? ?????????????? ???????????? reduce ?????????? ???????????????????? ???? ???????????? ??????????-???? ???????? ????????????????
// ???? ?????????? ?????????????? ?? ??????????????????
const { deposits, withdrawals } = accounts
    .flatMap((acc) => acc.movements)
    .reduce(
        (sums, cur) => {
            // cur > 0 ? (sums.deposits += cur) : (sums.withdrawls += cur);
            // ?? ???????????? ???????????? [] - ?????? ?????????????????? ?? ???????? ??????????????, ?? ???? ?? ?????????? ??????????????
            sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
            return sums;
        },
        { deposits: 0, withdrawals: 0 }
    );

console.log(deposits + " | " + withdrawals);

//

const convertTitleCase = (title) => {
    const exceptions = [
        "a",
        "an",
        "and",
        "the",
        "but",
        "or",
        "on",
        "in",
        "with",
        "as",
    ];

    const cap = (str) => str[0].toUpperCase() + str.slice(1);

    const titleCase = title
        .toLowerCase()
        .split(" ")
        .map((word) => (exceptions.includes(word) ? word : cap(word)))
        .join(" ");

    return cap(titleCase);
};

console.log(convertTitleCase("this is a nice title, baby"));
console.log(convertTitleCase("SoMetHing CRAzy AS A titlE and some shit"));
console.log(convertTitleCase("and still"));
