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
  <PasswordPage v-else />
</template>

<script setup>
import PasswordPage from '@/components/PasswordPage.vue';
import ZhTwConverter from '@/components/ZhTwConverter.vue';
import TimeZoneConverter from '@/components/TimeZoneConverter.vue';
import CurrencyConverter from '@/components/CurrencyConverter.vue';
import CurrentTime from '@/components/CurrentTime.vue';
</script>
