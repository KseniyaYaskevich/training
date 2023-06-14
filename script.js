'use strict';

let title;
let screens;
let screenPrice;
let adaptive;

const rollback = 5;
let allServicePrices = 0;
let fullPrice = 0;
let servicePercentPrice = 0;

let service1;
let service2;
let servicePrice;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));

  screenPrice = Number(screenPrice);

  adaptive = Boolean(confirm('Нужен ли адаптив на сайте?'));
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    do {
      servicePrice = prompt('Сколько это будет стоить?');
    } while (!isNumber(servicePrice));

    sum += +servicePrice;
  }

  return sum;
};

const getFullPrice = function (screenPriceValue, allServicePricesValue) {
  return screenPriceValue + allServicePricesValue;
};

const getServicePercentPrices = function (fullPriceValue, rollbackValue) {
  return Math.ceil(fullPriceValue - rollbackValue);
};

const getTitle = function () {
  return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  }
  if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  }
  if (price < 15000 && price >= 0) {
    return 'Скидка не предусмотрена';
  }
  return 'Скидка(нет)? Что-то пошло не так';
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);
console.log(getRollbackMessage(fullPrice));
console.log('Стоимость за вычетом процента отката посреднику - ', servicePercentPrice);
console.log('screens array - ', screens.toLowerCase().split(', '));
