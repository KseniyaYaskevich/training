'use strict';

const titlesCollection = document.getElementsByTagName('h1');
const title = titlesCollection[0];

const buttons = document.getElementsByClassName('handler_btn');
const screenButton = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback > div > input');
const rangeValue = document.querySelector('.rollback > div > span');

const totalInputsCollection = document.getElementsByClassName('total-input');
let totalInputs = [];

for (let i = 0; i < totalInputsCollection.length; i++) {
  totalInputs.push(totalInputsCollection[i]);
}

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start() {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.getTitle();

    appData.logger();
  },
  logger() {
    Object.keys(appData).forEach((key) => {
      console.log(`${key}:`, appData[key]);
    });
  },
  isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString(str) {
    return isNaN(str.replace(/\s/g, ''));
  },
  asking() {
    do {
      appData.title = prompt('Как называется ваш проект?');
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name: name,
        price: +price,
      });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      appData.services[name + (i + 1)] = +price;
    }

    appData.adaptive = Boolean(confirm('Нужен ли адаптив на сайте?'));
  },

  addPrices() {
    appData.screenPrice = appData.screens.reduce((acc, obj) => acc + obj.price, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice(screenPriceValue, allServicePricesValue) {
    appData.fullPrice = screenPriceValue + allServicePricesValue;
  },
  getServicePercentPrices(fullPriceValue, rollbackValue) {
    appData.servicePercentPrice = fullPriceValue - (fullPriceValue * (rollbackValue / 100));
  },
  getTitle() {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title
      .trim().substring(1).toLowerCase();
  },
  getRollbackMessage(price) {
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
  },
};

appData.start();
