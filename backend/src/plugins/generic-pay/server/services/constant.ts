'use strict';

module.exports = {
  sepaDirectDebit: {
    supportedCurrency: ['eur'],
  },
  achDirectDebit: {
    supportedCurrency: ['usd'],
  },
  alipay: {
    supportedCurrency: ['usd', 'cny'],
  },
  klarna: {
    supportedCurrency: ['dkk', 'gbp', 'nok', 'sek', 'usd', 'aud', 'nzd', 'cad', 'pln', 'chf'],
  },
  sofort: {
    supportedCurrency: ['eur'],
  },
  ideal: {
    supportedCurrency: ['eur'],
  },
};
