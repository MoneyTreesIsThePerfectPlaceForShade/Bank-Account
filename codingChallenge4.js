const dogs = [
    { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
    { weight: 8, curFood: 200, owners: ["Matilda"] },
    { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
    { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1 Просчитать каждой собаке рекомендуемую порцию
// recommendedFood = weight ** 0.75 * 28
// новый массив создавать не надо, надо loop по массиву

dogs.forEach((dog) => {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

// 2 Узнать, собака Сары ест достаточно или слишком много

const sarahDog = dogs.find((dog) => {
    const owner = dog.owners.join(" ");
    if (owner.includes("Sarah")) return dog;
});

sarahDog.curFood > sarahDog.recommendedFood
    ? console.log("Собака Сары ест слишком много")
    : console.log("Собака Сары ест слишком мало");

// 3 Создать массив ВЛАДЕЛЬЦЕВ, чьи собаки едят слишком много
// такой же для тех, чьи собаки едят слишком мало

const ownersEatTooMuch = dogs
    .filter((dog) => dog.curFood > dog.recommendedFood)
    .flatMap((dog) => dog.owners);

const ownersEatTooLittle = dogs
    .filter((dog) => dog.curFood < dog.recommendedFood)
    .flatMap((dog) => dog.owners);

// 4 Создать строку в духе "Собака алисы ест слишком много",
// основываясь на массивах из п.3

let eatToMuch = "";
let eatToLittle = "";

eatToMuch +=
    "Собаки " +
    String(ownersEatTooMuch).replace(/,/g, " и ") +
    " едят слишком много";

eatToLittle +=
    "Собаки " +
    String(ownersEatTooLittle).replace(/,/g, " и ") +
    " едят слишком мало";

console.log(eatToMuch);
console.log(eatToLittle);

// 5 Вывести в консоль ту собаку, которая ест ровно столько, сколько рекомендовано
// через true / false

dogs.forEach((dog) => {
    dog.curFood === dog.recommendedFood
        ? console.log(true)
        : console.log(false);
});

console.log("--------------------");
// 6 Вывести в консоль тех собак, которые едят нормальное кол-во еду
// через true / false

dogs.forEach((dog) => {
    if (
        dog.curFood > dog.recommendedFood * 0.9 &&
        dog.curFood < dog.recommendedFood * 1.1
    ) {
        return console.log(true);
    } else {
        return console.log(false);
    }
});

// 7 Создать массив тех собак, что едят норм кол-во еды

const normalEatingDogs = [];

dogs.find((dog) => {
    if (
        dog.curFood > dog.recommendedFood * 0.9 &&
        dog.curFood < dog.recommendedFood * 1.1
    )
        normalEatingDogs.push(dog);
});

console.log(normalEatingDogs);
console.log("------------");
// 8 Создать копию массива dogs и отсортировать их по рекомендуемому кол-ву еды
// в возрастающем порядке
const sortedDogs = [...dogs];
console.log(sortedDogs.sort((a, b) => a.recommendedFood - b.recommendedFood));
