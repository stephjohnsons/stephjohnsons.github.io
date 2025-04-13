<template>
  <div class="mb-3">
    <label class="form-label">Amount</label>
    <input v-model="amount" type="number" class="form-control" />

    <label class="form-label mt-2">From Currency</label>
    <select v-model="fromCurrency" class="form-select">
      <option value="EUR">EUR</option>
      <option value="MYR">MYR</option>
      <option value="JPY">JPY</option>
      <!-- Add more currencies as needed -->
    </select>

    <div class="mt-3">
      <p><strong>Converted to CNY:</strong> {{ rates.CNY }}</p>
      <p><strong>Converted to USD:</strong> {{ rates.USD }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const amount = ref(1);
const fromCurrency = ref('EUR');
const toCurrencies = ['CNY', 'USD'];

const rates = ref({ CNY: null, USD: null });

async function fetchRates() {
  const toStr = toCurrencies.join(',');
  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${fromCurrency.value}&to=${toStr}`);
  const data = await res.json();
  rates.value = data.rates;
}

watch([amount, fromCurrency], fetchRates);

onMounted(fetchRates);
</script>
