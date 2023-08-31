const axios = require('axios');

const currencyRate = {
  AUD: {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    params: {
      format: 'json',
      from: 'AUD',
      to: 'MYR',
      amount: '1'
    },
    headers: {
      'X-RapidAPI-Key': '8c0274f42amsh44d91c860b8291cp1cc65ajsnaef3874e862d',
      'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
    },
  },
  EUR: {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    params: {
      format: 'json',
      from: 'EUR',
      to: 'MYR',
      amount: '1'
    },
    headers: {
      'X-RapidAPI-Key': '8c0274f42amsh44d91c860b8291cp1cc65ajsnaef3874e862d',
      'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
    },
  },
  IDR: {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    params: {
      format: 'json',
      from: 'MYR',
      to: 'IDR',
      amount: '1'
    },
    headers: {
      'X-RapidAPI-Key': '8c0274f42amsh44d91c860b8291cp1cc65ajsnaef3874e862d',
      'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
    },
  },
  SGD: {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    params: {
      format: 'json',
      from: 'SGD',
      to: 'MYR',
      amount: '1'
    },
    headers: {
      'X-RapidAPI-Key': '8c0274f42amsh44d91c860b8291cp1cc65ajsnaef3874e862d',
      'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
    },
  },
  USD: {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    params: {
      format: 'json',
      from: 'USD',
      to: 'MYR',
      amount: '1'
    },
    headers: {
      'X-RapidAPI-Key': '8c0274f42amsh44d91c860b8291cp1cc65ajsnaef3874e862d',
      'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
    },
  },
};

// Script for fetching exchange rates
async function exchangeRates() {
  try {
    const response = await axios.request(options);
    const exchangeRates = response.data.rates;

    // Update each row in table 
    for (const currency in exchangeRates) {
      const lastPrice = document.getElementById(`${currency.toLowerCase()}-last-price`);
      if (lastPrice) {
        lastPrice.textContent = exchangeRates[currency].rate.toFixed(2);
      }
    }
  } catch (error) {
    console.error(error);
  };
};

onload=exchangeRates();