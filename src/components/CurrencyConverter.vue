<template>
  <div class="d-flex gap-2 mb-3 mt-3">
    <div class="mb-3">
      <label class="form-label fw-bold">Currency</label>
      <div class="input-group">
        <select v-model="fromCurrency" class="form-select">
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
            {{ currency.symbol }} {{ currency.name }}
          </option>
        </select>
        <input type="number" v-model="amount" class="form-control" placeholder="Amount" />
      </div>
    </div>

    <div class="d-flex flex-column ms-4">
      <label class="form-label fw-bold">Converted</label>
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
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const amount = ref(1);
const fromCurrency = ref('EUR');
const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
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
