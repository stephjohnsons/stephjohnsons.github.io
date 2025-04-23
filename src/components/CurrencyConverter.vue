<template>
  <h5 class="mt-3 fw-normal">Currency Converter</h5>
  <p>
    ※ 暂时未有<span class="fw-bold">新台币</span>
  </p>
  <div class="mb-2">
    <div class="input-group">
      <select v-model="fromCurrency" class="form-select">
        <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
          {{ currency.symbol }} {{ currency.name }}
        </option>
      </select>
      <input type="number" v-model="amount" class="form-control" placeholder="Amount" />
    </div>
  </div>

  <div class="d-flex flex-column">
    <div class="d-flex gap-2">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">{{ fromCurrency }}</span>
        <input type="text" class="form-control" :value="formattedAmount" disabled />
      </div>
      <div v-if="fromCurrency !== 'CNY'" class="input-group">
        <span class="input-group-text" id="basic-addon1">CNY</span>
        <input type="text" class="form-control" :value="formattedCNY" disabled />
      </div>
      <div v-if="fromCurrency !== 'USD'" class="input-group">
        <span class="input-group-text" id="basic-addon1">USD</span>
        <input type="text" class="form-control" :value="formattedUSD" disabled />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const amount = ref(1);
const fromCurrency = ref('EUR');
const currencies = [
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: '---', symbol: '-', name: '---' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'CZK', symbol: 'Czk.', name: 'Czech Koruna' },
  { code: 'DKK', symbol: 'kr.', name: 'Danish Krone' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
  { code: 'CHF', symbol: '₣', name: 'Swiss Franc' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
];

const rates = ref({ CNY: null, USD: null });

async function fetchRates() {
  const toStr = ['CNY', 'USD'].join(',');
  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${fromCurrency.value}&to=${toStr}`);
  const data = await res.json();
  rates.value = data.rates;
}

watch([amount, fromCurrency], fetchRates);

const formatCurrency = (currencyValue, currencySymbol = '€', currencyCode = 'EUR') => {
  if (!currencyValue) return '';
  return `${currencySymbol} ${Number(currencyValue).toFixed(2)} ${currencyCode}`;
};

const formattedAmount = computed(() => {
  const selectedCurrency = currencies.find(c => c.code === fromCurrency.value);
  if (!selectedCurrency) return '';
  return formatCurrency(amount.value, selectedCurrency.symbol, selectedCurrency.code);
});

const formattedCNY = computed(() => {
  return formatCurrency(rates.value?.CNY, '¥', 'CNY');
});

const formattedUSD = computed(() => {
  return formatCurrency(rates.value?.USD, '$', 'USD');
});

onMounted(fetchRates);
</script>

<style scoped>
.input-group {
  width: 100%;
}
</style>
