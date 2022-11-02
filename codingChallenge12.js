// Challenge 1
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// 0) Создать ф-ию, которая будет определять и выводить в консоль взрослая это собака или щенок

const checkDogs = (dawgsJ, dawgsK) => {
    // 1) У Джулии 1 и последние две 'собаки' оказались кошками, нужно убрать их из массива
    // при этом создав копию массива
    const dawgsJWithoutCats = dawgsJ.slice(1, -2);
    // 2) Сделать один массив из данных Джулии и Кати
    const dogs = [...dawgsJWithoutCats, ...dawgsK];
    // 3) Вывести что-то в духе "собака 1 взрослая, ей 5 лет"
    dogs.forEach((age, index) => {
        age >= 3
            ? console.log(`Собака ${index + 1}: взрослая, ей ${age} лет`)
            : console.log(`Собака ${index + 1}: щенок , ей ${age} лет`);
    });
};
console.log("---- TEST 1 ----");
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log("---- TEST 2 ----");
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Challenge 2

// создать ф-ию calcAverageHumanAge
const calcAverageHumanAge = (dawgsAges) => {
    // 1) сконвертировать собачьи года в человечьи
    const humanAges = dawgsAges.map((element) =>
        element <= 2 ? element * 2 : 16 + element * 4
    );
    // 2) Исключит всех собак младше 18
    const adults = humanAges.filter((element) => element >= 18);
    // 3) Посчитать средний возраст пёселей
    // const avgAge = adults.reduce((acc, age) => acc + age, 0) / adults.length;
    const avgAge = adults.reduce(
        (acc, age, i, arr) => acc + age / arr.length,
        0
    );
    // 4) Вернуть этот самый средний возраст и вывести в консоль
    console.log(avgAge);
    return avgAge;
};
//using chaining
const calcAverageHumanAgeChaining = (dogsAges) => {
    const avgAge = dogsAges
        .map((element) => (element <= 2 ? element * 2 : 16 + element * 4))
        .filter((element) => element >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

    console.log(avgAge);
    return avgAge;
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log("USING CHAINING");
calcAverageHumanAgeChaining([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAgeChaining([16, 6, 10, 5, 6, 1, 4]);
