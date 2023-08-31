const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
  params: {
    format: 'json',
    from: 'MYR',
    to: 'AUD,EUR,IDR,SGD,USD',
    amount: '1'
  },
  headers: {
    'X-RapidAPI-Key': '8c0274f42amsh44d91c860b8291cp1cc65ajsnaef3874e862d',
    'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
  },
};

// Script for fetching exchange rates
async function exchangeRates() {
  try {
    const response = await axios.request(options);
    const exchangeRantes = response.data.rates;

    // Update each row in table 
    for (const currency in exchangeRantes) {
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