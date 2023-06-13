'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = Boolean(confirm('Нужен ли адаптив на сайте?'));
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const rollback = 5;
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - rollback);

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice < 15000 && fullPrice >= 0) {
  console.log('Скидка не предусмотрена');
} else {
  console.log('Скидка(нет)? Что-то пошло не так');
}

console.log('type of title - ', typeof title);
console.log('type of fullPrice - ', typeof fullPrice);
console.log('type of adaptive - ', typeof adaptive);
console.log('screens length - ', screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log('screens array - ', screens.toLowerCase().split(', '));
console.log('Какой-то там процент - ', fullPrice * (rollback / 100));
console.log('service Percent Price - ', servicePercentPrice);
