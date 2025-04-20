<template>
  <div v-if="authenticated" class="d-flex flex-column">
    <ZhTwConverter />
    <CurrencyConverter />
    <TimeZoneConverter />

    <div class="footer sticky-bottom bg-body rounded-3 px-2 pt-2 d-flex">
      <CurrentTime />

      <p class="ms-auto my-auto me-2">
        <a href="https://www.timeanddate.com/date/workdays.html">
          Business Day Calculator
        </a>
      </p>
    </div>
  </div>
  <div v-else class="d-flex flex-column align-items-center justify-content-center vh-100">
    <input v-model="inputPassword" type="password" class="form-control w-25 mb-3" placeholder="Enter password" />
    <button class="btn btn-primary" @click="checkPassword" @enter="checkPassword">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ZhTwConverter from '@/components/ZhTwConverter.vue';
import TimeZoneConverter from '@/components/TimeZoneConverter.vue';
import CurrencyConverter from '@/components/CurrencyConverter.vue';
import CurrentTime from '@/components/CurrentTime.vue';

const authenticated = ref(localStorage.getItem('authenticated') === 'true');
const inputPassword = ref('');

const checkPassword = () => {
  if (inputPassword.value === import.meta.env.VITE_TOOLS_PASSWORD) {
    authenticated.value = true;
    localStorage.setItem('authenticated', 'true');
  } else {
    alert('Incorrect password');
  }
};

</script>
