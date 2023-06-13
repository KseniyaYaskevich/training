'use strict';

let title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = Boolean(confirm('Нужен ли адаптив на сайте?'));
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const rollback = 5;

let allServicePrices = 0;
let fullPrice = 0;
let servicePercentPrice = 0;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
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

const getAllServicePrices = function (servicePrice1Value, servicePrice2Value) {
  return servicePrice1Value + servicePrice2Value;
};

function getFullPrice(screenPriceValue, allServicePricesValue) {
  return screenPriceValue + allServicePricesValue;
};

const getTitle = function (str) {
  const newStr = str.trim();

  let result = newStr[0].toUpperCase();
  result += newStr.slice(1).toLowerCase();

  return result;
};

const getServicePercentPrices = function (fullPriceValue, rollbackValue) {
  return Math.ceil(fullPriceValue - rollbackValue);
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log('screens array - ', screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log('Стоимость за вычетом процента отката посреднику - ', servicePercentPrice);
