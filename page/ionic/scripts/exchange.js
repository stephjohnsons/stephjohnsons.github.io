document.addEventListener('DOMContentLoaded', function () {
  const exchangeButton = document.getElementById('exchangeButton');
  const fromCurrencySelect = document.getElementById('fromCurrencySelect');
  const toCurrencySelect = document.getElementById('toCurrencySelect');

  exchangeButton.addEventListener('click', function () {
    const selectedFromCurrency = fromCurrencySelect.value;
    const selectedToCurrency = toCurrencySelect.value;

    // Swap the selected currencies
    fromCurrencySelect.value = selectedToCurrency;
    toCurrencySelect.value = selectedFromCurrency;
  });
});
