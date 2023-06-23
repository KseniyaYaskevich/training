'use strict';

const title = document.getElementsByTagName('h1')[0];

const buttonPlus = document.querySelector('.screen-btn');
const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback > div > input');
const inputRangeValue = document.querySelector('.rollback > div > span');

const inputTotal = document.getElementsByClassName('total-input')[0];
const inputTotalCount = document.getElementsByClassName('total-input')[1];
const inputTotalCountOther = document.getElementsByClassName('total-input')[2];
const inputFullTotalCount = document.getElementsByClassName('total-input')[3];
const inputTotalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  screenCount: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isError: false,
  init() {
    appData.addTitle();

    buttonStart.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);

    inputRange.addEventListener('input', appData.addRollback);
  },
  addTitle() {
    document.title = title.textContent;
  },
  start() {
    appData.addScreens();

    if (!appData.isError) {
      appData.addServices();
      appData.addPrices();
      appData.showResult();
      inputRange.addEventListener('input', appData.recalculateRollback);
    } else {
      // временный алерт, чтобы понимать, когда не заполнены поля
      alert('Ошибка при подсчете данных');
    }

    // appData.logger();
  },
  showResult() {
    inputTotal.value = appData.screenPrice;
    inputTotalCount.value = appData.screenCount;
    inputTotalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    inputFullTotalCount.value = appData.fullPrice;
    inputTotalCountRollback.value = appData.servicePercentPrice;
  },
  addScreens() {
    screens = document.querySelectorAll('.screen');
    appData.isError = false;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      for (let i = 0; i < screens.length; i++) {
        if (input.value === '' || select.value === '') {
          appData.isError = true;
          break;
        }
      }

      if (!appData.isError) {
        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: +input.value,
        });
      }
    });
  },
  addServices() {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock() {
    const cloneScreen = screens[0].cloneNode(true);
    screens = document.querySelectorAll('.screen');
    // я добавила обновление экранов и тут, потому что иначе длина всегда будет = 1
    // и уже со второго добавления новые экраны будут помещаться всегда после 1 элемента

    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices() {
    appData.screenPrice = appData.screens.reduce((acc, obj) => acc + obj.price, 0);
    appData.screenCount = appData.screens.reduce((acc, obj) => acc + obj.count, 0);

    for (const key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (const key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
  },
  addRollback(evt) {
    inputRangeValue.textContent = evt.target.value;
    appData.rollback = evt.target.value;
  },
  recalculateRollback() {
    appData.addPrices();
    inputTotalCountRollback.value = appData.servicePercentPrice;
  },
  logger() {
    Object.keys(appData).forEach((key) => {
      console.log(`${key}:`, appData[key]);
    });
  },
};

appData.init();
