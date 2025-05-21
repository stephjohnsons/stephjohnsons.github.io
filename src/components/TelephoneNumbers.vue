<template>
  <div class="mt-2 d-flex gap-3 align-items-center">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="togglePhones" v-model="showPhones" />
      <label class="form-check-label" for="togglePhones">
        Phone Numbers
      </label>
    </div>

    <div v-if="showPhones" class="d-flex mb-0">
      <div class="me-3">
        <label for="countrySelect" class="form-label me-2 mb-0">Country</label>
        <select id="countrySelect" class="form-select-sm" v-model="selectedCountry">
          <option value="">-- Choose --</option>
          <option value="int">International</option>
          <option value="ar">Argentina</option>
          <option value="au">Australia</option>
          <option value="at">Austria</option>
          <option value="br">Brazil</option>
          <option value="ca">Canada</option>
          <option value="cl">Chile</option>
          <option value="cn">China</option>
          <option value="co">Colombia</option>
          <option value="hr">Croatia</option>
          <option value="dk">Denmark</option>
          <option value="fr">France</option>
          <option value="de">Germany</option>
          <option value="gr">Greece</option>
          <option value="hk">Hong Kong</option>
          <option value="in">India</option>
          <option value="id">Indonesia</option>
          <option value="ie">Ireland</option>
          <option value="il">Israel</option>
          <option value="it">Italy</option>
          <option value="jp">Japan</option>
          <option value="my">Malaysia</option>
          <option value="mx">Mexico</option>
          <option value="nl">Netherlands</option>
          <option value="nz">New Zealand</option>
          <option value="no">Norway</option>
          <option value="pe">Peru</option>
          <option value="ph">Philippines</option>
          <option value="pl">Poland</option>
          <option value="pt">Portugal</option>
          <option value="pr">Puerto Rico</option>
          <option value="ru">Russia</option>
          <option value="sg">Singapore</option>
          <option value="kr">South Korea</option>
          <option value="es">Spain</option>
          <option value="se">Sweden</option>
          <option value="ch">Switzerland</option>
          <option value="tw">Taiwan</option>
          <option value="th">Thailand</option>
          <option value="gb">United Kingdom</option>
          <option value="us">United States</option>
          <option value="vn">Vietnam</option>
        </select>
      </div>

      <div class="w-50 ms-0 d-flex gap-2 align-items-center">
        <input type="text" :value="numbers" class="form-control-sm" readonly ref="numberBox" />
        <button class="btn btn-outline-secondary btn-sm" @click="copyToClipboard">
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const numbers = ref('');
const showPhones = ref(false);
const selectedCountry = ref('');
const numberBox = ref(null);
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;

const fetchNumbers = async (endpoint) => {
  try {
    const res = await fetch(`${backend}/telephone?type=${endpoint}`);
    const json = await res.json();
    numbers.value = json.text;
  } catch (err) {
    console.error('Fetch failed:', err);
  }
};

watch(selectedCountry, (newVal) => {
  if (newVal) fetchNumbers(newVal);
});

const copyToClipboard = () => {
  if (numberBox.value) {
    navigator.clipboard.writeText(numbers.value);
  }
};
</script>