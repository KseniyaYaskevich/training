const title = 'Lesson 2';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 100;
const rollback = 5;
const fullPrice = 50000;
const adaptive = true;

console.log('type of title - ', typeof title);
console.log('type of fullPrice - ', typeof fullPrice);
console.log('type of adaptive - ', typeof adaptive);

console.log('screens length - ', screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log('screens array - ', screens.toLowerCase().split(', '));
console.log('Какой-то там процент - ', fullPrice * (rollback / 100));
