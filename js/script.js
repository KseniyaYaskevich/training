'use strict';

const title = document.getElementsByTagName('h1')[0];

const buttonPlus = document.querySelector('.screen-btn');
const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const checkboxCms = document.querySelector('#cms-open');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const selectCms = hiddenCmsVariants.querySelector('#cms-select');
const inputCms = hiddenCmsVariants.querySelector('input');

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
  cms: 0,
  servicesPercent: {},
  servicesNumber: {},
  isError: false,
  init() {
    const bindStart = this.start.bind(this);
    const bindReset = this.reset.bind(this);
    const bindAddRollback = this.addRollback.bind(this);

    const bindAddCms = this.addCms.bind(this);

    this.addTitle();

    buttonPlus.addEventListener('click', this.addScreenBlock);
    buttonStart.addEventListener('click', bindStart);
    buttonReset.addEventListener('click', bindReset);
    inputRange.addEventListener('input', bindAddRollback);

    checkboxCms.addEventListener('click', bindAddCms);
  },
  start() {
    const bindRecalculateRollback = this.recalculateRollback.bind(this);

    this.addScreens();

    if (!this.isError) {
      this.addServices();
      this.addPrices();
      this.disableChanges();
      this.showResult();

      inputRange.addEventListener('input', bindRecalculateRollback);
    } else {
      // временный алерт, чтобы понимать, когда не заполнены поля
      alert('Ошибка при подсчете данных');
    }
  },
  reset() {
    this.removeScreens();
    this.removeServices();
    this.removePrices();
    this.enableChanges();
    this.removeRollback();
    this.removeCms();
    this.showResult();
  },
  addTitle() {
    document.title = title.textContent;
  },
  addScreenBlock() {
    const cloneScreen = screens[0].cloneNode(true);
    screens = document.querySelectorAll('.screen');

    screens[screens.length - 1].after(cloneScreen);
  },
  addScreens() {
    screens = document.querySelectorAll('.screen');
    this.isError = false;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      for (let i = 0; i < screens.length; i++) {
        if (input.value === '' || select.value === '') {
          this.isError = true;
          break;
        }
      }

      if (!this.isError) {
        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: +input.value,
        });
      }
    });
  },
  removeScreens() {
    this.screens = [];

    for (let i = 1; i < screens.length; i++) {
      screens[i].remove();
    }
  },
  addServices() {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  removeServices() {
    this.servicesNumber = {};

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });
  },
  addPrices() {
    this.screenPrice = this.screens.reduce((acc, obj) => acc + obj.price, 0);
    this.screenCount = this.screens.reduce((acc, obj) => acc + obj.count, 0);

    for (const key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (const key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = (this.screenPrice + this.servicePricesNumber + this.servicePricesPercent) * (1 + this.cms / 100);
    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
  },
  removePrices() {
    this.screenPrice = 0;
    this.screenCount = 0;

    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

    this.fullPrice = 0;
    this.servicePercentPrice = 0;
  },
  disableChanges() {
    buttonStart.style.display = 'none';
    buttonPlus.style.display = 'none';
    buttonReset.style.display = 'block';

    screens.forEach((item) => {
      const input = item.querySelector('input[type=text]');
      const select = item.querySelector('select');

      input.setAttribute('disabled', 'disabled');
      select.setAttribute('disabled', 'disabled');
    });
  },
  enableChanges() {
    buttonReset.style.display = 'none';
    buttonPlus.style.display = 'block';
    buttonStart.style.display = 'block';

    screens = document.querySelectorAll('.screen');

    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      input.value = '';
      select.value = '';

      input.removeAttribute('disabled');
      select.removeAttribute('disabled');
    });
  },
  addRollback(evt) {
    inputRangeValue.textContent = evt.target.value;
    this.rollback = evt.target.value;
  },
  recalculateRollback() {
    this.addPrices();
    inputTotalCountRollback.value = this.servicePercentPrice;
  },
  removeRollback() {
    this.rollback = 0;

    inputRange.value = 0;
    inputRangeValue.textContent = 0;
  },
  addCms(evt) {
    if (evt.target.checked) {
      hiddenCmsVariants.style.display = 'flex';

      const bindChangeCms = this.changeCms.bind(this);
      const bindUpdateCms = this.updateCms.bind(this);

      selectCms.addEventListener('change', bindChangeCms);
      inputCms.addEventListener('input', bindUpdateCms);
    } else {
      hiddenCmsVariants.style.display = 'none';

      this.cms = 0;
    }
  },
  changeCms() {
    const inputContainer = hiddenCmsVariants.querySelector('.main-controls__input');
    const optionValue = selectCms.options[selectCms.selectedIndex].value;

    if (optionValue === 'other') {
      inputContainer.style.display = 'block';

      if (inputCms.value.trim() !== '') {
        this.cms = +inputCms.value;
      } else {
        this.cms = 0;
      }
    }
    if (optionValue === '50' || optionValue === '') {
      inputContainer.style.display = 'none';

      this.cms = +optionValue;
    }
  },
  updateCms(evt) {
    this.cms = +evt.target.value;
  },
  removeCms() {
    this.cms = 0;

    hiddenCmsVariants.style.display = 'none';
    checkboxCms.checked = false;
  },
  showResult() {
    inputTotal.value = this.screenPrice;
    inputTotalCount.value = this.screenCount;
    inputTotalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    inputFullTotalCount.value = this.fullPrice;
    inputTotalCountRollback.value = this.servicePercentPrice;
  },
};

appData.init();
