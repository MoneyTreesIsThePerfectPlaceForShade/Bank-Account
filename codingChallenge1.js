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
