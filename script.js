'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 5,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.title = appData.getTitle();
    appData.logger();
  },
  logger: function () {
    for (const key in appData) {
      console.log(key, appData[key]);
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  asking: function () {
    appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!appData.isNumber(appData.screenPrice));

    appData.screenPrice = Number(appData.screenPrice);

    appData.adaptive = Boolean(confirm('Нужен ли адаптив на сайте?'));
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let servicePrice = 0;

      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
      } else if (i === 1) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
      }

      do {
        servicePrice = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(servicePrice));

      sum += +servicePrice;
    }

    return sum;
  },
  getFullPrice: function (screenPriceValue, allServicePricesValue) {
    return screenPriceValue + allServicePricesValue;
  },
  getServicePercentPrices: function (fullPriceValue, rollbackValue) {
    return fullPriceValue - (fullPriceValue * (rollbackValue / 100));
  },
  getTitle: function () {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
  },
  getRollbackMessage: function (price) {
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
