<template>
  <div class="d-flex flex-column">
    <ZhTwConverter />
    <CurrencyConverter />
    <TimeZoneConverter />

    <p class="my-4">
      <a href="https://www.timeanddate.com/date/workdays.html">
        Business Day Calculator
      </a>
    </p>

    <div class="footer sticky-bottom bg-body rounded-3 px-2 pt-2">
      <CurrentTime />
    </div>
  </div>
</template>

<script setup>
import ZhTwConverter from '@/components/ZhTwConverter.vue';
import TimeZoneConverter from '@/components/TimeZoneConverter.vue';
import CurrencyConverter from '@/components/CurrencyConverter.vue';
import CurrentTime from '@/components/CurrentTime.vue';
</script>
